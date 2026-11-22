'use client'

import { useState } from 'react'
import { Upload } from 'lucide-react'

async function uploadFile(file, category) {
  if (!file || !(file instanceof File) || file.size === 0) return ''
  const form = new FormData()
  form.append('file', file)
  form.append('category', category)
  const response = await fetch('/api/admin/uploads', { method: 'POST', body: form })
  const data = await response.json()
  if (!response.ok) throw new Error(data.error || 'File upload failed.')
  return data.pathname
}

const inputClass = 'w-full rounded-xl border border-emerald-900/15 bg-white px-3 py-2.5 text-sm text-[#10281c] outline-none focus:border-emerald-600'

export default function RecordCreateForm({ type, onCreated, onCancel }) {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function submit(event) {
    event.preventDefault()
    setBusy(true)
    setError('')
    try {
      const form = new FormData(event.currentTarget)
      const isStudent = type === 'students'
      const photoPath = isStudent ? await uploadFile(form.get('photo'), 'student-photo') : ''
      const pdfPath = !isStudent ? await uploadFile(form.get('pdf'), 'certificate') : ''
      const payload = isStudent ? {
        type, studentCode: form.get('studentCode'), fullName: form.get('fullName'), email: form.get('email'),
        phone: form.get('phone'), education: form.get('education'), training: form.get('training'),
        skills: String(form.get('skills') || '').split(',').map(value => value.trim()).filter(Boolean),
        portfolioUrl: form.get('portfolioUrl'), visibility: form.get('visibility'), profileImagePath: photoPath,
      } : {
        type, certificateId: form.get('certificateId'), recipientName: form.get('recipientName'),
        programTitle: form.get('programTitle'), issuedOn: form.get('issuedOn'), expiresOn: form.get('expiresOn'),
        issuer: form.get('issuer'), pdfPath,
      }
      const response = await fetch('/api/admin/records', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Unable to create record.')
      onCreated()
    } catch (requestError) {
      setError(requestError.message || 'Unable to create record.')
    } finally {
      setBusy(false)
    }
  }

  const isStudent = type === 'students'
  return <form onSubmit={submit} className="mt-5 rounded-2xl border border-emerald-700/15 bg-white p-5 shadow-sm">
    <div className="flex items-start justify-between gap-4"><div><h2 className="font-semibold text-[#10281c]">{isStudent ? 'Create student profile' : 'Add certificate record'}</h2><p className="mt-1 text-sm text-slate-500">{isStudent ? 'Public profiles appear in the website directory without private contact details.' : 'Verified certificates can include a downloadable PDF.'}</p></div><button type="button" onClick={onCancel} className="text-sm font-medium text-slate-500 hover:text-slate-900">Cancel</button></div>
    <div className="mt-5 grid gap-4 sm:grid-cols-2">
      {isStudent ? <>
        <label className="grid gap-1.5 text-xs font-medium text-slate-600">Student code<input name="studentCode" required maxLength={40} placeholder="CDT-2026-001" className={inputClass} /></label>
        <label className="grid gap-1.5 text-xs font-medium text-slate-600">Full name<input name="fullName" required maxLength={160} className={inputClass} /></label>
        <label className="grid gap-1.5 text-xs font-medium text-slate-600">Private email<input name="email" type="email" maxLength={254} className={inputClass} /></label>
        <label className="grid gap-1.5 text-xs font-medium text-slate-600">Private phone<input name="phone" type="tel" maxLength={40} className={inputClass} /></label>
        <label className="grid gap-1.5 text-xs font-medium text-slate-600">Education<input name="education" maxLength={1200} placeholder="Degree, college, or qualification" className={inputClass} /></label>
        <label className="grid gap-1.5 text-xs font-medium text-slate-600">Training / programs<input name="training" maxLength={1200} className={inputClass} /></label>
        <label className="grid gap-1.5 text-xs font-medium text-slate-600">Skills, comma separated<input name="skills" placeholder="React, UX design, Python" className={inputClass} /></label>
        <label className="grid gap-1.5 text-xs font-medium text-slate-600">Portfolio URL<input name="portfolioUrl" type="url" maxLength={500} placeholder="https://" className={inputClass} /></label>
        <label className="grid gap-1.5 text-xs font-medium text-slate-600">Profile photo<input name="photo" type="file" accept="image/png,image/jpeg,image/webp" className={inputClass} /><span className="font-normal text-slate-400">PNG, JPEG, or WebP · up to 8 MB</span></label>
        <label className="grid gap-1.5 text-xs font-medium text-slate-600">Website visibility<select name="visibility" defaultValue="public" className={inputClass}><option value="public">Public directory</option><option value="private">Private profile</option></select></label>
      </> : <>
        <label className="grid gap-1.5 text-xs font-medium text-slate-600">Certificate ID<input name="certificateId" required maxLength={120} placeholder="CDT-2026-0001" className={inputClass} /></label>
        <label className="grid gap-1.5 text-xs font-medium text-slate-600">Recipient name<input name="recipientName" required maxLength={160} className={inputClass} /></label>
        <label className="grid gap-1.5 text-xs font-medium text-slate-600">Program / certification<input name="programTitle" required maxLength={200} className={inputClass} /></label>
        <label className="grid gap-1.5 text-xs font-medium text-slate-600">Issuer<input name="issuer" maxLength={160} defaultValue="CyberdykeTech" className={inputClass} /></label>
        <label className="grid gap-1.5 text-xs font-medium text-slate-600">Issue date<input name="issuedOn" type="date" required className={inputClass} /></label>
        <label className="grid gap-1.5 text-xs font-medium text-slate-600">Expiry date (optional)<input name="expiresOn" type="date" className={inputClass} /></label>
        <label className="grid gap-1.5 text-xs font-medium text-slate-600 sm:col-span-2">Certificate PDF<input name="pdf" type="file" accept="application/pdf,.pdf" className={inputClass} /><span className="font-normal text-slate-400">PDF · up to 8 MB</span></label>
      </>}
    </div>
    {error ? <p role="alert" className="mt-4 text-sm text-red-700">{error}</p> : null}
    <div className="mt-5 flex flex-wrap gap-3"><button type="submit" disabled={busy} className="inline-flex items-center gap-2 rounded-xl bg-[#0c3b27] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#145638] disabled:opacity-60"><Upload size={16} />{busy ? 'Saving…' : isStudent ? 'Create profile' : 'Save certificate'}</button></div>
  </form>
}
