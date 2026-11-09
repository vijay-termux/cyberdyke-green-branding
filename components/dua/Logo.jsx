'use client'

export default function Logo({ className = '' }) {
  return (
    <span className={`inline-flex h-16 shrink-0 items-center gap-2.5 ${className}`} aria-label="CyberdykeTech">
      <img
        src="/logo-new.png"
        alt="CyberdykeTech globe logo"
        width="1024"
        height="1024"
        fetchPriority="high"
        decoding="async"
        className="block h-14 w-14 shrink-0 rounded-full object-contain"
      />
      <span className="whitespace-nowrap font-sora text-[21px] font-black leading-none tracking-[-0.06em]">
        <span className="bg-gradient-to-r from-[#00f5a0] via-[#00dc78] to-[#00b8ff] bg-clip-text text-transparent">CYBERDYKE</span><span className="text-white">TECH</span>
      </span>
    </span>
  )
}
