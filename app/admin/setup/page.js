'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function AdminSetupPage() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '', setupToken: '' })
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [complete, setComplete] = useState(false)

  async function submit(event) {
    event.preventDefault()
    setBusy(true)
    setError('')
    try {
      const response = await fetch('/api/admin/bootstrap', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Unable to initialize the account.')
      setComplete(true)
    } catch (error) {
      setError(error.message || 'Unable to initialize the account.')
    } finally {
      setBusy(false)
    }
  }

  if (complete) return <main className="grid min-h-screen place-items-center bg-[#f3f8f5] px-5"><section className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-xl"><h1 className="font-sora text-2xl font-bold text-[#10281c]">Owner account created</h1><p className="mt-3 text-sm text-slate-600">Your account is ready. Sign in to open the private dashboard.</p><button onClick={() => router.replace('/admin/login')} className="mt-6 rounded-xl bg-[#062817] px-5 py-3 font-semibold text-white">Continue to sign in</button></section></main>

  return <main className="grid min-h-screen place-items-center bg-[#f3f8f5] px-5 py-12 text-[#10281c]">
    <section className="w-full max-w-md rounded-3xl border border-emerald-900/10 bg-white p-8 shadow-xl shadow-emerald-950/5">
      <div className="flex size-12 items-center justify-center rounded-2xl bg-[#062817] font-sora text-lg font-extrabold text-emerald-300">C</div>
      <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">One-time setup</p>
      <h1 className="mt-2 font-sora text-3xl font-bold">Create the owner account</h1>
      <p className="mt-2 text-sm leading-6 text-slate-600">Use the configured owner email and the private setup token. This endpoint closes after the account is created.</p>
      <form onSubmit={submit} className="mt-7 flex flex-col gap-4">
        <label className="flex flex-col gap-2 text-sm font-medium">Owner email<input type="email" required value={form.email} onChange={event => setForm({ ...form, email: event.target.value })} className="rounded-xl border border-emerald-900/15 px-4 py-3 outline-none focus:border-emerald-600" /></label>
        <label className="flex flex-col gap-2 text-sm font-medium">New password<input type="password" required minLength={12} autoComplete="new-password" value={form.password} onChange={event => setForm({ ...form, password: event.target.value })} className="rounded-xl border border-emerald-900/15 px-4 py-3 outline-none focus:border-emerald-600" /><span className="text-xs font-normal text-slate-500">Use at least 12 characters.</span></label>
        <label className="flex flex-col gap-2 text-sm font-medium">One-time setup token<input type="password" required autoComplete="off" value={form.setupToken} onChange={event => setForm({ ...form, setupToken: event.target.value })} className="rounded-xl border border-emerald-900/15 px-4 py-3 outline-none focus:border-emerald-600" /></label>
        {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
        <button disabled={busy} className="mt-2 rounded-xl bg-[#062817] px-4 py-3 font-semibold text-white transition hover:bg-emerald-800 disabled:opacity-60">{busy ? 'Creating account…' : 'Create owner account'}</button>
      </form>
      <p className="mt-6 text-center text-xs text-slate-500"><Link className="font-semibold text-emerald-800 underline-offset-4 hover:underline" href="/admin/login">Return to admin sign in</Link></p>
    </section>
  </main>
}
