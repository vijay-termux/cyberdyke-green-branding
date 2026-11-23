'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

const vertexShader = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`

const fragmentShader = `
precision highp float;
varying vec2 vUv;
uniform vec2 u_resolution;
uniform float u_time;
uniform float u_grain;
uniform vec3 u_colors[4];
uniform vec3 u_bg;

vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = vUv;
  float ratio = u_resolution.x / u_resolution.y;
  vec2 p = uv - 0.5;
  p.x *= ratio;
  float t = u_time * 0.1;
  float n1 = snoise(p * 0.4 + vec2(t * 0.2, -t * 0.3));
  float n2 = snoise(p * 0.55 + vec2(-t * 0.15, t * 0.25) + n1 * 0.25);
  float n3 = snoise(p * 0.75 + vec2(t * 0.1, -t * 0.2) + n2 * 0.2);
  vec3 col = u_bg;
  float dist = length(p) * 1.5;
  float vignette = 1.0 - smoothstep(0.3, 1.2, dist);
  col = mix(col, u_colors[0], smoothstep(-0.2, 0.5, n1) * 0.72);
  col = mix(col, u_colors[1], smoothstep(-0.1, 0.6, n2) * 0.48);
  col = mix(col, u_colors[2], smoothstep(-0.3, 0.4, n3) * 0.35);
  col = mix(col, u_colors[3], smoothstep(0.0, 0.7, n1 * n2) * 0.2);
  col += u_colors[1] * smoothstep(0.8, 0.0, dist) * 0.18;
  col = mix(col * 0.45, col, vignette);
  float grain = fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453 + u_time);
  col += (grain - 0.5) * u_grain * 0.1;
  gl_FragColor = vec4(col, 1.0);
}
`

const DEFAULT_COLORS = ['#137a48', '#18a65b', '#38d778', '#9af3b8']

function hexToRgb(hex) {
  const value = hex.replace('#', '')
  return [0, 2, 4].map((offset) => parseInt(value.slice(offset, offset + 2), 16) / 255)
}

function createShader(gl, type, source) {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader)
    return null
  }
  return shader
}

export default function Velaris({
  bg = '#032819',
  colors = DEFAULT_COLORS,
  speed = 0.65,
  grain = 0.08,
  height = '100vh',
  className,
  children,
}) {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const gl = canvas.getContext('webgl', { alpha: false, antialias: false, powerPreference: 'low-power' })
    if (!gl) return

    const vertex = createShader(gl, gl.VERTEX_SHADER, vertexShader)
    const fragment = createShader(gl, gl.FRAGMENT_SHADER, fragmentShader)
    if (!vertex || !fragment) return

    const program = gl.createProgram()
    if (!program) return
    gl.attachShader(program, vertex)
    gl.attachShader(program, fragment)
    gl.linkProgram(program)
    gl.deleteShader(vertex)
    gl.deleteShader(fragment)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program)
      return
    }

    const buffer = gl.createBuffer()
    if (!buffer) {
      gl.deleteProgram(program)
      return
    }
    gl.useProgram(program)
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)

    const position = gl.getAttribLocation(program, 'position')
    gl.enableVertexAttribArray(position)
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

    const locations = {
      resolution: gl.getUniformLocation(program, 'u_resolution'),
      time: gl.getUniformLocation(program, 'u_time'),
      grain: gl.getUniformLocation(program, 'u_grain'),
      colors: gl.getUniformLocation(program, 'u_colors[0]'),
      background: gl.getUniformLocation(program, 'u_bg'),
    }
    const palette = new Float32Array(colors.slice(0, 4).flatMap(hexToRgb))
    const background = new Float32Array(hexToRgb(bg))
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const frameInterval = 1000 / 30
    let frameId = 0
    let lastFrame = 0
    let elapsed = 0
    let isVisible = true
    let isPageVisible = !document.hidden

    const resize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5)
      const width = Math.max(1, Math.floor(container.clientWidth * pixelRatio))
      const height = Math.max(1, Math.floor(container.clientHeight * pixelRatio))
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
        gl.viewport(0, 0, width, height)
      }
    }

    const render = (timestamp) => {
      if (timestamp - lastFrame >= frameInterval || !lastFrame) {
        elapsed = reduceMotion.matches ? 0 : timestamp * 0.001 * speed
        gl.uniform2f(locations.resolution, canvas.width, canvas.height)
        gl.uniform1f(locations.time, elapsed)
        gl.uniform1f(locations.grain, grain)
        gl.uniform3fv(locations.colors, palette)
        gl.uniform3fv(locations.background, background)
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
        lastFrame = timestamp
      }
      if (!reduceMotion.matches && isVisible && isPageVisible) {
        frameId = window.requestAnimationFrame(render)
      }
    }

    const updateAnimation = () => {
      window.cancelAnimationFrame(frameId)
      frameId = 0
      if (!reduceMotion.matches && isVisible && isPageVisible) {
        frameId = window.requestAnimationFrame(render)
      } else {
        render(0)
      }
    }

    const resizeObserver = new ResizeObserver(() => {
      resize()
      updateAnimation()
    })
    resizeObserver.observe(container)
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting
      updateAnimation()
    })
    intersectionObserver.observe(container)
    const onMotionChange = () => updateAnimation()
    const onVisibilityChange = () => {
      isPageVisible = !document.hidden
      updateAnimation()
    }
    reduceMotion.addEventListener('change', onMotionChange)
    document.addEventListener('visibilitychange', onVisibilityChange)
    resize()
    updateAnimation()

    return () => {
      window.cancelAnimationFrame(frameId)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      reduceMotion.removeEventListener('change', onMotionChange)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
    }
  }, [bg, colors, grain, speed])

  return (
    <div ref={containerRef} style={{ height }} className={cn('relative w-full overflow-hidden', className)} aria-hidden="true">
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" />
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  )
}
