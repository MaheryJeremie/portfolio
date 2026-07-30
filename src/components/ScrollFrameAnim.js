import { useEffect, useRef } from 'react';
import { publicUrl } from '../utils/publicUrl';

const FRAME_COUNT = 151;
const MAX_EDGE_DESKTOP = 720;
const MAX_EDGE_MOBILE = 560;
const LOAD_CONCURRENCY = 6;
const PREFETCH = 24;
/** Contiguous frames required from 0 before scrub is fully unlocked. */
const BOOTSTRAP = 36;

function framePath(i) {
  return publicUrl(`/animation/frames/frame-${String(i).padStart(3, '0')}.webp`);
}

/**
 * Scroll-scrubbed frame sequence.
 * Prefer `progressRef` so the parent can avoid React re-renders on scroll.
 */
export default function ScrollFrameAnim({
  progress = 0,
  progressRef = null,
  className = '',
}) {
  const canvasRef = useRef(null);
  const fallbackProgress = useRef(progress);
  fallbackProgress.current = progress;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const isMobile = window.matchMedia('(max-width: 768px), (pointer: coarse)').matches;
    const maxEdge = isMobile ? MAX_EDGE_MOBILE : MAX_EDGE_DESKTOP;
    const maxDpr = isMobile ? 1 : 1.25;

    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
    if (!ctx) return undefined;

    const bitmaps = new Array(FRAME_COUNT);
    const loading = new Set();
    const queue = [];
    let activeLoads = 0;
    let currentFrame = 0;
    let lastDrawn = -1;
    let lastGood = 0;
    /** Highest index with every frame [0..n] ready. */
    let contiguous = -1;
    let ready = false;
    let bootstrapped = false;
    let rafId = 0;
    let running = false;
    let cancelled = false;
    let srcW = 0;
    let srcH = 0;
    let drawW = 0;
    let drawH = 0;
    let drawX = 0;
    let drawY = 0;

    const readProgress = () => {
      const raw = progressRef ? progressRef.current : fallbackProgress.current;
      return Math.min(1, Math.max(0, Number(raw) || 0));
    };

    const isReady = (bmp) => Boolean(bmp && bmp.width > 0);

    const refreshContiguous = () => {
      let n = contiguous;
      while (n + 1 < FRAME_COUNT && isReady(bitmaps[n + 1])) n += 1;
      contiguous = n;
      if (!bootstrapped && contiguous >= BOOTSTRAP - 1) bootstrapped = true;
    };

    const nearestReady = (index) => {
      if (isReady(bitmaps[index])) return index;
      for (let d = 1; d < FRAME_COUNT; d += 1) {
        const hi = index + d;
        const lo = index - d;
        if (hi < FRAME_COUNT && isReady(bitmaps[hi])) return hi;
        if (lo >= 0 && isReady(bitmaps[lo])) return lo;
      }
      return -1;
    };

    const layoutDraw = (iw, ih) => {
      if (iw === srcW && ih === srcH && drawW) return;
      srcW = iw;
      srcH = ih;
      const scale = Math.max(canvas.width / iw, canvas.height / ih);
      drawW = iw * scale;
      drawH = ih * scale;
      drawX = (canvas.width - drawW) / 2;
      drawY = (canvas.height - drawH) / 2 - drawH * 0.04;
    };

    const drawFrame = (index) => {
      let idx = index;
      let bmp = bitmaps[idx];

      if (!isReady(bmp)) {
        idx = nearestReady(index);
        if (idx < 0) return;
        bmp = bitmaps[idx];
      }

      lastGood = idx;
      if (idx === lastDrawn) return;
      lastDrawn = idx;

      layoutDraw(bmp.width, bmp.height);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(bmp, drawX, drawY, drawW, drawH);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
      const rect = canvas.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width * dpr));
      const h = Math.max(1, Math.floor(rect.height * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        srcW = 0;
        lastDrawn = -1;
      }
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'medium';
      if (ready) drawFrame(Math.round(currentFrame));
    };

    const decodeToBitmap = async (img) => {
      const iw = img.naturalWidth || img.width;
      const ih = img.naturalHeight || img.height;
      const scale = Math.min(1, maxEdge / Math.max(iw, ih));
      const rw = Math.max(1, Math.round(iw * scale));
      const rh = Math.max(1, Math.round(ih * scale));

      if (typeof createImageBitmap === 'function') {
        try {
          return await createImageBitmap(img, {
            resizeWidth: rw,
            resizeHeight: rh,
            resizeQuality: 'medium',
          });
        } catch {
          /* fall through */
        }
      }

      const c = document.createElement('canvas');
      c.width = rw;
      c.height = rh;
      c.getContext('2d').drawImage(img, 0, 0, rw, rh);
      return c;
    };

    const startLoad = (index) => {
      loading.add(index);
      activeLoads += 1;

      const img = new Image();
      img.decoding = 'async';
      img.onload = () => {
        if (cancelled) {
          activeLoads -= 1;
          loading.delete(index);
          return;
        }
        decodeToBitmap(img)
          .then((bmp) => {
            if (cancelled) {
              bmp.close?.();
              return;
            }
            const prev = bitmaps[index];
            bitmaps[index] = bmp;
            prev?.close?.();
            refreshContiguous();
            if (!ready && index === 0) {
              ready = true;
              resize();
            } else if (Math.round(currentFrame) === index) {
              lastDrawn = -1;
            }
          })
          .catch(() => {})
          .finally(() => {
            loading.delete(index);
            activeLoads -= 1;
            img.src = '';
            pumpQueue();
            kick();
          });
      };
      img.onerror = () => {
        loading.delete(index);
        activeLoads -= 1;
        pumpQueue();
      };
      img.src = framePath(index + 1);
    };

    const pumpQueue = () => {
      while (activeLoads < LOAD_CONCURRENCY && queue.length) {
        const index = queue.shift();
        if (index == null) break;
        if (bitmaps[index] || loading.has(index)) continue;
        startLoad(index);
      }
    };

    const enqueue = (index, urgent = false) => {
      if (index < 0 || index >= FRAME_COUNT) return;
      if (bitmaps[index] || loading.has(index)) return;
      const pos = queue.indexOf(index);
      if (pos !== -1) {
        if (urgent && pos > 0) {
          queue.splice(pos, 1);
          queue.unshift(index);
        }
        return;
      }
      if (urgent) queue.unshift(index);
      else queue.push(index);
      pumpQueue();
    };

    /** Prioritize every missing frame between from→to so scrub never jumps over holes. */
    const enqueueRange = (from, to) => {
      const a = Math.max(0, Math.min(from, to));
      const b = Math.min(FRAME_COUNT - 1, Math.max(from, to));
      for (let i = a; i <= b; i += 1) enqueue(i, true);
    };

    const ensureAround = (center) => {
      enqueue(center, true);
      for (let d = 1; d <= PREFETCH; d += 1) {
        enqueue(center + d, d <= 6);
        enqueue(center - d, d <= 6);
      }
    };

    const tick = () => {
      rafId = 0;
      const targetRaw = readProgress() * (FRAME_COUNT - 1);

      // Until bootstrap buffer is ready, hold near the start so fast scroll
      // cannot outrun the loader. After that, never scrub past contiguous.
      const maxPlayable = bootstrapped
        ? Math.max(0, contiguous)
        : Math.min(Math.max(0, contiguous), BOOTSTRAP - 1);
      const target = Math.min(targetRaw, maxPlayable);

      // Urgently fill the gap the user is trying to reach
      if (targetRaw > contiguous + 1) {
        enqueueRange(contiguous + 1, Math.ceil(targetRaw) + PREFETCH);
      }

      const diff = target - currentFrame;
      if (Math.abs(diff) < 0.4) currentFrame = target;
      else currentFrame += diff * 0.55;

      // Soft-clamp playhead so we never sit on unloaded indices
      if (currentFrame > maxPlayable) currentFrame = maxPlayable;

      const index = Math.min(
        FRAME_COUNT - 1,
        Math.max(0, Math.round(currentFrame))
      );

      ensureAround(index);
      if (ready) drawFrame(index);

      const catchingUp = targetRaw > contiguous + 0.5;
      const moving = Math.abs(target - currentFrame) > 0.05;
      const busy = !bitmaps[index] || activeLoads > 0 || queue.length > 0 || catchingUp;

      if (moving || busy) {
        rafId = requestAnimationFrame(tick);
      } else {
        running = false;
        currentFrame = target;
        if (ready) drawFrame(Math.round(currentFrame));
      }
    };

    const kick = () => {
      if (running || cancelled) return;
      running = true;
      rafId = requestAnimationFrame(tick);
    };

    let scrollRaf = 0;
    const onScroll = () => {
      if (scrollRaf) return;
      scrollRaf = requestAnimationFrame(() => {
        scrollRaf = 0;
        kick();
      });
    };

    resize();
    // Bootstrap: load a solid prefix first, then the rest of the sequence.
    for (let i = 0; i < Math.min(BOOTSTRAP + PREFETCH, FRAME_COUNT); i += 1) {
      enqueue(i, i < BOOTSTRAP);
    }
    kick();

    const ro = new ResizeObserver(() => {
      resize();
      kick();
    });
    ro.observe(canvas.parentElement || canvas);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      cancelled = true;
      running = false;
      if (rafId) cancelAnimationFrame(rafId);
      if (scrollRaf) cancelAnimationFrame(scrollRaf);
      ro.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      queue.length = 0;
      bitmaps.forEach((b) => b?.close?.());
    };
  }, [progressRef]);

  // Keep fallback progress in sync + nudge when parent re-renders with new progress
  useEffect(() => {
    fallbackProgress.current = progress;
  }, [progress]);

  return (
    <canvas
      ref={canvasRef}
      className={`scroll-frame-anim ${className}`.trim()}
      aria-hidden="true"
    />
  );
}
