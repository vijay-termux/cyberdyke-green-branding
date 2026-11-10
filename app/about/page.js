'use client'
import { motion } from 'framer-motion'
import { Nav, Footer, SectionEyebrow, MagneticBtn, Counter, PageHero, CTASection, LenisProvider } from '@/components/dua/DuaShell'
import { ArrowRight, Target, Eye, Sparkles, Zap, Palette, ShieldCheck, TrendingUp, Handshake, Award, Users, Globe2, Heart, Code2, Search, Video, Layers, Megaphone } from 'lucide-react'

const values = [
  { icon: Sparkles, title: 'Innovation', desc: 'Betting on tomorrow, not yesterday.' },
  { icon: Palette, title: 'Creativity', desc: 'Craft as competitive advantage.' },
  { icon: ShieldCheck, title: 'Transparency', desc: 'Real numbers. No smoke.' },
  { icon: TrendingUp, title: 'Results', desc: 'Measured, compounded, owned.' },
  { icon: Handshake, title: 'Long-term Partnerships', desc: 'We win when you win — for decades.' },
]

const team = [
  { icon: Palette, label: 'Creative Designers' },
  { icon: Code2, label: 'Developers' },
  { icon: Search, label: 'SEO Experts' },
  { icon: Megaphone, label: 'Marketing Specialists' },
  { icon: Video, label: 'Video Editors' },
  { icon: Layers, label: 'Brand Strategists' },
]

