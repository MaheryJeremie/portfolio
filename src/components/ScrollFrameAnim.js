import { useEffect, useRef } from 'react';
import { publicUrl } from '../utils/publicUrl';

const FRAME_COUNT = 151;
/** Native frame size — used to pick resize targets without a first decode pass. */
const SRC_W = 960;
const SRC_H = 768;
const MAX_EDGE_DESKTOP = 720;
const MAX_EDGE_MOBILE = 480;
/** Parallel fetches; webps are ~15KB so bandwidth is fine. */
const LOAD_CONCURRENCY_DESKTOP = 14;
const LOAD_CONCURRENCY_MOBILE = 8;
const PREFETCH = 12;
/** Contiguous frames from 0 before scrub follows scroll freely. */
const BOOTSTRAP = 20;
/** Soft cap while bootstrapping so early scroll cannot thrash. */
const BOOTSTRAP_PLAY_CAP = 6;

function framePath(i) {
  return publicUrl(`/animation/frames/frame-${String(i).padStart(3, '0')}.webp`);
}

function targetSize(maxEdge) {
  const scale = Math.min(1, maxEdge / Math.max(SRC_W, SRC_H));
  return {
    rw: Math.max(1, Math.round(SRC_W * scale)),
    rh: Math.max(1, Math.round(SRC_H * scale)),
  };
}

/** Survives Strict Mode remounts — keyed by `${rw}x${rh}`. */
const frameCache = new Map();

function cacheKey(rw, rh) {
  return `${rw}x${rh}`;
}

function getCached(rw, rh, index) {
  return frameCache.get(cacheKey(rw, rh))?.[index] ?? null;
}

function setCached(rw, rh, index, bmp) {
  const key = cacheKey(rw, rh);
  let slot = frameCache.get(key);
  if (!slot) {
    slot = new Array(FRAME_COUNT);
    frameCache.set(key, slot);
  }
  slot[index] = bmp;
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
    const maxLoads = isMobile ? LOAD_CONCURRENCY_MOBILE : LOAD_CONCURRENCY_DESKTOP;
    const maxDpr = isMobile ? 1 : 1.25;
    const { rw, rh } = targetSize(maxEdge);

    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
    if (!ctx) return undefined;

    const bitmaps = new Array(FRAME_COUNT);
    for (let i = 0; i < FRAME_COUNT; i += 1) {
      const hit = getCached(rw, rh, i);
      if (hit) bitmaps[i] = hit;
    }
    const loading = new Set();
    /** Min-score first without full sort each pump. */
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

    const decodeBlob = async (blob) => {
      if (typeof createImageBitmap === 'function') {
        try {
          return await createImageBitmap(blob, {
            resizeWidth: rw,
            resizeHeight: rh,
            resizeQuality: 'low',
          });
        } catch {
          /* fall through */
        }
      }

      const url = URL.createObjectURL(blob);
      try {
        const img = await new Promise((resolve, reject) => {
          const el = new Image();
          el.onload = () => resolve(el);
          el.onerror = reject;
          el.src = url;
        });
        const c = document.createElement('canvas');
        c.width = rw;
        c.height = rh;
        c.getContext('2d').drawImage(img, 0, 0, rw, rh);
        return c;
      } finally {
        URL.revokeObjectURL(url);
      }
    };

    const takeNext = () => {
      if (!queue.length) return null;
      let best = 0;
      for (let i = 1; i < queue.length; i += 1) {
        if (queue[i].score < queue[best].score) best = i;
      }
      const [item] = queue.splice(best, 1);
      return item;
    };

    const pumpQueue = () => {
      while (activeLoads < maxLoads && queue.length) {
        const next = takeNext();
        if (!next) break;
        const { index } = next;
        if (bitmaps[index] || loading.has(index)) continue;
        startLoad(index);
      }
    };

    const startLoad = (index) => {
      loading.add(index);
      activeLoads += 1;

      fetch(framePath(index + 1), { credentials: 'same-origin' })
        .then((res) => {
          if (!res.ok) throw new Error(`frame ${index} ${res.status}`);
          return res.blob();
        })
        .then((blob) => {
          if (cancelled) return null;
          return decodeBlob(blob);
        })
        .then((bmp) => {
          if (!bmp) return;
          // Always keep decoded frames in the module cache (survives remount).
          setCached(rw, rh, index, bmp);
          if (cancelled) return;
          bitmaps[index] = bmp;
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
          if (!cancelled) {
            pumpQueue();
            kick();
          }
        });
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
        enqueue(center + d, d);
        enqueue(center - d, 100 + d);
      }
    };

    const tick = () => {
      rafId = 0;
      const targetRaw = readProgress() * (FRAME_COUNT - 1);

      const maxPlayable = !ready
        ? -1
        : bootstrapped
          ? Math.max(0, contiguous)
          : Math.min(Math.max(0, contiguous), BOOTSTRAP_PLAY_CAP);

      if (maxPlayable < 0) {
        enqueueRange(0, BOOTSTRAP + PREFETCH, 0);
        rafId = requestAnimationFrame(tick);
        return;
      }

      const target = Math.min(targetRaw, maxPlayable);

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
      // After bootstrap, background fetches must not pin an endless rAF loop.
      const needPump = !bootstrapped || catchingUp;

      if (moving || needPump) {
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
    refreshContiguous();
    if (contiguous >= 0) {
      ready = true;
      lastDrawn = -1;
      resize();
    }
    if (contiguous >= BOOTSTRAP - 1) bootstrapped = true;

    // Frame 0 first for instant paint, then fill bootstrap ascending.
    enqueue(0, -1000);
    enqueueRange(1, Math.min(FRAME_COUNT - 1, BOOTSTRAP + PREFETCH), 0);
    kick();

    // After first paint window, quietly fill the rest in the background.
    const idleFill = () => {
      if (cancelled || contiguous >= FRAME_COUNT - 1) return;
      enqueueRange(contiguous + 1, FRAME_COUNT - 1, 500);
    };
    let idleId = 0;
    if (typeof requestIdleCallback === 'function') {
      idleId = requestIdleCallback(idleFill, { timeout: 1200 });
    } else {
      idleId = window.setTimeout(idleFill, 400);
    }

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
      if (typeof cancelIdleCallback === 'function') cancelIdleCallback(idleId);
      else clearTimeout(idleId);
      ro.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      queue.length = 0;
      // Keep decoded bitmaps in frameCache for remounts; do not close them.
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
