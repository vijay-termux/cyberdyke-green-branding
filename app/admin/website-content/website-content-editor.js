'use client'

import { useEffect, useState } from 'react'
import useSWR from 'swr'

const fallbackContent = {
  heading: 'Work That Speaks\nFor Itself.',
  buttonText: 'View All Projects',
  buttonUrl: '/work',
}

const fetcher = async (url) => {
  const response = await fetch(url, { cache: 'no-store' })
  const result = await response.json()
  if (!response.ok) throw new Error(result.error || 'Unable to load website content.')
  return result
}

export default function WebsiteContentEditor() {
  const { data, error, isLoading, mutate } = useSWR('/api/admin/website-content', fetcher)
  const [form, setForm] = useState(fallbackContent)
  const [saving, setSaving] = useState(false)
  const [notice, setNotice] = useState('')
  const [noticeType, setNoticeType] = useState('status')

  useEffect(() => {
    if (data?.draftContent) setForm(data.draftContent)
  }, [data])

  function updateField(field, value) {
    setForm((current) => ({ ...current, [field]: value }))
  }

  async function save(mode) {
    setSaving(true)
    setNotice('')
    try {
      const response = await fetch('/api/admin/website-content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode, content: form }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Unable to save changes.')
      setNoticeType('status')
      setNotice(mode === 'publish' ? 'Published. The homepage will show the new content shortly.' : 'Draft saved. It is not visible to the public yet.')
      await mutate()
    } catch (saveError) {
      setNoticeType('alert')
      setNotice(saveError.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <section className="mt-7 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="rounded-2xl border border-emerald-900/10 bg-white p-5 shadow-sm md:p-7">
        <div className="flex flex-col gap-2 border-b border-slate-100 pb-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">Homepage · Featured work</p>
            <h2 className="mt-2 font-sora text-xl font-bold">Heading and projects button</h2>
          </div>
          <a href="/" target="_blank" rel="noreferrer" className="text-sm font-semibold text-emerald-800 hover:underline">Open public homepage</a>
        </div>

        {isLoading ? <p className="py-8 text-sm text-slate-500">Loading saved content…</p> : null}
        {error ? <p role="alert" className="mt-5 rounded-xl bg-red-50 p-4 text-sm text-red-800">{error.message}</p> : null}

        <div className="mt-6 flex flex-col gap-5">
          <label className="flex flex-col gap-2 text-sm font-medium">
            Section heading
            <textarea value={form.heading} onChange={(event) => updateField('heading', event.target.value)} maxLength={160} rows={3} aria-describedby="heading-help" className="rounded-xl border border-emerald-900/15 bg-white px-4 py-3 text-[#10281c] outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15" />
            <span id="heading-help" className="text-xs font-normal text-slate-500">Use a new line to control the line break.</span>
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium">
            Button label
            <input value={form.buttonText} onChange={(event) => updateField('buttonText', event.target.value)} maxLength={80} required className="rounded-xl border border-emerald-900/15 bg-white px-4 py-3 text-[#10281c] outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15" />
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium">
            Button destination
            <input type="text" value={form.buttonUrl} onChange={(event) => updateField('buttonUrl', event.target.value)} maxLength={300} required aria-describedby="button-url-help" className="rounded-xl border border-emerald-900/15 bg-white px-4 py-3 text-[#10281c] outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/15" />
            <span id="button-url-help" className="text-xs font-normal text-slate-500">Use an internal path, such as /work.</span>
          </label>
        </div>

        {notice ? <p role={noticeType} className={`mt-5 rounded-xl p-3 text-sm ${noticeType === 'alert' ? 'bg-red-50 text-red-800' : 'bg-emerald-50 text-emerald-900'}`}>{notice}</p> : null}

        <div className="mt-7 flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
          <button type="button" onClick={() => save('draft')} disabled={saving || isLoading} className="rounded-xl border border-emerald-900/15 px-5 py-3 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-50">{saving ? 'Saving…' : 'Save draft'}</button>
          <button type="button" onClick={() => save('publish')} disabled={saving || isLoading} className="rounded-xl bg-[#062817] px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-50">{saving ? 'Saving…' : 'Publish changes'}</button>
        </div>
      </div>

      <aside className="h-fit rounded-2xl border border-emerald-900/10 bg-white p-5 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">Public preview</p>
        <h2 className="mt-4 whitespace-pre-line font-sora text-2xl font-black leading-tight text-[#10281c]">{form.heading || 'Your heading will appear here'}</h2>
        <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-800">{form.buttonText || 'Button label'} <span aria-hidden="true">→</span></p>
        <p className="mt-2 break-all text-xs text-slate-500">Destination: {form.buttonUrl || '—'}</p>
        <div className="mt-6 border-t border-slate-100 pt-4 text-xs leading-5 text-slate-500">
          <p>Last saved: {data?.updatedAt ? new Date(data.updatedAt).toLocaleString() : 'Not available'}</p>
          <p className="mt-1">Last published: {data?.publishedAt ? new Date(data.publishedAt).toLocaleString() : 'Not published yet'}</p>
        </div>
      </aside>
    </section>
  )
}
