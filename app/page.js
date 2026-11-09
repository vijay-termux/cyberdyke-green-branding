'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import dynamic from 'next/dynamic'
import Logo from '@/components/dua/Logo'
import { Footer, CTASection, LenisProvider } from '@/components/dua/DuaShell'
import {
  ArrowRight,
  ArrowUpRight,
  TrendingUp,
  Search,
  Rocket,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Send,
  ChevronRight,
  ChevronLeft,
  Instagram,
  Youtube,
  Linkedin,
  Twitter,
  PenLine,
  Lightbulb,
  Globe2,
  Heart,
  BarChart3,
  Award,
  Users,
  Star,
} from 'lucide-react'

const Scene3D = dynamic(() => import('@/components/dua/Scene3D'), {
  ssr: false,
  loading: () => <div className="h-full w-full" />,
})

// ---------- Utilities ----------
const SectionEyebrow = ({ children, dark }) => (
  <div
    className={`inline-flex items-center gap-2 font-sora text-[11px] font-semibold uppercase tracking-[0.24em] ${
      dark ? 'text-[#34D399]' : 'text-[#22C55E]'
    }`}
  >
    <span className="h-1.5 w-1.5 rounded-full bg-current shadow-[0_0_8px_currentColor]" />
    {children}
  </div>
)

