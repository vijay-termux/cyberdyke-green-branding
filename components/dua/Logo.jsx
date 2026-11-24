'use client'

export default function Logo({ className = '', compact = false }) {
  const sizeClasses = compact ? 'w-[174px] sm:w-[214px]' : 'w-full max-w-[280px]'

  return (
    <img
      src="/cyberdyke-brand.png"
      alt="CyberdykeTech"
      width="321"
      height="85"
      fetchPriority={compact ? 'high' : undefined}
      decoding="async"
      className={`block h-auto shrink-0 ${sizeClasses} ${className}`}
    />
  )
}
