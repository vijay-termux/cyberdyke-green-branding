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
  students: { table: students, fields: ['id', 'studentCode', 'fullName', 'email', 'phone', 'education', 'training', 'skills', 'portfolioUrl', 'visibility', 'status', 'createdAt', 'updatedAt'], searchable: ['studentCode', 'fullName', 'email', 'phone'], status: true },
  certificates: { table: certificateRecords, idField: 'certificateId', fields: ['certificateId', 'recipientName', 'programTitle', 'issuedOn', 'expiresOn', 'issuer', 'status', 'createdAt', 'updatedAt'], searchable: ['certificateId', 'recipientName', 'programTitle'], status: true },
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