export default function AboutPage() {
  return (
    <LenisProvider>
      <div className="min-h-screen bg-white">
        <Nav />
        <PageHero eyebrow="About Us" title={<>We Don't Follow Trends.<br /><span className="bg-gradient-to-r from-[#4F8CFF] to-[#1565FF] bg-clip-text text-transparent">We Create Them.</span></>} subtitle="A creative digital agency helping brands grow through strategy, design, technology, and performance marketing — all under one roof." />

        {/* Story */}
        <section className="bg-white py-24">
          <div className="mx-auto max-w-5xl px-6">
            <div className="flex justify-center"><SectionEyebrow>Our Story</SectionEyebrow></div>
            <div className="mt-6 space-y-6 text-center">
              <p className="font-sora text-2xl font-medium leading-relaxed text-[#0A2A6E] md:text-3xl">
                CyberdykeTech (DUA) is a full-service digital agency helping businesses grow through creativity, technology, and performance marketing.
              </p>
              <p className="mx-auto max-w-2xl font-inter text-base leading-relaxed text-slate-500">
                We combine strategy, design, development, and marketing into one seamless experience that delivers measurable business results. From ambitious startups to Fortune 500 clients — we obsess over the craft, the data, and the outcome.
              </p>
            </div>
          </div>
        </section>

        {/* Founder */}
        <section className="bg-[#F7F9FC] px-5 py-20 sm:px-6 md:py-24">
          <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
            <SectionEyebrow>Meet the Founder</SectionEyebrow>
            <h2 className="mt-4 max-w-2xl font-sora text-3xl font-black leading-tight tracking-[-0.035em] text-[#0A2A6E] sm:text-4xl md:text-5xl">Building with purpose.</h2>
            <p className="mt-4 max-w-xl font-inter text-base leading-relaxed text-slate-500 md:text-lg">
              The person behind CyberdykeTech&apos;s vision, culture, and commitment to meaningful digital work.
            </p>
            <motion.article
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="mt-10 w-full max-w-[320px] overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#151515] text-left shadow-[0_24px_60px_-20px_rgba(10,20,30,0.4)]"
            >
              <img
                src="/about/founder-beernidi-vijaysagar.png"
                alt="BEERNIDI VIJAYSAGAR, Founder of CyberdykeTech"
                width="1200"
                height="1600"
                className="aspect-[4/5] w-full object-cover object-top"
              />
              <div className="px-6 py-5 sm:px-7 sm:py-6">
                <h3 className="font-sora text-2xl font-bold tracking-[-0.03em] text-white sm:text-3xl">Vijay Sagar</h3>
                <p className="mt-2 font-inter text-sm font-medium text-[#00D084] sm:text-base">Founder &amp; CEO | Cyberdyke Tech</p>
                <div className="mt-5 space-y-3 font-inter text-sm leading-relaxed text-white/65">
                  <p>Vijay Sagar leads Cyberdyke Tech with a vision to help businesses attract more customers, strengthen their digital presence, and grow through innovative technology.</p>
                  <p>By combining digital marketing, web development, and cybersecurity, he helps businesses turn digital challenges into growth opportunities.</p>
                </div>
                <div className="mt-5 border-t border-white/10 pt-4 font-inter text-sm leading-relaxed text-white/80">
                  <strong className="font-semibold text-white">Our Promise:</strong> More Visibility. Better Leads. Stronger Security.
                </div>
                <p className="mt-4 font-inter text-sm font-medium leading-relaxed text-white/90">Let&apos;s Grow Your Business Together with Cyberdyke Tech.</p>
              </div>
            </motion.article>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="bg-[#F7F9FC] py-24">
          <div className="mx-auto max-w-6xl px-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            {[
              { icon: Target, color: 'from-[#1565FF] to-[#0A84FF]', label: 'Mission', title: 'Helping businesses scale with innovative digital solutions.', desc: 'Every project is engineered to deliver a real, quantifiable outcome — not just a deliverable.' },
              { icon: Eye, color: 'from-[#0A2A6E] to-[#1565FF]', label: 'Vision', title: "To become India's most trusted creative digital agency.", desc: 'A place where the best creative, engineering, and marketing talent choose to do their best work.' },
            ].map((c, i) => {
              const Icon = c.icon
              return (
                <motion.div key={c.label}
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="group relative overflow-hidden rounded-3xl border border-[#E5EAF3] bg-white p-8 shadow-[0_10px_40px_-15px_rgba(10,42,110,0.1)] transition-all hover:-translate-y-1 hover:border-[#1565FF]/30 hover:shadow-[0_25px_50px_-15px_rgba(21,101,255,0.25)]">
                  <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${c.color} shadow-lg`}>
                    <Icon size={26} className="text-white" />
                  </div>
                  <div className="mt-5 font-sora text-[11px] font-bold uppercase tracking-[0.2em] text-[#1565FF]">{c.label}</div>
                  <h3 className="mt-2 font-sora text-2xl font-bold leading-snug text-[#0A2A6E]">{c.title}</h3>
                  <p className="mt-3 font-inter text-[14px] leading-relaxed text-slate-500">{c.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* Values */}
        <section className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-12 text-center">
              <div className="flex justify-center"><SectionEyebrow>Our Values</SectionEyebrow></div>
              <h2 className="mt-3 font-sora text-4xl font-black leading-[1.05] tracking-[-0.02em] text-[#0A2A6E] md:text-5xl">The things we won't compromise on.</h2>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
              {values.map((v, i) => {
                const Icon = v.icon
                return (
                  <motion.div key={v.title}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="rounded-2xl border border-[#E5EAF3] bg-white p-5 text-center shadow-sm transition-all hover:-translate-y-1 hover:border-[#1565FF]/30 hover:shadow-lg">
                    <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#1565FF] to-[#0A84FF]">
                      <Icon size={18} className="text-white" />
                    </div>
                    <div className="font-sora text-[15px] font-bold text-[#0A2A6E]">{v.title}</div>
                    <div className="mt-1 font-inter text-[11px] leading-relaxed text-slate-500">{v.desc}</div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="relative overflow-hidden bg-[#050A1F] py-24">
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="relative mx-auto max-w-7xl px-6">
            <div className="mb-12 text-center">
              <div className="flex justify-center"><SectionEyebrow dark>Our Team</SectionEyebrow></div>
              <h2 className="mt-3 font-sora text-4xl font-black leading-[1.05] tracking-[-0.02em] text-white md:text-5xl">One unified team.<br /><span className="text-[#4F8CFF]">Six deep disciplines.</span></h2>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
              {team.map((t, i) => {
                const Icon = t.icon
                return (
                  <motion.div key={t.label}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.06 }}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center backdrop-blur transition-all hover:border-[#4F8CFF]/50 hover:bg-white/[0.06]">
                    <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#1565FF] to-[#0A84FF]">
                      <Icon size={18} className="text-white" />
                    </div>
                    <div className="font-sora text-[14px] font-bold text-white">{t.label}</div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Numbers */}
        <section className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-10 text-center">
              <div className="flex justify-center"><SectionEyebrow>The Numbers</SectionEyebrow></div>
              <h2 className="mt-3 font-sora text-4xl font-black leading-[1.05] tracking-[-0.02em] text-[#0A2A6E] md:text-5xl">By the numbers.</h2>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                { icon: Award, value: 500, suffix: '+', label: 'Projects' },
                { icon: Users, value: 250, suffix: '+', label: 'Clients' },
                { icon: Globe2, value: 15, suffix: '+', label: 'Industries' },
                { icon: Heart, value: 98, suffix: '%', label: 'Client Satisfaction' },
              ].map((s, i) => {
                const Icon = s.icon
                return (
                  <motion.div key={s.label}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="rounded-2xl border border-[#E5EAF3] bg-white p-6 text-center shadow-sm">
                    <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#1565FF] to-[#0A84FF]"><Icon size={18} className="text-white" /></div>
                    <div className="font-sora text-4xl font-black tracking-tight text-[#0A2A6E] md:text-5xl"><Counter to={s.value} suffix={s.suffix} /></div>
                    <div className="mt-1 font-inter text-[12px] font-medium text-slate-500">{s.label}</div>
                  </motion.div>
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
