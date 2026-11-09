'use client'

import { CheckCircle2, ArrowRight, ShieldCheck, Megaphone, Code2, Wrench, GraduationCap, BriefcaseBusiness, Award, Phone } from 'lucide-react'
import { Nav, Footer, PageHero, MagneticBtn, SectionEyebrow, LenisProvider } from '@/components/dua/DuaShell'

const icons = { shield: ShieldCheck, marketing: Megaphone, web: Code2, maintenance: Wrench, training: GraduationCap, internship: BriefcaseBusiness, certificate: Award }

export default function SolutionPage({ eyebrow, title, subtitle, icon = 'shield', items, process = [], cta = 'Request a Consultation' }) {
  const Icon = icons[icon] || ShieldCheck
  return (
    <LenisProvider>
      <main className="min-h-screen bg-[#062817] text-white">
        <Nav />
        <PageHero eyebrow={eyebrow} title={title} subtitle={subtitle} />
        <section className="relative overflow-hidden py-20">
          <div className="absolute inset-0 bg-[#062817]" />
          <div className="relative mx-auto max-w-7xl px-6">
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <article key={item} className="group rounded-3xl border border-emerald-100/10 bg-[#0b3523]/70 p-6 backdrop-blur transition hover:-translate-y-1 hover:border-emerald-300/40">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#22C55E] to-[#14B8A6] shadow-lg shadow-emerald-500/20"><Icon size={21} /></div>
                  <h2 className="mt-5 font-sora text-xl font-bold">{item}</h2>
                  <p className="mt-3 font-inter text-sm leading-6 text-white/60">Professional, secure, and business-focused delivery designed around your goals.</p>
                  <a href="/contact" className="mt-5 inline-flex items-center gap-2 font-sora text-xs font-semibold text-[#7ee1ae]">Explore solution <ArrowRight size={14} /></a>
                </article>
              ))}
            </div>
          </div>
        </section>
        {process.length > 0 && <section className="border-y border-emerald-100/10 bg-[#041b10] py-20"><div className="mx-auto max-w-7xl px-6"><SectionEyebrow dark>Our approach</SectionEyebrow><div className="mt-8 grid gap-4 md:grid-cols-3 lg:grid-cols-6">{process.map((step, index) => <div key={step} className="rounded-2xl border border-emerald-100/10 bg-white/[0.03] p-5"><span className="font-sora text-xs text-[#7ee1ae]">0{index + 1}</span><p className="mt-3 font-sora text-sm font-semibold">{step}</p></div>)}</div></div></section>}
        <section className="mx-auto max-w-5xl px-6 py-24 text-center"><div className="rounded-[2rem] border border-emerald-200/15 bg-gradient-to-br from-[#0b3523] to-[#062817] p-10 md:p-16"><Phone className="mx-auto text-[#7ee1ae]" size={24} /><h2 className="mt-5 font-sora text-3xl font-black md:text-5xl">Ready to move forward?</h2><p className="mx-auto mt-4 max-w-xl text-white/60">Tell us what you want to achieve. We will map the right next step for your business or career.</p><div className="mt-8"><MagneticBtn href="/contact">{cta} <ArrowRight size={14} /></MagneticBtn></div></div></section>
        <Footer />
      </main>
    </LenisProvider>
  )
}

