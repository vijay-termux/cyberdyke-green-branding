import { NextResponse } from 'next/server'
import { and, asc, eq, gte, ilike, lt, ne, or, sql } from 'drizzle-orm'
import { db } from '@/lib/db'
import { shootSchedules } from '@/lib/db/schema'
import { requireAdmin } from '@/lib/admin-auth'

export const runtime = 'nodejs'

const shootTypes = ['Product Shoot', 'Reels', 'Promotional Video', 'Interview', 'Corporate Shoot', 'Event Coverage', 'Other']
const statuses = ['Scheduled', 'Confirmed', 'In Progress', 'Completed', 'Cancelled']

export function validateSchedule(body) {
  const value = {
    clientName: typeof body.clientName === 'string' ? body.clientName.trim() : '',
    clientCompany: typeof body.clientCompany === 'string' ? body.clientCompany.trim() : '',
    contactPerson: typeof body.contactPerson === 'string' ? body.contactPerson.trim() : '',
    mobileNumber: typeof body.mobileNumber === 'string' ? body.mobileNumber.trim() : '',
    shootDate: typeof body.shootDate === 'string' ? body.shootDate.trim() : '',
    startTime: typeof body.startTime === 'string' && /^(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?$/.test(body.startTime.trim()) ? body.startTime.trim().slice(0, 5) : '',
    endTime: typeof body.endTime === 'string' && /^(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d(?:\.\d+)?)?$/.test(body.endTime.trim()) ? body.endTime.trim().slice(0, 5) : '',
    shootLocation: typeof body.shootLocation === 'string' ? body.shootLocation.trim() : '',
    shootType: typeof body.shootType === 'string' ? body.shootType : '',
    assignedPhotographer: typeof body.assignedPhotographer === 'string' ? body.assignedPhotographer.trim() : '',
    assignedTeamMembers: Array.isArray(body.assignedTeamMembers) ? body.assignedTeamMembers.filter(item => typeof item === 'string').map(item => item.trim()).filter(Boolean).slice(0, 30) : [],
    requirements: typeof body.requirements === 'string' ? body.requirements.trim() : '',
    specialInstructions: typeof body.specialInstructions === 'string' ? body.specialInstructions.trim() : '',
    status: typeof body.status === 'string' ? body.status : 'Scheduled',
  }
  const validDate = /^\d{4}-\d{2}-\d{2}$/.test(value.shootDate) && !Number.isNaN(Date.parse(`${value.shootDate}T00:00:00Z`)) && new Date(`${value.shootDate}T00:00:00Z`).toISOString().slice(0, 10) === value.shootDate
  const validTime = input => /^([01]\d|2[0-3]):[0-5]\d$/.test(input)
  if (!value.clientName || value.clientName.length > 160 || !value.contactPerson || value.contactPerson.length > 160 || !/^[+\d][\d\s().-]{5,38}$/.test(value.mobileNumber) || !validDate || !validTime(value.startTime) || !validTime(value.endTime) || value.endTime <= value.startTime || !value.shootLocation || value.shootLocation.length > 2000 || !shootTypes.includes(value.shootType) || !value.assignedPhotographer || value.assignedPhotographer.length > 160 || value.clientCompany.length > 200 || !statuses.includes(value.status) || value.requirements.length > 10000 || value.specialInstructions.length > 10000 || value.assignedTeamMembers.some(name => name.length > 160)) {
    return { error: 'Check required fields, contact number, date, time range, and selected shoot type/status.' }
  }
  return { value }
}

export async function conflictFor(schedule, ignoreId) {
  const conditions = [
    eq(shootSchedules.shootDate, schedule.shootDate),
    lt(shootSchedules.startTime, schedule.endTime),
    sql`${shootSchedules.endTime} > ${schedule.startTime}`,
    ne(shootSchedules.status, 'Cancelled'),
    or(
      eq(shootSchedules.assignedPhotographer, schedule.assignedPhotographer),
      sql`${shootSchedules.assignedTeamMembers} && ${schedule.assignedTeamMembers}::text[]`,
    ),
  ]
  if (ignoreId) conditions.push(sql`${shootSchedules.id} <> ${ignoreId}::uuid`)
  const [conflict] = await db.select({ id: shootSchedules.id, clientName: shootSchedules.clientName }).from(shootSchedules).where(and(...conditions)).limit(1)
  return conflict
}

export async function GET(request) {
  try {
    await requireAdmin()
    const params = new URL(request.url).searchParams
    const search = (params.get('search') || '').trim().slice(0, 120)
    const status = (params.get('status') || '').trim()
    const dateFilter = (params.get('date') || '').trim()
    const from = (params.get('from') || '').trim()
    const to = (params.get('to') || '').trim()
    const conditions = []
    if (search) conditions.push(or(ilike(shootSchedules.clientName, `%${search}%`), ilike(shootSchedules.clientCompany, `%${search}%`), ilike(shootSchedules.contactPerson, `%${search}%`)))
    if (statuses.includes(status)) conditions.push(eq(shootSchedules.status, status))
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateFilter)) conditions.push(eq(shootSchedules.shootDate, dateFilter))
    if (/^\d{4}-\d{2}-\d{2}$/.test(from)) conditions.push(gte(shootSchedules.shootDate, from))
    if (/^\d{4}-\d{2}-\d{2}$/.test(to)) conditions.push(sql`${shootSchedules.shootDate} <= ${to}`)
    const where = conditions.length ? and(...conditions) : undefined
    const [records, counts] = await Promise.all([
      db.select().from(shootSchedules).where(where).orderBy(asc(shootSchedules.shootDate), asc(shootSchedules.startTime)).limit(250),
      db.select({
        total: sql`count(*)::int`,
        upcoming: sql`count(*) filter (where status in ('Scheduled', 'Confirmed', 'In Progress') and shoot_date >= current_date)::int`,
        completed: sql`count(*) filter (where status = 'Completed')::int`,
        cancelled: sql`count(*) filter (where status = 'Cancelled')::int`,
      }).from(shootSchedules),
    ])
    return NextResponse.json({ records, metrics: counts[0] || { total: 0, upcoming: 0, completed: 0, cancelled: 0 } })
  } catch (error) {
    const status = error.status || 500
    return NextResponse.json({ error: status === 401 ? 'Unauthorized.' : 'Unable to load shoot schedules.' }, { status })
  }
}

export async function POST(request) {
  try {
    await requireAdmin()
    const parsed = validateSchedule(await request.json())
    if (parsed.error) return NextResponse.json({ error: parsed.error }, { status: 400 })
    const conflict = await conflictFor(parsed.value)
    if (conflict) return NextResponse.json({ error: `Schedule overlaps with ${conflict.clientName} for the assigned photographer or team.` }, { status: 409 })
    const [record] = await db.insert(shootSchedules).values(parsed.value).returning()
    return NextResponse.json({ record }, { status: 201 })
  } catch (error) {
    const status = error.status || 500
    return NextResponse.json({ error: status === 401 ? 'Unauthorized.' : 'Unable to create this shoot schedule.' }, { status })
  }
}
