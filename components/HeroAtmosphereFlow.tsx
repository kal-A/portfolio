"use client";

import { useEffect, useRef } from "react";

/**
 * Hero atmosphere, alive. Draws the baked atmosphere raster into a WebGL2
 * canvas and continuously displaces it with a domain-warped fBm flow field, so
 * the distant light and haze churn and drift like slow fog instead of sitting
 * frozen. This is the cross-browser way to get the "cloth ripple" feeling the
 * experimental html-in-canvas Cloth component cannot deliver: plain WebGL2,
 * supported everywhere including iOS Safari.
 *
 * Sits as Layer 1, painted over the CSS .hero-atmosphere fallback. If WebGL2
 * is unavailable, the image fails to load, or the visitor prefers reduced
 * motion, the canvas hides itself and that static CSS background shows through
 * unchanged. The flow is masked to ~zero toward the bottom so the illustrated
 * shelf stays put while only the upper sky/haze moves; the figure and mist are
 * separate DOM layers above this and are untouched.
 */

const VERT = `#version 300 es
precision highp float;
const vec2 P[3] = vec2[3](vec2(-1.0, -1.0), vec2(3.0, -1.0), vec2(-1.0, 3.0));
out vec2 vUv;
void main() {
  vec2 p = P[gl_VertexID];
  vUv = p * 0.5 + 0.5;
  gl_Position = vec4(p, 0.0, 1.0);
}`;

const FRAG = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 outColor;
uniform sampler2D uTex;
uniform float uTime;
uniform vec2 uScale;   // cover-fit scale (centered)
uniform float uAmp;    // peak displacement in uv units

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int k = 0; k < 4; k++) { v += a * noise(p); p *= 2.0; a *= 0.5; }
  return v;
}

void main() {
  vec2 uv = (vUv - 0.5) * uScale + 0.5;
  float t = uTime;
  // Domain-warped flow: the offset field itself drifts, so the haze churns
  // and slowly rises rather than just shimmering in place.
  vec2 q = vec2(
    fbm(uv * 2.2 + vec2(0.0, t * 0.09) + fbm(uv * 1.5 + t * 0.05)),
    fbm(uv * 2.2 + vec2(5.2, -t * 0.08) + fbm(uv * 1.5 - t * 0.06))
  );
  vec2 disp = (q - 0.5) * 2.0 * uAmp;
  // Keep the shelf (bottom of the image) stable; let the sky/haze move.
  disp *= smoothstep(0.12, 0.62, vUv.y);
  vec2 s = clamp(uv + disp, vec2(0.0015), vec2(0.9985));
  outColor = vec4(texture(uTex, s).rgb, 1.0);
}`;

export default function HeroAtmosphereFlow({
  src,
  className,
  amplitude = 0.06,
}: {
  src: string;
  className?: string;
  amplitude?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const hide = () => {
      canvas.style.display = "none";
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      hide();
      return;
    }

    const gl = canvas.getContext("webgl2", {
      alpha: false,
      antialias: false,
      premultipliedAlpha: false,
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
    const uTime = gl.getUniformLocation(program, "uTime");
    const uScale = gl.getUniformLocation(program, "uScale");
    const uAmp = gl.getUniformLocation(program, "uAmp");
    gl.uniform1f(uAmp, amplitude);

    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    const texture = gl.createTexture()!;
    gl.bindTexture(gl.TEXTURE_2D, texture);
    // 1x1 placeholder until the image decodes.
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([12, 13, 16, 255]));
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    let imgW = 1;
    let imgH = 1;
    let ready = false;

    const image = new Image();
    image.decoding = "async";
    image.onload = () => {
      imgW = image.naturalWidth || 1;
      imgH = image.naturalHeight || 1;
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      ready = true;
      resize();
      start();
    };
    image.onerror = hide;
    image.src = src;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cw = Math.max(1, canvas!.clientWidth);
      const ch = Math.max(1, canvas!.clientHeight);
      const w = Math.round(cw * dpr);
      const h = Math.round(ch * dpr);
      if (canvas!.width !== w || canvas!.height !== h) {
        canvas!.width = w;
        canvas!.height = h;
      }
      gl!.viewport(0, 0, w, h);
      // cover-fit: sample the centered region so the image fills without
      // distortion, matching CSS background-size: cover / position: center.
      const canvasAspect = cw / ch;
      const imageAspect = imgW / imgH;
      let sx = 1;
      let sy = 1;
      if (canvasAspect > imageAspect) sy = imageAspect / canvasAspect;
      else sx = canvasAspect / imageAspect;
      gl!.uniform2f(uScale, sx, sy);
    }

    let raf = 0;
    let running = false;
    let visible = true;
    let startTime = performance.now();

    function frame(now: number) {
      if (!running) return;
      gl!.uniform1f(uTime, (now - startTime) / 1000);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(frame);
    }
    function start() {
      if (running || !ready || !visible) return;
      running = true;
      startTime = performance.now() - 0;
      raf = requestAnimationFrame(frame);
    }
    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    const ro = new ResizeObserver(() => {
      resize();
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
      gl.deleteTexture(texture);
      gl.deleteVertexArray(vao);
      gl.deleteProgram(program);
    };
  }, [src, amplitude]);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
