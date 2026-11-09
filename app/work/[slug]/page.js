'use client'
import { use } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { motion } from 'framer-motion'
import { Nav, Footer, SectionEyebrow, MagneticBtn, CTASection, LenisProvider } from '@/components/dua/DuaShell'
import { caseStudies } from '@/lib/dua-data'
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, Briefcase, Layers, TrendingUp, Star, ArrowUpRight } from 'lucide-react'

export default function CaseStudyPage({ params }) {
  const { slug } = use(params)
  const cs = caseStudies[slug]
  if (!cs) return notFound()

  const otherKeys = Object.keys(caseStudies).filter(k => k !== slug).slice(0, 3)

  return (
    <LenisProvider>
      <div className="min-h-screen bg-white">
        <Nav />

        {/* Hero */}
        <section className="relative overflow-hidden pt-32 pb-20">
          <div className={`absolute inset-0 bg-gradient-to-br ${cs.color}`} />
          <img src={cs.hero} alt={cs.title} className="absolute inset-0 h-full w-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          <div className="relative mx-auto max-w-6xl px-6">
            <Link href="/work" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.05] px-4 py-2 font-sora text-[12px] font-medium text-white backdrop-blur transition hover:bg-white/10">
              <ArrowLeft size={13} /> All Work
            </Link>
            <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 font-sora text-[11px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: cs.accent, boxShadow: `0 0 8px ${cs.accent}` }} />
                  {cs.category}
                </div>
                <h1 className="mt-4 font-sora text-6xl font-black leading-[0.95] tracking-[-0.03em] text-white md:text-8xl">{cs.title}</h1>
                <p className="mt-4 max-w-2xl font-sora text-xl font-medium text-white/80 md:text-2xl">{cs.tagline}</p>
              </div>
            </div>

            {/* Meta strip */}
            <div className="mt-10 grid grid-cols-2 gap-3 border-t border-white/10 pt-6 md:grid-cols-4">
              {[
                { icon: Clock, label: 'Duration', value: cs.duration },
                { icon: Briefcase, label: 'Industry', value: cs.industry },
                { icon: Layers, label: 'Services', value: cs.services.length + ' delivered' },
                { icon: TrendingUp, label: 'Result', value: cs.results[0].value + ' ' + cs.results[0].label.split(' ')[0] },
              ].map((m) => {
                const Icon = m.icon
                return (
                  <div key={m.label} className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 backdrop-blur"><Icon size={15} className="text-white" /></div>
                    <div>
                      <div className="font-sora text-[10px] font-bold uppercase tracking-[0.18em] text-white/50">{m.label}</div>
                      <div className="font-sora text-[13px] font-bold text-white">{m.value}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Challenge / Solution */}
        <section className="bg-white py-24">
          <div className="mx-auto max-w-6xl px-6 grid grid-cols-1 gap-8 md:grid-cols-2">
            {[
              { label: 'Challenge', body: cs.challenge },
              { label: 'Solution', body: cs.solution },
            ].map((b, i) => (
              <motion.div key={b.label}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl border border-[#E5EAF3] bg-white p-8 shadow-[0_10px_30px_-15px_rgba(10,42,110,0.1)]">
                <SectionEyebrow>{b.label}</SectionEyebrow>
                <p className="mt-4 font-inter text-[15px] leading-relaxed text-slate-600">{b.body}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Execution */}
        <section className="bg-[#F7F9FC] py-24">
          <div className="mx-auto max-w-5xl px-6">
            <div className="flex justify-center"><SectionEyebrow>Execution</SectionEyebrow></div>
            <h2 className="mt-3 text-center font-sora text-4xl font-black leading-[1.05] tracking-[-0.02em] text-[#0A2A6E] md:text-5xl">How we shipped it.</h2>
            <div className="mt-12 space-y-4">
              {cs.execution.map((e, i) => (
                <motion.div key={e.step}
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="flex gap-5 rounded-2xl border border-[#E5EAF3] bg-white p-6 shadow-sm transition hover:border-[#1565FF]/30">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#1565FF] to-[#0A84FF] font-sora text-[13px] font-black text-white shadow-lg">{String(i + 1).padStart(2, '0')}</div>
                  <div>
                    <div className="font-sora text-lg font-bold text-[#0A2A6E]">{e.step}</div>
                    <p className="mt-1 font-inter text-[14px] leading-relaxed text-slate-500">{e.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Screenshots gallery */}
        <section className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-10 text-center">
              <div className="flex justify-center"><SectionEyebrow>Screenshots</SectionEyebrow></div>
              <h2 className="mt-3 font-sora text-4xl font-black leading-[1.05] tracking-[-0.02em] text-[#0A2A6E] md:text-5xl">The work in the wild.</h2>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {cs.gallery.map((src, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
                  className={`overflow-hidden rounded-2xl border border-[#E5EAF3] ${i === 0 ? 'md:col-span-2 md:row-span-1' : ''}`}>
                  <img src={src} alt="" className="h-full w-full object-cover transition-transform duration-1000 hover:scale-105" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Before / After */}
        <section className="bg-[#F7F9FC] py-16">
          <div className="mx-auto max-w-5xl px-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-red-200/60 bg-red-50/50 p-6">
                <div className="font-sora text-[11px] font-bold uppercase tracking-[0.2em] text-red-500">Before</div>
                <div className="mt-2 font-sora text-lg font-bold text-[#0A2A6E]">{cs.beforeAfter.before}</div>
              </div>
              <div className="rounded-2xl border border-emerald-200/70 bg-emerald-50/50 p-6">
                <div className="font-sora text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-600">After</div>
                <div className="mt-2 font-sora text-lg font-bold text-[#0A2A6E]">{cs.beforeAfter.after}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Results grid */}
        <section className="relative overflow-hidden bg-[#050A1F] py-24">
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[100px]" style={{ background: cs.accent }} />
          <div className="relative mx-auto max-w-7xl px-6">
            <div className="mb-12 text-center">
              <div className="flex justify-center"><SectionEyebrow dark>The Results</SectionEyebrow></div>
              <h2 className="mt-3 font-sora text-4xl font-black leading-[1.05] tracking-[-0.02em] text-white md:text-5xl">Numbers that <span className="text-[#4F8CFF]">stuck.</span></h2>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {cs.results.map((r, i) => (
                <motion.div key={r.label}
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center backdrop-blur">
                  <div className="font-sora text-5xl font-black tracking-[-0.03em] text-white md:text-6xl">{r.value}</div>
                  <div className="mt-2 font-inter text-[12px] font-medium text-white/70">{r.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Services delivered */}
            <div className="mt-14">
              <div className="font-sora text-[11px] font-bold uppercase tracking-[0.25em] text-[#4F8CFF]">Services Delivered</div>
              <div className="mt-4 flex flex-wrap gap-2">
                {cs.services.map((s) => (
                  <div key={s} className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 font-sora text-[12px] font-medium text-white">
                    <CheckCircle2 size={13} className="text-[#4F8CFF]" /> {s}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="bg-white py-24">
          <div className="mx-auto max-w-4xl px-6">
            <div className="rounded-3xl border border-[#E5EAF3] bg-gradient-to-br from-white to-[#F7F9FC] p-10 shadow-[0_20px_60px_-20px_rgba(10,42,110,0.15)]">
              <div className="flex gap-1">{[...Array(5)].map((_, k) => <Star key={k} size={16} fill="#FBBF24" className="text-yellow-400" strokeWidth={0} />)}</div>
              <p className="mt-4 font-sora text-2xl font-medium leading-relaxed text-[#0A2A6E] md:text-3xl">“{cs.testimonial.quote}”</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#1565FF] to-[#0A84FF] font-sora text-sm font-bold text-white">{cs.testimonial.name.split(' ').map(x => x[0]).join('')}</div>
                <div>
                  <div className="font-sora text-sm font-bold text-[#0A2A6E]">{cs.testimonial.name}</div>
                  <div className="font-inter text-[12px] text-slate-500">{cs.testimonial.role}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* More case studies */}
        <section className="bg-[#F7F9FC] py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
              <div>
                <SectionEyebrow>More Work</SectionEyebrow>
                <h2 className="mt-3 font-sora text-3xl font-black leading-[1.05] tracking-[-0.02em] text-[#0A2A6E] md:text-4xl">Keep exploring.</h2>
              </div>
              <MagneticBtn href="/work" variant="outline">View All <ArrowRight size={13} /></MagneticBtn>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {otherKeys.map((k) => {
                const c = caseStudies[k]
                return (
                  <Link key={k} href={`/work/${c.slug}`} className="group block overflow-hidden rounded-2xl border border-[#E5EAF3] bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img src={c.hero} alt={c.title} className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-4">
                        <div className="font-sora text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">{c.category}</div>
                        <div className="font-sora text-xl font-black text-white">{c.title}</div>
                      </div>
                      <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 opacity-0 transition group-hover:opacity-100"><ArrowUpRight size={13} className="text-[#0A2A6E]" /></div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        <CTASection />
        <Footer />
      </div>
    </LenisProvider>
  )
}
