import { useEffect, useRef, useState } from "react";

type ScrollFrameSequenceProps = {
  frames: string[];
  progress: number;
  enabled?: boolean;
};

function drawFallback(ctx: CanvasRenderingContext2D, width: number, height: number, progress: number) {
  const p = Math.min(1, Math.max(0, progress));
  const cx = width * (0.56 - p * 0.09);
  const cy = height * 0.54;
  const size = Math.min(width, height) * 0.34;
  const turn = p < 0.52 ? p / 0.52 : 1;
  const step = p > 0.52 ? (p - 0.52) / 0.48 : 0;

  ctx.clearRect(0, 0, width, height);
  const ambient = ctx.createRadialGradient(width * 0.62, height * 0.33, 0, width * 0.62, height * 0.33, width * 0.62);
  ambient.addColorStop(0, "rgba(124,108,255,0.46)");
  ambient.addColorStop(0.43, "rgba(229,255,57,0.10)");
  ambient.addColorStop(1, "rgba(14,15,17,0)");
  ctx.fillStyle = ambient;
  ctx.fillRect(0, 0, width, height);

  ctx.save();
  ctx.translate(cx, cy + step * size * 0.24);
  ctx.rotate((-0.1 + turn * 0.18) * Math.PI);

  const shadow = ctx.createRadialGradient(0, size * 0.74, 0, 0, size * 0.74, size * 0.75);
  shadow.addColorStop(0, "rgba(0,0,0,0.7)");
  shadow.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = shadow;
  ctx.beginPath();
  ctx.ellipse(0, size * 0.76, size * 0.72, size * 0.14, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#1c1d23";
  ctx.beginPath();
  ctx.ellipse(size * (0.22 - turn * 0.22), -size * 0.47, size * (0.26 + turn * 0.08), size * 0.32, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#E5FF39";
  ctx.beginPath();
  ctx.ellipse(size * (0.23 - turn * 0.23), -size * 0.5, size * 0.16, size * 0.21, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#23242b";
  ctx.beginPath();
  ctx.moveTo(-size * 0.28, -size * 0.16);
  ctx.quadraticCurveTo(-size * 0.02, -size * 0.33, size * 0.27, -size * 0.16);
  ctx.lineTo(size * 0.5, size * 0.63);
  ctx.lineTo(-size * 0.46, size * 0.63);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = "#7C6CFF";
  ctx.lineWidth = Math.max(3, size * 0.025);
  ctx.beginPath();
  ctx.moveTo(-size * 0.15, -size * 0.1);
  ctx.quadraticCurveTo(size * 0.28, size * (0.15 + step * 0.22), size * (0.62 + step * 0.35), size * 0.08);
  ctx.stroke();

  ctx.strokeStyle = "#FF9F79";
  ctx.lineWidth = Math.max(2, size * 0.018);
  ctx.beginPath();
  ctx.moveTo(size * 0.03, size * 0.61);
  ctx.lineTo(-size * (0.12 + step * 0.11), size * 1.01);
  ctx.moveTo(size * 0.2, size * 0.61);
  ctx.lineTo(size * (0.33 + step * 0.13), size * 1.01);
  ctx.stroke();
  ctx.restore();
}

export function ScrollFrameSequence({ frames, progress, enabled = false }: ScrollFrameSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 720px), (prefers-reduced-motion: reduce)");
    const update = () => setIsCompact(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const container = canvas.parentElement;
    if (!container) return;

    const render = () => {
      const rect = container.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(rect.width * ratio));
      canvas.height = Math.max(1, Math.floor(rect.height * ratio));
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.scale(ratio, ratio);
      drawFallback(ctx, rect.width, rect.height, progress);

      if (isCompact || !enabled || frames.length === 0) return;
      const frameIndex = Math.min(frames.length - 1, Math.round(progress * (frames.length - 1)));
      const image = new Image();
      image.decoding = "async";
      image.onload = () => {
        const scale = Math.max(rect.width / image.width, rect.height / image.height);
        const drawWidth = image.width * scale;
        const drawHeight = image.height * scale;
        ctx.clearRect(0, 0, rect.width, rect.height);
        ctx.drawImage(image, (rect.width - drawWidth) / 2, (rect.height - drawHeight) / 2, drawWidth, drawHeight);
      };
      image.src = frames[frameIndex];
    };

    render();
    const observer = new ResizeObserver(render);
    observer.observe(container);
    return () => observer.disconnect();
  }, [enabled, frames, isCompact, progress]);

  return <canvas ref={canvasRef} aria-label="Character frame-sequence placeholder" className="frame-sequence-canvas" />;
}
