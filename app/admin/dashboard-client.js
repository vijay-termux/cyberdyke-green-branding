'use client'

import useSWR from 'swr'
import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowDownToLine, BriefcaseBusiness, CheckCircle2, ChevronLeft, ChevronRight, FileBadge, GraduationCap, LayoutDashboard, LogOut, Mail, PenLine, Search, Users } from 'lucide-react'

const fetcher = async url => {
  const response = await fetch(url, { cache: 'no-store' })
  if (!response.ok) throw new Error('Unable to load dashboard data.')
  return response.json()
}

const sections = [
  { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'students', label: 'Students', icon: Users },
  { id: 'contacts', label: 'Contact messages', icon: Mail },
  { id: 'training', label: 'Training applications', icon: GraduationCap },
  { id: 'internships', label: 'Internship applications', icon: BriefcaseBusiness },
  { id: 'careers', label: 'Careers applications', icon: BriefcaseBusiness },
  { id: 'certificates', label: 'Certificates', icon: FileBadge },
]
const statusChoices = {
  contacts: ['new', 'contacted', 'follow-up', 'proposal-sent', 'converted', 'not-interested'],
  training: ['new', 'reviewing', 'accepted', 'rejected', 'enrolled'],
  internships: ['new', 'reviewing', 'shortlisted', 'accepted', 'rejected'],
  careers: ['new', 'reviewing', 'shortlisted', 'rejected', 'hired'],
  students: ['enrolled', 'active', 'in-progress', 'completed', 'dropped'],
  certificates: ['valid', 'revoked'],
}
const titleFor = { students: 'Student management', contacts: 'Contact messages', training: 'Training applications', internships: 'Internship applications', careers: 'Careers applications', certificates: 'Certificate records' }
const formatDate = value => value ? new Date(value).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : '—'

function Metric({ label, value, icon: Icon, onClick }) {
  return <button onClick={onClick} className="rounded-2xl border border-emerald-900/10 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
    <div className="flex items-center justify-between"><span className="text-sm text-slate-500">{label}</span><span className="flex size-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800"><Icon size={17} /></span></div>
    <div className="mt-4 font-sora text-3xl font-bold text-[#10281c]">{value ?? '—'}</div>
  </button>
}

