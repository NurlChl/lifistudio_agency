"use client";

import { useEffect, useRef } from "react";

// ─── 4 Service Categories ───
const SERVICES = [
  { label: "WEB DEV", color: "#9C6B5A", bg: "rgba(156,107,90,0.08)" },
  { label: "UI/UX", color: "#78716C", bg: "rgba(120,113,108,0.06)" },
  { label: "GRAPHIC", color: "#7A8C6A", bg: "rgba(122,140,106,0.08)" },
  { label: "AUTO", color: "#B8944A", bg: "rgba(184,148,74,0.07)" },
];

// ─── 3D Helpers ───
function project3D(x: number, y: number, z: number, w: number, h: number, scale: number, cx: number, cy: number) {
  const d = 5;
  const perspective = d / (d + z);
  return {
    x: x * perspective * scale + cx,
    y: y * perspective * scale + cy,
    z: z,
  };
}

function centroid(pts: ReturnType<typeof project3D>[]) {
  return pts.reduce((a, b) => ({ x: a.x + b.x, y: a.y + b.y, z: a.z + b.z }), { x: 0, y: 0, z: 0 });
}

function avgPts(pts: ReturnType<typeof project3D>[]) {
  const c = centroid(pts);
  return { x: c.x / pts.length, y: c.y / pts.length };
}

function rotateX(y: number, z: number, angle: number) {
  const c = Math.cos(angle), s = Math.sin(angle);
  return { y: y * c - z * s, z: y * s + z * c };
}

function rotateY(x: number, z: number, angle: number) {
  const c = Math.cos(angle), s = Math.sin(angle);
  return { x: x * c - z * s, z: x * s + z * c };
}

function rotateZ(x: number, y: number, angle: number) {
  const c = Math.cos(angle), s = Math.sin(angle);
  return { x: x * c - y * s, y: x * s + y * c };
}

function applyRotation(v: number[], rx: number, ry: number, rz: number) {
  let [x, y, z] = v;
  const ry_ = rotateY(x, z, ry);
  x = ry_.x; z = ry_.z;
  const rx_ = rotateX(y, z, rx);
  y = rx_.y; z = rx_.z;
  const rz_ = rotateZ(x, y, rz);
  return { x: rz_.x, y: rz_.y, z };
}

// ─── 4 Shapes ───

// Tetrahedron (4 faces)
function renderTetrahedron(ctx: CanvasRenderingContext2D, rx: number, ry: number, rz: number, w: number, h: number, scale: number, cx: number, cy: number) {
  const verts = [
    [1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1],
  ].map((v) => applyRotation(v, rx, ry, rz));
  const p = verts.map((v) => project3D(v.x, v.y, v.z, w, h, scale, cx, cy));
  const faces = [
    [0, 1, 2], [0, 1, 3], [0, 2, 3], [1, 2, 3],
  ];
  const service = SERVICES[0];
  const col = service.color;
  ctx.strokeStyle = col;
  ctx.lineWidth = 1.5;
  faces.forEach((f) => {
    const avg = avgPts([p[f[0]], p[f[1]], p[f[2]]]);
    ctx.beginPath();
    ctx.moveTo(p[f[0]].x, p[f[0]].y);
    ctx.lineTo(p[f[1]].x, p[f[1]].y);
    ctx.lineTo(p[f[2]].x, p[f[2]].y);
    ctx.closePath();
    ctx.fillStyle = service.bg;
    ctx.fill();
    ctx.stroke();
  });
  // Label
  const c = avgPts(p);
  ctx.fillStyle = SERVICES[0].color;
  ctx.font = "600 11px DM Sans, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(SERVICES[0].label, c.x, c.y + 28);
}

// Octahedron (8 faces)
function renderOctahedron(ctx: CanvasRenderingContext2D, rx: number, ry: number, rz: number, w: number, h: number, scale: number, cx: number, cy: number) {
  const verts = [
    [1, 0, 0], [-1, 0, 0], [0, 1, 0],
    [0, -1, 0], [0, 0, 1], [0, 0, -1],
  ].map((v) => applyRotation(v, rx, ry, rz));
  const p = verts.map((v) => project3D(v.x, v.y, v.z, w, h, scale, cx, cy));
  const faces = [
    [0, 2, 4], [0, 2, 5], [0, 3, 4], [0, 3, 5],
    [1, 2, 4], [1, 2, 5], [1, 3, 4], [1, 3, 5],
  ];
  ctx.strokeStyle = SERVICES[1].color;
  ctx.lineWidth = 1.5;
  faces.forEach((f) => {
    const pts = [p[f[0]], p[f[1]], p[f[2]]];
    const avg = avgPts(pts);
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    ctx.lineTo(pts[1].x, pts[1].y);
    ctx.lineTo(pts[2].x, pts[2].y);
    ctx.closePath();
    ctx.fillStyle = SERVICES[1].bg;
    ctx.fill();
    ctx.stroke();
  });
  const c = avgPts(p);
  ctx.fillStyle = SERVICES[1].color;
  ctx.font = "600 11px DM Sans, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(SERVICES[1].label, c.x, c.y + 28);
}