const MagneticBtn = ({
  children,
  className = '',
  variant = 'primary',
  ...props
}) => {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 15 })
  const sy = useSpring(y, { stiffness: 220, damping: 15 })

  const onMove = (e) => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * 0.2)
    y.set((e.clientY - (r.top + r.height / 2)) * 0.2)
  }

  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  const styles = {
    primary:
      'bg-gradient-to-r from-[#00D084] to-[#00B871] text-white shadow-[0_10px_25px_-5px_rgba(0,208,132,0.4)] hover:shadow-[0_15px_30px_-5px_rgba(0,208,132,0.6)]',
    ghost:
      'border border-white/20 bg-white/[0.03] text-white backdrop-blur hover:border-[#34D399]/70 hover:bg-white/[0.06]',
    outline:
      'border border-[#34D399]/30 bg-white text-[#0b2419] hover:border-[#34D399] hover:bg-[#ecfff5]',
    dark: 'bg-[#0b2419] text-white hover:bg-[#123d2a]',
  }

  return (
    <motion.button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 font-sora text-[13px] font-semibold transition-all duration-300 ${styles[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  )
}

// ---------- Top Navigation Bar ----------
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('Home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About Us', href: '#about-us' },
    { label: 'Services', href: '#services' },
    { label: 'Training', href: '/training' },
    { label: 'Internships', href: '/internships' },
    { label: 'Certificate Verification', href: '/verify' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact Us', href: '#contact' },
  ]

  return (
    <header className="fixed left-0 right-0 top-0 z-50 transition-all duration-300">
      <div
        className={`w-full transition-all duration-300 ${
          scrolled
            ? 'border-b border-emerald-900/40 bg-[#041d11]/90 backdrop-blur-md shadow-lg shadow-black/20'
            : 'bg-[#041d11]'
        }`}
      >
        <div className="mx-auto flex h-20 max-w-[1500px] items-center gap-4 px-4 sm:px-6">
          <Link href="/" aria-label="CyberdykeTech home" className="flex w-[220px] shrink-0 items-center lg:w-[250px]">
            <Logo className="w-full" />
          </Link>

          <nav className="hidden min-w-0 flex-1 items-center justify-end gap-4 lg:flex xl:gap-6">
            {navLinks.map((item) => {
              const isActive = activeTab === item.label
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setActiveTab(item.label)}
                  className={`group relative flex flex-col items-center py-2 font-inter text-[13px] font-medium transition-colors ${
                    isActive ? 'text-white font-semibold' : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <span className="leading-tight text-center">{item.label}</span>
                  {isActive && (
                    <span className="absolute -bottom-1 h-1.5 w-1.5 rounded-full bg-[#00D084] shadow-[0_0_8px_#00D084]" />
                  )}
                </Link>
              )
            })}
          </nav>

          <div className="hidden shrink-0 items-center lg:flex">
            <Link href="#contact">
              <button className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[#00D084] to-[#00B871] px-4 py-2.5 font-sora text-[12px] font-semibold text-white shadow-[0_0_20px_rgba(0,208,132,0.4)] transition-all duration-300 hover:shadow-[0_0_28px_rgba(0,208,132,0.7)] hover:scale-[1.02] xl:px-5 xl:text-[13px]">
                Get Free Consultation
                <ArrowUpRight size={15} />
              </button>
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-white lg:hidden"
            aria-label="Toggle Menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-b border-emerald-950 bg-[#041d11] px-6 py-6 lg:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="font-inter text-sm font-medium text-slate-300 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            <Link href="#contact" onClick={() => setMobileOpen(false)} className="mt-2">
              <button className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#00D084] to-[#00B871] py-3 text-sm font-semibold text-white">
                Get Free Consultation <ArrowUpRight size={15} />
              </button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

// ---------- Hero ----------
const Hero = () => {
  return (
    <section id="home" className="relative overflow-hidden pb-12 pt-32 md:pt-36 bg-[#041d11]">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 18% 20%, rgba(34,197,94,0.12), transparent 45%), radial-gradient(circle at 82% 70%, rgba(20,184,166,0.08), transparent 45%)',
        }}
      />
      <div className="pointer-events-none absolute -right-32 top-24 h-96 w-96 rounded-full bg-[#22C55E]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-4">
          <div className="relative z-20 flex flex-col justify-center">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <SectionEyebrow dark>We Don't Follow Trends</SectionEyebrow>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mt-4 font-sora text-[10vw] font-black leading-[1.0] tracking-[-0.03em] text-white md:text-[58px]"
            >
              SECURE YOUR BUSINESS.<br />
              <span className="bg-gradient-to-r from-[#34D399] to-[#22C55E] bg-clip-text text-transparent">
                ACCELERATE YOUR GROWTH.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 max-w-lg font-inter text-[15px] leading-relaxed text-white/70"
            >
              CyberdykeTech combines advanced cybersecurity expertise, creative digital marketing, and professional
              website solutions to help businesses protect their digital assets, strengthen their brand, and scale
              sustainably.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <MagneticBtn>
                Start Your Project <ArrowRight size={14} />
              </MagneticBtn>
              <MagneticBtn variant="ghost">
                View Our Work <ArrowUpRight size={14} />
              </MagneticBtn>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-10 flex items-center gap-4"
            >
              <div className="flex -space-x-3">
                {[
                  'from-orange-400 to-pink-500',
                  'from-blue-400 to-purple-500',
                  'from-emerald-400 to-teal-500',
                  'from-yellow-400 to-orange-500',
                  'from-rose-400 to-fuchsia-500',
                ].map((c, i) => (
                  <div
                    key={i}
                    className={`h-10 w-10 rounded-full border-2 border-[#041d11] bg-gradient-to-br ${c} flex items-center justify-center font-sora text-[10px] font-bold text-white shadow-md`}
                  >
                    {['R', 'A', 'M', 'V', 'S'][i]}
                  </div>
                ))}
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#041d11] bg-[#22C55E] font-sora text-[10px] font-bold text-white shadow-md">
                  250+
                </div>
              </div>
              <div>
                <div className="font-sora text-sm font-semibold text-white">Happy Clients</div>
                <div className="font-inter text-xs text-white/60">Worldwide</div>
              </div>
            </motion.div>
          </div>

          <div className="relative min-h-[480px] lg:min-h-[600px]">
            <div className="absolute inset-0">
              <Scene3D />
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30, y: -10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute right-2 top-4 z-30"
            >
              <div className="w-[210px] rounded-xl border border-white/15 bg-gradient-to-br from-[#0b3523]/95 to-[#062817]/95 p-4 backdrop-blur-xl shadow-[0_20px_60px_-15px_rgba(34,197,94,0.26)]">
                <div className="flex items-center justify-between">
                  <div className="font-sora text-[10px] font-bold uppercase tracking-[0.2em] text-white">Branding</div>
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-[#22C55E] to-[#14B8A6]">
                    <PenLine size={13} className="text-white" />
                  </div>
                </div>
                <ul className="mt-3 space-y-1.5">
                  {['Strategy', 'Identity', 'Positioning'].map((t) => (
                    <li key={t} className="font-inter text-[12px] text-white/80">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="absolute right-4 bottom-16 z-30"
            >
              <div className="w-[210px] rounded-xl border border-white/15 bg-gradient-to-br from-[#0b3523]/95 to-[#062817]/95 p-4 backdrop-blur-xl shadow-[0_20px_60px_-15px_rgba(34,197,94,0.26)]">
                <div className="flex items-center justify-between">
                  <div className="font-sora text-[10px] font-bold uppercase tracking-[0.2em] text-white">Growth</div>
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-[#22C55E] to-[#14B8A6]">
                    <BarChart3 size={13} className="text-white" />
                  </div>
                </div>
                <ul className="mt-3 space-y-1.5">
                  {['Traffic', 'Leads', 'Revenue'].map((t) => (
                    <li key={t} className="font-inter text-[12px] text-white/80">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="absolute left-2 bottom-24 z-30 hidden md:block"
            >
              <div className="rounded-xl border border-white/15 bg-white/95 p-3 shadow-xl">
                <div className="flex items-end gap-1 h-10">
                  {[40, 60, 45, 80, 65, 100, 90].map((h, i) => (
                    <div
                      key={i}
                      className="w-2 rounded-t bg-gradient-to-t from-[#22C55E] to-[#34D399]"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
                <div className="mt-2 flex items-center gap-1 text-[10px] font-semibold text-green-600">
                  <TrendingUp size={10} /> +284%
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ---------- Trust Bar ----------
const TrustBar = () => {
  const brands = ['Google', 'Meta', 'Microsoft', 'Amazon', 'Spotify', 'Notion', 'Slack']
  return (
    <section className="relative border-y border-white/5 bg-[#03170e] py-5">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-px bg-[#34D399]" />
          <div>
            <div className="font-sora text-[9px] font-semibold uppercase tracking-[0.25em] text-white/50">Trusted by</div>
            <div className="font-sora text-[11px] font-bold uppercase tracking-[0.15em] text-[#34D399]">
              Amazing Brands
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-x-10 gap-y-3">
          {brands.map((b) => (
            <div
              key={b}
              className="font-sora text-[16px] font-semibold text-white/70 transition-opacity hover:opacity-100 hover:text-white"
            >
              {b}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---------- Services ----------
const services = [
  { icon: '/services/digital-marketing.svg', title: 'Digital Marketing', desc: 'Data-driven campaigns that bring real results.' },
  { icon: '/services/web-design.svg', title: 'Website Development', desc: 'High-performance websites that convert visitors.' },
  { icon: '/services/seo.svg', title: 'SEO & Growth', desc: 'Rank higher, get found, and grow faster.' },
  { icon: '/services/video.svg', title: 'Video Production', desc: 'Cinematic content that tells your story.' },
  { icon: '/services/branding.svg', title: 'Brand Strategy', desc: 'Build a brand that stands out.' },
  { icon: '/services/social-media.svg', title: 'Social Media', desc: 'Engage audiences and build real connections.' },
]

const Services = () => (
  <section id="services" className="relative bg-[#F7F9FC] py-24">
    <div className="mx-auto max-w-7xl px-6">
      <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <SectionEyebrow>What We Do</SectionEyebrow>
          <h2 className="mt-3 font-sora text-4xl font-black leading-[1.05] tracking-[-0.02em] text-[#0b2419] md:text-5xl">
            Creative Solutions
            <br />
            That Drive{' '}
            <span className="relative">
              <span className="relative z-10 text-[#22C55E]">Real Growth.</span>
              <span className="absolute inset-x-0 bottom-1 h-2 bg-[#22C55E]/15" />
            </span>
          </h2>
        </div>
        <MagneticBtn variant="outline">
          Explore All Services <ArrowRight size={14} />
        </MagneticBtn>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: (i % 6) * 0.06 }}
          >
            <Link
              href="/services"
              className="group relative flex flex-col items-center h-full rounded-2xl border border-[#E5EAF3] bg-white p-6 text-center shadow-[0_2px_10px_rgba(10,42,110,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#22C55E]/30 hover:shadow-xl"
            >
              <div className="mb-4 h-20 w-20 transition-transform duration-500 group-hover:scale-105 flex items-center justify-center">
                <img
                  src={s.icon}
                  alt={s.title}
                  className="h-full w-full object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none'
                  }}
                />
              </div>
              <h3 className="font-sora text-[15px] font-bold text-[#0b2419]">{s.title}</h3>
              <p className="mt-1.5 font-inter text-[12px] leading-relaxed text-slate-500">{s.desc}</p>
              <div className="mt-auto pt-4">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#22C55E] text-white transition-all duration-300 group-hover:scale-110 group-hover:bg-[#0b2419]">
                  <ArrowRight size={13} />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

// ---------- Work ----------
const projects = [
  {
    title: 'Duroflex',
    cat: 'Performance Campaign',
    metric: '+320%',
    mtag: 'Revenue Growth',
    bg: 'from-emerald-950 via-teal-900 to-emerald-900',
    img: '/work-photos/duroflex.jpg',
    slug: 'duroflex',
  },
  {
    title: "Mother's Lap",
    cat: 'Sleep & Wellness',
    metric: 'Brand',
    mtag: 'Growth Campaign',
    bg: 'from-teal-950 via-emerald-900 to-green-950',
    img: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Hcs1TGz0VH5fNOUzt6rWruITjBen5L.png',
    slug: 'mothers-lap',
  },
  {
    title: 'Crocodile',
    cat: 'Branding & Strategy',
    metric: '+210%',
    mtag: 'Brand Awareness',
    bg: 'from-emerald-900 via-teal-900 to-emerald-950',
    img: '/work-photos/crocodile.jpg',
  },
  {
    title: 'Tata Play',
    cat: 'Performance Marketing',
    metric: '+280%',
    mtag: 'Lead Generation',
    bg: 'from-slate-900 via-emerald-950 to-slate-900',
    img: '/work-photos/tata-play.jpg',
  },
]

const Work = () => (
  <section id="work" className="relative overflow-hidden bg-[#041d11] py-24">
    <div className="relative mx-auto max-w-7xl px-6">
      <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <SectionEyebrow dark>Our Work</SectionEyebrow>
          <h2 className="mt-3 font-sora text-4xl font-black leading-[1.05] tracking-[-0.02em] text-white md:text-5xl">
            Work That Speaks
            <br />
            For <span className="text-[#34D399]">Itself.</span>
          </h2>
          <Link
            href="/work"
            className="mt-6 inline-flex items-center gap-2 font-sora text-[13px] font-semibold text-[#34D399] hover:text-white"
          >
            View All Projects <ArrowRight size={14} />
          </Link>
        </div>
        <div className="flex gap-2">
          <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/[0.03] text-white transition hover:bg-white/10">
            <ChevronLeft size={16} />
          </button>
          <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/[0.03] text-white transition hover:bg-white/10">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {projects.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
          >
            <Link
              href={p.slug ? `/work/${p.slug}` : '/work'}
              className="group relative block overflow-hidden rounded-2xl"
            >
              <div className={`relative aspect-[4/5] w-full overflow-hidden bg-gradient-to-br ${p.bg}`}>
                <img
                  src={p.img}
                  alt={p.title}
                  className="absolute inset-0 h-full w-full object-cover transition-all duration-1000 group-hover:scale-110"
                  onError={(e) => {
                    e.target.style.display = 'none'
                  }}
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${p.bg} mix-blend-multiply opacity-80`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/40" />

                <div className="absolute inset-x-0 top-0 p-5">
                  <h3 className="font-sora text-2xl font-black text-white drop-shadow-lg">{p.title}</h3>
                  <p className="mt-0.5 font-inter text-[12px] font-medium text-white/80">{p.cat}</p>
                </div>

                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                  <div>
                    <div className="font-sora text-3xl font-black text-white drop-shadow-lg">{p.metric}</div>
                    <div className="font-inter text-[11px] font-medium text-white/80">{p.mtag}</div>
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#22C55E] shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-45">
                    <ArrowRight size={15} className="text-white" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

// ---------- Counter & Why DUA ----------
const Counter = ({ to, suffix = '', duration = 2 }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start = null
    const step = (t) => {
      if (!start) start = t
      const p = Math.min((t - start) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setN(Math.floor(to * eased))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, to, duration])

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  )
}

const WhyDUA = () => (
  <section className="relative bg-white py-24">
    <div className="mx-auto max-w-7xl px-6">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-4">
          <SectionEyebrow>Why DUA</SectionEyebrow>
          <h2 className="mt-3 font-sora text-4xl font-black leading-[1.05] tracking-[-0.02em] text-[#0b2419] md:text-5xl">
            We Don't Do Average.
            <br />
            We Do{' '}
            <span className="relative">
              <span className="relative z-10 text-[#22C55E]">Impact.</span>
              <span className="absolute inset-x-0 bottom-1 h-2 bg-[#22C55E]/15" />
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-4 lg:col-span-5">
          {[
            {
              icon: (
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#22C55E] to-[#14B8A6] shadow-lg">
                  <div className="h-6 w-6 rounded bg-white/90" />
                </div>
              ),
              value: 500,
              suffix: '+',
              label: 'Projects Completed',
            },
            {
              icon: (
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#22C55E] to-[#14B8A6] shadow-lg">
                  <Heart size={26} fill="white" className="text-white" strokeWidth={0} />
                </div>
              ),
              value: 98,
              suffix: '%',
              label: 'Client Satisfaction',
            },
            {
              icon: (
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-[#22C55E] to-[#14B8A6] shadow-lg">
                  <Globe2 size={26} className="text-white" strokeWidth={2} />
                </div>
              ),
              value: 24,
              suffix: '/7',
              label: 'Industries Served',
            },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              {s.icon}
              <div className="mt-4 font-sora text-4xl font-black tracking-tight text-[#0b2419] md:text-5xl">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-1 font-inter text-[12px] font-medium text-slate-500">{s.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="lg:col-span-3">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-2xl bg-[#041d11] p-6 shadow-xl"
          >
            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#22C55E]/20 blur-2xl" />
            <div className="relative flex items-start justify-between gap-3">
              <div>
                <div className="font-sora text-[18px] font-bold leading-tight text-white">
                  Let's build something amazing together.
                </div>
                <Link href="#contact">
                  <button className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#22C55E] px-4 py-2 font-sora text-[12px] font-semibold text-white transition hover:bg-[#1db954]">
                    Get Started <ArrowRight size={12} />
                  </button>
                </Link>
              </div>
              <div className="text-6xl font-black text-[#34D399] leading-none">&</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  </section>
)

// ---------- About Us ----------
const About = () => (
  <section id="about-us" className="relative overflow-hidden bg-[#041d11] py-24">
    <div className="relative mx-auto max-w-7xl px-6">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionEyebrow dark>About Us</SectionEyebrow>
          <h2 className="mt-3 font-sora text-4xl font-black leading-[1.05] tracking-[-0.02em] text-white md:text-5xl">
            Digital Ideas.
            <br />
            Real <span className="text-[#34D399]">Business Results.</span>
          </h2>
          <p className="mt-5 max-w-lg font-inter text-[14px] leading-relaxed text-white/70">
            DUA (CyberdykeTech) is an integrated agency specializing in cybersecurity architecture, bespoke software
            engineering, and high-impact digital marketing. We merge creative vision with rigorous technological
            foundations.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3 max-w-md">
            {['Strategy First', 'Result Driven', 'Creative Excellence', 'Long Term Partnership'].map((t) => (
              <div key={t} className="flex items-center gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#22C55E]">
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2 6l3 3 5-6"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="font-inter text-[13px] font-medium text-white">{t}</span>
              </div>
            ))}
          </div>

          <MagneticBtn className="mt-8">
            Learn More About Us <ArrowRight size={14} />
          </MagneticBtn>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { icon: <Award size={18} className="text-[#34D399]" />, value: '5+', label: 'Years of Excellence' },
            { icon: <Heart size={18} fill="#34D399" strokeWidth={0} />, value: '250+', label: 'Happy Clients' },
            { icon: <Users size={18} className="text-[#34D399]" />, value: '15+', label: 'Expert Team' },
            { icon: <Globe2 size={18} className="text-[#34D399]" />, value: '12+', label: 'Countries Served' },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#22C55E]/15">{s.icon}</div>
              <div className="mt-2 font-sora text-3xl font-black text-white">{s.value}</div>
              <div className="font-inter text-[12px] text-white/60">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
)

// ---------- Process ----------
const processSteps = [
  { n: '01', title: 'Discover', desc: 'Understanding your brand and audience.', icon: Search },
  { n: '02', title: 'Strategize', desc: 'Building a powerful game plan.', icon: Lightbulb },
  { n: '03', title: 'Create', desc: 'Designing and developing with precision.', icon: PenLine },
  { n: '04', title: 'Launch', desc: 'Delivering and optimizing for real results.', icon: Rocket },
]

const Process = () => (
  <section id="process" className="relative bg-[#F7F9FC] py-24">
    <div className="mx-auto max-w-7xl px-6">
      <div className="mb-16">
        <SectionEyebrow>Our Process</SectionEyebrow>
        <h2 className="mt-3 font-sora text-4xl font-black leading-[1.05] tracking-[-0.02em] text-[#0b2419] md:text-5xl">
          A Creative Process
          <br />
          Built For{' '}
          <span className="relative">
            <span className="relative z-10 text-[#22C55E]">Growth.</span>
            <span className="absolute inset-x-0 bottom-1 h-2 bg-[#22C55E]/15" />
          </span>
        </h2>
      </div>

      <div className="relative">
        <div
          className="absolute left-[8%] right-[8%] top-8 hidden h-px md:block"
          style={{
            backgroundImage: 'linear-gradient(90deg, #22C55E 50%, transparent 50%)',
            backgroundSize: '10px 1px',
          }}
        />

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {processSteps.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative text-center"
              >
                <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#22C55E] to-[#14B8A6] shadow-lg">
                  <Icon size={22} className="text-white" strokeWidth={2.2} />
                </div>
                <div className="mt-5 font-sora text-2xl font-black text-[#22C55E]">{s.n}</div>
                <div className="mt-1 font-sora text-lg font-bold text-[#0b2419]">{s.title}</div>
                <p className="mt-2 mx-auto max-w-[180px] font-inter text-[12px] leading-relaxed text-slate-500">
                  {s.desc}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  </section>
)

// ---------- Testimonials ----------
const testimonials = [
  {
    name: 'Rohit Sharma',
    role: 'Founder, Duroflex',
    quote: 'DUA transformed our online presence. Their strategy and execution are outstanding!',
    color: 'from-orange-400 to-red-500',
    init: 'RS',
  },
  {
    name: 'Ananya Reddy',
    role: 'CMO, Tata Play',
    quote: 'Professional, creative and result-driven team. Highly recommended!',
    color: 'from-purple-500 to-pink-500',
    init: 'AR',
  },
  {
    name: 'Vikram Mehta',
    role: 'CEO, SleepyCat',
    quote: 'Our website and brand look world-class now. Amazing experience working with DUA!',
    color: 'from-blue-500 to-cyan-500',
    init: 'VM',
  },
]

const Testimonials = () => (
  <section className="relative bg-[#F0F4FB] py-24">
    <div className="mx-auto max-w-7xl px-6">
      <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <SectionEyebrow>Client Love</SectionEyebrow>
          <h2 className="mt-3 font-sora text-4xl font-black leading-[1.05] tracking-[-0.02em] text-[#0b2419] md:text-5xl">
            What Our Clients Say
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="rounded-2xl bg-white p-7 shadow-sm"
          >
            <div className="mb-3 text-5xl leading-none text-[#22C55E]/30 font-serif">"</div>
            <p className="font-inter text-[14px] leading-relaxed text-slate-700">{t.quote}</p>
            <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-4">
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br ${t.color} font-sora text-sm font-bold text-white`}
              >
                {t.init}
              </div>
              <div className="flex-1">
                <div className="font-sora text-[13px] font-bold text-[#0b2419]">{t.name}</div>
                <div className="font-inter text-[11px] text-slate-500">{t.role}</div>
                <div className="mt-1 flex gap-0.5">
                  {[...Array(5)].map((_, k) => (
                    <Star key={k} size={10} fill="#FBBF24" className="text-yellow-400" strokeWidth={0} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

// ---------- Insights ----------
const insights = [
  {
    tag: 'Marketing',
    title: 'The Rise of AI in Performance Marketing',
    excerpt: 'How machine learning is rewriting the playbook for paid media and creative testing.',
    date: 'Jun 12, 2025',
    read: '6 min read',
    img: '/insights-photos/seo.jpg',
  },
  {
    tag: 'Strategy',
    title: 'Building Brands That Outlast Trends',
    excerpt: 'A framework for creating brand systems that stay relevant across a decade.',
    date: 'May 28, 2025',
    read: '8 min read',
    img: '/insights-photos/speed.jpg',
  },
  {
    tag: 'Growth',
    title: 'From 3.2x to 14.2x ROAS: A Case Study',
    excerpt: 'The exact test-and-learn framework we used to unlock 4x growth for a D2C brand.',
    date: 'May 14, 2025',
    read: '5 min read',
    img: '/insights-photos/ai.jpg',
  },
]

const Insights = () => (
  <section id="insights" className="relative bg-white py-24">
    <div className="mx-auto max-w-7xl px-6">
      <div className="mb-10 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <SectionEyebrow>Insights</SectionEyebrow>
          <h2 className="mt-3 font-sora text-4xl font-black leading-[1.05] tracking-[-0.02em] text-[#0b2419] md:text-5xl">
            Ideas That{' '}
            <span className="relative">
              <span className="relative z-10 text-[#22C55E]">Drive Impact.</span>
              <span className="absolute inset-x-0 bottom-1 h-2 bg-[#22C55E]/15" />
            </span>
          </h2>
          <p className="mt-3 max-w-xl font-inter text-[14px] text-slate-500">
            Sharp perspectives on cybersecurity, web development, and brand growth.
          </p>
        </div>
        <MagneticBtn variant="outline">
          Read All Articles <ArrowRight size={14} />
        </MagneticBtn>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {insights.map((post, i) => (
          <motion.div
            key={post.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, delay: i * 0.1 }}
          >
            <Link
              href="/insights"
              className="group block overflow-hidden rounded-2xl border border-[#E5EAF3] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#22C55E]/30 hover:shadow-xl"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#0b2419]">
                <img
                  src={post.img}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  onError={(e) => {
                    e.target.style.display = 'none'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute left-4 top-4">
                  <span className="rounded-full bg-[#22C55E] px-3 py-1 font-sora text-[10px] font-bold uppercase tracking-[0.15em] text-white">
                    {post.tag}
                  </span>
                </div>
                <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 opacity-0 backdrop-blur transition-all duration-300 group-hover:opacity-100">
                  <ArrowUpRight size={15} className="text-[#0b2419]" />
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 font-sora text-[11px] font-medium text-slate-500">
                  <span>{post.date}</span>
                  <span className="h-1 w-1 rounded-full bg-slate-300" />
                  <span>{post.read}</span>
                </div>
                <h3 className="mt-3 font-sora text-lg font-bold leading-snug text-[#0b2419] transition-colors group-hover:text-[#22C55E]">
                  {post.title}
                </h3>
                <p className="mt-2 font-inter text-[13px] leading-relaxed text-slate-500">{post.excerpt}</p>
                <div className="mt-4 inline-flex items-center gap-1.5 font-sora text-[12px] font-semibold text-[#22C55E]">
                  Read more <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
)

// ---------- Contact ----------
const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', service: '', message: '' })
  const [status, setStatus] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, message: `[${form.service}] ${form.message}` }),
      })
      if (res.ok) {
        setStatus('sent')
        setForm({ name: '', email: '', service: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-[#041d11] py-20">
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-sora text-4xl font-black leading-[1.05] tracking-[-0.02em] text-white md:text-5xl">
              Let's Create
              <br />
              Something <span className="italic font-light text-[#34D399]">Extraordinary</span>
            </h2>
            <p className="mt-5 max-w-md font-inter text-[14px] leading-relaxed text-white/80">
              Share your project details and our team will get back to you within 24 hours.
            </p>

            <div className="mt-8 space-y-3">
              {[
                { icon: <Phone size={14} />, text: '+91 93918 56552' },
                { icon: <Mail size={14} />, text: 'duadigital.in@gmail.com' },
                { icon: <MapPin size={14} />, text: 'Hyderabad, India' },
              ].map((c, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white">
                    {c.icon}
                  </div>
                  <span className="font-inter text-[14px] text-white">{c.text}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex gap-2">
              {[Linkedin, Instagram, Youtube, Twitter].map((IconComponent, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition hover:bg-white/15"
                >
                  <IconComponent size={13} />
                </a>
              ))}
            </div>
          </div>

          <form onSubmit={submit} className="rounded-2xl border border-white/10 bg-[#062817]/60 p-6 backdrop-blur-xl md:p-8">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block font-sora text-[11px] font-medium uppercase tracking-wide text-white/60">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5 font-inter text-[13px] text-white outline-none transition placeholder:text-white/30 focus:border-[#34D399] focus:bg-white/[0.08]"
                />
              </div>
              <div>
                <label className="mb-1.5 block font-sora text-[11px] font-medium uppercase tracking-wide text-white/60">
                  Your Email
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="john@company.com"
                  className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5 font-inter text-[13px] text-white outline-none transition placeholder:text-white/30 focus:border-[#34D399] focus:bg-white/[0.08]"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="mb-1.5 block font-sora text-[11px] font-medium uppercase tracking-wide text-white/60">
                Service Interested In
              </label>
              <select
                value={form.service}
                onChange={(e) => setForm({ ...form, service: e.target.value })}
                className="w-full rounded-lg border border-white/10 bg-[#062817] px-3 py-2.5 font-inter text-[13px] text-white outline-none transition focus:border-[#34D399]"
              >
                <option value="">Select a Service</option>
                {[
                  'Cybersecurity Audit',
                  'Digital Marketing',
                  'Website Development',
                  'SEO & Growth',
                  'Video Production',
                  'Brand Strategy',
                ].map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-4">
              <label className="mb-1.5 block font-sora text-[11px] font-medium uppercase tracking-wide text-white/60">
                Tell us about your project...
              </label>
              <textarea
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="I'm looking for a digital security and website development solution..."
                className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5 font-inter text-[13px] text-white outline-none transition placeholder:text-white/30 focus:border-[#34D399] focus:bg-white/[0.08]"
              />
            </div>
            <button
              type="submit"
              disabled={status === 'sending'}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#00D084] to-[#00B871] px-6 py-3.5 font-sora text-[13px] font-semibold text-white shadow-lg transition hover:brightness-110 disabled:opacity-60"
            >
              {status === 'sending' ? 'Sending...' : status === 'sent' ? 'Message Sent ✓' : (
                <>
                  Send Message <Send size={13} />
                </>
              )}
            </button>
            {status === 'sent' && (
              <div className="mt-3 text-center font-inter text-[12px] text-emerald-300">
                We'll be in touch within 24 hours.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}

// ---------- Main App Component ----------
export default function App() {
  return (
    <LenisProvider>
      <div className="relative min-h-screen bg-[#041d11] text-[#0b2419]">
        <Navbar />
        <main>
          <Hero />
          <TrustBar />
          <Services />
          <Work />
          <WhyDUA />
          <About />
          <Process />
          <Testimonials />
          <Insights />
          <Contact />
        </main>
        <CTASection />
        <Footer />
      </div>
    </LenisProvider>
  )
}
