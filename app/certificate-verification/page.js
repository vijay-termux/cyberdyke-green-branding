'use client'

import { useState } from 'react'
import { BadgeCheck, Search, ShieldCheck } from 'lucide-react'
import { CTASection, Footer, MagneticBtn, Nav, PageHero, SectionEyebrow } from '@/components/dua/DuaShell'

export default function CertificateVerificationPage() {
  const [certificateId, setCertificateId] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const verify = async () => {
    setLoading(true); setError(''); setResult(null)
    try {
      const response = await fetch(`/api/certificate-verification?id=${encodeURIComponent(certificateId)}`)
      const data = await response.json()
      if (response.status === 404) { setResult(null); setError('No certificate matched that ID. Please check it and try again.'); return }
      if (!response.ok) throw new Error(data.error || 'Verification is temporarily unavailable.')
      setResult(data.record)
    } catch (requestError) { setError(requestError.message || 'Verification is temporarily unavailable.') }
    finally { setLoading(false) }
  }
  return <main className="bg-[#062817] text-white"><Nav /><PageHero eyebrow="Secure verification" title="Verify your CyberdykeTech certificate." subtitle="Enter a certificate ID to request a verification check. Only authorized public certificate fields are displayed." /><section className="bg-white py-20 text-[#0b2419]"><div className="mx-auto max-w-xl px-6"><div className="rounded-3xl border border-emerald-900/10 bg-[#f5fbf7] p-8 shadow-sm"><SectionEyebrow>Certificate lookup</SectionEyebrow><h2 className="mt-4 font-sora text-2xl font-bold">Certificate ID</h2><form onSubmit={e => { e.preventDefault(); verify() }} className="mt-6 space-y-4"><label htmlFor="certificate-id" className="sr-only">Certificate ID</label><input id="certificate-id" value={certificateId} onChange={e => setCertificateId(e.target.value)} required placeholder="e.g. CDT-2026-0001" className="w-full rounded-xl border border-emerald-900/15 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-500" /><MagneticBtn type="submit" disabled={loading} className="w-full justify-center"><Search size={16} />{loading ? 'Checking…' : 'Verify Certificate'}</MagneticBtn></form>{error && <div role="alert" className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950"><ShieldCheck className="mb-2 text-amber-700" size={20} />{error}</div>}{result && <div role="status" className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-sm text-emerald-950"><div className="flex items-center gap-2 font-semibold"><ShieldCheck size={18} />Certificate {result.status === 'valid' ? 'verified' : result.status}</div><dl className="mt-4 grid gap-3 sm:grid-cols-2"><div><dt className="text-xs text-emerald-800/70">Certificate ID</dt><dd className="mt-1 font-medium">{result.certificateId}</dd></div><div><dt className="text-xs text-emerald-800/70">Recipient</dt><dd className="mt-1 font-medium">{result.recipientName}</dd></div><div><dt className="text-xs text-emerald-800/70">Program</dt><dd className="mt-1 font-medium">{result.programTitle}</dd></div><div><dt className="text-xs text-emerald-800/70">Issued</dt><dd className="mt-1 font-medium">{result.issuedOn}</dd></div></dl>{result.documentUrl ? <a href={result.documentUrl} className="mt-5 inline-flex rounded-xl bg-[#0c3b27] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#145638]">Download certificate PDF</a> : null}</div>}</div><div className="mt-6 flex gap-3 text-sm text-[#557064]"><BadgeCheck className="shrink-0 text-emerald-600" size={18} />Verification results are limited to authorized public fields and are not fabricated.</div></div></section><CTASection /><Footer /></main>
}
