'use client'
import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

export default function WhatsAppFab() {
  const [show, setShow] = useState(false)
  const [teaser, setTeaser] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 1200)
    const t2 = setTimeout(() => setTeaser(false), 8000)
    return () => { clearTimeout(t); clearTimeout(t2) }
  }, [])

  if (!show) return null
  const message = encodeURIComponent("Hi DUA 👋, I'd like to discuss a project.")

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2">
      {teaser && (
        <div className="animate-floaty relative max-w-[220px] rounded-2xl rounded-br-md border border-[#E5EAF3] bg-white p-3 shadow-[0_10px_40px_-15px_rgba(10,42,110,0.3)]">
          <button onClick={() => setTeaser(false)} className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full border border-[#E5EAF3] bg-white text-slate-400 hover:text-slate-600">
            <X size={10} />
          </button>
          <div className="font-sora text-[12px] font-bold text-[#0A2A6E]">Hi 👋 Need a quick strategy call?</div>
          <div className="mt-0.5 font-inter text-[11px] text-slate-500">Chat with our founders instantly.</div>
        </div>
      )}
      <a
        href={`https://wa.me/918341496002?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => setTeaser(false)}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_10px_30px_-8px_rgba(37,211,102,0.6)] transition-transform hover:scale-110"
        aria-label="WhatsApp"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30" />
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-PlHVppa1Q6GKCwAkoWcesndxZPZ9w3.png"
          alt="WhatsApp"
          className="relative h-14 w-14 rounded-full object-cover"
        />
        <span className="absolute right-full mr-3 whitespace-nowrap rounded-full bg-[#0A2A6E] px-3 py-1.5 font-sora text-[11px] font-semibold text-white opacity-0 shadow-lg transition group-hover:opacity-100">
          WhatsApp us
        </span>
      </a>
    </div>
  )
}
