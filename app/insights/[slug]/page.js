'use client'
import { use } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { motion } from 'framer-motion'
import { Nav, Footer, SectionEyebrow, CTASection, LenisProvider } from '@/components/dua/DuaShell'
import { articles } from '@/lib/dua-data'
import { ArrowLeft, ArrowRight, Calendar, Clock, User, Share2 } from 'lucide-react'

export default function ArticlePage({ params }) {
  const { slug } = use(params)
  const post = articles[slug]
  if (!post) return notFound()

  const otherKeys = Object.keys(articles).filter(k => k !== slug).slice(0, 2)

  return (
    <LenisProvider>
      <div className="min-h-screen bg-white">
        <Nav />

        {/* Hero */}
        <section className="relative overflow-hidden pt-32 pb-16">
          <div className="absolute inset-0 bg-gradient-to-br from-[#050A1F] via-[#081234] to-[#050A1F]" />
          <img src={post.hero} alt={post.title} className="absolute inset-0 h-full w-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          <div className="relative mx-auto max-w-4xl px-6">
            <Link href="/insights" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.05] px-4 py-2 font-sora text-[12px] font-medium text-white backdrop-blur transition hover:bg-white/10">
              <ArrowLeft size={13} /> All Insights
            </Link>
            <div className="mt-8 flex items-center gap-3">
              <span className="rounded-full bg-[#1565FF] px-3 py-1 font-sora text-[10px] font-bold uppercase tracking-[0.2em] text-white">{post.tag}</span>
              <span className="flex items-center gap-1.5 font-sora text-[11px] font-medium text-white/70"><Calendar size={11} /> {post.date}</span>
              <span className="flex items-center gap-1.5 font-sora text-[11px] font-medium text-white/70"><Clock size={11} /> {post.read}</span>
              <span className="flex items-center gap-1.5 font-sora text-[11px] font-medium text-white/70"><User size={11} /> {post.author}</span>
            </div>
            <h1 className="mt-5 font-sora text-4xl font-black leading-[1.05] tracking-[-0.03em] text-white md:text-6xl">{post.title}</h1>
            <p className="mt-4 max-w-3xl font-sora text-lg font-medium text-white/80">{post.excerpt}</p>
          </div>
        </section>

        {/* Feature image */}
        <section className="bg-white py-10">
          <div className="mx-auto max-w-5xl px-6">
            <img src={post.hero} alt={post.title} className="w-full rounded-2xl border border-[#E5EAF3] shadow-[0_30px_80px_-30px_rgba(10,42,110,0.3)]" />
          </div>
        </section>

        {/* Body */}
        <article className="bg-white py-16">
          <div className="mx-auto max-w-3xl px-6">
            <div className="space-y-10">
              {post.sections.map((s, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }} transition={{ duration: 0.5 }}>
                  <h2 className="font-sora text-2xl font-bold leading-snug text-[#0A2A6E] md:text-3xl">{s.h}</h2>
                  <p className="mt-3 font-inter text-[16px] leading-[1.8] text-slate-600">{s.p}</p>
                </motion.div>
              ))}
            </div>

            {/* Share bar */}
            <div className="mt-14 flex items-center justify-between border-t border-[#E5EAF3] pt-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#1565FF] to-[#0A84FF] font-sora text-[11px] font-bold text-white">DUA</div>
                <div>
                  <div className="font-sora text-[13px] font-bold text-[#0A2A6E]">{post.author}</div>
                  <div className="font-inter text-[11px] text-slate-500">Written by the DUA team</div>
                </div>
              </div>
              <button className="flex items-center gap-2 rounded-full border border-[#E5EAF3] bg-white px-4 py-2 font-sora text-[12px] font-semibold text-[#0A2A6E] transition hover:border-[#1565FF]/30 hover:bg-[#F3F7FF]">
                <Share2 size={13} /> Share
              </button>
            </div>
          </div>
        </article>

        {/* More articles */}
        <section className="bg-[#F7F9FC] py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-10">
              <SectionEyebrow>Keep Reading</SectionEyebrow>
              <h2 className="mt-3 font-sora text-3xl font-black leading-[1.05] tracking-[-0.02em] text-[#0A2A6E] md:text-4xl">More insights.</h2>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {otherKeys.map((k) => {
                const p = articles[k]
                return (
                  <Link key={k} href={`/insights/${p.slug}`} className="group block overflow-hidden rounded-2xl border border-[#E5EAF3] bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <img src={p.hero} alt={p.title} className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                      <div className="absolute left-4 top-4"><span className="rounded-full bg-[#1565FF] px-3 py-1 font-sora text-[10px] font-bold uppercase tracking-[0.15em] text-white">{p.tag}</span></div>
                    </div>
                    <div className="p-6">
                      <div className="font-sora text-[11px] text-slate-500">{p.date} · {p.read}</div>
                      <div className="mt-2 font-sora text-lg font-bold text-[#0A2A6E] group-hover:text-[#1565FF]">{p.title}</div>
                      <div className="mt-3 inline-flex items-center gap-1.5 font-sora text-[12px] font-semibold text-[#1565FF]">Read more <ArrowRight size={12} className="transition group-hover:translate-x-1" /></div>
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
