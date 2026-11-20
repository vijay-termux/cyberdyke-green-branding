'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function submit(event) {
    event.preventDefault()
    setBusy(true)
    setError('')
    try {
      const response = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Unable to sign in.')
      router.replace('/admin')
      router.refresh()
    } catch (error) {
      setError(error.message || 'Unable to sign in.')
    } finally {
      setBusy(false)
    }
  }

  return <main className="grid min-h-screen place-items-center bg-[#f3f8f5] px-5 py-12 text-[#10281c]">
    <section className="w-full max-w-md rounded-3xl border border-emerald-900/10 bg-white p-8 shadow-xl shadow-emerald-950/5">
      <div className="flex size-12 items-center justify-center rounded-2xl bg-[#062817] font-sora text-lg font-extrabold text-emerald-300">C</div>
      <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">Owner workspace</p>
      <h1 className="mt-2 font-sora text-3xl font-bold">Admin sign in</h1>
      <p className="mt-2 text-sm leading-6 text-slate-600">Private access for the CyberdykeTech owner.</p>
      <form onSubmit={submit} className="mt-7 flex flex-col gap-4">
        <label className="flex flex-col gap-2 text-sm font-medium">Owner email<input type="email" required autoComplete="username" value={email} onChange={event => setEmail(event.target.value)} className="rounded-xl border border-emerald-900/15 px-4 py-3 outline-none focus:border-emerald-600" /></label>
        <label className="flex flex-col gap-2 text-sm font-medium">Password<input type="password" required autoComplete="current-password" value={password} onChange={event => setPassword(event.target.value)} className="rounded-xl border border-emerald-900/15 px-4 py-3 outline-none focus:border-emerald-600" /></label>
        {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
        <button disabled={busy} className="mt-2 rounded-xl bg-[#062817] px-4 py-3 font-semibold text-white transition hover:bg-emerald-800 disabled:opacity-60">{busy ? 'Signing in…' : 'Sign in securely'}</button>
      </form>
      <p className="mt-6 text-center text-xs text-slate-500">First visit? <Link className="font-semibold text-emerald-800 underline-offset-4 hover:underline" href="/admin/setup">Initialize the owner account</Link></p>
    </section>
  </main>
}
