'use client'
import { motion } from 'framer-motion'
import { Nav, Footer, SectionEyebrow, MagneticBtn, PageHero, CTASection, LenisProvider } from '@/components/dua/DuaShell'
import { ArrowRight, Megaphone, MonitorSmartphone, Search, Video, Palette, Share2, Target, PenLine, Compass, Lightbulb, Rocket, TrendingUp, CheckCircle2 } from 'lucide-react'

const serviceGroups = [
  { icon: Megaphone, color: 'from-blue-500 to-cyan-500', title: 'Digital Marketing', desc: 'End-to-end data-driven campaigns across every meaningful channel.',
    items: ['Meta Ads', 'Google Ads', 'Lead Generation', 'Remarketing', 'Performance Marketing', 'Conversion Optimization', 'Analytics', 'Monthly Reports'] },
  { icon: MonitorSmartphone, color: 'from-indigo-500 to-blue-600', title: 'Website Design', desc: 'Beautiful, blazing-fast websites engineered for conversion.',
    items: ['Corporate Websites', 'Landing Pages', 'E-commerce', 'Portfolio Websites', 'Custom Web Applications', 'Website Maintenance', 'Speed Optimization', 'Responsive Design'] },
  { icon: Search, color: 'from-emerald-500 to-teal-600', title: 'SEO', desc: 'Rank higher, get found, and win compounding organic growth.',
    items: ['Technical SEO', 'Local SEO', 'On-page SEO', 'Off-page SEO', 'Keyword Research', 'Content Optimization', 'Google Business Profile', 'SEO Audits'] },
  { icon: Video, color: 'from-red-500 to-orange-500', title: 'Video Production', desc: 'Cinematic content that moves audiences — and metrics.',
    items: ['Commercial Ads', 'Corporate Films', 'Product Videos', 'Social Media Reels', 'YouTube Videos', 'Drone Videos', 'Motion Graphics', 'Color Grading'] },
  { icon: Palette, color: 'from-purple-500 to-fuchsia-500', title: 'Branding', desc: 'Iconic identity systems that stay relevant across the decade.',
    items: ['Logo Design', 'Brand Identity', 'Brand Strategy', 'Packaging', 'Brand Guidelines', 'Stationery', 'Social Branding'] },
  { icon: Share2, color: 'from-pink-500 to-rose-500', title: 'Social Media', desc: 'Community-led content that builds real cultural presence.',
    items: ['Instagram Management', 'Facebook Marketing', 'LinkedIn Marketing', 'YouTube Marketing', 'Content Calendar', 'Creative Design', 'Community Management'] },
  { icon: PenLine, color: 'from-amber-500 to-orange-500', title: 'Content Creation', desc: 'Reels, shorts, photography, ad creatives — for the algorithm.',
    items: ['Photography', 'Reels', 'Product Shoots', 'Creative Copywriting', 'Ad Creatives', 'Graphic Design', 'AI Content'] },
]

const processSteps = [
  { icon: Compass, title: 'Discover', desc: 'Deep-dive research to understand your audience, competitors, and category dynamics.' },
  { icon: Lightbulb, title: 'Plan', desc: 'A clear north-star strategy with KPIs, roadmaps, and success measures.' },
  { icon: PenLine, title: 'Create', desc: 'World-class creative and engineering, obsessively crafted for impact.' },
  { icon: Rocket, title: 'Launch', desc: 'Coordinated multi-channel deployment with real-time monitoring.' },
  { icon: TrendingUp, title: 'Scale', desc: 'Continuous optimization loops that compound results month over month.' },
]

export default function ServicesPage() {
  return (
    <LenisProvider>
      <div className="min-h-screen bg-white">
        <Nav />
        <PageHero eyebrow="Services" title={<>Solutions That Drive <span className="bg-gradient-to-r from-[#4F8CFF] to-[#1565FF] bg-clip-text text-transparent">Growth.</span></>} subtitle="From strategy to execution, we help brands dominate the digital world with 60+ specialized capabilities under one roof." />

        {/* Services deep list */}
        <section className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-6 space-y-6">
            {serviceGroups.map((s, i) => {
              const Icon = s.icon
              return (
                <motion.div key={s.title}
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6 }}
                  className="group grid grid-cols-1 gap-6 rounded-3xl border border-[#E5EAF3] bg-white p-6 shadow-[0_4px_20px_rgba(10,42,110,0.04)] transition-all hover:border-[#1565FF]/30 hover:shadow-[0_20px_50px_-15px_rgba(21,101,255,0.2)] md:grid-cols-3 md:p-8">
                  <div className="flex flex-col justify-between md:col-span-1">
                    <div>
                      <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${s.color} shadow-lg`}>
                        <Icon size={26} className="text-white" strokeWidth={2} />
                      </div>
                      <div className="mt-4 font-sora text-3xl font-black text-[#0A2A6E]">{s.title}</div>
                      <p className="mt-3 max-w-sm font-inter text-[13px] leading-relaxed text-slate-500">{s.desc}</p>
                    </div>
                    <div className="mt-6 hidden md:block">
                      <MagneticBtn href="/contact" variant="outline">Discuss This <ArrowRight size={13} /></MagneticBtn>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 md:col-span-2 md:grid-cols-2 lg:grid-cols-2">
                    {s.items.map((it) => (
                      <div key={it} className="flex items-center gap-2 rounded-xl border border-[#E5EAF3] bg-[#F7F9FC] px-4 py-3 transition-all hover:border-[#1565FF]/30 hover:bg-[#EEF3FF]">
                        <CheckCircle2 size={15} className="shrink-0 text-[#1565FF]" />
                        <span className="font-sora text-[13px] font-medium text-[#0A2A6E]">{it}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* Process */}
        <section className="relative overflow-hidden bg-[#050A1F] py-24">
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="relative mx-auto max-w-7xl px-6">
            <div className="mb-14 text-center">
              <div className="flex justify-center"><SectionEyebrow dark>Our Process</SectionEyebrow></div>
              <h2 className="mt-3 font-sora text-4xl font-black leading-[1.05] tracking-[-0.02em] text-white md:text-5xl">
                Five phases. <span className="text-[#4F8CFF]">One result.</span>
              </h2>
            </div>
            <div className="relative">
              <div className="absolute left-[10%] right-[10%] top-8 hidden h-px md:block" style={{ backgroundImage: 'linear-gradient(90deg, #4F8CFF 50%, transparent 50%)', backgroundSize: '10px 1px' }} />
              <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
                {processSteps.map((s, i) => {
                  const Icon = s.icon
                  return (
                    <motion.div key={s.title}
                      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
                      className="relative text-center">
                      <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#1565FF] to-[#0A84FF] shadow-[0_10px_30px_-8px_rgba(21,101,255,0.5)]">
                        <Icon size={22} className="text-white" />
                      </div>
                      <div className="mt-5 font-sora text-xl font-bold text-white">{s.title}</div>
                      <p className="mt-2 mx-auto max-w-[180px] font-inter text-[12px] leading-relaxed text-white/60">{s.desc}</p>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        <CTASection />
        <Footer />
      </div>
    </LenisProvider>
  )
}
