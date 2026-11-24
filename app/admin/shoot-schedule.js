'use client'

import useSWR from 'swr'
import { useMemo, useState } from 'react'
import { ArrowDownToLine, CalendarDays, ChevronLeft, ChevronRight, Clock3, Download, Eye, LoaderCircle, Pencil, Plus, Printer, Search, Trash2, X } from 'lucide-react'

const fetcher = async url => {
  const response = await fetch(url, { cache: 'no-store' })
  if (!response.ok) throw new Error('Unable to load shoot schedules.')
  return response.json()
}
const shootTypes = ['Product Shoot', 'Reels', 'Promotional Video', 'Interview', 'Corporate Shoot', 'Event Coverage', 'Other']
const statuses = ['Scheduled', 'Confirmed', 'In Progress', 'Completed', 'Cancelled']
const blankShoot = { clientName: '', clientCompany: '', contactPerson: '', mobileNumber: '', shootDate: '', startTime: '', endTime: '', shootLocation: '', shootType: 'Product Shoot', assignedPhotographer: '', assignedTeamMembers: [], requirements: '', specialInstructions: '', status: 'Scheduled' }
const dateLabel = value => new Date(`${value}T00:00:00`).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
const timeLabel = value => new Date(`1970-01-01T${value}`).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })
const monthLabel = value => value.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })

function Metric({ label, value, tone }) {
  return <article className="rounded-2xl border border-emerald-900/10 bg-white p-4 shadow-sm sm:p-5"><p className="text-sm text-slate-500">{label}</p><p className={`mt-3 font-sora text-3xl font-bold ${tone}`}>{value ?? '—'}</p></article>
}

function Field({ label, required, children, className = '' }) {
  return <label className={`flex min-w-0 flex-col gap-1.5 text-xs font-semibold text-slate-600 ${className}`}><span>{label}{required ? <span className="text-rose-600"> *</span> : null}</span>{children}</label>
}

const inputClass = 'w-full rounded-xl border border-emerald-900/15 bg-white px-3.5 py-2.5 text-sm font-normal text-[#10281c] outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/10'

