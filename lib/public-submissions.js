import { NextResponse } from 'next/server'
import { z } from 'zod'
import { db } from '@/lib/db'
import { careerApplications, contactMessages, internshipApplications, trainingApplications } from '@/lib/db/schema'

const submitters = new Map()
const baseFields = { fullName: z.string().trim().min(2).max(120), email: z.string().trim().email().max(254), phone: z.string().trim().min(7).max(32) }
const schemas = {
  contact: z.object({ ...baseFields, company: z.string().trim().max(160).optional().default(''), service: z.string().trim().max(120).optional().default(''), budget: z.string().trim().max(80).optional().default(''), message: z.string().trim().min(10).max(5000), website: z.string().max(0).optional() }),
  training: z.object({ ...baseFields, course: z.string().trim().min(2).max(160), education: z.string().trim().max(160).optional().default(''), college: z.string().trim().max(200).optional().default(''), mode: z.string().trim().max(80).optional().default(''), message: z.string().trim().max(5000).optional().default(''), website: z.string().max(0).optional() }),
  internship: z.object({ ...baseFields, college: z.string().trim().max(200).optional().default(''), qualification: z.string().trim().max(160).optional().default(''), domain: z.string().trim().min(2).max(160), skills: z.string().trim().max(1000).optional().default(''), duration: z.string().trim().max(80).optional().default(''), message: z.string().trim().max(5000).optional().default(''), website: z.string().max(0).optional() }),
  career: z.object({ ...baseFields, position: z.string().trim().min(2).max(160), experience: z.string().trim().max(80).optional().default(''), skills: z.string().trim().max(1000).optional().default(''), linkedinUrl: z.string().trim().url().max(500).optional().or(z.literal('')).default(''), message: z.string().trim().max(5000).optional().default(''), website: z.string().max(0).optional() }),
}

const tables = { contact: contactMessages, training: trainingApplications, internship: internshipApplications, career: careerApplications }

export async function submitPublicApplication(request, kind) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  const now = Date.now()
  const recent = submitters.get(ip)
  if (recent && recent.until > now && recent.count >= 5) return NextResponse.json({ error: 'Too many submissions. Please try again later.' }, { status: 429 })
  if (!recent || recent.until < now) submitters.set(ip, { count: 1, until: now + 60 * 60 * 1000 })
  else recent.count += 1

  try {
    if (Number(request.headers.get('content-length') || 0) > 24000) return NextResponse.json({ error: 'Submission is too large.' }, { status: 413 })
    const body = await request.json()
    const normalizedBody = kind === 'contact' ? { ...body, fullName: body.fullName || body.name } : body
    const parsed = schemas[kind]?.safeParse(normalizedBody)
    if (!parsed?.success) return NextResponse.json({ error: 'Please review the required fields and try again.' }, { status: 400 })
    if (parsed.data.website) return NextResponse.json({ ok: true })
    const { website, ...values } = parsed.data
    const table = tables[kind]
    await db.insert(table).values(values)
    return NextResponse.json({ ok: true }, { status: 201 })
  } catch (error) {
    console.error(`Public ${kind} submission failed:`, error.message)
    return NextResponse.json({ error: 'We could not save your submission. Please try again.' }, { status: 500 })
  }
}
