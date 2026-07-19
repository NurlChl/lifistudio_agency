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

// ─── 4 Custom Relevant Shapes ───

// 1. Web Development: VS Code editor window outline with code lines
function renderVSCode(ctx: CanvasRenderingContext2D, rx: number, ry: number, rz: number, w: number, h: number, scale: number, cx: number, cy: number) {
  const verts = [
    [-1, -0.7, 0], [1, -0.7, 0], [1, 0.7, 0], [-1, 0.7, 0], // Outer window
    [-0.65, -0.7, 0], [-0.65, 0.7, 0], // Sidebar divider
  ];
  
  const codeLines = [
    { y: -0.4, x1: -0.45, x2: 0.1, color: "#9C6B5A" },
    { y: -0.2, x1: -0.45, x2: 0.6, color: "#d0603a" },
    { y: 0.0, x1: -0.25, x2: 0.4, color: "#9C6B5A" },
    { y: 0.2, x1: -0.25, x2: 0.15, color: "#b8944a" },
    { y: 0.4, x1: -0.45, x2: 0.35, color: "#9C6B5A" },
  ];
  
  const rotatedVerts = verts.map(v => applyRotation(v, rx, ry, rz));
  const p = rotatedVerts.map(v => project3D(v.x, v.y, v.z, w, h, scale, cx, cy));
  
  ctx.strokeStyle = SERVICES[0].color;
  ctx.lineWidth = 1.3;
  
  // Draw outer window
  ctx.beginPath();
  ctx.moveTo(p[0].x, p[0].y);
  ctx.lineTo(p[1].x, p[1].y);
  ctx.lineTo(p[2].x, p[2].y);
  ctx.lineTo(p[3].x, p[3].y);
  ctx.closePath();
  ctx.fillStyle = SERVICES[0].bg;
  ctx.fill();
  ctx.stroke();
  
  // Draw sidebar
  ctx.beginPath();
  ctx.moveTo(p[4].x, p[4].y);
  ctx.lineTo(p[5].x, p[5].y);
  ctx.stroke();

  // Draw close/minimize window dots in top-left sidebar area
  const dots = [ [-0.85, -0.55], [-0.77, -0.55] ];
  dots.forEach(d => {
    const pt = applyRotation([d[0], d[1], 0], rx, ry, rz);
    const proj = project3D(pt.x, pt.y, pt.z, w, h, scale, cx, cy);
    ctx.beginPath();
    ctx.arc(proj.x, proj.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = SERVICES[0].color + "80";
    ctx.fill();
  });
  
  // Draw code lines inside VS Code
  codeLines.forEach(line => {
    const pt1 = applyRotation([line.x1, line.y, 0], rx, ry, rz);
    const pt2 = applyRotation([line.x2, line.y, 0], rx, ry, rz);
    const p1 = project3D(pt1.x, pt1.y, pt1.z, w, h, scale, cx, cy);
    const p2 = project3D(pt2.x, pt2.y, pt2.z, w, h, scale, cx, cy);
    
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.strokeStyle = line.color;
    ctx.lineWidth = 2.5;
    ctx.stroke();
  });
  
  const c = avgPts(p.slice(0, 4));
  ctx.fillStyle = SERVICES[0].color;
  ctx.font = "600 11px DM Sans, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(SERVICES[0].label, c.x, c.y + scale + 15);
}

// 2. UI/UX Design: Figma Canvas/Layout window outline with sidebars, artboard, and mouse cursor
function renderFigma(ctx: CanvasRenderingContext2D, rx: number, ry: number, rz: number, w: number, h: number, scale: number, cx: number, cy: number) {
  const verts = [
    [-1, -0.7, 0], [1, -0.7, 0], [1, 0.7, 0], [-1, 0.7, 0], // Outer window
    [-0.6, -0.7, 0], [-0.6, 0.7, 0], // Left layers panel
    [0.6, -0.7, 0], [0.6, 0.7, 0], // Right inspector panel
    [-0.35, -0.4, 0], [0.35, -0.4, 0], [0.35, 0.4, 0], [-0.35, 0.4, 0], // Center design canvas frame
  ];
  
  const rotated = verts.map(v => applyRotation(v, rx, ry, rz));
  const p = rotated.map(v => project3D(v.x, v.y, v.z, w, h, scale, cx, cy));
  
  ctx.strokeStyle = SERVICES[1].color;
  ctx.lineWidth = 1.2;
  
  // Draw outer figma window
  ctx.beginPath();
  ctx.moveTo(p[0].x, p[0].y);
  ctx.lineTo(p[1].x, p[1].y);
  ctx.lineTo(p[2].x, p[2].y);
  ctx.lineTo(p[3].x, p[3].y);
  ctx.closePath();
  ctx.fillStyle = SERVICES[1].bg;
  ctx.fill();
  ctx.stroke();
  
  // Draw side panel dividers
  ctx.beginPath();
  ctx.moveTo(p[4].x, p[4].y);
  ctx.lineTo(p[5].x, p[5].y);
  ctx.moveTo(p[6].x, p[6].y);
  ctx.lineTo(p[7].x, p[7].y);
  ctx.stroke();
  
  // Draw central artboard canvas
  ctx.beginPath();
  ctx.moveTo(p[8].x, p[8].y);
  ctx.lineTo(p[9].x, p[9].y);
  ctx.lineTo(p[10].x, p[10].y);
  ctx.lineTo(p[11].x, p[11].y);
  ctx.closePath();
  ctx.fillStyle = "rgba(120,113,108,0.12)";
  ctx.fill();
  ctx.stroke();
  
  // Draw wireframe circle element inside figma canvas
  const centerPt = applyRotation([0, 0, 0], rx, ry, rz);
  const cp = project3D(centerPt.x, centerPt.y, centerPt.z, w, h, scale, cx, cy);
  ctx.beginPath();
  ctx.arc(cp.x, cp.y, scale * 0.18, 0, Math.PI * 2);
  ctx.stroke();
  
  // Draw designer select cursor symbol pointing to circle
  const cursorPt = applyRotation([0.16, 0.16, 0], rx, ry, rz);
  const curP = project3D(cursorPt.x, cursorPt.y, cursorPt.z, w, h, scale, cx, cy);
  ctx.beginPath();
  ctx.moveTo(curP.x, curP.y);
  ctx.lineTo(curP.x + 8, curP.y + 2);
  ctx.lineTo(curP.x + 3, curP.y + 4);
  ctx.closePath();
  ctx.fillStyle = SERVICES[1].color;
  ctx.fill();
  
  const c = avgPts(p.slice(0, 4));
  ctx.fillStyle = SERVICES[1].color;
  ctx.font = "600 11px DM Sans, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(SERVICES[1].label, c.x, c.y + scale + 15);
}

// 3. Graphic Design & Creativity: Pen Tool Bezier Curve with anchor points and handle bars
function renderVectorPath(ctx: CanvasRenderingContext2D, rx: number, ry: number, rz: number, w: number, h: number, scale: number, cx: number, cy: number) {
  const pts = [
    [-0.85, -0.2, 0],  // A1
    [0.0, 0.25, 0],     // A2
    [0.85, -0.3, 0],    // A3
    [-0.3, 0.5, 0],    // H1 (left handle of A2)
    [0.3, 0.0, 0]      // H2 (right handle of A2)
  ].map(v => applyRotation(v, rx, ry, rz));
  
  const p = pts.map(v => project3D(v.x, v.y, v.z, w, h, scale, cx, cy));
  
  ctx.strokeStyle = SERVICES[2].color;
  ctx.lineWidth = 1.6;
  
  // Draw curve approximation (A1 to A2 using handle H1, and A2 to A3 using handle H2)
  ctx.beginPath();
  ctx.moveTo(p[0].x, p[0].y);
  ctx.quadraticCurveTo(p[3].x, p[3].y, p[1].x, p[1].y);
  ctx.quadraticCurveTo(p[4].x, p[4].y, p[2].x, p[2].y);
  ctx.stroke();
  
  // Draw handle bars (lines from A2 to H1, H2)
  ctx.beginPath();
  ctx.moveTo(p[1].x, p[1].y);
  ctx.lineTo(p[3].x, p[3].y);
  ctx.moveTo(p[1].x, p[1].y);
  ctx.lineTo(p[4].x, p[4].y);
  ctx.strokeStyle = SERVICES[2].color + "60";
  ctx.lineWidth = 1;
  ctx.stroke();
  
  // Draw handle points (circles)
  [p[3], p[4]].forEach(pt => {
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, 3, 0, Math.PI * 2);
    ctx.fillStyle = SERVICES[2].color;
    ctx.fill();
  });
  
  // Draw anchor points (square vector anchors)
  ctx.fillStyle = "#fafaf8";
  ctx.strokeStyle = SERVICES[2].color;
  ctx.lineWidth = 1.5;
  [p[0], p[1], p[2]].forEach(pt => {
    ctx.beginPath();
    ctx.rect(pt.x - 3.5, pt.y - 3.5, 7, 7);
    ctx.fill();
    ctx.stroke();
  });
  
  const c = p[1];
  ctx.fillStyle = SERVICES[2].color;
  ctx.font = "600 11px DM Sans, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(SERVICES[2].label, c.x, c.y + scale + 15);
}

