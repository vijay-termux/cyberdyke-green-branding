'use client'

import { ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react'
import { MagneticBtn, SectionEyebrow } from './DuaShell'

export default function ProgramPage({ eyebrow, title, description, items, cta = 'Get Started', formTitle = 'Start a conversation' }) {
  return (
    <main className="min-h-screen bg-[#062817] pt-40 text-white">
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <SectionEyebrow dark>{eyebrow}</SectionEyebrow>
        <div className="mt-6 grid gap-12 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
          <div>
            <h1 className="max-w-4xl font-sora text-4xl font-extrabold uppercase leading-[.95] tracking-[-.06em] sm:text-6xl lg:text-7xl">{title}</h1>
            <p className="mt-7 max-w-2xl font-inter text-base leading-7 text-white/65">{description}</p>
            <div className="mt-8"><MagneticBtn href="/contact">{cta} <ArrowRight size={15} /></MagneticBtn></div>
          </div>
          <div className="rounded-3xl border border-emerald-200/15 bg-black/20 p-6 shadow-2xl backdrop-blur">
            <div className="mb-5 flex items-center gap-3"><ShieldCheck className="text-[#34D399]" size={22} /><span className="font-sora text-sm font-semibold">CyberdykeTech standard</span></div>
            <ul className="space-y-3">{items.slice(0, 5).map((item) => <li key={item} className="flex gap-3 text-sm text-white/70"><CheckCircle2 size={17} className="mt-0.5 shrink-0 text-[#34D399]" />{item}</li>)}</ul>
          </div>
        </div>
      </section>
      <section className="border-y border-white/10 bg-black/10 py-20"><div className="mx-auto max-w-7xl px-6"><SectionEyebrow dark>What we offer</SectionEyebrow><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{items.map((item, index) => <article key={item} className="rounded-2xl border border-emerald-200/10 bg-[#0b3523]/70 p-6 transition hover:-translate-y-1 hover:border-[#34D399]/50"><span className="font-sora text-xs text-[#34D399]">0{index + 1}</span><h2 className="mt-5 font-sora text-lg font-semibold">{item}</h2><p className="mt-3 text-sm leading-6 text-white/55">Practical, business-focused support designed around your goals, delivered with clarity and care.</p></article>)}</div></div></section>
      <section className="mx-auto max-w-7xl px-6 py-20"><div className="max-w-2xl rounded-3xl border border-[#34D399]/25 bg-gradient-to-br from-[#0b3523] to-[#062817] p-8"><SectionEyebrow dark>{formTitle}</SectionEyebrow><h2 className="mt-4 font-sora text-3xl font-bold">Tell us what you want to build.</h2><form className="mt-7 grid gap-4 sm:grid-cols-2"><input aria-label="Full name" placeholder="Full name" className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none placeholder:text-white/35 focus:border-[#34D399]" /><input aria-label="Email" type="email" placeholder="Email address" className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none placeholder:text-white/35 focus:border-[#34D399]" /><textarea aria-label="Message" placeholder="How can we help?" rows={4} className="sm:col-span-2 rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none placeholder:text-white/35 focus:border-[#34D399]" /><MagneticBtn className="sm:col-span-2">Send enquiry <ArrowRight size={15} /></MagneticBtn></form></div></section>
    </main>
  )
}

export const programData = {
  training: { eyebrow: 'Professional training', title: 'LEARN TODAY. LEAD TOMORROW.', description: 'Develop practical cybersecurity and digital marketing skills through focused, career-ready programs from CyberdykeTech.', items: ['Cybersecurity Fundamentals', 'Ethical Hacking & Penetration Testing', 'Web Application Security', 'Digital Marketing Fundamentals', 'SEO, Ads & Content Strategy', 'Practical security labs', 'Portfolio-ready digital campaigns'], cta: 'Register for training', formTitle: 'Training registration' },
  internships: { eyebrow: 'Career launchpad', title: 'YOUR CAREER JOURNEY STARTS HERE.', description: 'Gain practical exposure to professional work environments and build confidence through meaningful CyberdykeTech internship experiences.', items: ['Cybersecurity', 'Digital Marketing', 'Website Development', 'Graphic Design', 'Video Editing', 'Mentorship and guided projects', 'Application status support'], cta: 'Apply for internship', formTitle: 'Internship application' },
  careers: { eyebrow: 'Join our team', title: 'BUILD YOUR CAREER WITH CYBERDYKETECH.', description: 'Work with a growing technology and digital solutions team that values integrity, learning, creativity, and professional execution.', items: ['Current openings', 'Technology and security roles', 'Digital growth roles', 'Creative production roles', 'Flexible professional environment', 'Skills-first opportunities'], cta: 'View opportunities', formTitle: 'Career enquiry' },
}
