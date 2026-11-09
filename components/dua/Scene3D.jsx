'use client'
import { useEffect, useRef } from 'react'

export default function Scene3D() {
  const wrapRef = useRef(null)
  const duaRef = useRef(null)

  useEffect(() => {
    let raf, mx = 0, my = 0, rx = 0, ry = 0
    const onMove = (e) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 24
      my = (e.clientY / window.innerHeight - 0.5) * 16
    }
    window.addEventListener('mousemove', onMove)
    const tick = () => {
      rx += (my - rx) * 0.06
      ry += (mx - ry) * 0.06
      if (duaRef.current) duaRef.current.style.transform = `rotateX(${-rx}deg) rotateY(${ry}deg)`
      raf = requestAnimationFrame(tick)
    }
    tick()
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf) }
  }, [])

  const particles = Array.from({ length: 50 }).map((_, i) => ({
    x: (i * 137.5) % 100,
    y: (i * 53.7) % 100,
    size: 1 + ((i * 7) % 3),
    delay: (i * 0.13) % 6,
    dur: 4 + (i % 5),
  }))

  return (
    <div ref={wrapRef} className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
      {/* Background arc / cosmic glow */}
      <div className="absolute left-1/2 top-1/2 h-[130%] w-[130%] -translate-x-1/2 -translate-y-1/2">
        <div className="absolute inset-0 rounded-full" style={{
          background: 'radial-gradient(circle at 60% 55%, rgba(79,140,255,0.35), rgba(21,101,255,0.15) 30%, transparent 60%)'
        }} />
      </div>

      {/* Upper arc */}
      <svg className="absolute inset-0" viewBox="0 0 800 800" preserveAspectRatio="none">
        <defs>
          <linearGradient id="arc" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#4F8CFF" stopOpacity="0" />
            <stop offset="50%" stopColor="#4F8CFF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#4F8CFF" stopOpacity="0" />
          </linearGradient>
        </defs>
        <ellipse cx="400" cy="440" rx="360" ry="120" fill="none" stroke="url(#arc)" strokeWidth="1.5" />
        <ellipse cx="400" cy="440" rx="300" ry="90" fill="none" stroke="url(#arc)" strokeWidth="1" opacity="0.5" />
      </svg>

      {/* Particles */}
      <div className="absolute inset-0">
        {particles.map((p, i) => (
          <div key={i} className="absolute rounded-full bg-[#4F8CFF]" style={{
            left: `${p.x}%`, top: `${p.y}%`,
            width: `${p.size}px`, height: `${p.size}px`,
            boxShadow: '0 0 8px #4F8CFF',
            opacity: 0.5,
            animation: `dua-float ${p.dur}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
          }} />
        ))}
      </div>

      {/* 3D DUA text */}
      <div className="relative z-10 flex items-center justify-center" style={{ perspective: '1200px' }}>
        <div ref={duaRef} className="relative" style={{ transformStyle: 'preserve-3d', transition: 'transform 0.15s ease-out' }}>
          <div className="relative flex items-center gap-1 select-none">
            {['D', 'U', 'A'].map((ch, i) => (
              <span
                key={i}
                className="dua-letter font-sora"
                style={{
                  fontSize: 'clamp(120px, 20vw, 260px)',
                  fontWeight: 900,
                  lineHeight: 1,
                  letterSpacing: '-0.04em',
                  background: 'linear-gradient(160deg, #FFFFFF 0%, #A9C7FF 25%, #1565FF 55%, #0B3A99 90%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                  textShadow: '0 0 60px rgba(21,101,255,0.4)',
                  filter: 'drop-shadow(0 20px 40px rgba(21,101,255,0.4)) drop-shadow(0 0 30px rgba(79,140,255,0.5))',
                  transform: `translateZ(${i === 1 ? 40 : 20}px)`,
                  animation: `dua-hover-${i} 6s ease-in-out infinite`,
                }}
              >
                {ch}
              </span>
            ))}
          </div>
          {/* Reflection */}
          <div
            className="pointer-events-none absolute inset-x-0 top-full flex items-start justify-center opacity-25"
            style={{
              transform: 'scaleY(-1)',
              maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.5), transparent 60%)',
              WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.5), transparent 60%)',
            }}
          >
            <span className="font-sora" style={{
              fontSize: 'clamp(120px, 20vw, 260px)', fontWeight: 900, lineHeight: 1,
              background: 'linear-gradient(180deg, #1565FF, transparent)',
              WebkitBackgroundClip: 'text', color: 'transparent',
            }}>DUA</span>
          </div>

          {/* Swoosh/arrow accent */}
          <svg className="absolute -left-8 -bottom-10 w-full" viewBox="0 0 400 80" style={{ transform: 'translateZ(30px)' }}>
            <defs>
              <linearGradient id="swoosh" x1="0" x2="1">
                <stop offset="0%" stopColor="#4F8CFF" />
                <stop offset="100%" stopColor="#1565FF" />
              </linearGradient>
            </defs>
            <path d="M 20 60 Q 200 -10 380 40" stroke="url(#swoosh)" strokeWidth="6" fill="none" strokeLinecap="round"
              style={{ filter: 'drop-shadow(0 0 12px #4F8CFF)' }} />
            <polygon points="380,40 365,25 370,50" fill="#4F8CFF" style={{ filter: 'drop-shadow(0 0 8px #4F8CFF)' }} />
          </svg>
        </div>
      </div>

      <style jsx>{`
        @keyframes dua-float {
          0%,100% { transform: translateY(0) translateX(0); opacity: 0.4; }
          50% { transform: translateY(-15px) translateX(5px); opacity: 0.8; }
        }
        @keyframes dua-hover-0 { 0%,100% { transform: translateZ(20px) translateY(0); } 50% { transform: translateZ(20px) translateY(-8px); } }
        @keyframes dua-hover-1 { 0%,100% { transform: translateZ(40px) translateY(0); } 50% { transform: translateZ(40px) translateY(-12px); } }
        @keyframes dua-hover-2 { 0%,100% { transform: translateZ(20px) translateY(0); } 50% { transform: translateZ(20px) translateY(-6px); } }
      `}</style>
    </div>
  )
}
