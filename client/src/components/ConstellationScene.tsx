import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";

export type ConstellationNode = {
  value: string;
  label: string;
  x: number;
  y: number;
  z: number;
  tone: string;
};

type ConstellationSceneProps = {
  nodes: ConstellationNode[];
  progress: number;
};

const links = [
  [0, 1],
  [0, 3],
  [0, 5],
  [1, 2],
  [1, 5],
  [2, 4],
  [2, 5],
  [3, 4],
  [3, 5],
  [4, 5],
];

function project(node: ConstellationNode, progress: number) {
  const theta = -0.7 + progress * 2.45;
  const phi = 0.34 + progress * 0.38;
  const x = (node.x - 50) / 50;
  const y = (node.y - 50) / 50;
  const z = (node.z - 5) / 7;
  const rotatedX = x * Math.cos(theta) - z * Math.sin(theta);
  const rotatedZ = x * Math.sin(theta) + z * Math.cos(theta);
  const tiltedY = y * Math.cos(phi) - rotatedZ * Math.sin(phi) * 0.42;
  const depth = (rotatedZ + 1.8) / 3.6;
  return {
    x: 50 + rotatedX * 38,
    y: 50 + tiltedY * 34,
    depth: Math.min(1, Math.max(0.05, depth)),
  };
}

export function ConstellationScene({ nodes, progress }: ConstellationSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [compact, setCompact] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const projected = useMemo(() => nodes.map((node) => project(node, progress)), [nodes, progress]);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 720px), (prefers-reduced-motion: reduce)");
    const update = () => setCompact(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || compact) return;
    const host = canvas.parentElement;
    if (!host) return;

    const paint = () => {
      const rect = host.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(rect.width * ratio);
      canvas.height = Math.floor(rect.height * ratio);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.scale(ratio, ratio);
      ctx.clearRect(0, 0, rect.width, rect.height);
      links.forEach(([from, to]) => {
        const a = projected[from];
        const b = projected[to];
        const isActiveLink = activeIndex !== null && (from === activeIndex || to === activeIndex);
        ctx.lineWidth = isActiveLink ? 2.25 : 1;
        const gradient = ctx.createLinearGradient((a.x / 100) * rect.width, (a.y / 100) * rect.height, (b.x / 100) * rect.width, (b.y / 100) * rect.height);
        gradient.addColorStop(0, `rgba(229, 255, 57, ${isActiveLink ? 0.88 : 0.1 + a.depth * 0.25})`);
        gradient.addColorStop(1, `rgba(124, 108, 255, ${isActiveLink ? 0.82 : 0.08 + b.depth * 0.25})`);
        ctx.strokeStyle = gradient;
        ctx.beginPath();
        ctx.moveTo((a.x / 100) * rect.width, (a.y / 100) * rect.height);
        ctx.lineTo((b.x / 100) * rect.width, (b.y / 100) * rect.height);
        ctx.stroke();
      });
    };

    paint();
    const observer = new ResizeObserver(paint);
    observer.observe(host);
    return () => observer.disconnect();
  }, [activeIndex, compact, projected]);

  return (
    <div className={`constellation ${compact ? "constellation--compact" : ""}`}>
      <canvas ref={canvasRef} className="constellation-lines" aria-hidden="true" />
      {nodes.map((node, index) => {
        const point = compact
          ? { x: node.x, y: node.y, depth: 0.72 }
          : projected[index];
        const isActive = activeIndex === index;
        const isFocus = isActive || point.depth > 0.62;
        return (
          <button
            key={node.label}
            type="button"
            aria-pressed={isActive}
            aria-label={`Focus ${node.value}: ${node.label}`}
            onPointerEnter={() => setActiveIndex(index)}
            onFocus={() => setActiveIndex(index)}
            onClick={() => setActiveIndex((current) => current === index ? null : index)}
            className={`constellation-node constellation-node--${node.tone} ${isFocus ? "is-focus" : ""} ${isActive ? "is-active" : ""}`}
            style={{
              left: `${point.x}%`,
              top: `${point.y}%`,
              "--depth": point.depth,
              "--delay": `${index * 80}ms`,
            } as CSSProperties}
          >
            <span className="constellation-node__dot" />
            <span className="constellation-node__value">{node.value}</span>
            <span className="constellation-node__label">{node.label}</span>
          </button>
        );
      })}
      <p className="constellation-orbit orbit-one">CONNECTED / NOT UNIFORM</p>
      <p className="constellation-orbit orbit-two">SIGNAL / SYSTEM / STORY</p>
    </div>
  );
}
