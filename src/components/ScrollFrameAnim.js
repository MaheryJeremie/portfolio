import { useEffect, useRef } from 'react';
import { publicUrl } from '../utils/publicUrl';

const FRAME_COUNT = 151;
const MAX_EDGE_DESKTOP = 720;
const MAX_EDGE_MOBILE = 560;
const LOAD_CONCURRENCY = 4;
const PREFETCH = 20;

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
    let ready = false;
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
        bmp = bitmaps[lastGood];
        idx = lastGood;
        if (!isReady(bmp)) return;
      } else {
        lastGood = idx;
      }

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
      while (activeLoads < LOAD_CONCURRENCY && queue.length) {
        const index = queue.shift();
        if (index == null) break;
        if (bitmaps[index] || loading.has(index)) continue;

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

    const ensureAround = (center) => {
      enqueue(center, true);
      for (let d = 1; d <= PREFETCH; d += 1) {
        enqueue(center + d, d <= 4);
        enqueue(center - d, d <= 4);
      }
    };

    const tick = () => {
      rafId = 0;
      const target = readProgress() * (FRAME_COUNT - 1);
      const diff = target - currentFrame;

      if (Math.abs(diff) < 0.4) currentFrame = target;
      else currentFrame += diff * 0.6;

      const index = Math.min(
        FRAME_COUNT - 1,
        Math.max(0, Math.round(currentFrame))
      );

      ensureAround(index);
      if (ready) drawFrame(index);

      const moving = Math.abs(target - currentFrame) > 0.05;
      const busy = !bitmaps[index] || activeLoads > 0 || queue.length > 0;

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
    for (let i = 0; i < Math.min(28, FRAME_COUNT); i += 1) enqueue(i, i < 6);
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
