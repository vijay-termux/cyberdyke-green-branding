'use client'

import { ArrowRight, BriefcaseBusiness, MapPin } from 'lucide-react'
import { CTASection, Footer, MagneticBtn, Nav, PageHero, SectionEyebrow } from '@/components/dua/DuaShell'

export default function CareersPage() {
  return <main className="bg-[#062817] text-white"><Nav /><PageHero eyebrow="Join the team" title="Build your career with CyberdykeTech." subtitle="We publish active opportunities here when roles are available. Send us your profile to be considered for future openings." /><section className="bg-white py-20 text-[#0b2419]"><div className="mx-auto max-w-4xl px-6"><SectionEyebrow>Open positions</SectionEyebrow><div className="mt-8 rounded-3xl border border-dashed border-emerald-900/20 bg-[#f5fbf7] p-10 text-center"><BriefcaseBusiness className="mx-auto text-emerald-600" size={28} /><h2 className="mt-5 font-sora text-2xl font-bold">No active vacancies published</h2><p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[#557064]">There are no confirmed open positions at the moment. You can still introduce yourself and we will keep your details for relevant future opportunities.</p><MagneticBtn href="/contact" className="mt-7">Send Your Profile <ArrowRight size={15} /></MagneticBtn></div><div className="mt-8 flex items-center justify-center gap-2 text-sm text-[#557064]"><MapPin size={16} className="text-emerald-600" />Hyderabad, Telangana · Remote opportunities may vary</div></div></section><CTASection /><Footer /></main>
}
