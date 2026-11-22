import { NextResponse } from 'next/server'
import { and, desc, eq, ilike, or, sql } from 'drizzle-orm'
import { db } from '@/lib/db'
import { careerApplications, certificateRecords, contactMessages, internshipApplications, students, trainingApplications } from '@/lib/db/schema'
import { requireAdmin } from '@/lib/admin-auth'

const collections = {
  contacts: { table: contactMessages, fields: ['fullName', 'email', 'phone', 'company', 'service', 'budget', 'message', 'status', 'privateNotes', 'createdAt', 'updatedAt'], searchable: ['fullName', 'email', 'phone', 'company'], status: true },
  training: { table: trainingApplications, fields: ['fullName', 'email', 'phone', 'course', 'education', 'college', 'mode', 'message', 'status', 'privateNotes', 'createdAt', 'updatedAt'], searchable: ['fullName', 'email', 'phone', 'course', 'college'], status: true },
  internships: { table: internshipApplications, fields: ['fullName', 'email', 'phone', 'college', 'qualification', 'domain', 'skills', 'duration', 'message', 'status', 'privateNotes', 'createdAt', 'updatedAt'], searchable: ['fullName', 'email', 'phone', 'domain', 'college'], status: true },
  careers: { table: careerApplications, fields: ['fullName', 'email', 'phone', 'position', 'experience', 'skills', 'linkedinUrl', 'message', 'status', 'privateNotes', 'createdAt', 'updatedAt'], searchable: ['fullName', 'email', 'phone', 'position'], status: true },
  students: { table: students, fields: ['id', 'studentCode', 'fullName', 'email', 'phone', 'profileImagePath', 'education', 'training', 'skills', 'portfolioUrl', 'visibility', 'status', 'createdAt', 'updatedAt'], searchable: ['studentCode', 'fullName', 'email', 'phone'], status: true },
  certificates: { table: certificateRecords, idField: 'certificateId', fields: ['certificateId', 'recipientName', 'programTitle', 'issuedOn', 'expiresOn', 'issuer', 'pdfPath', 'status', 'createdAt', 'updatedAt'], searchable: ['certificateId', 'recipientName', 'programTitle'], status: true },
}

export async function POST(request) {
  try {
    await requireAdmin()
    const body = await request.json()
    if (body.type === 'students') {
      const studentCode = typeof body.studentCode === 'string' ? body.studentCode.trim().toUpperCase() : ''
      const fullName = typeof body.fullName === 'string' ? body.fullName.trim() : ''
      if (!/^[A-Z0-9][A-Z0-9-]{2,39}$/.test(studentCode) || !fullName || fullName.length > 160) return NextResponse.json({ error: 'Enter a valid student code and full name.' }, { status: 400 })
      const skills = Array.isArray(body.skills) ? body.skills.filter(item => typeof item === 'string').map(item => item.trim().slice(0, 80)).filter(Boolean).slice(0, 30) : []
      let portfolioUrl = ''
      try {
        const parsedPortfolioUrl = new URL(typeof body.portfolioUrl === 'string' ? body.portfolioUrl.trim() : '')
        if (['https:', 'http:'].includes(parsedPortfolioUrl.protocol)) portfolioUrl = parsedPortfolioUrl.toString().slice(0, 500)
      } catch {}
      const [record] = await db.insert(students).values({
        studentCode, fullName,
        email: typeof body.email === 'string' ? body.email.trim().slice(0, 254) : '',
        phone: typeof body.phone === 'string' ? body.phone.trim().slice(0, 40) : '',
        profileImagePath: typeof body.profileImagePath === 'string' ? body.profileImagePath.slice(0, 500) : '',
        education: typeof body.education === 'string' ? { summary: body.education.trim().slice(0, 1200) } : {},
        training: typeof body.training === 'string' ? { summary: body.training.trim().slice(0, 1200) } : {},
        skills, portfolioUrl,
        visibility: body.visibility === 'public' ? 'public' : 'private',
        status: 'active',
      }).returning({ id: students.id })
      return NextResponse.json({ ok: true, id: record.id }, { status: 201 })
    }
    if (body.type === 'certificates') {
      const certificateId = typeof body.certificateId === 'string' ? body.certificateId.trim().slice(0, 120) : ''
      const recipientName = typeof body.recipientName === 'string' ? body.recipientName.trim().slice(0, 160) : ''
      const programTitle = typeof body.programTitle === 'string' ? body.programTitle.trim().slice(0, 200) : ''
      const issuedOn = typeof body.issuedOn === 'string' ? body.issuedOn : ''
      if (!certificateId || !recipientName || !programTitle || !/^\d{4}-\d{2}-\d{2}$/.test(issuedOn) || Number.isNaN(Date.parse(issuedOn))) return NextResponse.json({ error: 'Enter a certificate ID, recipient, program, and valid issue date.' }, { status: 400 })
      await db.insert(certificateRecords).values({
        certificateId, recipientName, programTitle, issuedOn,
        expiresOn: typeof body.expiresOn === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(body.expiresOn) ? body.expiresOn : null,
        issuer: typeof body.issuer === 'string' && body.issuer.trim() ? body.issuer.trim().slice(0, 160) : 'CyberdykeTech',
        pdfPath: typeof body.pdfPath === 'string' ? body.pdfPath.slice(0, 500) : '', status: 'valid',
      })
      return NextResponse.json({ ok: true }, { status: 201 })
    }
    return NextResponse.json({ error: 'Choose students or certificates.' }, { status: 400 })
  } catch (error) {
    const status = error.status || 500
    return NextResponse.json({ error: status === 401 ? 'Unauthorized.' : error.code === '23505' ? 'That student or certificate ID already exists.' : 'Unable to create this record.' }, { status })
  }
}

export async function GET(request) {
  try {
    await requireAdmin()
    const params = new URL(request.url).searchParams
    const type = params.get('type') || 'contacts'
    const config = collections[type]
    if (!config) return NextResponse.json({ error: 'Unknown record type.' }, { status: 400 })
    const page = Math.max(1, Number.parseInt(params.get('page') || '1', 10) || 1)
    const pageSize = Math.min(100, Math.max(1, Number.parseInt(params.get('pageSize') || '25', 10) || 25))
    const search = (params.get('search') || '').trim().slice(0, 120)
    const status = (params.get('status') || '').trim().slice(0, 40)
    const conditions = []
    if (search) conditions.push(or(...config.searchable.map(field => ilike(config.table[field], `%${search}%`))))
    if (status && config.status) conditions.push(eq(config.table.status, status))
    const where = conditions.length ? and(...conditions) : undefined
    const orderColumn = config.table.createdAt || config.table.issuedOn
    const [rows, countRows] = await Promise.all([
      db.select(Object.fromEntries(config.fields.map(field => [field, config.table[field]]))).from(config.table).where(where).orderBy(desc(orderColumn)).limit(pageSize).offset((page - 1) * pageSize),
      db.select({ count: sql`count(*)::int` }).from(config.table).where(where),
    ])
    return NextResponse.json({ records: rows, total: countRows[0]?.count || 0, page, pageSize })
  } catch (error) {
    const status = error.status || 500
    return NextResponse.json({ error: status === 401 ? 'Unauthorized.' : 'Unable to load records.' }, { status })
  }
}
