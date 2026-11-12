'use client'

import { BookOpen, ShieldCheck, Megaphone, ArrowRight } from 'lucide-react'
import { CTASection, Footer, MagneticBtn, Nav, PageHero, SectionEyebrow } from '@/components/dua/DuaShell'

const tracks = [
  { title: 'Cybersecurity Training', icon: ShieldCheck, items: ['Cybersecurity Fundamentals', 'Ethical Hacking Fundamentals', 'Web Application Security', 'Incident Response Basics', 'Security Tools and Practical Labs'] },
  { title: 'Digital Marketing Training', icon: Megaphone, items: ['Digital Marketing Fundamentals', 'Social Media Marketing', 'Search Engine Optimization', 'Content Creation', 'Campaign Planning and Analytics'] },
]

export default function TrainingPage() {
  return <main className="bg-[#062817] text-white"><Nav /><PageHero eyebrow="Learn with confidence" title="Build skills for the digital future." subtitle="Practical training programmes in cybersecurity and digital marketing. Schedules, eligibility and fees are shared after enquiry." /><section className="bg-white py-20 text-[#0b2419]"><div className="mx-auto max-w-6xl px-6"><SectionEyebrow>Training programmes</SectionEyebrow><div className="mt-8 grid gap-6 md:grid-cols-2">{tracks.map(({ title, icon: Icon, items }) => <article key={title} className="rounded-3xl border border-emerald-900/10 bg-[#f5fbf7] p-8 shadow-sm"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#062817] text-[#34D399]"><Icon size={22} /></div><h2 className="mt-6 font-sora text-2xl font-bold">{title}</h2><ul className="mt-5 space-y-3 text-sm text-[#355646]">{items.map(item => <li key={item} className="flex gap-2"><BookOpen size={16} className="mt-0.5 text-emerald-600" />{item}</li>)}</ul><MagneticBtn href="/contact" className="mt-7">Enquire Now <ArrowRight size={15} /></MagneticBtn></article>)}</div></div></section><CTASection /><Footer /></main>
}