export const serviceData = {
  cybersecurity: { eyebrow: 'Cybersecurity Services', title: <>Secure your <span className="text-[#7ee1ae]">digital world.</span></>, subtitle: 'Protect applications, networks, cloud environments, and business-critical data with practical security expertise.', icon: 'shield', items: ['Vulnerability Assessment & Penetration Testing', 'Web Application Security Testing', 'Mobile & API Security Testing', 'Network & Cloud Security Assessment', 'Source Code Security Review', 'Security Monitoring & Vulnerability Management', 'Digital Forensics & Incident Response', 'DevSecOps Security & Consulting', 'Security Awareness Training'], process: ['Understand risk', 'Assess exposure', 'Prioritize findings', 'Remediate', 'Validate', 'Support'] },
  marketing: { eyebrow: 'Digital Marketing', title: <>Make your brand <span className="text-[#7ee1ae]">impossible to ignore.</span></>, subtitle: 'Creative strategy, content, advertising, and measurement that turns attention into meaningful growth.', icon: 'marketing', items: ['Social Media Management', 'SEO & Google Business Profile', 'Google Ads & Meta Ads', 'Content Strategy & Reels', 'Branding & Visual Identity', 'Professional Content Shoots', 'Video Editing & Motion Graphics', 'Lead Generation Campaigns', 'Monthly Marketing Management'], process: ['Understand', 'Research', 'Strategize', 'Create', 'Publish', 'Optimize'] },
  web: { eyebrow: 'Website Development', title: <>Websites that impress. <span className="text-[#7ee1ae]">Experiences that perform.</span></>, subtitle: 'Fast, secure, mobile-first websites designed to earn trust and support business growth.', icon: 'web', items: ['Business & Corporate Websites', 'E-commerce Development', 'Custom Web Applications', 'Landing Page Design', 'Website Redesign', 'Responsive UI Engineering', 'Website Security & Hosting Support', 'Performance Optimization', 'Search Engine Optimization'], process: ['Discover', 'Plan', 'Design', 'Build', 'Launch', 'Support'] },
  maintenance: { eyebrow: 'Website Maintenance', title: <>Keep your website <span className="text-[#7ee1ae]">healthy.</span></>, subtitle: 'Reliable updates, monitoring, backups, fixes, and support that keep your digital presence performing.', icon: 'maintenance', items: ['Regular Website Updates', 'Content Changes', 'Security Monitoring', 'Performance Optimization', 'Backup Support', 'Bug Fixing', 'Website Health Checks', 'Technical Support'], process: ['Audit', 'Secure', 'Update', 'Optimize', 'Monitor', 'Support'] },
  training: { eyebrow: 'Professional Training', title: <>Learn practical skills. <span className="text-[#7ee1ae]">Build your future.</span></>, subtitle: 'Career-ready cybersecurity and digital marketing programs built around practical learning.', icon: 'training', items: ['Cybersecurity Fundamentals', 'Ethical Hacking & Penetration Testing', 'Web Application Security', 'Network Security & SOC Analyst', 'Digital Marketing Fundamentals', 'SEO, Google Ads & Meta Ads', 'Content Creation & Strategy', 'Graphic Design & Video Editing'], process: ['Choose a path', 'Register', 'Learn', 'Practice', 'Review', 'Grow'], cta: 'Register for Training' },
  internship: { eyebrow: 'Internships', title: <>Your career journey <span className="text-[#7ee1ae]">starts here.</span></>, subtitle: 'Gain practical exposure in cybersecurity, marketing, web development, design, and video editing.', icon: 'internship', items: ['Cybersecurity Internship', 'Digital Marketing Internship', 'Website Development Internship', 'Graphic Design Internship', 'Video Editing Internship', 'Application Status Tracking'], process: ['Explore', 'Apply', 'Learn', 'Contribute', 'Review', 'Certify'], cta: 'Apply for Internship' },
  certificate: { eyebrow: 'Certificate Verification', title: <>Verify with <span className="text-[#7ee1ae]">confidence.</span></>, subtitle: 'Confirm the authenticity of certificates issued by CyberdykeTech using a certificate ID.', icon: 'certificate', items: ['Internship Certificates', 'Training Certificates', 'Workshop Certificates', 'QR Code Verification', 'Public Verification Result', 'Certificate Status Lookup'], process: ['Enter ID', 'Verify', 'Review result'], cta: 'Verify a Certificate' },
}

export const certificateData = serviceData.certificate

export function CertificateCard() { return <div /> }

export function FeatureList({ items }) { return <ul className="space-y-3">{items.map((item) => <li key={item} className="flex items-center gap-3 text-sm text-white/75"><CheckCircle2 size={16} className="text-[#7ee1ae]" />{item}</li>)}</ul> }
