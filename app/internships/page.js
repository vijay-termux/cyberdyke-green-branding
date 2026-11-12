'use client'

import { ArrowRight, BriefcaseBusiness, CheckCircle2 } from 'lucide-react'
import { CTASection, Footer, MagneticBtn, Nav, PageHero, SectionEyebrow } from '@/components/dua/DuaShell'

const areas = ['Cybersecurity', 'Digital Marketing', 'Website Development', 'Graphic Design', 'Content Creation', 'Video Editing']
export default function InternshipsPage() {
  return <main className="bg-[#062817] text-white"><Nav /><PageHero eyebrow="Student opportunities" title="Start your journey with practical experience." subtitle="Explore internship opportunities across technology, marketing and creative teams. Apply with your profile and interests." /><section className="bg-white py-20 text-[#0b2419]"><div className="mx-auto max-w-6xl px-6"><SectionEyebrow>Internship areas</SectionEyebrow><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{areas.map(area => <article key={area} className="rounded-2xl border border-emerald-900/10 bg-[#f5fbf7] p-6"><BriefcaseBusiness className="text-emerald-600" size={22} /><h2 className="mt-5 font-sora text-lg font-bold">{area}</h2><p className="mt-2 text-sm text-[#557064]">Practical, guided experience for students building a professional portfolio.</p><MagneticBtn href="/contact" className="mt-5 !px-4 !py-2.5">Apply Now <ArrowRight size={14} /></MagneticBtn></article>)}</div><div className="mt-12 rounded-3xl border border-emerald-200 bg-emerald-50 p-6 text-sm leading-relaxed text-emerald-950"><CheckCircle2 className="mb-3 text-emerald-700" />CyberdykeTech does not collect participation fees from students for internship opportunities provided through the AICTE National Internship Portal. Any separately offered paid training is clearly distinguished from internships.</div></div></section><CTASection /><Footer /></main>
}
