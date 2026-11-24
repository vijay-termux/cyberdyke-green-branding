import { NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { shootSchedules } from '@/lib/db/schema'
import { requireAdmin } from '@/lib/admin-auth'
import { conflictFor, validateSchedule } from '../route'

export const runtime = 'nodejs'

export async function PATCH(request, { params }) {
  try {
    await requireAdmin()
    const { id } = await params
    if (!/^[0-9a-f-]{36}$/i.test(id)) return NextResponse.json({ error: 'Invalid schedule.' }, { status: 400 })
    const [current] = await db.select().from(shootSchedules).where(eq(shootSchedules.id, id)).limit(1)
    if (!current) return NextResponse.json({ error: 'Schedule not found.' }, { status: 404 })
    const parsed = validateSchedule({ ...current, ...await request.json() })
    if (parsed.error) return NextResponse.json({ error: parsed.error }, { status: 400 })
    const conflict = parsed.value.status === 'Cancelled' ? null : await conflictFor(parsed.value, id)
    if (conflict) return NextResponse.json({ error: `Schedule overlaps with ${conflict.clientName} for the assigned photographer or team.` }, { status: 409 })
    const [record] = await db.update(shootSchedules).set({ ...parsed.value, updatedAt: new Date() }).where(eq(shootSchedules.id, id)).returning()
    return NextResponse.json({ record })
  } catch (error) {
    const status = error.status || 500
    return NextResponse.json({ error: status === 401 ? 'Unauthorized.' : 'Unable to update this shoot schedule.' }, { status })
  }
}

export async function DELETE(request, { params }) {
  try {
    await requireAdmin()
    const { id } = await params
    if (!/^[0-9a-f-]{36}$/i.test(id)) return NextResponse.json({ error: 'Invalid schedule.' }, { status: 400 })
    const [record] = await db.delete(shootSchedules).where(eq(shootSchedules.id, id)).returning({ id: shootSchedules.id })
    if (!record) return NextResponse.json({ error: 'Schedule not found.' }, { status: 404 })
    return NextResponse.json({ ok: true })
  } catch (error) {
    const status = error.status || 500
    return NextResponse.json({ error: status === 401 ? 'Unauthorized.' : 'Unable to delete this shoot schedule.' }, { status })
  }
}
