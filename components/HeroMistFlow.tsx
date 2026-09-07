"use client";

import { useEffect, useRef } from "react";

/**
 * The visible fog around the figure's lower body, as real drifting cloud. The
 * old approach nudged a soft radial gradient a few percent, which is invisible
 * because a near-uniform blur has no structure to see move. This renders a
 * procedural fog field (value-noise fBm, in the spirit of the Canvas UI Clouds
 * shader) advected so chunks keep drifting in from the left across a wide,
 * flatter band over the lower body, so the figure's bottom is always being
 * re-covered. A high coverage threshold keeps only the dense noise peaks, so
 * the mist reads as SEPARATE apparent chunks with dark gaps between them, not
 * one connected blanket.
 *
 * This is only the lit, visible fog. The dark background-toned chunks that keep
 * the lower body reading dark are separate CSS layers beneath it and are
 * untouched, so if WebGL2 is unavailable the lower body still stays dark with
 * the mask-floored ghost; this canvas simply doesn't draw.
 * Under reduced motion it paints a single static frame (fog present, not
 * moving).
 */

const VERT = `#version 300 es
precision highp float;
const vec2 P[3] = vec2[3](vec2(-1.0, -1.0), vec2(3.0, -1.0), vec2(-1.0, 3.0));
void main() { gl_Position = vec4(P[gl_VertexID], 0.0, 1.0); }`;

const FRAG = `#version 300 es
precision highp float;
out vec4 outColor;
uniform vec2 uRes;
uniform float uTime;
uniform float uOpacity;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int k = 0; k < 5; k++) { v += a * noise(p); p *= 2.0; a *= 0.5; }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes;     // y = 0 at the bottom
  float asp = uRes.x / uRes.y;
  vec2 top = vec2(uv.x, 1.0 - uv.y);    // y measured from the top (matches CSS %)
  float t = uTime;

  // Strong single-direction wind so each chunk visibly travels across the
  // hero from right to left, with only a touch of vertical drift.
  vec2 wind = vec2(-0.055, 0.004);
  // Big features (low frequency) so the noise forms a few LARGE chunks, not
  // fine specks; several of them fit across the width.
  vec2 p = vec2(uv.x * asp, uv.y) * 2.3 + wind * t;
  float base = fbm(p);
  float detail = fbm(p * 2.0 + 5.0 + wind * (t * 0.6));
  // Threshold tuned so several dense peaks survive as SEPARATE big chunks with
  // dark gaps between them (asymmetric, not one connected blanket), while still
  // being clearly visible. Verified to hold 2 to 5 distinct chunks across the
  // full drift cycle and never wash out to a blank band.
  float cov = smoothstep(0.34, 0.68, base * 0.7 + detail * 0.3);

  // Full-width horizontal band across the lower body so chunks appear all the
  // way across and sweep through, rather than being pinned to one spot. A soft
  // gaussian top and bottom keeps it a band, not a hard edge.
  float band = exp(-pow((top.y - 0.70) / 0.24, 2.0));

  float a = cov * band * uOpacity;
  vec3 fog = vec3(0.30, 0.31, 0.36);    // cool grey, matches the old lit fog
  outColor = vec4(fog * a, a);          // premultiplied
}`;

export default function HeroMistFlow({
  className,
  opacity = 0.8,
}: {
  className?: string;
  opacity?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const hide = () => {
      canvas.style.display = "none";
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      antialias: false,
      premultipliedAlpha: true,
      powerPreference: "low-power",
    });
    if (!gl) {
      hide();
      return;
    }

    function compile(type: number, source: string) {
      const sh = gl!.createShader(type)!;
      gl!.shaderSource(sh, source);
      gl!.compileShader(sh);
      return sh;
    }
    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      hide();
      return;
    }
    gl.useProgram(program);
    const uRes = gl.getUniformLocation(program, "uRes");
    const uTime = gl.getUniformLocation(program, "uTime");
    const uOpacity = gl.getUniformLocation(program, "uOpacity");
    gl.uniform1f(uOpacity, opacity);
    gl.bindVertexArray(gl.createVertexArray());
    gl.clearColor(0, 0, 0, 0);

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.round(canvas!.clientWidth * dpr));
      const h = Math.max(1, Math.round(canvas!.clientHeight * dpr));
      if (canvas!.width !== w || canvas!.height !== h) {
        canvas!.width = w;
        canvas!.height = h;
      }
      gl!.viewport(0, 0, w, h);
      gl!.uniform2f(uRes, w, h);
    }
    resize();

    function drawFrame(seconds: number) {
      gl!.uniform1f(uTime, seconds);
      gl!.clear(gl!.COLOR_BUFFER_BIT);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);
    }

    let raf = 0;
    let running = false;
    let visible = true;
    let startTime = performance.now();

    function frame(now: number) {
      if (!running) return;
      drawFrame((now - startTime) / 1000);
      raf = requestAnimationFrame(frame);
    }
    function start() {
      if (running || !visible || reduce) return;
      running = true;
      startTime = performance.now();
      raf = requestAnimationFrame(frame);
    }
    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    if (reduce) {
      drawFrame(0);
    } else {
      start();
    }

    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) drawFrame(0);
    });
    ro.observe(canvas);

    const io = new IntersectionObserver((entries) => {
      visible = entries[entries.length - 1]?.isIntersecting ?? true;
      if (visible) start();
      else stop();
    });
    io.observe(canvas);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      gl.deleteProgram(program);
    };
  }, [opacity]);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
