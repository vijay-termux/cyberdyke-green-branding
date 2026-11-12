'use client'

export default function Scene3D() {

  const particles = Array.from({ length: 50 }).map((_, i) => ({
    x: (i * 137.5) % 100,
    y: (i * 53.7) % 100,
    size: 1 + ((i * 7) % 3),
    delay: (i * 0.13) % 6,
    dur: 4 + (i % 5),
  }))

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
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

      <div className="absolute right-[12%] top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-[#1565FF]/10 blur-3xl" aria-hidden="true" />


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
