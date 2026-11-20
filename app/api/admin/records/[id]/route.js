import { NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { careerApplications, certificateRecords, contactMessages, internshipApplications, students, trainingApplications } from '@/lib/db/schema'
import { requireAdmin } from '@/lib/admin-auth'

const tables = { contacts: contactMessages, training: trainingApplications, internships: internshipApplications, careers: careerApplications, students, certificates: certificateRecords }
const idFields = { contacts: 'id', training: 'id', internships: 'id', careers: 'id', students: 'id', certificates: 'certificateId' }

export async function PATCH(request, { params }) {
  try {
    await requireAdmin()
    const { id } = await params
    const type = new URL(request.url).searchParams.get('type')
    const table = tables[type]
    if (!table || typeof id !== 'string' || id.length > 128) return NextResponse.json({ error: 'Invalid record.' }, { status: 400 })
    const body = await request.json()
    const update = {}
    if (typeof body.status === 'string' && body.status.length <= 40) update.status = body.status
    if (typeof body.privateNotes === 'string') update.privateNotes = body.privateNotes.trim().slice(0, 5000)
    if (!Object.keys(update).length) return NextResponse.json({ error: 'No valid changes supplied.' }, { status: 400 })
    if (table.updatedAt) update.updatedAt = new Date()
    const idField = table[idFields[type]]
    const result = await db.update(table).set(update).where(eq(idField, id)).returning({ id: idField })
    if (!result.length) return NextResponse.json({ error: 'Record not found.' }, { status: 404 })
    return NextResponse.json({ ok: true })
  } catch (error) {
    const status = error.status || 500
    return NextResponse.json({ error: status === 401 ? 'Unauthorized.' : 'Unable to update record.' }, { status })
  }
}

export async function DELETE(request, { params }) {
  try {
    await requireAdmin()
    const { id } = await params
    const type = new URL(request.url).searchParams.get('type')
    const table = tables[type]
    if (!table || typeof id !== 'string' || id.length > 128) return NextResponse.json({ error: 'Invalid record.' }, { status: 400 })
    const idField = table[idFields[type]]
    await db.delete(table).where(eq(idField, id))
    return NextResponse.json({ ok: true })
  } catch (error) {
    const status = error.status || 500
    return NextResponse.json({ error: status === 401 ? 'Unauthorized.' : 'Unable to delete record.' }, { status })
  }
}
