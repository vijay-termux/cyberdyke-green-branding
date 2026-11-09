'use client'
import { useEffect, useRef, useState } from 'react'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [hover, setHover] = useState(false)

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0, dx = 0, dy = 0
    const move = (e) => { mx = e.clientX; my = e.clientY }
    window.addEventListener('mousemove', move)

    let raf
    const tick = () => {
      dx += (mx - dx) * 0.9
      dy += (my - dy) * 0.9
      rx += (mx - rx) * 0.15
      ry += (my - ry) * 0.15
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${dx}px, ${dy}px, 0) translate(-50%, -50%)`
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`
      raf = requestAnimationFrame(tick)
    }
    tick()

    const onOver = (e) => {
      const t = e.target
      if (t.closest('a, button, [data-cursor="hover"]')) setHover(true)
    }
    const onOut = (e) => {
      const t = e.target
      if (t.closest('a, button, [data-cursor="hover"]')) setHover(false)
    }
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)

    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full bg-[#4F8CFF] shadow-[0_0_20px_#1565FF]"
        style={{ mixBlendMode: 'screen' }}
      />
      <div
        ref={ringRef}
        className={`pointer-events-none fixed left-0 top-0 z-[9998] rounded-full border transition-[width,height,border-color,background] duration-300 ${hover ? 'h-16 w-16 border-[#4F8CFF] bg-[#1565FF]/10' : 'h-8 w-8 border-white/40'}`}
        style={{ mixBlendMode: 'exclusion' }}
      />
    </>
  )
}