function RecordCard({ record, active, savingId, updateRecord }) {
  const id = record.id || record.certificateId
  const name = record.fullName || record.recipientName || record.studentCode || record.certificateId
  const detail = record.email || record.programTitle || record.course || record.domain || record.position || record.studentCode
  const statuses = statusChoices[active] || [record.status]

  return <article className="rounded-2xl border border-emerald-900/10 bg-white p-4 shadow-sm md:p-5">
    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
      <div className="min-w-0">
        <h2 className="font-semibold text-[#10281c]">{name}</h2>
        <p className="mt-1 break-all text-sm text-slate-500">{detail}</p>
        <p className="mt-1 text-xs text-slate-400">{formatDate(record.createdAt || record.issuedOn)}{record.phone ? ` · ${record.phone}` : ''}</p>
        {record.message ? <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-700">{record.message}</p> : null}
      </div>
      <div className="flex shrink-0 flex-col gap-2 sm:flex-row lg:w-72 lg:flex-col">
        <label className="flex flex-col gap-1 text-xs font-medium text-slate-500">
          Status
          <select value={record.status || 'new'} onChange={event => updateRecord(id, { status: event.target.value })} disabled={savingId === id} className="rounded-lg border border-emerald-900/15 bg-white px-3 py-2 text-sm text-[#10281c]">
            {statuses.map(status => <option key={status} value={status}>{status}</option>)}
          </select>
        </label>
        {record.privateNotes !== undefined ? (
          <label className="flex flex-col gap-1 text-xs font-medium text-slate-500">
            Private notes
            <textarea defaultValue={record.privateNotes || ''} rows={2} onBlur={event => { if (event.target.value !== (record.privateNotes || '')) updateRecord(id, { privateNotes: event.target.value }) }} className="rounded-lg border border-emerald-900/15 px-3 py-2 text-sm text-[#10281c]" />
          </label>
        ) : null}
      </div>
    </div>
  </article>
}

export default function AdminDashboard({ email }) {
  const router = useRouter()
  const [active, setActive] = useState('overview')
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [page, setPage] = useState(1)
  const [savingId, setSavingId] = useState('')
  const [notice, setNotice] = useState('')
  const metrics = useSWR('/api/admin/dashboard', fetcher)
  const recordsUrl = active === 'overview' ? null : `/api/admin/records?type=${active}&search=${encodeURIComponent(search)}&status=${encodeURIComponent(statusFilter)}&page=${page}&pageSize=25`
  const records = useSWR(recordsUrl, fetcher)

  const cards = useMemo(() => [
    ['Students', metrics.data?.students, Users, 'students'],
    ['Active students', metrics.data?.activeStudents, GraduationCap, 'students'],
    ['Certificates', metrics.data?.certificates, FileBadge, 'certificates'],
    ['Contact enquiries', metrics.data?.contacts, Mail, 'contacts'],
    ['Training applications', metrics.data?.training, GraduationCap, 'training'],
    ['Internship applications', metrics.data?.internships, BriefcaseBusiness, 'internships'],
    ['Careers applications', metrics.data?.careers, BriefcaseBusiness, 'careers'],
    ['Converted enquiries', metrics.data?.convertedLeads, CheckCircle2, 'contacts'],
  ], [metrics.data])

  function selectSection(id) {
    setActive(id)
    setSearch('')
    setStatusFilter('')
    setPage(1)
    setNotice('')
  }

  async function updateRecord(id, data) {
    setSavingId(id)
    setNotice('')
    try {
      const response = await fetch(`/api/admin/records/${encodeURIComponent(id)}?type=${active}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      if (!response.ok) throw new Error('Could not save this record.')
      setNotice('Record updated.')
      await records.mutate()
    } catch (error) {
      setNotice(error.message)
    } finally {
      setSavingId('')
    }
  }

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.replace('/admin/login')
    router.refresh()
  }

  function exportCsv() {
    const rows = records.data?.records || []
    if (!rows.length) return
    const keys = Object.keys(rows[0])
    const csv = [keys.join(','), ...rows.map(row => keys.map(key => `"${String(row[key] ?? '').replaceAll('"', '""')}"`).join(','))].join('\n')
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `${active}-${new Date().toISOString().slice(0, 10)}.csv`
    anchor.click()
    URL.revokeObjectURL(url)
  }

  return <main className="min-h-screen bg-[#f3f8f5] text-[#10281c] md:flex">
    <aside className="flex w-full shrink-0 flex-col bg-[#062817] px-4 py-5 text-white md:min-h-screen md:w-64 md:px-5">
      <a href="/" className="flex items-center gap-3 px-2"><span className="flex size-10 items-center justify-center rounded-xl bg-white/10 font-sora font-bold text-emerald-300">C</span><span><span className="block font-sora text-sm font-bold">CyberdykeTech</span><span className="text-xs text-emerald-100/60">Owner workspace</span></span></a>
      <nav aria-label="Admin navigation" className="mt-7 flex gap-2 overflow-x-auto pb-1 md:flex-1 md:flex-col md:overflow-visible">
        {sections.map(({ id, label, icon: Icon }) => <button key={id} onClick={() => selectSection(id)} aria-current={active === id ? 'page' : undefined} className={`flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition ${active === id ? 'bg-emerald-400/15 font-semibold text-emerald-200' : 'text-emerald-50/75 hover:bg-white/5 hover:text-white'}`}><Icon size={17} /><span>{label}</span></button>)}
        <a href="/admin/website-content" className="flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-emerald-50/75 transition hover:bg-white/5 hover:text-white"><PenLine size={17} /><span>Website content</span></a>
      </nav>
      <div className="mt-5 hidden border-t border-white/10 pt-4 md:block"><p className="truncate px-2 text-xs text-emerald-100/65">{email}</p><button onClick={logout} className="mt-3 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-emerald-50/80 hover:bg-white/5"><LogOut size={17} />Sign out</button></div>
      <button onClick={logout} className="mt-3 flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-emerald-50/80 hover:bg-white/5 md:hidden"><LogOut size={17} />Sign out</button>
    </aside>

    <section className="min-w-0 flex-1 px-4 py-6 md:px-8 md:py-8 lg:px-10">
      <header className="flex flex-col gap-2 border-b border-emerald-900/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">Private administration</p><h1 className="mt-2 font-sora text-2xl font-bold md:text-3xl">{active === 'overview' ? 'Business overview' : titleFor[active]}</h1><p className="mt-1 text-sm text-slate-500">Live records from your Neon database.</p></div>
        {active !== 'overview' ? <button onClick={exportCsv} className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-900/15 bg-white px-4 py-2.5 text-sm font-semibold hover:bg-emerald-50"><ArrowDownToLine size={16} />Export current page</button> : null}
      </header>

      {active === 'overview' ? <>
        <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{cards.map(([label, value, icon, target]) => <Metric key={label} label={label} value={metrics.data ? value : '—'} icon={icon} onClick={() => selectSection(target)} />)}</div>
        <div className="mt-7 grid gap-5 lg:grid-cols-2">
          <section className="rounded-2xl border border-emerald-900/10 bg-white p-6"><h2 className="font-sora text-lg font-bold">Applications at a glance</h2><p className="mt-2 text-sm leading-6 text-slate-500">Open a section to review submissions, update status and add private notes. Figures above are live database counts.</p><div className="mt-5 flex flex-wrap gap-2">{sections.slice(2).map(item => <button key={item.id} onClick={() => selectSection(item.id)} className="rounded-full bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-900 hover:bg-emerald-100">{item.label}</button>)}</div></section>
          <section className="rounded-2xl border border-emerald-900/10 bg-white p-6"><h2 className="font-sora text-lg font-bold">Owner access</h2><p className="mt-2 break-all text-sm text-slate-600">Signed in as {email}</p><p className="mt-3 text-sm leading-6 text-slate-500">Only the configured owner email is authorized for dashboard APIs. Public pages remain separate from this private workspace.</p></section>
        </div>
        {metrics.error ? <p role="alert" className="mt-5 text-sm text-red-700">Dashboard data could not be loaded. Check the database connection.</p> : null}
      </> : <>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <label className="relative flex-1"><span className="sr-only">Search records</span><Search size={16} className="absolute left-3 top-3 text-slate-400" /><input value={search} onChange={event => { setSearch(event.target.value); setPage(1) }} placeholder="Search by name, email, phone…" className="w-full rounded-xl border border-emerald-900/10 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-emerald-600" /></label>
          <label className="sr-only" htmlFor="status-filter">Filter by status</label><select id="status-filter" value={statusFilter} onChange={event => { setStatusFilter(event.target.value); setPage(1) }} className="rounded-xl border border-emerald-900/10 bg-white px-4 py-2.5 text-sm"><option value="">All statuses</option>{(statusChoices[active] || []).map(status => <option key={status} value={status}>{status}</option>)}</select>
        </div>
        {notice ? <p role="status" className="mt-4 text-sm text-emerald-800">{notice}</p> : null}
        {records.error ? <p role="alert" className="mt-6 rounded-xl bg-red-50 p-4 text-sm text-red-800">Unable to load records. Please refresh and try again.</p> : null}
        {records.isLoading ? <p className="mt-8 text-sm text-slate-500">Loading records…</p> : records.data?.records?.length ? <div className="mt-5 space-y-3">
          {records.data.records.map(record => <RecordCard key={record.id || record.certificateId} record={record} active={active} savingId={savingId} updateRecord={updateRecord} />)}
          <div className="flex items-center justify-between py-3 text-sm text-slate-500"><span>{records.data.total} records</span><div className="flex gap-2"><button disabled={page <= 1} onClick={() => setPage(current => Math.max(1, current - 1))} className="rounded-lg border border-emerald-900/10 bg-white p-2 disabled:opacity-40" aria-label="Previous page"><ChevronLeft size={17} /></button><span className="flex items-center px-2">Page {records.data.page}</span><button disabled={page * records.data.pageSize >= records.data.total} onClick={() => setPage(current => current + 1)} className="rounded-lg border border-emerald-900/10 bg-white p-2 disabled:opacity-40" aria-label="Next page"><ChevronRight size={17} /></button></div></div>
        </div> : <div className="mt-6 rounded-2xl border border-dashed border-emerald-900/20 bg-white p-10 text-center"><p className="font-semibold">No records found</p><p className="mt-1 text-sm text-slate-500">Public submissions will appear here when received.</p></div>}
      </>}
    </section>
  </main>
}
