import { NextResponse } from 'next/server'
import { count, eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { careerApplications, certificateRecords, contactMessages, internshipApplications, students, trainingApplications } from '@/lib/db/schema'
import { requireAdmin } from '@/lib/admin-auth'

export async function GET() {
  try {
    await requireAdmin()
    const [studentCount, activeStudents, completedStudents, certificateCount, contacts, training, internships, careers, convertedLeads] = await Promise.all([
      db.select({ value: count() }).from(students),
      db.select({ value: count() }).from(students).where(eq(students.status, 'active')),
      db.select({ value: count() }).from(students).where(eq(students.status, 'completed')),
      db.select({ value: count() }).from(certificateRecords),
      db.select({ value: count() }).from(contactMessages),
      db.select({ value: count() }).from(trainingApplications),
      db.select({ value: count() }).from(internshipApplications),
      db.select({ value: count() }).from(careerApplications),
      db.select({ value: count() }).from(contactMessages).where(eq(contactMessages.status, 'converted')),
    ])
    const value = rows => Number(rows[0]?.value || 0)
    return NextResponse.json({
      students: value(studentCount), activeStudents: value(activeStudents), completedStudents: value(completedStudents), certificates: value(certificateCount),
      contacts: value(contacts), training: value(training), internships: value(internships), careers: value(careers), convertedLeads: value(convertedLeads),
    })
  } catch (error) {
    const status = error.status || 500
    return NextResponse.json({ error: status === 401 ? 'Unauthorized.' : 'Unable to load dashboard metrics.' }, { status })
  }
}