// Hexahedron / Cube (6 faces)
function renderHexahedron(ctx: CanvasRenderingContext2D, rx: number, ry: number, rz: number, w: number, h: number, scale: number, cx: number, cy: number) {
  const verts = [
    [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
    [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1],
  ].map((v) => applyRotation(v, rx, ry, rz));
  const p = verts.map((v) => project3D(v.x, v.y, v.z, w, h, scale, cx, cy));
  const faces = [
    [0, 1, 2, 3], [4, 5, 6, 7], [0, 1, 5, 4],
    [2, 3, 7, 6], [0, 3, 7, 4], [1, 2, 6, 5],
  ];
  ctx.strokeStyle = SERVICES[2].color;
  ctx.lineWidth = 1.5;
  faces.forEach((f) => {
    const pts = [p[f[0]], p[f[1]], p[f[2]], p[f[3]]];
    const avg = avgPts(pts);
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    ctx.lineTo(pts[1].x, pts[1].y);
    ctx.lineTo(pts[2].x, pts[2].y);
    ctx.lineTo(pts[3].x, pts[3].y);
    ctx.closePath();
    ctx.fillStyle = SERVICES[2].bg;
    ctx.fill();
    ctx.stroke();
  });
  const c = avgPts(p);
  ctx.fillStyle = SERVICES[2].color;
  ctx.font = "600 11px DM Sans, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(SERVICES[2].label, c.x, c.y + 28);
}

// Diamond (icosahedron reduced — 8 faces)
function renderDiamond(ctx: CanvasRenderingContext2D, rx: number, ry: number, rz: number, w: number, h: number, scale: number, cx: number, cy: number) {
  const verts = [
    [0, 1.8, 0], [0, -1.8, 0], [1.2, 0, 0.8],
    [-1.2, 0, 0.8], [1.2, 0, -0.8], [-1.2, 0, -0.8],
  ].map((v) => applyRotation(v, rx, ry, rz));
  const p = verts.map((v) => project3D(v.x, v.y, v.z, w, h, scale, cx, cy));
  const faces = [
    [0, 2, 3], [0, 3, 5], [0, 5, 4], [0, 4, 2],
    [1, 2, 3], [1, 3, 5], [1, 5, 4], [1, 4, 2],
  ];
  ctx.strokeStyle = SERVICES[3].color;
  ctx.lineWidth = 1.5;
  faces.forEach((f) => {
    const pts = [p[f[0]], p[f[1]], p[f[2]]];
    const avg = avgPts(pts);
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    ctx.lineTo(pts[1].x, pts[1].y);
    ctx.lineTo(pts[2].x, pts[2].y);
    ctx.closePath();
    ctx.fillStyle = SERVICES[3].bg;
    ctx.fill();
    ctx.stroke();
  });
  const c = avgPts(p);
  ctx.fillStyle = SERVICES[3].color;
  ctx.font = "600 11px DM Sans, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(SERVICES[3].label, c.x, c.y + 28);
}

// ─── Legend ───
function drawLegend(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const x = w / 2;
  const y = h / 2 + 130;
  ctx.font = "400 10px DM Sans, sans-serif";
  ctx.textAlign = "center";
  ctx.fillStyle = "rgba(92,85,76,0.4)";
  ctx.fillText("Web Dev · UI/UX · Graphic · Automation", x, y);
}

// ─── Orbits (each shape moves in a circle) ───
interface ShapeOrbit {
  render: (ctx: CanvasRenderingContext2D, rx: number, ry: number, rz: number, w: number, h: number, scale: number, cx: number, cy: number) => void;
  orbitRadius: number;
  orbitSpeed: number;
  angle: number;
  scale: number;
  rotSpeed: { x: number; y: number; z: number };
}

export default function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    const shapes: ShapeOrbit[] = [
      { render: renderTetrahedron, orbitRadius: 100, orbitSpeed: 0.003, angle: 0, scale: 60, rotSpeed: { x: 0.005, y: 0.01, z: 0.003 } },
      { render: renderOctahedron, orbitRadius: 130, orbitSpeed: 0.004, angle: 1.57, scale: 55, rotSpeed: { x: 0.007, y: 0.005, z: 0.004 } },
      { render: renderHexahedron, orbitRadius: 110, orbitSpeed: 0.005, angle: 3.14, scale: 58, rotSpeed: { x: 0.004, y: 0.008, z: 0.005 } },
      { render: renderDiamond, orbitRadius: 140, orbitSpeed: 0.0035, angle: 4.71, scale: 50, rotSpeed: { x: 0.006, y: 0.009, z: 0.002 } },
    ];

    let rx = 0, ry = 0, rz = 0;

    function resize() {
      const parent = canvas!.parentElement!;
      canvas!.width = parent.clientWidth * dpr;
      canvas!.height = parent.clientHeight * dpr;
      canvas!.style.width = `${parent.clientWidth}px`;
      canvas!.style.height = `${parent.clientHeight}px`;
      ctx!.setTransform(1, 0, 0, 1, 0, 0);
      ctx!.scale(dpr, dpr);
    }
    resize();
    window.addEventListener("resize", resize);

    function animate() {
      if (!ctx || !canvas) return;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      const cx = w / 2 + 60; // offset right so it frames text
      const cy = h / 2;

      ctx.clearRect(0, 0, w, h);

      shapes.forEach((s) => {
        s.angle += s.orbitSpeed;
        rx += s.rotSpeed.x;
        ry += s.rotSpeed.y;
        rz += s.rotSpeed.z;

        const ox = Math.cos(s.angle) * s.orbitRadius;
        const oy = Math.sin(s.angle) * s.orbitRadius * 0.5; // elliptical orbit (depth hint)

        ctx.save();
        ctx.translate(ox, oy);
        s.render(ctx, rx, ry, rz, w, h, s.scale, cx, cy);
        ctx.restore();
      });

      drawLegend(ctx, w, h);

      requestAnimationFrame(animate);
    }
    animate();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
}
