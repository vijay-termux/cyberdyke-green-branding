'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion'
import { ArrowUpRight, ArrowRight, Menu, X, Linkedin, Instagram, Youtube, Twitter } from 'lucide-react'
import Logo from './Logo'

export const SectionEyebrow = ({ children, dark }) => (
  <div className={`inline-flex items-center gap-2 font-sora text-[11px] font-semibold uppercase tracking-[0.24em] ${dark ? 'text-[#34D399]' : 'text-[#22C55E]'}`}>
    <span className="h-1.5 w-1.5 rounded-full bg-current shadow-[0_0_8px_currentColor]" />
    {children}
  </div>
)

export const MagneticBtn = ({ children, className = '', variant = 'primary', href, as: As = 'button', ...props }) => {
  const ref = useRef(null)
  const x = useMotionValue(0), y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 15 }), sy = useSpring(y, { stiffness: 220, damping: 15 })
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * 0.2)
    y.set((e.clientY - (r.top + r.height / 2)) * 0.2)
  }
  const onLeave = () => { x.set(0); y.set(0) }
  const styles = {
    primary: 'bg-gradient-to-br from-[#22C55E] to-[#14B8A6] text-white shadow-[0_10px_30px_-8px_#22C55E] hover:shadow-[0_15px_40px_-8px_#22C55E]',
    ghost: 'border border-white/20 bg-white/[0.03] text-white backdrop-blur hover:border-[#34D399]/70 hover:bg-white/[0.06]',
    outline: 'border border-[#34D399]/30 bg-white text-[#0b2419] hover:border-[#34D399] hover:bg-[#ecfff5]',
  }
  const cls = `group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-6 py-3 font-sora text-[13px] font-semibold transition-all duration-300 ${styles[variant]} ${className}`
  if (href) {
    return (
      <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={{ x: sx, y: sy, display: 'inline-block' }}>
        <Link href={href} className={cls}>
          <span className="relative z-10 flex items-center gap-2">{children}</span>
        </Link>
      </motion.div>
    )
  }
  return (
    <motion.button ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={{ x: sx, y: sy }} className={cls} {...props}>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  )
}

export const Counter = ({ to, suffix = '', duration = 2 }) => {
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
  return <span ref={ref}>{n}{suffix}</span>
}

const routes = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Training', href: '/training' },
  { label: 'Internships', href: '/internships' },
  { label: 'Certificate Verification', href: '/certificate-verification' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact Us', href: '/contact' },
]

