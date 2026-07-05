import { useRef, useCallback, useState, useEffect } from 'react';

interface UseFrameSequenceOptions {
  totalFrames: number;
  framePath: string;
  frameExt: string;
  bgColor: string;
}

interface UseFrameSequenceReturn {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  isLoaded: boolean;
  loadProgress: number;
  drawFrame: (index: number) => void;
  resizeCanvas: () => void;
}

function padNumber(n: number): string {
  return String(n).padStart(4, '0');
}

export function useFrameSequence({
  totalFrames,
  framePath,
  frameExt,
  bgColor,
}: UseFrameSequenceOptions): UseFrameSequenceReturn {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const framesRef = useRef<(HTMLImageElement | null)[]>([]);
  const lastDrawnRef = useRef(-1);

  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  // ── Canvas sizing (DPR-aware) ──────────────────────────────────
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;
    ctxRef.current = ctx;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Force redraw
    lastDrawnRef.current = -1;
  }, []);

  // ── Draw a specific frame ────────────────────────────────────────
  const drawFrame = useCallback(
    (index: number) => {
      if (index === lastDrawnRef.current) return;

      const ctx = ctxRef.current;
      if (!ctx) return;

      const w = window.innerWidth;
      const h = window.innerHeight;

      // Fill background
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, w, h);

      const img = framesRef.current[index];
      if (!img) return;

      // Calculate cover fit
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const viewRatio = w / h;

      let drawW: number, drawH: number, drawX: number, drawY: number;

      if (viewRatio > imgRatio) {
        drawW = w;
        drawH = w / imgRatio;
        drawX = 0;
        drawY = (h - drawH) / 2;
      } else {
        drawH = h;
        drawW = h * imgRatio;
        drawX = (w - drawW) / 2;
        drawY = 0;
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, drawX, drawY, drawW, drawH);
      lastDrawnRef.current = index;
    },
    [bgColor]
  );

  // ── Preload all frames ──────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    framesRef.current = new Array(totalFrames).fill(null);

    let loaded = 0;

    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      img.decoding = 'async';
      img.src = framePath + padNumber(i + 1) + frameExt;

      const onDone = () => {
        if (cancelled) return;
        loaded++;
        const pct = Math.round((loaded / totalFrames) * 100);
        setLoadProgress(pct);
        if (loaded === totalFrames) {
          setIsLoaded(true);
        }
      };

      img.onload = () => {
        framesRef.current[i] = img;
        onDone();
      };

      img.onerror = () => {
        console.warn(`Frame ${i + 1} failed to load`);
        onDone();
      };
    }

    return () => {
      cancelled = true;
    };
  }, [totalFrames, framePath, frameExt]);

  // ── Window resize listener ─────────────────────────────────────
  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [resizeCanvas]);

  return {
    canvasRef,
    isLoaded,
    loadProgress,
    drawFrame,
    resizeCanvas,
  };
}
