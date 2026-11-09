'use client'

export default function Logo({ className = '' }) {
  return (
    <span className={`inline-flex h-16 shrink-0 items-center gap-2.5 ${className}`} aria-label="CyberdykeTech">
      <span
        aria-hidden="true"
        className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-cyan-300/40 bg-[#020b12] shadow-[0_0_18px_rgba(0,214,255,0.28)]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent 0 5px, rgba(0,229,255,0.95) 6px 8px, transparent 9px 13px), radial-gradient(circle at 38% 32%, #00f5d4 0 7%, #00a8ff 28%, #071522 72%)',
        }}
      />
      <span className="whitespace-nowrap font-sora text-[21px] font-black leading-none tracking-[-0.06em]">
        <span className="bg-gradient-to-r from-[#00f5a0] via-[#00dc78] to-[#00b8ff] bg-clip-text text-transparent">CYBERDYKE</span><span className="text-white">TECH</span>
      </span>
    </span>
  )
}
