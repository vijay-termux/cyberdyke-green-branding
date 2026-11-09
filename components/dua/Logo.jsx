'use client'

import Image from 'next/image'

export default function Logo({ className = '', variant = 'light' }) {
  return (
    <span className={`inline-flex h-full w-full items-center justify-center overflow-hidden bg-[#101d20] ${className}`}>
      <Image
        src="/cyberdyke-logo.png"
        alt="CyberdykeTech"
        width={80}
        height={80}
        priority
        className="h-[86%] w-[75%] object-contain"
      />
    </span>
  )
}
