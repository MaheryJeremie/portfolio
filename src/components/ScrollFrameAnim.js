import { useEffect, useRef } from 'react';
import { publicUrl } from '../utils/publicUrl';

const FRAME_COUNT = 151;
const MAX_EDGE_DESKTOP = 720;
const MAX_EDGE_MOBILE = 560;
const LOAD_CONCURRENCY = 8;
const PREFETCH = 16;
/** Contiguous frames required from 0 before scrub follows scroll freely. */
const BOOTSTRAP = 48;

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
    /** Priority queue: lower score = load sooner. Prefer low indices (fill gaps). */
    const queue = [];
    let activeLoads = 0;
    let currentFrame = 0;
    let lastDrawn = -1;
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

    /** Only draw inside the contiguous prefix — never jump into holes. */
    const drawFrame = (index) => {
      if (contiguous < 0) return;
      const idx = Math.min(Math.max(0, index), contiguous);
      const bmp = bitmaps[idx];
      if (!isReady(bmp)) return;
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

    const pumpQueue = () => {
      queue.sort((a, b) => a.score - b.score);
      while (activeLoads < LOAD_CONCURRENCY && queue.length) {
        const next = queue.shift();
        if (!next) break;
        const { index } = next;
        if (bitmaps[index] || loading.has(index)) continue;
        startLoad(index);
      }
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
            if (!ready && isReady(bitmaps[0])) {
              ready = true;
              lastDrawn = -1;
              resize();
            } else if (index <= Math.round(currentFrame)) {
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

    const enqueue = (index, score) => {
      if (index < 0 || index >= FRAME_COUNT) return;
      if (bitmaps[index] || loading.has(index)) return;
      const existing = queue.find((q) => q.index === index);
      if (existing) {
        if (score < existing.score) existing.score = score;
        return;
      }
      queue.push({ index, score });
      pumpQueue();
    };

    /** Fill [from, to] in ascending order (low score = sooner). */
    const enqueueRange = (from, to, baseScore = 0) => {
      const a = Math.max(0, Math.min(from, to));
      const b = Math.min(FRAME_COUNT - 1, Math.max(from, to));
      for (let i = a; i <= b; i += 1) {
        enqueue(i, baseScore + (i - a));
      }
    };

    const ensureAround = (center) => {
      enqueue(center, 0);
      for (let d = 1; d <= PREFETCH; d += 1) {
        // Ahead of playhead matters more than behind (already contiguous).
        enqueue(center + d, d);
        enqueue(center - d, 100 + d);
      }
    };

    const tick = () => {
      rafId = 0;
      const targetRaw = readProgress() * (FRAME_COUNT - 1);

      // Never scrub past the contiguous loaded prefix.
      // Before bootstrap, freeze near the start so first-load scroll cannot thrash.
      const maxPlayable = !ready
        ? -1
        : bootstrapped
          ? Math.max(0, contiguous)
          : Math.min(Math.max(0, contiguous), Math.min(BOOTSTRAP - 1, 8));

      if (maxPlayable < 0) {
        enqueueRange(0, BOOTSTRAP + PREFETCH, 0);
        rafId = requestAnimationFrame(tick);
        return;
      }

      const target = Math.min(targetRaw, maxPlayable);

      // Always extend the contiguous frontier first (ascending), then prefetch.
      if (contiguous < FRAME_COUNT - 1) {
        enqueueRange(contiguous + 1, contiguous + PREFETCH + 8, 0);
      }
      if (targetRaw > contiguous + 1) {
        enqueueRange(contiguous + 1, Math.ceil(targetRaw) + 4, 0);
      }

      const diff = target - currentFrame;
      if (Math.abs(diff) < 0.35) currentFrame = target;
      else currentFrame += diff * 0.65;

      if (currentFrame > maxPlayable) currentFrame = maxPlayable;

      const index = Math.min(
        FRAME_COUNT - 1,
        Math.max(0, Math.round(currentFrame))
      );

      ensureAround(index);
      drawFrame(index);

      const catchingUp = targetRaw > contiguous + 0.5;
      const moving = Math.abs(target - currentFrame) > 0.05;
      const busy =
        activeLoads > 0 || queue.length > 0 || catchingUp || !bootstrapped;

      if (moving || busy) {
        rafId = requestAnimationFrame(tick);
      } else {
        running = false;
        currentFrame = target;
        drawFrame(Math.round(currentFrame));
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
    // Strict ascending bootstrap — fill 0..N before anything else.
    enqueueRange(0, Math.min(FRAME_COUNT - 1, BOOTSTRAP + PREFETCH), 0);
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
