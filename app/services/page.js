'use client'
import { motion } from 'framer-motion'
import { Nav, Footer, SectionEyebrow, MagneticBtn, PageHero, CTASection, LenisProvider } from '@/components/dua/DuaShell'
import { ArrowRight, ShieldCheck, Code2, Database, ScanSearch, RadioTower, Bug, Cloud, Network, ShieldAlert, Workflow, Megaphone, Search, Video, Palette, Share2, Compass, Lightbulb, PenLine, Rocket, TrendingUp, CheckCircle2 } from 'lucide-react'

const serviceGroups = [
  { icon: ShieldCheck, color: 'from-emerald-500 to-teal-600', title: 'Website Security & Maintenance', desc: 'Keep websites secure, current, and performing with continuous maintenance and timely vulnerability fixes.',
    items: ['Continuous Security Checks', 'Software & Dependency Updates', 'Vulnerability Fixes', 'Performance Maintenance', 'Security Configuration Reviews', 'Ongoing Website Support'] },
  { icon: Code2, color: 'from-indigo-500 to-blue-600', title: 'Web Development', desc: 'Professional, responsive websites built with security, accessibility, and performance in mind.',
    items: ['Responsive Websites', 'Secure Web Applications', 'Frontend Development', 'Custom Website Features', 'Accessibility Improvements', 'Performance Optimization'] },
  { icon: Database, color: 'from-blue-500 to-cyan-500', title: 'Backend Development & Maintenance', desc: 'Reliable server-side systems, databases, and integrations designed to support your business.',
    items: ['Backend Systems', 'Database Maintenance', 'API Integrations', 'Server-side Support', 'Data Validation', 'Service Reliability'] },
  { icon: ScanSearch, color: 'from-purple-500 to-fuchsia-500', title: 'Code Review & Security Auditing', desc: 'Analyze source code to identify security vulnerabilities, coding errors, and performance issues.',
    items: ['Source-code Analysis', 'Security Vulnerability Reviews', 'Coding Error Detection', 'Dependency Review', 'Performance Findings', 'Prioritized Recommendations'] },
  { icon: RadioTower, color: 'from-amber-500 to-orange-500', title: '24/7 SOC Monitoring', desc: 'Continuous security operations monitoring for threat detection, alerts, and incident response.',
    items: ['24/7 Security Monitoring', 'Threat Detection', 'Security Alerts', 'Incident Triage', 'Response Coordination', 'Monitoring Reports'] },
  { icon: Bug, color: 'from-red-500 to-orange-500', title: 'Penetration Testing', desc: 'Authorized security testing to identify and validate vulnerabilities within an agreed scope.',
    items: ['Website Testing', 'Application Testing', 'Network Testing', 'System Assessments', 'Vulnerability Validation', 'Remediation Guidance'] },
  { icon: Cloud, color: 'from-sky-500 to-blue-600', title: 'Cloud Security', desc: 'Assess cloud infrastructure configuration, access controls, and protective measures.',
    items: ['Cloud Configuration Reviews', 'Infrastructure Assessments', 'Access Management', 'Identity & Permission Reviews', 'Cloud Security Controls', 'Risk Recommendations'] },
  { icon: Workflow, color: 'from-pink-500 to-rose-500', title: 'API Security & Endpoint Testing', desc: 'Assess API endpoints, authentication, and access controls to uncover security weaknesses.',
    items: ['API Endpoint Assessments', 'Authentication Testing', 'Access-control Checks', 'Input Validation Reviews', 'Abuse-case Testing', 'Vulnerability Reporting'] },
  { icon: ShieldAlert, color: 'from-orange-500 to-red-600', title: 'Vulnerability Assessment', desc: 'Identify, analyze, prioritize, and report security weaknesses across your environment.',
    items: ['Security Weakness Identification', 'Risk Analysis', 'Severity Prioritization', 'Assessment Reports', 'Remediation Planning', 'Follow-up Validation'] },
  { icon: Network, color: 'from-teal-500 to-emerald-600', title: 'Network Security', desc: 'Review network security posture, configuration, and defenses against potential threats.',
    items: ['Network Assessments', 'Security Configuration Reviews', 'Exposure Analysis', 'Threat Protection Reviews', 'Network Segmentation Review', 'Improvement Recommendations'] },
  { icon: Megaphone, color: 'from-blue-500 to-cyan-500', title: 'Digital Marketing', desc: 'Data-driven campaigns that bring real results.',
    items: ['Campaign Strategy', 'Paid Advertising', 'Lead Generation', 'Campaign Analytics', 'Conversion Optimization'] },
  { icon: Search, color: 'from-emerald-500 to-teal-600', title: 'SEO & Growth', desc: 'Rank higher, get found, and grow faster.',
    items: ['Technical SEO', 'Keyword Research', 'On-page Optimization', 'Local SEO', 'Organic Growth'] },
  { icon: Video, color: 'from-red-500 to-orange-500', title: 'Video Production', desc: 'Cinematic content that tells your story.',
    items: ['Brand Films', 'Product Videos', 'Social Media Videos', 'Commercial Production', 'Editing & Post-production'] },
  { icon: Palette, color: 'from-purple-500 to-fuchsia-500', title: 'Brand Strategy', desc: 'Build a brand that stands out.',
    items: ['Brand Positioning', 'Visual Identity', 'Brand Messaging', 'Brand Guidelines', 'Creative Direction'] },
  { icon: Share2, color: 'from-pink-500 to-rose-500', title: 'Social Media', desc: 'Engage audiences and build real connections.',
    items: ['Social Media Strategy', 'Content Planning', 'Channel Management', 'Community Engagement', 'Performance Reporting'] },
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
        <PageHero eyebrow="Services" title={<>Solutions That Drive <span className="bg-gradient-to-r from-[#4F8CFF] to-[#1565FF] bg-clip-text text-transparent">Growth.</span></>} subtitle="Integrated cybersecurity, web development, and digital growth services to protect your business and help it reach more people." />

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
