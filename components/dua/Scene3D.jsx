'use client'

const videoUrl = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/rankboostsolution_ssspin.io_1795462034-3N0p0dxILMWfUwBBOawTORSR5tn8Mv.mp4'
const posterUrl = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-vVjWESCLYULQInxbY4ToZoMbD7qS4d.png'

export default function Scene3D() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-[radial-gradient(ellipse_at_58%_48%,#0d5937_0%,#06452c_45%,#032819_100%)]" aria-hidden="true">
      <video
        className="hero-background-video absolute inset-0 h-full w-full object-cover opacity-90 mix-blend-screen"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={posterUrl}
      >
        <source src={videoUrl} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-r from-[#032819]/25 via-[#06452c]/10 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#032819]/20 via-transparent to-[#032819]/10" />
      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          .hero-background-video { display: none; }
        }
      `}</style>
    </div>
  )
}