// 4. Automation: Connected flowchart workflow pipelines (Trigger -> Process -> Action)
function renderFlowchart(ctx: CanvasRenderingContext2D, rx: number, ry: number, rz: number, w: number, h: number, scale: number, cx: number, cy: number) {
  ctx.strokeStyle = SERVICES[3].color;
  ctx.lineWidth = 1.3;
  
  // Helper to draw projected workflow boxes
  const drawBox = (cx_val: number, cy_val: number, w_val: number, h_val: number, shape: "rect" | "diamond") => {
    const localVerts = shape === "rect" ? [
      [cx_val - w_val/2, cy_val - h_val/2, 0],
      [cx_val + w_val/2, cy_val - h_val/2, 0],
      [cx_val + w_val/2, cy_val + h_val/2, 0],
      [cx_val - w_val/2, cy_val + h_val/2, 0]
    ] : [
      [cx_val, cy_val - h_val/2, 0],
      [cx_val + w_val/2, cy_val, 0],
      [cx_val, cy_val + h_val/2, 0],
      [cx_val - w_val/2, cy_val, 0]
    ];
    
    const rotated = localVerts.map(v => applyRotation(v, rx, ry, rz));
    const p = rotated.map(v => project3D(v.x, v.y, v.z, w, h, scale, cx, cy));
    
    ctx.beginPath();
    ctx.moveTo(p[0].x, p[0].y);
    p.forEach(pt => ctx.lineTo(pt.x, pt.y));
    ctx.closePath();
    ctx.fillStyle = SERVICES[3].bg;
    ctx.fill();
    ctx.stroke();
    
    return p;
  };
  
  const pLeft = drawBox(-0.75, 0, 0.38, 0.38, "rect");
  const pMid = drawBox(0, 0, 0.44, 0.44, "diamond");
  const pRight = drawBox(0.75, 0, 0.38, 0.38, "rect");
  
  // Draw connection arrows between boxes
  const pL_right = pLeft[1];
  const pM_left = pMid[3];
  ctx.beginPath();
  ctx.moveTo(pL_right.x, pL_right.y);
  ctx.lineTo(pM_left.x, pM_left.y);
  ctx.stroke();
  
  const pM_right = pMid[1];
  const pR_left = pRight[0];
  ctx.beginPath();
  ctx.moveTo(pM_right.x, pM_right.y);
  ctx.lineTo(pR_left.x, pR_left.y);
  ctx.stroke();
  
  // Connection nodes/circle sockets
  [pL_right, pM_left, pM_right, pR_left].forEach(pt => {
    ctx.beginPath();
    ctx.arc(pt.x, pt.y, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = SERVICES[3].color;
    ctx.fill();
  });
  
  const c = pMid[0];
  ctx.fillStyle = SERVICES[3].color;
  ctx.font = "600 11px DM Sans, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(SERVICES[3].label, c.x, c.y + scale + 25);
}

// ─── Legend ───
function drawLegend(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const x = w / 2;
  const y = h - 25;
  ctx.font = "400 10px DM Sans, sans-serif";
  ctx.textAlign = "center";
  ctx.fillStyle = "rgba(92,85,76,0.3)";
  ctx.fillText("Code editor · Figma canvas · Vector paths · Workflows", x, y);
}

export default function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let animationFrameId: number;

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

      ctx.clearRect(0, 0, w, h);

      const time = Date.now() * 0.0015;

      // Gentle oscillation/tilt for 3D perspective (keeps shapes front-facing and highly readable)
      const rx = Math.sin(time * 0.3) * 0.15;   // tilt X (-8 to +8 deg)
      const ry = Math.cos(time * 0.25) * 0.3;   // tilt Y (-17 to +17 deg)
      const rz = Math.sin(time * 0.15) * 0.06;  // tilt Z (-3 to +3 deg)

      // Spacing out: Let each of the 4 shapes hover independently in its own quadrant center!
      // This completely utilizes the top, bottom, left, and right areas of the canvas.
      
      // 1. Web Dev (VS Code) - Top-Left
      const cx1 = w * 0.28 + Math.cos(time * 0.8) * 12;
      const cy1 = h * 0.28 + Math.sin(time * 0.8 * 1.2) * 12;
      renderVSCode(ctx, rx, ry, rz, w, h, 52, cx1, cy1);

      // 2. UI/UX (Figma) - Top-Right
      const cx2 = w * 0.72 + Math.cos(time * 0.7 + 1) * 12;
      const cy2 = h * 0.28 + Math.sin(time * 0.7 * 1.3 + 1) * 12;
      renderFigma(ctx, rx, ry, rz, w, h, 52, cx2, cy2);

      // 3. Graphic Design (Pen Tool Curve) - Bottom-Left
      const cx3 = w * 0.28 + Math.cos(time * 0.9 + 2) * 12;
      const cy3 = h * 0.72 + Math.sin(time * 0.9 * 1.1 + 2) * 12;
      renderVectorPath(ctx, rx, ry, rz, w, h, 50, cx3, cy3);

      // 4. Automation (Flowchart diagram) - Bottom-Right
      const cx4 = w * 0.72 + Math.cos(time * 0.75 + 3) * 12;
      const cy4 = h * 0.72 + Math.sin(time * 0.75 * 1.4 + 3) * 12;
      renderFlowchart(ctx, rx, ry, rz, w, h, 50, cx4, cy4);

      drawLegend(ctx, w, h);

      animationFrameId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
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
