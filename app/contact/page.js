'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Nav, Footer, SectionEyebrow, MagneticBtn, PageHero, LenisProvider } from '@/components/dua/DuaShell'
import { ArrowRight, Send, Phone, Mail, MessageCircle, MapPin, Calendar, Video, Clock, ChevronDown, Linkedin, Instagram, Youtube, Twitter } from 'lucide-react'

const faqs = [
  { q: 'What’s a typical project timeline?', a: 'Discovery + strategy runs 1–2 weeks. Design & development ranges from 3–8 weeks depending on scope. Performance marketing campaigns start delivering results within 2–4 weeks post launch.' },
  { q: 'How is pricing structured?', a: 'Most engagements are fixed-scope project pricing or monthly retainers. We’ll scope a proposal after a discovery call — no surprises, no ambiguous hourly rates.' },
  { q: 'What ongoing support do you provide?', a: '24/7 support for enterprise retainers. Standard support windows are business hours with SLAs for critical issues. Every client gets a dedicated project lead.' },
  { q: 'How does payment work?', a: 'We invoice via Razorpay / Stripe / bank transfer. Standard terms are 50/50 for projects, monthly upfront for retainers. Payment plans available for larger engagements.' },
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', service: '', budget: '', message: '' })
  const [status, setStatus] = useState('')
  const [openFaq, setOpenFaq] = useState(0)

  const submit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, message: `[${form.service} · ${form.budget}] ${form.phone ? '· ' + form.phone : ''}\n${form.message}` }) })
      if (res.ok) { setStatus('sent'); setForm({ name: '', email: '', phone: '', company: '', service: '', budget: '', message: '' }) } else setStatus('error')
    } catch { setStatus('error') }
  }

  const Field = ({ label, name, type = 'text', required = false, placeholder }) => (
    <div>
      <label className="mb-1.5 block font-sora text-[11px] font-medium uppercase tracking-wide text-white/60">{label} {required && <span className="text-[#4F8CFF]">*</span>}</label>
      <input type={type} required={required} value={form[name]} onChange={(e) => setForm({ ...form, [name]: e.target.value })} placeholder={placeholder}
        className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5 font-inter text-[13px] text-white outline-none transition placeholder:text-white/30 focus:border-[#4F8CFF] focus:bg-white/[0.08]" />
    </div>
  )

  return (
    <LenisProvider>
      <div className="min-h-screen bg-white">
        <Nav />
        <PageHero eyebrow="Contact" title={<>Let's Build Something<br /><span className="italic font-light text-[#B8D4FF]">Extraordinary.</span></>} subtitle="Share your project details and we'll respond within 24 hours with next steps." />

        {/* Form + Info */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#050A1F] via-[#0A1735] to-[#050A1F] py-20">
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="relative mx-auto max-w-7xl px-6">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
              {/* Info */}
              <div className="lg:col-span-2 space-y-3">
                {[
                  { icon: <Mail size={16} />, label: 'Email', value: 'duadigital.in@gmail.com' },
                  { icon: <Phone size={16} />, label: 'Phone', value: '+91 93918 56552' },
                  { icon: <MessageCircle size={16} />, label: 'WhatsApp', value: '+91 83414 96002' },
                  { icon: <MapPin size={16} />, label: 'Location', value: 'Hyderabad, India' },
                  { icon: <Clock size={16} />, label: 'Business Hours', value: 'Mon–Sat · 10am–7pm IST' },
                ].map((c, i) => (
                  <motion.div key={c.label}
                    initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1565FF]/20 text-[#4F8CFF]">{c.icon}</div>
                    <div>
                      <div className="font-sora text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">{c.label}</div>
                      <div className="font-sora text-[14px] font-semibold text-white">{c.value}</div>
                    </div>
                  </motion.div>
                ))}

                {/* Book a Meeting */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}
                  className="mt-6 rounded-xl border border-[#4F8CFF]/30 bg-gradient-to-br from-[#1565FF]/15 to-transparent p-5 backdrop-blur">
                  <div className="flex items-center gap-2"><Calendar size={16} className="text-[#4F8CFF]" /><span className="font-sora text-[12px] font-bold uppercase tracking-[0.2em] text-[#4F8CFF]">Book a Meeting</span></div>
                  <div className="mt-2 font-sora text-lg font-bold text-white">Free 30-min Strategy Call</div>
                  <p className="mt-1 font-inter text-[12px] text-white/60">Choose your preferred platform — no forms in between.</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <a href="#" className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 font-sora text-[11px] font-semibold text-white transition hover:bg-white/20"><Calendar size={11} /> Calendly</a>
                    <a href="#" className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 font-sora text-[11px] font-semibold text-white transition hover:bg-white/20"><Video size={11} /> Google Meet</a>
                    <a href="#" className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 font-sora text-[11px] font-semibold text-white transition hover:bg-white/20"><Video size={11} /> Zoom</a>
                  </div>
                </motion.div>

                {/* Map placeholder */}
                <div className="mt-4 overflow-hidden rounded-xl border border-white/10">
                  <iframe title="map" width="100%" height="180" style={{ border: 0, filter: 'invert(0.9) hue-rotate(180deg) saturate(0.5)' }} loading="lazy" allowFullScreen
                    src="https://maps.google.com/maps?q=Hyderabad,India&output=embed" />
                </div>

                <div className="mt-4 flex gap-2">
                  {[Linkedin, Instagram, Youtube, Twitter].map((I, i) => (
                    <a key={i} href="#" className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:bg-white/15"><I size={13} /></a>
                  ))}
                </div>
              </div>

              {/* Form */}
              <form onSubmit={submit} className="lg:col-span-3 rounded-2xl border border-white/10 bg-[#050A1F]/70 p-6 backdrop-blur-xl md:p-8">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Field label="Full Name" name="name" required placeholder="John Doe" />
                  <Field label="Email" name="email" type="email" required placeholder="john@company.com" />
                  <Field label="Phone" name="phone" type="tel" placeholder="+91 93918 56552" />
                  <Field label="Company" name="company" placeholder="Your brand" />
                  <div>
                    <label className="mb-1.5 block font-sora text-[11px] font-medium uppercase tracking-wide text-white/60">Service</label>
                    <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}
                      className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5 font-inter text-[13px] text-white outline-none focus:border-[#4F8CFF]">
                      <option value="" className="bg-[#050A1F]">Select a Service</option>
                      {['Digital Marketing', 'Website Design', 'SEO & Growth', 'Video Production', 'Branding', 'Social Media', 'Performance Marketing', 'Content Creation', 'Other'].map(s => <option key={s} className="bg-[#050A1F]">{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1.5 block font-sora text-[11px] font-medium uppercase tracking-wide text-white/60">Budget</label>
                    <select value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })}
                      className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5 font-inter text-[13px] text-white outline-none focus:border-[#4F8CFF]">
                      <option value="" className="bg-[#050A1F]">Select Range</option>
                      {['₹ 1–5 Lakhs', '₹ 5–10 Lakhs', '₹ 10–25 Lakhs', '₹ 25 Lakhs+', 'Not sure yet'].map(s => <option key={s} className="bg-[#050A1F]">{s}</option>)}
                    </select>
                  </div>
                </div>
                <div className="mt-4">
                  <label className="mb-1.5 block font-sora text-[11px] font-medium uppercase tracking-wide text-white/60">Project Details</label>
                  <textarea rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us about your goals, timeline, and what you're trying to achieve..."
                    className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2.5 font-inter text-[13px] text-white outline-none placeholder:text-white/30 focus:border-[#4F8CFF]" />
                </div>
                <button type="submit" disabled={status === 'sending'}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-br from-[#1565FF] to-[#0A84FF] px-6 py-3.5 font-sora text-[13px] font-semibold text-white shadow-[0_10px_30px_-8px_#1565FF] transition disabled:opacity-60">
                  {status === 'sending' ? 'Sending…' : status === 'sent' ? 'Message Sent ✓' : (<>Submit <Send size={13} /></>)}
                </button>
                {status === 'sent' && <div className="mt-3 text-center font-inter text-[12px] text-emerald-300">We'll be in touch within 24 hours.</div>}
                {status === 'error' && <div className="mt-3 text-center font-inter text-[12px] text-red-300">Something went wrong. Please try again.</div>}
              </form>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-white py-24">
          <div className="mx-auto max-w-4xl px-6">
            <div className="mb-10 text-center">
              <div className="flex justify-center"><SectionEyebrow>FAQ</SectionEyebrow></div>
              <h2 className="mt-3 font-sora text-4xl font-black leading-[1.05] tracking-[-0.02em] text-[#0A2A6E] md:text-5xl">Frequently Asked.</h2>
            </div>
            <div className="space-y-3">
              {faqs.map((f, i) => (
                <div key={f.q} className="overflow-hidden rounded-2xl border border-[#E5EAF3] bg-white">
                  <button onClick={() => setOpenFaq(openFaq === i ? -1 : i)} className="flex w-full items-center justify-between gap-4 p-5 text-left">
                    <span className="font-sora text-[15px] font-semibold text-[#0A2A6E]">{f.q}</span>
                    <ChevronDown size={18} className={`shrink-0 text-[#1565FF] transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === i && (
                      <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} transition={{ duration: 0.3 }}>
                        <div className="px-5 pb-5 font-inter text-[14px] leading-relaxed text-slate-500">{f.a}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </LenisProvider>
  )
}
