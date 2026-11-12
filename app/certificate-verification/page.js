'use client'

import { useState } from 'react'
import { BadgeCheck, Search, ShieldCheck } from 'lucide-react'
import { CTASection, Footer, MagneticBtn, Nav, PageHero, SectionEyebrow } from '@/components/dua/DuaShell'

export default function CertificateVerificationPage() {
  const [certificateId, setCertificateId] = useState('')
  const [submitted, setSubmitted] = useState(false)
  return <main className="bg-[#062817] text-white"><Nav /><PageHero eyebrow="Secure verification" title="Verify your CyberdykeTech certificate." subtitle="Enter a certificate ID to request a verification check. Only authorized public certificate fields are displayed." /><section className="bg-white py-20 text-[#0b2419]"><div className="mx-auto max-w-xl px-6"><div className="rounded-3xl border border-emerald-900/10 bg-[#f5fbf7] p-8 shadow-sm"><SectionEyebrow>Certificate lookup</SectionEyebrow><h2 className="mt-4 font-sora text-2xl font-bold">Certificate ID</h2><form onSubmit={e => { e.preventDefault(); setSubmitted(true) }} className="mt-6 space-y-4"><input value={certificateId} onChange={e => setCertificateId(e.target.value)} required placeholder="e.g. CDT-2026-0001" className="w-full rounded-xl border border-emerald-900/15 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-500" /><MagneticBtn type="submit" className="w-full justify-center"><Search size={16} />Verify Certificate</MagneticBtn></form>{submitted && <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950"><ShieldCheck className="mb-2 text-amber-700" size={20} />No public certificate record was found. Please check the ID or contact CyberdykeTech for assistance.</div>}</div><div className="mt-6 flex gap-3 text-sm text-[#557064]"><BadgeCheck className="shrink-0 text-emerald-600" size={18} />Verification results are limited to authorized public fields and are not fabricated.</div></div></section><CTASection /><Footer /></main>
}
