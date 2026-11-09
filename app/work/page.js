'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Nav, Footer, SectionEyebrow, MagneticBtn, PageHero, CTASection, LenisProvider } from '@/components/dua/DuaShell'
import { ArrowUpRight, TrendingUp } from 'lucide-react'

const categories = ['All', 'Website Design', 'Meta Ads', 'Google Ads', 'SEO', 'Branding', 'Video Production', 'Content Creation']

const projects = [
  { slug: 'duroflex', title: 'Duroflex', cat: 'Meta Ads', metric: '+320%', mtag: 'Revenue Growth', img: '/work-photos/duroflex.jpg' },
  { slug: 'mothers-lap', title: "Mother's Lap", cat: 'Sleep & Wellness', metric: 'Brand', mtag: 'Growth Campaign', img: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Hcs1TGz0VH5fNOUzt6rWruITjBen5L.png' },
  { slug: 'crocodile', title: 'Crocodile', cat: 'Branding', metric: '+210%', mtag: 'Brand Awareness', img: '/work-photos/crocodile.jpg' },
  { slug: 'tata-play', title: 'Tata Play', cat: 'Google Ads', metric: '+280%', mtag: 'Lead Generation', img: '/work-photos/tata-play.jpg' },
  { slug: 'sleepycat', title: 'SleepyCat', cat: 'Website Design', metric: '+185%', mtag: 'Organic Traffic', img: '/work-photos/aurora.jpg' },
  { slug: 'duroflex', title: 'Nexus Fintech', cat: 'Website Design', metric: '+412%', mtag: 'MRR', img: '/work-photos/nexus.jpg' },
  { slug: 'crocodile', title: 'Orbit Studio', cat: 'Video Production', metric: '24M', mtag: 'Views', img: '/work-photos/orbit.jpg' },
  { slug: 'tata-play', title: 'Hyperion D2C', cat: 'Meta Ads', metric: '14.2x', mtag: 'ROAS', img: '/work-photos/aurora.jpg' },
  { slug: 'sleepycat', title: 'Aurora Labs', cat: 'SEO', metric: '+8k', mtag: 'Rankings Gained', img: '/work-photos/aurora.jpg' },
  { slug: 'crocodile', title: 'Vanguard Luxe', cat: 'Content Creation', metric: '3x', mtag: 'Retail Sales', img: '/work-photos/vanguard.jpg' },
]

const caseHighlights = [
  { label: 'Hero Image', tag: 'Visual' },
  { label: 'Challenge', tag: 'Discovery' },
  { label: 'Solution', tag: 'Strategy' },
  { label: 'Execution', tag: 'Delivery' },
  { label: 'Screenshots', tag: 'Proof' },
  { label: 'Before & After', tag: 'Impact' },
  { label: 'Traffic Growth', tag: 'Metric' },
  { label: 'Revenue Growth', tag: 'Metric' },
  { label: 'Lead Generation', tag: 'Metric' },
  { label: 'Client Testimonial', tag: 'Trust' },
]

export default function WorkPage() {
  const [active, setActive] = useState('All')
  const filtered = active === 'All' ? projects : projects.filter(p => p.cat === active)

  return (
    <LenisProvider>
      <div className="min-h-screen bg-white">
        <Nav />
        <PageHero eyebrow="Selected Work" title={<>Work That Speaks<br /><span className="bg-gradient-to-r from-[#4F8CFF] to-[#1565FF] bg-clip-text text-transparent">For Itself.</span></>} subtitle="250+ campaigns. 50+ brands. Real, measurable outcomes across every discipline we practice." />

        <section className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-6">
            {/* Filter tabs */}
            <div className="mb-10 flex flex-wrap justify-center gap-2">
              {categories.map((c) => (
                <button key={c} onClick={() => setActive(c)}
                  className={`rounded-full border px-4 py-2 font-sora text-[12px] font-semibold transition-all ${active === c ? 'border-transparent bg-[#1565FF] text-white shadow-[0_8px_20px_-6px_#1565FF]' : 'border-[#E5EAF3] bg-white text-[#0A2A6E] hover:border-[#1565FF]/30'}`}>
                  {c}
                </button>
              ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {filtered.map((p, i) => (
                  <motion.div key={p.title + i} layout
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.4, delay: i * 0.05 }}>
                    <Link href={`/work/${p.slug}`}
                    className="group relative block overflow-hidden rounded-2xl border border-[#E5EAF3] bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-[0_25px_50px_-15px_rgba(21,101,255,0.25)]">
                    <div className="relative aspect-[4/5] overflow-hidden bg-[#0A2A6E]">
                      <img src={p.img} alt={p.title} className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" onError={(e) => { e.target.style.display = 'none' }} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute inset-x-0 top-0 p-5">
                        <span className="inline-block rounded-full bg-white/15 px-3 py-1 font-sora text-[10px] font-bold uppercase tracking-[0.15em] text-white backdrop-blur">{p.cat}</span>
                      </div>
                      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                        <div>
                          <div className="font-sora text-2xl font-black text-white">{p.title}</div>
                          <div className="mt-1 font-sora text-3xl font-black text-white">{p.metric}</div>
                          <div className="font-inter text-[11px] font-medium text-white/80">{p.mtag}</div>
                        </div>
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1565FF] shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-45">
                          <ArrowUpRight size={16} className="text-white" />
                        </div>
                      </div>
                    </div>
                  </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Case study anatomy */}
        <section className="relative overflow-hidden bg-[#050A1F] py-24">
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="relative mx-auto max-w-7xl px-6">
            <div className="mb-12 text-center"><div className="flex justify-center"><SectionEyebrow dark>Every Case Study Includes</SectionEyebrow></div>
              <h2 className="mt-3 font-sora text-4xl font-black leading-[1.05] tracking-[-0.02em] text-white md:text-5xl">Full transparency.<br /><span className="text-[#4F8CFF]">Zero fluff.</span></h2>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
              {caseHighlights.map((h, i) => (
                <motion.div key={h.label}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.04 }}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur transition-all hover:border-[#4F8CFF]/50 hover:bg-white/[0.06]">
                  <div className="font-sora text-[10px] font-bold uppercase tracking-[0.2em] text-[#4F8CFF]">{h.tag}</div>
                  <div className="mt-1 font-sora text-[14px] font-bold text-white">{h.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <CTASection />
        <Footer />
      </div>
    </LenisProvider>
  )
}
