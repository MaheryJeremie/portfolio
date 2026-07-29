import { useEffect, useRef } from 'react';
import { publicUrl } from '../utils/publicUrl';

const FRAME_COUNT = 151;
const WINDOW = 20;
const EVICT_BEYOND = 32;

function framePath(i) {
  return publicUrl(`/animation/frames/frame-${String(i).padStart(3, '0')}.webp`);
}

function knockOutWhite(img) {
  const c = document.createElement('canvas');
  c.width = img.naturalWidth;
  c.height = img.naturalHeight;
  const x = c.getContext('2d', { willReadFrequently: true });
  if (!x) return img;
  x.drawImage(img, 0, 0);
  const imageData = x.getImageData(0, 0, c.width, c.height);
  const d = imageData.data;
  for (let i = 0; i < d.length; i += 4) {
    const r = d[i];
    const g = d[i + 1];
    const b = d[i + 2];
    const min = Math.min(r, g, b);
    const max = Math.max(r, g, b);
    const avg = (r + g + b) / 3;
    if (avg > 228 && max - min < 20) {
      d[i + 3] = 0;
    } else if (avg > 198 && max - min < 28) {
      const t = (avg - 198) / 30;
      d[i + 3] = Math.round(d[i + 3] * (1 - t));
    }
  }
  x.putImageData(imageData, 0, 0);
  return c;
}

function scheduleIdle(fn) {
  if (typeof requestIdleCallback === 'function') {
    return requestIdleCallback(fn, { timeout: 400 });
  }
  return setTimeout(fn, 0);
}

/**
 * Scroll-scrubbed image sequence. `progress` is 0–1 from the parent sticky track.
 */
export default function ScrollFrameAnim({ progress = 0, className = '' }) {
  const canvasRef = useRef(null);
  const stateRef = useRef({
    frames: new Array(FRAME_COUNT),
    loading: new Set(),
    currentFrame: 0,
    targetFrame: 0,
    ready: false,
    lastDrawn: -1,
    rafId: 0,
    ensureQueued: 0,
    isMobile: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const s = stateRef.current;
    s.isMobile = window.matchMedia('(max-width: 768px), (pointer: coarse)').matches;
    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
    if (!ctx) return undefined;

    const maxDpr = s.isMobile ? 1.25 : 1.5;

    function sourceSize(img) {
      return {
        w: img.naturalWidth || img.width || 0,
        h: img.naturalHeight || img.height || 0,
      };
    }

    function isReady(img) {
      if (!img) return false;
      if (img instanceof HTMLCanvasElement) return img.width > 0;
      return Boolean(img.complete && img.naturalWidth);
    }

    function drawFrame(index) {
      const { frames } = s;
      let idx = index;
      let img = frames[idx];

      if (!isReady(img)) {
        for (let d = 1; d <= WINDOW; d += 1) {
          const a = frames[idx - d];
          const b = frames[idx + d];
          if (isReady(a)) {
            idx = idx - d;
            img = a;
            break;
          }
          if (isReady(b)) {
            idx = idx + d;
            img = b;
            break;
          }
        }
        if (!isReady(img)) return;
      }

      if (idx === s.lastDrawn) return;
      s.lastDrawn = idx;

      const { w: iw, h: ih } = sourceSize(img);
      if (!iw || !ih) return;

      const cw = canvas.width;
      const ch = canvas.height;
      // contain — no hard crop that reads as a "cadre"
      const scale = Math.min(cw / iw, ch / ih);
      const w = iw * scale;
      const h = ih * scale;
      const x = (cw - w) / 2;
      const y = (ch - h) / 2;

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, x, y, w, h);
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
      const rect = canvas.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width * dpr));
      const h = Math.max(1, Math.floor(rect.height * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = s.isMobile ? 'medium' : 'high';
      s.lastDrawn = -1;
      if (s.ready) drawFrame(Math.round(s.currentFrame));
    }

    function loadFrame(index) {
      if (index < 0 || index >= FRAME_COUNT) return;
      if (s.frames[index] || s.loading.has(index)) return;

      s.loading.add(index);
      const img = new Image();
      img.decoding = 'async';
      img.onload = () => {
        s.loading.delete(index);
        // Show raw frame immediately (keeps scroll fluid)
        s.frames[index] = img;
        if (!s.ready && index === 0) {
          s.ready = true;
          resize();
        } else if (Math.round(s.currentFrame) === index) {
          s.lastDrawn = -1;
        }

        // Knock out studio white off the critical path
        scheduleIdle(() => {
          if (s.frames[index] !== img) return;
          try {
            s.frames[index] = knockOutWhite(img);
            if (Math.round(s.currentFrame) === index) s.lastDrawn = -1;
          } catch {
            /* keep raw image */
          }
        });
      };
      img.onerror = () => s.loading.delete(index);
      img.src = framePath(index + 1);
    }

    function evictFar(center) {
      for (let i = 0; i < FRAME_COUNT; i += 1) {
        if (!s.frames[i]) continue;
        if (Math.abs(i - center) > EVICT_BEYOND) {
          const f = s.frames[i];
          if (f instanceof HTMLImageElement) f.src = '';
          s.frames[i] = undefined;
        }
      }
    }

    function ensureAround(center) {
      const from = Math.max(0, center - WINDOW);
      const to = Math.min(FRAME_COUNT - 1, center + WINDOW);
      loadFrame(center);
      for (let d = 1; d <= WINDOW; d += 1) {
        if (center - d >= from) loadFrame(center - d);
        if (center + d <= to) loadFrame(center + d);
      }
      evictFar(center);
    }

    function scheduleEnsure(center) {
      if (s.ensureQueued) return;
      s.ensureQueued = requestAnimationFrame(() => {
        s.ensureQueued = 0;
        ensureAround(center);
      });
    }

    function tick() {
      const diff = s.targetFrame - s.currentFrame;
      s.currentFrame += diff * 0.22;
      if (Math.abs(diff) < 0.0015) s.currentFrame = s.targetFrame;

      const index = Math.min(
        FRAME_COUNT - 1,
        Math.max(0, Math.round(s.currentFrame))
      );
      scheduleEnsure(index);
      if (s.ready) drawFrame(index);
      s.rafId = requestAnimationFrame(tick);
    }

    resize();
    ensureAround(0);
    s.rafId = requestAnimationFrame(tick);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(s.rafId);
      if (s.ensureQueued) cancelAnimationFrame(s.ensureQueued);
      ro.disconnect();
      window.removeEventListener('resize', resize);
      s.frames.forEach((f) => {
        if (f instanceof HTMLImageElement) f.src = '';
      });
      s.frames = new Array(FRAME_COUNT);
      s.loading.clear();
      s.ready = false;
    };
  }, []);

  useEffect(() => {
    const s = stateRef.current;
    s.targetFrame = Math.min(1, Math.max(0, progress)) * (FRAME_COUNT - 1);
  }, [progress]);

  return (
    <canvas
      ref={canvasRef}
      className={`scroll-frame-anim ${className}`.trim()}
      aria-hidden="true"
    />
  );
}
