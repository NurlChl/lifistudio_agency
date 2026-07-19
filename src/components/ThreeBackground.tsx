"use client";

import { useEffect, useRef } from "react";

export default function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let mounted = true;
    const ctx = canvas.getContext("2d")!;

    // Color palette from the site design
    const palette = {
      accent: "#D0603A",
      accentMuted: "rgba(208, 96, 58, 0.15)",
      stone: "rgba(120, 113, 108, 0.12)",
      cream: "rgba(245, 240, 235, 0.5)",
      white: "rgba(255, 255, 255, 0.4)",
    };

    // ─── Parametric 3D shapes (projected to 2D) ───

    interface Shape3D {
      vertices: { x: number; y: number; z: number }[];
      faces: number[][];
      color: string;
      stroke: string;
      centerX: number;
      centerY: number;
      scale: number;
      rotX: number;
      rotY: number;
      rotZ: number;
      speedX: number;
      speedY: number;
      speedZ: number;
      floatAmp: number;
      floatSpeed: number;
      phase: number;
    }

    function makeTetrahedron(cx: number, cy: number, s: number): Shape3D {
      const a = s / 2;
      return {
        vertices: [
          { x: 0, y: a * 1.5, z: 0 }, // top
          { x: -a, y: -a * 0.5, z: s }, // left-front
          { x: a, y: -a * 0.5, z: s }, // right-front
          { x: 0, y: -a * 0.5, z: -s }, // back
        ],
        faces: [[0, 1, 2], [0, 2, 3], [0, 3, 1], [1, 3, 2]],
        color: palette.accentMuted,
        stroke: palette.accent,
        centerX: cx, centerY: cy, scale: 1,
        rotX: 0, rotY: 0, rotZ: 0,
        speedX: 0.003, speedY: 0.005, speedZ: 0.002,
        floatAmp: 10, floatSpeed: 0.4, phase: Math.random() * Math.PI * 2,
      };
    }

    function makeOctahedron(cx: number, cy: number, s: number): Shape3D {
      const a = s / 2;
      return {
        vertices: [
          { x: 0, y: a, z: 0 }, { x: 0, y: -a, z: 0 },
          { x: a, y: 0, z: 0 }, { x: 0, y: 0, z: a },
          { x: -a, y: 0, z: 0 }, { x: 0, y: 0, z: -a },
        ],
        faces: [[0, 2, 3], [0, 3, 4], [0, 4, 5], [0, 5, 2],
                [1, 3, 2], [1, 4, 3], [1, 5, 4], [1, 2, 5]],
        color: palette.stone,
        stroke: "rgba(120, 113, 108, 0.3)",
        centerX: cx, centerY: cy, scale: 1,
        rotX: 0, rotY: 0, rotZ: 0,
        speedX: 0.004, speedY: -0.003, speedZ: 0.002,
        floatAmp: 8, floatSpeed: 0.3, phase: Math.random() * Math.PI * 2,
      };
    }

    function makeHexahedron(cx: number, cy: number, s: number): Shape3D {
      const a = s / 2;
      return {
        vertices: [
          { x: -a, y: -a, z: -a }, { x: -a, y: -a, z: a },
          { x: -a, y: a, z: -a }, { x: -a, y: a, z: a },
          { x: a, y: -a, z: -a }, { x: a, y: -a, z: a },
          { x: a, y: a, z: -a }, { x: a, y: a, z: a },
        ],
        faces: [[0, 1, 3, 2], [4, 6, 7, 5], [0, 2, 6, 4],
                [1, 5, 7, 3], [0, 4, 5, 1], [2, 3, 7, 6]],
        color: "rgba(208, 96, 58, 0.06)",
        stroke: "rgba(208, 96, 58, 0.2)",
        centerX: cx, centerY: cy, scale: 1,
        rotX: 0, rotY: 0, rotZ: 0,
        speedX: 0.002, speedY: 0.004, speedZ: -0.003,
        floatAmp: 5, floatSpeed: 0.35, phase: Math.random() * Math.PI * 2,
      };
    }

    function makeDiamond(cx: number, cy: number, s: number): Shape3D {
      const a = s / 2;
      return {
        vertices: [
          { x: 0, y: 0, z: a }, { x: 0, y: 0, z: -a },
          { x: 0, y: a, z: 0 }, { x: 0, y: -a, z: 0 },
          { x: a, y: 0, z: 0 }, { x: -a, y: 0, z: 0 },
        ],
        faces: [[0, 2, 4], [0, 4, 3], [0, 3, 5], [0, 5, 2],
                [1, 4, 2], [1, 3, 4], [1, 5, 3], [1, 2, 5]],
        color: palette.white,
        stroke: "rgba(255, 255, 255, 0.5)",
        centerX: cx, centerY: cy, scale: 1,
        rotX: 0, rotY: 0, rotZ: 0,
        speedX: -0.003, speedY: 0.002, speedZ: 0.005,
        floatAmp: 6, floatSpeed: 0.45, phase: Math.random() * Math.PI * 2,
      };
    }

    // ─── 3D projection ───
    function project(v: { x: number; y: number; z: number }, scale: number) {
      const fov = 400;
      const factor = fov / (fov + v.z * scale);
      return { x: v.x * scale * factor, y: v.y * scale * factor, z: v.z, factor };
    }

    function rotateX(v: { x: number; y: number; z: number }, angle: number) {
      const c = Math.cos(angle), s = Math.sin(angle);
      return { x: v.x, y: v.y * c - v.z * s, z: v.y * s + v.z * c };
    }
    function rotateY(v: { x: number; y: number; z: number }, angle: number) {
      const c = Math.cos(angle), s = Math.sin(angle);
      return { x: v.x * c + v.z * s, y: v.y, z: -v.x * s + v.z * c };
    }
    function rotateZ(v: { x: number; y: number; z: number }, angle: number) {
      const c = Math.cos(angle), s = Math.sin(angle);
      return { x: v.x * c - v.y * s, y: v.x * s + v.y * c, z: v.z };
    }

    // ─── Initialize shapes ───
    const shapes: Shape3D[] = [];

    function initShapes(w: number, h: number) {
      shapes.length = 0;
      const size = Math.min(w, h);
      const baseScale = size / 600;

      // Large tetrahedron — upper left area
      shapes.push(makeTetrahedron(w * 0.28, h * 0.3, 110 * baseScale));
      // Octahedron — upper right
      shapes.push(makeOctahedron(w * 0.75, h * 0.22, 80 * baseScale));
      // Cube — lower middle-left
      shapes.push(makeHexahedron(w * 0.35, h * 0.62, 70 * baseScale));
      // Diamond — lower right
      shapes.push(makeDiamond(w * 0.7, h * 0.55, 60 * baseScale));
      // Small tetrahedron — floating
      shapes.push(makeTetrahedron(w * 0.58, h * 0.4, 50 * baseScale));
    }

    // ─── Animation loop ───
    let animId: number;
    let time = 0;

    function render(t: number) {
      if (!mounted) return;
      time = t * 0.001;

      const rect = canvas.getBoundingClientRect();
      const w = canvas.width = rect.width * devicePixelRatio;
      const h = canvas.height = rect.height * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
      const cw = rect.width, ch = rect.height;

      if (shapes.length === 0) initShapes(cw, ch);

      ctx.clearRect(0, 0, cw, ch);

      // Draw subtle radial gradient background hint
      const grad = ctx.createRadialGradient(cw * 0.5, ch * 0.5, 0, cw * 0.5, ch * 0.5, cw * 0.6);
      grad.addColorStop(0, "rgba(208, 96, 58, 0.03)");
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, cw, ch);

      // Render each shape
      for (const shape of shapes) {
        // Rotation
        shape.rotX += shape.speedX;
        shape.rotY += shape.speedY;
        shape.rotZ += shape.speedZ;

        // Floating
        const floatOffset = Math.sin(time * shape.floatSpeed + shape.phase) * shape.floatAmp;

        const cx = shape.centerX;
        const cy = shape.centerY + floatOffset;
        const s = shape.scale * (Math.min(cw, ch) / 700);

        // Transform and project vertices
        const projected = shape.vertices.map((v) => {
          let p = rotateX(v, shape.rotX);
          p = rotateY(p, shape.rotY);
          p = rotateZ(p, shape.rotZ);
          return project(p, s);
        });

        // Sort faces by average depth (painter's algorithm)
        const sortedFaces = shape.faces
          .map((face) => ({
            indices: face,
            depth: face.reduce((sum, i) => sum + projected[i].z, 0) / face.length,
          }))
          .sort((a, b) => a.depth - b.depth);

        // Draw faces
        ctx.lineWidth = 0.8;

        for (const { indices } of sortedFaces) {
          const pts = indices.map((i) => ({
            x: cx + projected[i].x,
            y: cy + projected[i].y,
          }));

          ctx.beginPath();
          ctx.moveTo(pts[0].x, pts[0].y);
          for (let i = 1; i < pts.length; i++) {
            ctx.lineTo(pts[i].x, pts[i].y);
          }
          ctx.closePath();
          ctx.fillStyle = shape.color;
          ctx.fill();
          ctx.strokeStyle = shape.stroke;
          ctx.stroke();
        }
      }

      animId = requestAnimationFrame(render);
    }

    function resizeHandler() {
      // Resize handled in render loop
    }
    window.addEventListener("resize", resizeHandler);

    animId = requestAnimationFrame(render);

    return () => {
      mounted = false;
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
      style={{ pointerEvents: "none" }}
    />
  );
}
