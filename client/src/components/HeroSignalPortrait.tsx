import { useEffect, useRef } from "react";

type HeroSignalPortraitProps = {
  active: boolean;
  offset: { x: number; y: number };
  progress: number;
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export function HeroSignalPortrait({ active, offset, progress }: HeroSignalPortraitProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const host = canvas.parentElement;
    if (!host) return;

    const paint = () => {
      const rect = host.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(rect.width * ratio));
      canvas.height = Math.max(1, Math.floor(rect.height * ratio));
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      ctx.clearRect(0, 0, rect.width, rect.height);

      const w = rect.width;
      const h = rect.height;
      const motion = clamp(progress, 0, 1);
      const shiftX = offset.x * 2.2;
      const shiftY = offset.y * 1.7;
      const cx = w * 0.7 + shiftX;
      const cy = h * 0.5 + shiftY;
      const scale = Math.min(w, h) * 0.52;

      const background = ctx.createLinearGradient(0, 0, w, h);
      background.addColorStop(0, "#0b0d12");
      background.addColorStop(0.52, "#11131a");
      background.addColorStop(1, "#1c1718");
      ctx.fillStyle = background;
      ctx.fillRect(0, 0, w, h);

      const haze = ctx.createRadialGradient(w * 0.77, h * 0.69, 0, w * 0.77, h * 0.69, w * 0.65);
      haze.addColorStop(0, active ? "rgba(255,159,121,0.42)" : "rgba(255,159,121,0.26)");
      haze.addColorStop(0.44, "rgba(124,108,255,0.12)");
      haze.addColorStop(1, "rgba(14,15,17,0)");
      ctx.fillStyle = haze;
      ctx.fillRect(0, 0, w, h);

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate((-0.1 + motion * 0.16) * Math.PI);

      [0.56, 0.79, 1.02].forEach((size, index) => {
        ctx.strokeStyle = index === 1 ? "rgba(124,108,255,0.72)" : "rgba(124,108,255,0.32)";
        ctx.lineWidth = index === 1 ? 1.6 : 1;
        ctx.setLineDash(index === 1 ? [8, 13] : [2, 18]);
        ctx.beginPath();
        ctx.ellipse(scale * 0.08, -scale * 0.07, scale * size, scale * size * 0.38, index * 0.18, 0, Math.PI * 2);
        ctx.stroke();
      });
      ctx.setLineDash([]);

      const horizon = ctx.createLinearGradient(-scale, scale * 0.62, scale, scale * 0.62);
      horizon.addColorStop(0, "rgba(255,159,121,0)");
      horizon.addColorStop(0.58, "rgba(255,159,121,0.75)");
      horizon.addColorStop(1, "rgba(229,255,57,0)");
      ctx.strokeStyle = horizon;
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(-scale * 1.25, scale * 0.64);
      ctx.quadraticCurveTo(0, scale * (0.58 + motion * 0.1), scale * 1.25, scale * 0.64);
      ctx.stroke();

      const shoulderGradient = ctx.createLinearGradient(-scale * 0.62, -scale * 0.1, scale * 0.72, scale * 1.1);
      shoulderGradient.addColorStop(0, "#161920");
      shoulderGradient.addColorStop(0.45, "#303541");
      shoulderGradient.addColorStop(0.7, "#101218");
      shoulderGradient.addColorStop(1, "#07080b");
      ctx.fillStyle = shoulderGradient;
      ctx.beginPath();
      ctx.moveTo(-scale * 0.45, scale * 0.83);
      ctx.quadraticCurveTo(-scale * 0.58, scale * 0.15, -scale * 0.19, -scale * 0.02);
      ctx.quadraticCurveTo(scale * 0.08, -scale * 0.18, scale * 0.42, scale * 0.08);
      ctx.lineTo(scale * 0.76, scale * 0.9);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = "rgba(229,255,57,0.38)";
      ctx.lineWidth = Math.max(1.5, scale * 0.012);
      ctx.beginPath();
      ctx.moveTo(-scale * 0.32, scale * 0.08);
      ctx.quadraticCurveTo(scale * 0.08, scale * 0.3, scale * 0.58, scale * 0.87);
      ctx.stroke();

      ctx.fillStyle = "#1b1d26";
      ctx.beginPath();
      ctx.ellipse(scale * 0.04, -scale * 0.43, scale * 0.24, scale * 0.31, 0.18, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#2c2f38";
      ctx.beginPath();
      ctx.moveTo(-scale * 0.18, -scale * 0.38);
      ctx.quadraticCurveTo(scale * 0.02, -scale * 0.75, scale * 0.27, -scale * 0.49);
      ctx.lineTo(scale * 0.18, -scale * 0.29);
      ctx.quadraticCurveTo(0, -scale * 0.38, -scale * 0.18, -scale * 0.38);
      ctx.fill();

      ctx.fillStyle = "#cfd0c7";
      ctx.beginPath();
      ctx.roundRect(-scale * 0.16, -scale * 0.49, scale * 0.42, scale * 0.12, scale * 0.05);
      ctx.fill();
      ctx.strokeStyle = "rgba(124,108,255,0.95)";
      ctx.lineWidth = Math.max(1, scale * 0.009);
      ctx.stroke();

      const orbX = scale * 0.41;
      const orbY = scale * 0.08;
      const orbSize = scale * (active ? 0.19 : 0.15);
      const orbGlow = ctx.createRadialGradient(orbX, orbY, 0, orbX, orbY, orbSize * 4.4);
      orbGlow.addColorStop(0, active ? "rgba(229,255,57,0.95)" : "rgba(229,255,57,0.68)");
      orbGlow.addColorStop(0.18, "rgba(229,255,57,0.42)");
      orbGlow.addColorStop(1, "rgba(229,255,57,0)");
      ctx.fillStyle = orbGlow;
      ctx.beginPath();
      ctx.arc(orbX, orbY, orbSize * 4.4, 0, Math.PI * 2);
      ctx.fill();
      const orbCore = ctx.createRadialGradient(orbX - orbSize * 0.25, orbY - orbSize * 0.32, orbSize * 0.03, orbX, orbY, orbSize);
      orbCore.addColorStop(0, "#fbffd8");
      orbCore.addColorStop(0.25, "#e5ff39");
      orbCore.addColorStop(0.72, "#778a17");
      orbCore.addColorStop(1, "#1a1d0a");
      ctx.fillStyle = orbCore;
      ctx.beginPath();
      ctx.arc(orbX, orbY, orbSize, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(245,240,228,0.8)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(orbX, orbY, orbSize, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      const shade = ctx.createLinearGradient(0, 0, w, 0);
      shade.addColorStop(0, "rgba(14,15,17,0.18)");
      shade.addColorStop(0.48, "rgba(14,15,17,0)");
      shade.addColorStop(1, "rgba(14,15,17,0.15)");
      ctx.fillStyle = shade;
      ctx.fillRect(0, 0, w, h);
    };

    paint();
    const observer = new ResizeObserver(paint);
    observer.observe(host);
    return () => observer.disconnect();
  }, [active, offset, progress]);

  return <canvas ref={canvasRef} className="hero-signal-canvas" aria-label="Original interactive signal portrait" />;
}
