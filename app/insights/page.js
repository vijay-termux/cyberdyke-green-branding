'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Nav, Footer, SectionEyebrow, MagneticBtn, PageHero, CTASection, LenisProvider } from '@/components/dua/DuaShell'
import { ArrowUpRight, ArrowRight, Search } from 'lucide-react'

const categories = ['All', 'Digital Marketing', 'SEO', 'Web Design', 'Branding', 'AI', 'Social Media', 'Business Growth', 'Performance Marketing']

const posts = [
  { slug: '10-meta-ads-mistakes', tag: 'Performance Marketing', title: '10 Meta Ads Mistakes Killing Your ROAS', excerpt: 'The most common (and expensive) errors we see brands make on Meta — and how to fix them.', date: 'Jun 18, 2025', read: '7 min', img: '/insights-photos/meta-ads.jpg' },
  { slug: 'how-seo-works-2026', tag: 'SEO', title: 'How SEO Works in 2026', excerpt: 'AI overviews, zero-click search, and what actually moves rankings in the post-Google-answer era.', date: 'Jun 12, 2025', read: '9 min', img: '/insights-photos/seo.jpg' },
  { slug: 'website-speed-guide-2025', tag: 'Web Design', title: 'The Website Speed Guide for 2025', excerpt: 'Sub-second load times without sacrificing craft. A pragmatic playbook for engineering teams.', date: 'Jun 04, 2025', read: '5 min', img: '/insights-photos/speed.jpg' },
  { slug: 'how-seo-works-2026', tag: 'Branding', title: 'Branding vs Marketing: The Real Difference', excerpt: 'Why great marketing without brand strategy is a treadmill — and how to build the flywheel.', date: 'May 28, 2025', read: '6 min', img: '/work-photos/vanguard.jpg' },
  { slug: '10-meta-ads-mistakes', tag: 'Digital Marketing', title: 'Google Ads Tips That Actually Move Numbers', excerpt: 'PMax, Demand Gen, and the campaign structures that separate 3x from 10x accounts.', date: 'May 20, 2025', read: '8 min', img: '/work-photos/nexus.jpg' },
  { slug: '10-meta-ads-mistakes', tag: 'Social Media', title: 'The Instagram Growth Strategy That Still Works', excerpt: 'How D2C brands are turning Reels into a compounding acquisition channel in 2025.', date: 'May 12, 2025', read: '7 min', img: '/insights-photos/meta-ads.jpg' },
  { slug: 'how-seo-works-2026', tag: 'AI', title: 'AI-Native Marketing: A Playbook', excerpt: 'From LLM-powered creative to autonomous bidding — what to adopt now, what to wait on.', date: 'May 04, 2025', read: '10 min', img: '/insights-photos/ai.jpg' },
  { slug: 'website-speed-guide-2025', tag: 'Business Growth', title: 'From 3.2x to 14.2x ROAS: A 90-Day Case Study', excerpt: 'The exact test-and-learn framework we used to unlock 4x growth for a D2C brand.', date: 'Apr 28, 2025', read: '5 min', img: '/work-photos/aurora.jpg' },
]

export default function InsightsPage() {
  const [active, setActive] = useState('All')
  const [query, setQuery] = useState('')
  const filtered = posts.filter(p => (active === 'All' || p.tag === active) && (p.title.toLowerCase().includes(query.toLowerCase()) || p.excerpt.toLowerCase().includes(query.toLowerCase())))

  return (
    <LenisProvider>
      <div className="min-h-screen bg-white">
        <Nav />
        <PageHero eyebrow="Insights" title={<>Ideas. <span className="bg-gradient-to-r from-[#4F8CFF] to-[#1565FF] bg-clip-text text-transparent">Strategies.</span> Growth.</>} subtitle="Sharp perspectives on marketing, growth, and brand — from the team behind 250+ campaigns." />

        <section className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-6">
            {/* Search + Filter */}
            <div className="mb-10 flex flex-col items-center gap-5">
              <div className="relative w-full max-w-xl">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search articles…"
                  className="w-full rounded-full border border-[#E5EAF3] bg-white py-3 pl-11 pr-4 font-inter text-sm text-[#0A2A6E] outline-none transition focus:border-[#1565FF]" />
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {categories.map((c) => (
                  <button key={c} onClick={() => setActive(c)}
                    className={`rounded-full border px-4 py-1.5 font-sora text-[11px] font-semibold transition-all ${active === c ? 'border-transparent bg-[#1565FF] text-white' : 'border-[#E5EAF3] bg-white text-[#0A2A6E] hover:border-[#1565FF]/30'}`}>
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {filtered.map((p, i) => (
                  <motion.div key={p.title + i} layout
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.4, delay: (i % 6) * 0.05 }}>
                    <Link href={`/insights/${p.slug}`}
                    className="group block overflow-hidden rounded-2xl border border-[#E5EAF3] bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-[#1565FF]/30 hover:shadow-[0_20px_50px_-15px_rgba(21,101,255,0.2)]">
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#0A2A6E]">
                      <img src={p.img} alt={p.title} className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" onError={(e) => { e.target.style.display = 'none' }} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute left-4 top-4"><span className="rounded-full bg-[#1565FF] px-3 py-1 font-sora text-[10px] font-bold uppercase tracking-[0.15em] text-white shadow-lg">{p.tag}</span></div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 font-sora text-[11px] font-medium text-slate-500">
                        <span>{p.date}</span><span className="h-1 w-1 rounded-full bg-slate-300" /><span>{p.read}</span>
                      </div>
                      <h3 className="mt-3 font-sora text-lg font-bold leading-snug text-[#0A2A6E] transition-colors group-hover:text-[#1565FF]">{p.title}</h3>
                      <p className="mt-2 font-inter text-[13px] leading-relaxed text-slate-500">{p.excerpt}</p>
                      <div className="mt-4 inline-flex items-center gap-1.5 font-sora text-[12px] font-semibold text-[#1565FF]">Read more <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" /></div>
                    </div>
                  </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            {filtered.length === 0 && (
              <div className="py-16 text-center font-inter text-sm text-slate-400">No articles match your search.</div>
            )}
          </div>
        </section>

        <CTASection />
        <Footer />
      </div>
    </LenisProvider>
  )
}