function ScheduleForm({ initial, onCancel, onSave, saving }) {
  const [form, setForm] = useState({ ...blankShoot, ...initial, startTime: initial?.startTime?.slice(0, 5) || '', endTime: initial?.endTime?.slice(0, 5) || '', assignedTeamMembers: initial?.assignedTeamMembers || [] })
  const [teamText, setTeamText] = useState((initial?.assignedTeamMembers || []).join(', '))
  const [error, setError] = useState('')
  const set = (key, value) => setForm(current => ({ ...current, [key]: value }))
  async function submit(event) {
    event.preventDefault()
    setError('')
    const payload = { ...form, assignedTeamMembers: teamText.split(/[\n,]/).map(name => name.trim()).filter(Boolean) }
    const result = await onSave(payload)
    if (result?.error) setError(result.error)
  }
  return <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#071d13]/55 p-0 backdrop-blur-sm sm:items-center sm:p-5" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) onCancel() }}>
    <section role="dialog" aria-modal="true" aria-labelledby="schedule-form-title" className="max-h-[95vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl bg-[#f7faf8] p-5 shadow-2xl sm:rounded-3xl sm:p-7">
      <header className="flex items-start justify-between gap-4 border-b border-emerald-900/10 pb-5"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">Production planning</p><h2 id="schedule-form-title" className="mt-1 font-sora text-xl font-bold text-[#10281c]">{initial?.id ? 'Edit shoot schedule' : 'Schedule a shoot'}</h2></div><button type="button" onClick={onCancel} className="rounded-xl p-2 text-slate-500 hover:bg-white" aria-label="Close schedule form"><X size={19} /></button></header>
      <form onSubmit={submit} className="mt-5 space-y-6">
        <fieldset><legend className="mb-3 text-sm font-bold text-[#10281c]">Client information</legend><div className="grid gap-3 sm:grid-cols-2"><Field label="Client name" required><input className={inputClass} required maxLength={160} value={form.clientName} onChange={event => set('clientName', event.target.value)} /></Field><Field label="Company / business"><input className={inputClass} maxLength={200} value={form.clientCompany} onChange={event => set('clientCompany', event.target.value)} /></Field><Field label="Contact person" required><input className={inputClass} required maxLength={160} value={form.contactPerson} onChange={event => set('contactPerson', event.target.value)} /></Field><Field label="Mobile number" required><input className={inputClass} required type="tel" inputMode="tel" pattern="[+0-9][0-9 ()-]{5,38}" maxLength={40} value={form.mobileNumber} onChange={event => set('mobileNumber', event.target.value)} /></Field></div></fieldset>
        <fieldset><legend className="mb-3 text-sm font-bold text-[#10281c]">Shoot details</legend><div className="grid gap-3 sm:grid-cols-2"><Field label="Shoot date" required><input className={inputClass} required type="date" value={form.shootDate} onChange={event => set('shootDate', event.target.value)} /></Field><Field label="Shoot type" required><select className={inputClass} value={form.shootType} onChange={event => set('shootType', event.target.value)}>{shootTypes.map(type => <option key={type}>{type}</option>)}</select></Field><Field label="Start time" required><input className={inputClass} required type="time" value={form.startTime} onChange={event => set('startTime', event.target.value)} /></Field><Field label="End time" required><input className={inputClass} required type="time" min={form.startTime || undefined} value={form.endTime} onChange={event => set('endTime', event.target.value)} /></Field><Field label="Shoot location" required className="sm:col-span-2"><input className={inputClass} required maxLength={2000} value={form.shootLocation} onChange={event => set('shootLocation', event.target.value)} /></Field></div></fieldset>
        <fieldset><legend className="mb-3 text-sm font-bold text-[#10281c]">Team and status</legend><div className="grid gap-3 sm:grid-cols-2"><Field label="Photographer / videographer" required><input className={inputClass} required maxLength={160} value={form.assignedPhotographer} onChange={event => set('assignedPhotographer', event.target.value)} /></Field><Field label="Additional team members"><input className={inputClass} value={teamText} onChange={event => setTeamText(event.target.value)} placeholder="Separate names with commas" /></Field><Field label="Schedule status" required><select className={inputClass} value={form.status} onChange={event => set('status', event.target.value)}>{statuses.map(status => <option key={status}>{status}</option>)}</select></Field><span className="hidden sm:block" /></div></fieldset>
        <div className="grid gap-3 sm:grid-cols-2"><Field label="Shoot requirements / description"><textarea className={inputClass} rows={3} maxLength={10000} value={form.requirements} onChange={event => set('requirements', event.target.value)} /></Field><Field label="Special instructions"><textarea className={inputClass} rows={3} maxLength={10000} value={form.specialInstructions} onChange={event => set('specialInstructions', event.target.value)} /></Field></div>
        {error ? <p role="alert" className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-800">{error}</p> : null}
        <div className="flex flex-col-reverse gap-2 border-t border-emerald-900/10 pt-4 sm:flex-row sm:justify-end"><button type="button" onClick={onCancel} className="rounded-xl border border-emerald-900/15 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700">Cancel</button><button disabled={saving} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0c3b27] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#145638] disabled:opacity-60">{saving ? <LoaderCircle className="animate-spin" size={16} /> : null}{initial?.id ? 'Save changes' : 'Create schedule'}</button></div>
      </form>
    </section>
  </div>
}

function ScheduleCard({ schedule, onEdit, onDelete, busy }) {
  const tone = { Scheduled: 'bg-sky-50 text-sky-800', Confirmed: 'bg-emerald-50 text-emerald-800', 'In Progress': 'bg-amber-50 text-amber-800', Completed: 'bg-slate-100 text-slate-700', Cancelled: 'bg-rose-50 text-rose-800' }[schedule.status]
  const pdfUrl = `/api/admin/shoot-schedules/${schedule.id}/pdf`
  return <article className="rounded-2xl border border-emerald-900/10 bg-white p-4 shadow-sm transition hover:border-emerald-900/20 sm:p-5">
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h3 className="font-sora text-base font-bold text-[#10281c]">{schedule.clientName}</h3><span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${tone}`}>{schedule.status}</span></div><p className="mt-1 text-sm text-slate-500">{schedule.clientCompany || schedule.shootType} {schedule.clientCompany ? `· ${schedule.shootType}` : ''}</p><div className="mt-4 grid gap-2 text-sm text-slate-600 sm:grid-cols-2"><p className="flex items-center gap-2"><CalendarDays size={15} className="shrink-0 text-emerald-700" />{dateLabel(schedule.shootDate)}</p><p className="flex items-center gap-2"><Clock3 size={15} className="shrink-0 text-emerald-700" />{timeLabel(schedule.startTime)} – {timeLabel(schedule.endTime)}</p><p className="truncate sm:col-span-2">{schedule.shootLocation}</p><p className="sm:col-span-2">Lead: {schedule.assignedPhotographer}{schedule.assignedTeamMembers?.length ? ` · ${schedule.assignedTeamMembers.join(', ')}` : ''}</p></div></div><div className="grid grid-cols-2 gap-2 sm:w-40"><a href={pdfUrl} aria-label={`Download PDF for ${schedule.clientName}`} className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-emerald-900/15 px-3 py-2 text-xs font-semibold text-[#12452d] hover:bg-emerald-50"><Download size={14} />PDF</a><a href={`${pdfUrl}?preview=1`} aria-label={`Preview PDF for ${schedule.clientName}`} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-emerald-900/15 px-3 py-2 text-xs font-semibold text-[#12452d] hover:bg-emerald-50"><Eye size={14} />Preview</a><button type="button" onClick={() => { const popup = window.open('', '_blank', 'width=900,height=780'); if (!popup) return; const safe = value => String(value || '—').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]); const rows = [['Client', schedule.clientName], ['Company', schedule.clientCompany], ['Contact', `${schedule.contactPerson} · ${schedule.mobileNumber}`], ['Date & time', `${dateLabel(schedule.shootDate)} · ${timeLabel(schedule.startTime)} – ${timeLabel(schedule.endTime)}`], ['Location', schedule.shootLocation], ['Shoot type', schedule.shootType], ['Status', schedule.status], ['Photographer', schedule.assignedPhotographer], ['Team members', schedule.assignedTeamMembers?.join(', ')], ['Requirements', schedule.requirements], ['Special instructions', schedule.specialInstructions]]; popup.document.write(`<!doctype html><html><head><title>Shoot schedule - ${safe(schedule.clientName)}</title><style>body{font:14px Arial,sans-serif;color:#143422;margin:52px auto;max-width:760px;padding:0 36px}header{background:#062817;color:white;padding:24px 30px;border-radius:12px}header img{height:38px;max-width:170px;object-fit:contain}h1{font-size:22px;margin:22px 0 5px}.sub{color:#607167;margin:0 0 22px}.row{display:grid;grid-template-columns:180px 1fr;gap:14px;padding:13px 8px;border-bottom:1px solid #e0e9e2}.row strong{color:#12452d}.footer{margin-top:32px;padding-top:14px;border-top:1px solid #dce6df;color:#65746a;font-size:11px}@media print{body{margin:0 auto;padding:18mm 12mm}header{-webkit-print-color-adjust:exact;print-color-adjust:exact}.row{break-inside:avoid}}</style></head><body><header><img src="/logo-new.png" alt="CyberdykeTech"><p>SHOOT SCHEDULE · CYBERDYKETECH</p></header><h1>${safe(schedule.clientName)}</h1><p class="sub">${safe(schedule.clientCompany || schedule.shootType)}</p>${rows.map(([label, value]) => `<div class="row"><strong>${safe(label)}</strong><span>${safe(value)}</span></div>`).join('')}<p class="footer">Prepared by CyberdykeTech · Please keep this schedule available on shoot day.</p><script>window.onload=()=>window.print()</script></body></html>`); popup.document.close() }} className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-emerald-900/15 px-3 py-2 text-xs font-semibold text-[#12452d] hover:bg-emerald-50"><Printer size={14} />Print</button><button type="button" disabled={busy} onClick={onEdit} className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-emerald-900/15 px-3 py-2 text-xs font-semibold text-[#12452d] hover:bg-emerald-50"><Pencil size={14} />Edit</button><button type="button" disabled={busy} onClick={onDelete} className="col-span-2 inline-flex items-center justify-center gap-1.5 rounded-lg border border-rose-200 px-3 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-50"><Trash2 size={14} />Delete schedule</button></div></div>
  </article>
}

export default function ShootSchedule() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [view, setView] = useState('list')
  const [month, setMonth] = useState(() => new Date(new Date().getFullYear(), new Date().getMonth(), 1))
  const [selectedDate, setSelectedDate] = useState('')
  const [editing, setEditing] = useState(null)
  const [saving, setSaving] = useState(false)
  const [busyId, setBusyId] = useState('')
  const [notice, setNotice] = useState('')
  const [error, setError] = useState('')
  const params = new URLSearchParams({ search, status })
  const { data, error: loadError, isLoading, mutate } = useSWR(`/api/admin/shoot-schedules?${params}`, fetcher)
  const records = data?.records || []
  const upcoming = useMemo(() => records.filter(item => item.status !== 'Cancelled' && item.status !== 'Completed' && item.shootDate >= new Date().toISOString().slice(0, 10)).slice(0, 3), [records])
  const calendarDays = useMemo(() => {
    const first = new Date(month.getFullYear(), month.getMonth(), 1)
    const offset = (first.getDay() + 6) % 7
    const dayCount = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
    return [...Array(offset).fill(null), ...Array.from({ length: dayCount }, (_, index) => index + 1)]
  }, [month])
  const monthCounts = useMemo(() => records.reduce((result, item) => { result[item.shootDate] = (result[item.shootDate] || 0) + 1; return result }, {}), [records])

  async function saveSchedule(payload) {
    setSaving(true)
    setError('')
    setNotice('')
    try {
      const response = await fetch(editing?.id ? `/api/admin/shoot-schedules/${editing.id}` : '/api/admin/shoot-schedules', { method: editing?.id ? 'PATCH' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      const body = await response.json()
      if (!response.ok) return { error: body.error || 'Unable to save this schedule.' }
      setEditing(null)
      setNotice(editing?.id ? 'Shoot schedule updated.' : 'Shoot schedule created.')
      await mutate()
      return { ok: true }
    } catch { return { error: 'Unable to reach the server. Please try again.' } } finally { setSaving(false) }
  }

  async function deleteSchedule(schedule) {
    if (!window.confirm(`Delete the shoot schedule for ${schedule.clientName}? This cannot be undone.`)) return
    setBusyId(schedule.id)
    setError('')
    setNotice('')
    try {
      const response = await fetch(`/api/admin/shoot-schedules/${schedule.id}`, { method: 'DELETE' })
      const body = await response.json()
      if (!response.ok) throw new Error(body.error || 'Unable to delete schedule.')
      setNotice('Shoot schedule deleted.')
      await mutate()
    } catch (caught) { setError(caught.message) } finally { setBusyId('') }
  }

  return <div className="mt-6 space-y-6">
    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"><Metric label="Total shoots" value={data?.metrics?.total} tone="text-[#10281c]" /><Metric label="Upcoming shoots" value={data?.metrics?.upcoming} tone="text-emerald-700" /><Metric label="Completed" value={data?.metrics?.completed} tone="text-slate-600" /><Metric label="Cancelled" value={data?.metrics?.cancelled} tone="text-rose-700" /></section>
    {upcoming.length ? <section aria-label="Upcoming shoot reminders" className="rounded-2xl border border-amber-200 bg-amber-50/80 p-4 sm:p-5"><div className="flex items-center gap-2 text-sm font-bold text-amber-950"><Clock3 size={16} />Coming up</div><div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap">{upcoming.map(item => <span key={item.id} className="rounded-xl border border-amber-200/70 bg-white/70 px-3 py-2 text-sm text-amber-950"><strong>{dateLabel(item.shootDate)}</strong> · {item.clientName} · {timeLabel(item.startTime)}</span>)}</div></section> : null}
    {notice ? <p role="status" className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{notice}</p> : null}{error ? <p role="alert" className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-800">{error}</p> : null}{loadError ? <p role="alert" className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-800">Could not load shoot schedules. Refresh and try again.</p> : null}
    <section className="rounded-2xl border border-emerald-900/10 bg-white p-4 shadow-sm sm:p-5"><div className="mb-4 flex justify-end"><button type="button" onClick={() => setEditing({ ...blankShoot })} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0c3b27] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#145638]"><Plus size={16} />Schedule a shoot</button></div><div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between"><label className="relative flex-1 lg:max-w-md"><span className="sr-only">Search shoots by client</span><Search size={16} className="absolute left-3 top-3 text-slate-400" /><input value={search} onChange={event => setSearch(event.target.value)} placeholder="Search client, company or contact…" className={`${inputClass} pl-9`} /></label><div className="flex flex-col gap-2 sm:flex-row"><select aria-label="Filter shoots by status" value={status} onChange={event => setStatus(event.target.value)} className={inputClass}><option value="">All statuses</option>{statuses.map(item => <option key={item}>{item}</option>)}</select><div className="flex rounded-xl border border-emerald-900/10 bg-[#f6faf7] p-1"><button type="button" onClick={() => setView('list')} aria-pressed={view === 'list'} className={`rounded-lg px-3 py-2 text-xs font-semibold ${view === 'list' ? 'bg-white text-emerald-900 shadow-sm' : 'text-slate-500'}`}>List view</button><button type="button" onClick={() => { setView('calendar'); setSelectedDate('') }} aria-pressed={view === 'calendar'} className={`rounded-lg px-3 py-2 text-xs font-semibold ${view === 'calendar' ? 'bg-white text-emerald-900 shadow-sm' : 'text-slate-500'}`}>Calendar</button></div></div></div>
      {view === 'calendar' ? <div className="mt-5"><div className="mb-4 flex items-center justify-between"><h2 className="font-sora text-lg font-bold text-[#10281c]">{monthLabel(month)}</h2><div className="flex gap-2"><button type="button" onClick={() => setMonth(current => new Date(current.getFullYear(), current.getMonth() - 1, 1))} aria-label="Previous month" className="rounded-lg border border-emerald-900/10 p-2"><ChevronLeft size={17} /></button><button type="button" onClick={() => setMonth(current => new Date(current.getFullYear(), current.getMonth() + 1, 1))} aria-label="Next month" className="rounded-lg border border-emerald-900/10 p-2"><ChevronRight size={17} /></button></div></div><div className="grid grid-cols-7 gap-1 text-center">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => <div key={day} className="py-2 text-[11px] font-bold uppercase tracking-wide text-slate-400">{day}</div>)}{calendarDays.map((day, index) => { const key = day ? `${month.getFullYear()}-${String(month.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}` : `empty-${index}`; return <button key={key} disabled={!day} type="button" aria-label={day ? `${monthLabel(month)} ${day}${monthCounts[key] ? `, ${monthCounts[key]} shoots` : ''}` : undefined} aria-pressed={day ? selectedDate === key : undefined} onClick={() => { setSelectedDate(current => current === key ? '' : key); setSearch('') }} className={`min-h-14 rounded-xl border p-1 text-sm sm:min-h-20 ${!day ? 'border-transparent' : selectedDate === key ? 'border-emerald-700 bg-emerald-50 text-emerald-900' : 'border-emerald-900/5 hover:bg-emerald-50/60'}`}><span>{day || ''}</span>{day && monthCounts[key] ? <span className="mx-auto mt-1 block w-fit rounded-full bg-emerald-800 px-2 py-0.5 text-[10px] font-bold text-white">{monthCounts[key]} {monthCounts[key] === 1 ? 'shoot' : 'shoots'}</span> : null}</button> })}</div>{selectedDate ? <p className="mt-3 text-xs text-slate-500">Showing {dateLabel(selectedDate)} · click the selected day to clear date selection.</p> : null}</div> : null}
      <div className="mt-5 space-y-3">{isLoading ? <div className="flex items-center justify-center gap-2 py-12 text-sm text-slate-500"><LoaderCircle size={18} className="animate-spin" />Loading schedules…</div> : records.filter(item => !selectedDate || item.shootDate === selectedDate).length ? records.filter(item => !selectedDate || item.shootDate === selectedDate).map(schedule => <ScheduleCard key={schedule.id} schedule={schedule} busy={busyId === schedule.id} onEdit={() => setEditing(schedule)} onDelete={() => deleteSchedule(schedule)} />) : <div className="rounded-2xl border border-dashed border-emerald-900/20 bg-[#fbfdfb] px-5 py-12 text-center"><span className="mx-auto flex size-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-800"><CalendarDays size={20} /></span><h2 className="mt-3 font-semibold text-[#10281c]">No shoots to show</h2><p className="mt-1 text-sm text-slate-500">Try another filter or create your first shoot schedule.</p><button type="button" onClick={() => setEditing({ ...blankShoot })} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#0c3b27] px-4 py-2.5 text-sm font-semibold text-white"><Plus size={16} />Schedule a shoot</button></div>}</div>
    </section>
    {editing ? <ScheduleForm initial={editing.id ? editing : null} saving={saving} onCancel={() => setEditing(null)} onSave={saveSchedule} /> : null}
  </div>
}