export const Nav = () => {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <motion.nav initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}
      className="fixed left-0 right-0 top-0 z-50 px-4 pt-4">
      <div
        className={`mx-auto flex w-full max-w-7xl items-center justify-between gap-3 rounded-2xl px-3 py-3 transition-all sm:px-5 lg:gap-4 lg:px-6 ${
          scrolled
            ? 'border border-emerald-200/15 bg-[#062817]/88 backdrop-blur-xl shadow-[0_18px_60px_-30px_rgba(0,0,0,0.8)]'
            : ''
        }`}
      >
        <Link
          href="/"
          aria-label="CyberdykeTech home"
          className="flex min-w-0 shrink-0 items-center transition-transform hover:scale-[1.02]"
        >
          <Logo compact />
        </Link>

        <div className="hidden min-w-0 flex-1 items-center justify-center gap-0 min-[1200px]:flex">
          {routes.map((r) => {
            const active = pathname === r.href
            return (
              <Link key={r.href} href={r.href} aria-current={active ? 'page' : undefined}
                className={`group relative whitespace-nowrap rounded-full px-2 py-2 font-sora text-[12px] font-medium transition-colors 2xl:px-2.5 2xl:text-[13px] ${active ? 'text-white' : 'text-white/70 hover:text-white'}`}>
                {r.label}
                {active && <span className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#34D399] shadow-[0_0_8px_#34D399]" />}
              </Link>
            )
          })}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <div className="hidden sm:flex">
            <MagneticBtn href="/contact" className="!px-3 !py-2 sm:!px-4">Get Free Consultation <ArrowUpRight size={14} /></MagneticBtn>
          </div>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={open}
            aria-controls="mobile-site-navigation"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white min-[1200px]:hidden"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-site-navigation" className="mx-auto mt-2 max-w-7xl rounded-2xl border border-emerald-200/15 bg-[#062817]/95 p-3 backdrop-blur-xl min-[1200px]:hidden">
          {routes.map((r) => (
            <Link key={r.href} href={r.href} aria-current={pathname === r.href ? 'page' : undefined}
              className={`block rounded-lg px-4 py-3 font-sora text-sm font-medium ${pathname === r.href ? 'bg-white/5 text-white' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}>
              {r.label}
            </Link>
          ))}
        </div>
      )}
    </motion.nav>
  )
}

export const Footer = () => (
  <footer className="relative bg-[#030706] py-14">
    <div className="mx-auto max-w-7xl px-6">
      <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
        <div className="col-span-2">
          <div className="w-full max-w-[20rem] py-2">
            <Logo className="h-auto w-full" />
          </div>
          <p className="mt-4 max-w-xs font-inter text-[13px] leading-relaxed text-white/60">
            Secure. Defend. Grow. CyberdykeTech helps businesses protect their digital assets and build sustainable digital growth.
          </p>
          <div className="mt-5 flex gap-2">
            {[Linkedin, Instagram, Youtube, Twitter].map((I, i) => (
              <a key={i} href="#" className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/70 transition hover:border-[#34D399] hover:text-white">
                <I size={12} />
              </a>
            ))}
          </div>
        </div>
        <div>
          <div className="mb-3 font-sora text-[13px] font-bold text-white">Quick Links</div>
          <ul className="space-y-2">
            {routes.map((r) => (
              <li key={r.href}><Link href={r.href} className="font-inter text-[12px] text-white/60 transition hover:text-[#34D399]">{r.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <div className="mb-3 font-sora text-[13px] font-bold text-white">Services</div>
          <ul className="space-y-2">
            {['Cybersecurity', 'Digital Marketing', 'Website Development', 'Website Maintenance', 'Training Programmes', 'Content Production'].map(s => (
              <li key={s}><Link href="/services" className="font-inter text-[12px] text-white/60 transition hover:text-[#34D399]">{s}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <div className="mb-3 font-sora text-[13px] font-bold text-white">Resources</div>
          <ul className="space-y-2">
            {['Blog', 'Case Studies', 'FAQs', 'Careers', 'Privacy Policy', 'Terms & Conditions'].map(s => (
              <li key={s}><a href="#" className="font-inter text-[12px] text-white/60 transition hover:text-[#34D399]">{s}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="relative mt-10 flex flex-col items-center justify-center gap-3 border-t border-white/5 pt-6 md:min-h-14 md:flex-row">
        <div className="text-center font-inter text-[11px] text-white/40">+91 83414 96002 · LB Nagar, Hyderabad · © 2026 CyberdykeTech</div>
        <a href="#top" aria-label="Back to top" className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/70 transition hover:bg-white/10 md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 10V2M3 5l3-3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </a>
      </div>
    </div>
  </footer>
)

export const LenisProvider = ({ children }) => {
  useEffect(() => {
    let lenis, raf
    ;(async () => {
      try {
        const Lenis = (await import('lenis')).default
        lenis = new Lenis({ lerp: 0.08, smoothWheel: true })
        const tick = (t) => { lenis.raf(t); raf = requestAnimationFrame(tick) }
        raf = requestAnimationFrame(tick)
      } catch {}
    })()
    return () => { if (raf) cancelAnimationFrame(raf); if (lenis) lenis.destroy() }
  }, [])
  return children
}

export const PageHero = ({ eyebrow, title, subtitle, dark = true }) => (
  <section className="relative overflow-hidden pt-40 pb-20">
    <div className="absolute inset-0 bg-gradient-to-br from-[#030706] via-[#081234] to-[#030706]" />
    <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 30% 40%, rgba(34,197,94,0.12), transparent 50%), radial-gradient(circle at 70% 60%, rgba(20,184,166,0.08), transparent 50%)' }} />
    <div className="absolute inset-0 grid-bg opacity-30" />
    <div className="relative mx-auto max-w-5xl px-6 text-center">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex justify-center">
        <SectionEyebrow dark={dark}>{eyebrow}</SectionEyebrow>
      </motion.div>
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
        className="mt-5 font-sora text-5xl font-black leading-[1.02] tracking-[-0.03em] text-white md:text-7xl">
        {title}
      </motion.h1>
      {subtitle && (
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
          className="mx-auto mt-6 max-w-2xl font-inter text-[15px] leading-relaxed text-white/70 md:text-base">
          {subtitle}
        </motion.p>
      )}
    </div>
  </section>
)

export const CTASection = () => (
  <section className="relative overflow-hidden bg-white py-20">
    <div className="mx-auto max-w-6xl px-6">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#030706] via-[#0A2A6E] to-[#22C55E] p-10 md:p-16 shadow-[0_30px_80px_-20px_rgba(21,101,255,0.5)]">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#34D399]/30 blur-[80px]" />
        <div className="absolute -left-10 -bottom-10 h-60 w-60 rounded-full bg-[#22C55E]/20 blur-[70px]" />
        <div className="relative flex flex-col items-center gap-8 md:flex-row md:justify-between">
          <div>
            <SectionEyebrow dark>Ready to Grow</SectionEyebrow>
            <h2 className="mt-3 font-sora text-4xl font-black leading-[1.05] tracking-[-0.02em] text-white md:text-5xl">
              Let's Build Something<br />
              <span className="text-[#B8D4FF]">Amazing Together.</span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <MagneticBtn href="/contact">Start Your Project <ArrowRight size={14} /></MagneticBtn>
            <MagneticBtn href="/work" variant="ghost">View Our Work <ArrowUpRight size={14} /></MagneticBtn>
          </div>
        </div>
      </div>
    </div>
  </section>
)
