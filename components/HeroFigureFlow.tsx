"use client";

import { useEffect, useRef } from "react";

/**
 * The hero figure, given to the wind. The bronze line-art figure is a flat
 * PNG, so hair and coat can only move if we displace the pixels: this renders
 * the sprite into a WebGL2 canvas and sways the loose parts (hair at the top,
 * coat hem toward the bottom) with a gentle gusting wind field, while the
 * head/torso core stays anchored. The lower-body fade that used to live in the
 * CSS mask is baked into the shader here so the figure still dissolves into the
 * mist.
 *
 * A static <img> (with its original CSS mask) renders alongside as the
 * fallback: if WebGL2 is unavailable, the texture fails, or the visitor
 * prefers reduced motion, the canvas hides and that untouched image shows. The
 * canvas sits inside .hero-figure-draw, so the entrance clip-path reveal and
 * the .hero-figure-wrap positioning both still apply unchanged.
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
uniform float uAmp;

void main() {
  vec2 uv = vUv;                 // canvas box matches the sprite, 1:1
  float t = uTime;

  // FLIP_Y is on, so uv.y = 1 is the top (hair) and uv.y = 0 the hem.
  float wHair = smoothstep(0.80, 1.0, uv.y);        // sways near the crown
  float wCoat = smoothstep(0.58, 0.16, uv.y);       // grows toward the hem
  // The head/shoulders/torso band (mid) keeps its own near-zero weight.

  // Gentle gusting sway, mostly sideways, two detuned sines so it never
  // repeats obviously; a slow gust envelope swells and eases it.
  float gust = 0.7 + 0.3 * sin(t * 0.23);
  float swayH = (sin(t * 0.55 + uv.y * 5.0) * 0.6 + sin(t * 0.33 + uv.y * 2.3) * 0.4) * gust;
  float amtH = uAmp * (wHair * 1.0 + wCoat * 1.15);
  vec2 disp = vec2(swayH * amtH, 0.0);
  // a whisper of vertical lift on the hem so the coat breathes, not just slides
  disp.y += sin(t * 0.40 + uv.x * 4.0) * uAmp * 0.25 * wCoat;

  vec2 s = clamp(uv + disp, vec2(0.001), vec2(0.999));
  vec4 tex = texture(uTex, s);

  // Baked lower-body fade (matches the old CSS mask: solid to ~50% down,
  // gone by ~88%). uv.y is flipped, so opaque high, transparent low.
  float fade = smoothstep(0.12, 0.5, uv.y);
  float a = tex.a * fade;
  outColor = vec4(tex.rgb * a, a);   // premultiplied
}`;

export default function HeroFigureFlow({
  src,
  imgClassName,
  amplitude = 0.02,
}: {
  src: string;
  imgClassName?: string;
  amplitude?: number;
}) {
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const imgEl = imgRef.current;
    if (!canvas || !imgEl) return;

    const useStaticFallback = () => {
      canvas.style.display = "none";
      imgEl.style.visibility = "";
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      useStaticFallback();
      return;
    }

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      antialias: true,
      premultipliedAlpha: true,
      powerPreference: "low-power",
    });
    if (!gl) {
      useStaticFallback();
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
      useStaticFallback();
      return;
    }
    gl.useProgram(program);
    const uTime = gl.getUniformLocation(program, "uTime");
    const uAmp = gl.getUniformLocation(program, "uAmp");
    gl.uniform1f(uAmp, amplitude);
    gl.bindVertexArray(gl.createVertexArray());
    gl.clearColor(0, 0, 0, 0);

    const texture = gl.createTexture()!;
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 0]));
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    let ready = false;

    function loadTexture(source: HTMLImageElement) {
      gl!.bindTexture(gl!.TEXTURE_2D, texture);
      gl!.pixelStorei(gl!.UNPACK_FLIP_Y_WEBGL, true);
      gl!.pixelStorei(gl!.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
      gl!.texImage2D(gl!.TEXTURE_2D, 0, gl!.RGBA, gl!.RGBA, gl!.UNSIGNED_BYTE, source);
      ready = true;
    }

    function begin() {
      // The <img> is already in the DOM; reuse it as the texture source once
      // it has decoded, rather than fetching the file twice.
      if (imgEl!.complete && imgEl!.naturalWidth > 0) {
        loadTexture(imgEl!);
        imgEl!.style.visibility = "hidden";
        resize();
        start();
      } else {
        imgEl!.addEventListener(
          "load",
          () => {
            loadTexture(imgEl!);
            imgEl!.style.visibility = "hidden";
            resize();
            start();
          },
          { once: true }
        );
        imgEl!.addEventListener("error", useStaticFallback, { once: true });
      }
    }

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
    }

    let raf = 0;
    let running = false;
    let visible = true;
    let startTime = performance.now();

    function frame(now: number) {
      if (!running) return;
      gl!.uniform1f(uTime, (now - startTime) / 1000);
      gl!.clear(gl!.COLOR_BUFFER_BIT);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(frame);
    }
    function start() {
      if (running || !ready || !visible) return;
      running = true;
      startTime = performance.now();
      raf = requestAnimationFrame(frame);
    }
    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas);
    const io = new IntersectionObserver((entries) => {
      visible = entries[entries.length - 1]?.isIntersecting ?? true;
      if (visible) start();
      else stop();
    });
    io.observe(canvas);

    begin();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      gl.deleteTexture(texture);
      gl.deleteProgram(program);
    };
  }, [src, amplitude]);

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img ref={imgRef} className={imgClassName} src={src} alt="" aria-hidden="true" draggable={false} />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      />
    </>
  );
}
