'use client'

export default function Logo({ className = '', compact = false }) {
  const compactClasses = compact ? 'h-12 gap-2 md:h-16 md:gap-2.5' : 'h-16 gap-2.5'
  const markClasses = compact ? 'h-10 w-10 md:h-14 md:w-14' : 'h-14 w-14'
  const wordmarkClasses = compact ? 'text-[17px] md:text-[21px]' : 'text-[21px]'

  return (
    <span className={`inline-flex shrink-0 items-center ${compactClasses} ${className}`} aria-label="CyberdykeTech">
      <img
        src="/logo-new.png"
        alt="CyberdykeTech globe logo"
        width="1024"
        height="1024"
        fetchPriority="high"
        decoding="async"
        className={`block shrink-0 rounded-full object-contain ${markClasses}`}
      />
      <span className={`whitespace-nowrap font-sora font-black leading-none tracking-[-0.06em] ${wordmarkClasses}`}>
        <span className="bg-gradient-to-r from-[#00f5a0] via-[#00dc78] to-[#00b8ff] bg-clip-text text-transparent">CYBERDYKE</span><span className="text-white">TECH</span>
      </span>
    </span>
  )
}
