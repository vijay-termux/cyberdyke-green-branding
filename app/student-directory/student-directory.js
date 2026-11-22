'use client'

import { useState } from 'react'
import useSWR from 'swr'
import Image from 'next/image'
import { ArrowUpRight, Search, UserRound } from 'lucide-react'
import { Footer, Nav, PageHero, SectionEyebrow } from '@/components/dua/DuaShell'

const fetcher = async url => {
  const response = await fetch(url, { cache: 'no-store' })
  const data = await response.json()
  if (!response.ok) throw new Error(data.error || 'Student profiles could not be loaded.')
  return data
}
const summary = value => typeof value === 'string' ? value : value?.summary || ''

function StudentCard({ profile }) {
  return <article className="overflow-hidden rounded-2xl border border-emerald-900/10 bg-white p-5 shadow-sm">
    <div className="flex items-center gap-4">
      <div className="relative flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-emerald-50 text-emerald-800">
        {profile.photoUrl ? <Image src={profile.photoUrl} alt={`${profile.fullName} profile`} fill sizes="64px" className="object-cover" /> : <UserRound size={25} aria-hidden="true" />}
      </div>
      <div className="min-w-0"><h2 className="font-sora text-lg font-bold text-[#10281c]">{profile.fullName}</h2><p className="mt-1 text-xs font-semibold uppercase tracking-wider text-emerald-700">{profile.studentCode}</p></div>
    </div>
    {summary(profile.education) ? <p className="mt-4 text-sm leading-6 text-slate-600"><span className="font-semibold text-slate-800">Education </span>{summary(profile.education)}</p> : null}
    {summary(profile.training) ? <p className="mt-2 text-sm leading-6 text-slate-600"><span className="font-semibold text-slate-800">Training </span>{summary(profile.training)}</p> : null}
    {profile.skills?.length ? <div className="mt-4 flex flex-wrap gap-2">{profile.skills.map(skill => <span key={skill} className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-900">{skill}</span>)}</div> : null}
    {profile.portfolioUrl ? <a href={profile.portfolioUrl} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-emerald-800 hover:text-emerald-950">View portfolio <ArrowUpRight size={15} /></a> : null}
  </article>
}

export default function StudentDirectory() {
  const [search, setSearch] = useState('')
  const query = search.trim()
  const { data, error, isLoading } = useSWR(query.length >= 2 ? `/api/student-directory?q=${encodeURIComponent(query)}` : null, fetcher)
  return <main className="min-h-screen bg-[#062817] text-white"><Nav /><PageHero eyebrow="Student community" title="Meet our students." subtitle="Explore public learner profiles, training experience, and skills from the CyberdykeTech community." />
    <section className="bg-[#f5fbf7] py-16 text-[#10281c] sm:py-20"><div className="mx-auto max-w-6xl px-5 sm:px-8"><SectionEyebrow>Student directory</SectionEyebrow><div className="mt-4 max-w-2xl"><h2 className="font-sora text-2xl font-bold sm:text-3xl">Search learner profiles</h2><p className="mt-2 text-sm leading-6 text-slate-600">Search by student name or student code. Only profiles made public by an administrator appear here.</p></div>
      <label className="relative mt-6 block max-w-2xl"><span className="sr-only">Search students by name or student code</span><Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><input value={search} onChange={event => setSearch(event.target.value)} placeholder="Enter a name or student code" className="w-full rounded-xl border border-emerald-900/15 bg-white py-3 pl-11 pr-4 text-sm outline-none focus:border-emerald-600" /></label>
      {query.length < 2 ? <p className="mt-6 text-sm text-slate-500">Enter at least 2 characters to search.</p> : null}
      {isLoading ? <p className="mt-6 text-sm text-slate-500" role="status">Searching student profiles…</p> : null}
      {error ? <p role="alert" className="mt-6 rounded-xl bg-red-50 p-4 text-sm text-red-800">{error.message}</p> : null}
      {query.length >= 2 && !isLoading && !error && !data?.profiles?.length ? <p className="mt-6 rounded-xl border border-dashed border-emerald-900/20 bg-white p-6 text-sm text-slate-600">No public profiles matched that search.</p> : null}
      {data?.profiles?.length ? <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{data.profiles.map(profile => <StudentCard key={profile.studentCode} profile={profile} />)}</div> : null}
    </div></section><Footer /></main>
}
