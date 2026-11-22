import { get } from '@vercel/blob'
import { NextResponse } from 'next/server'
import { and, eq, ne } from 'drizzle-orm'
import { db } from '@/lib/db'
import { students } from '@/lib/db/schema'

export async function GET(_request, { params }) {
  try {
    const { studentCode } = await params
    const [student] = await db.select({ profileImagePath: students.profileImagePath }).from(students).where(and(
      eq(students.studentCode, studentCode), eq(students.visibility, 'public'), ne(students.status, 'dropped'),
    )).limit(1)
    if (!student?.profileImagePath) return new NextResponse('Not found', { status: 404 })
    const file = await get(student.profileImagePath, { access: 'private' })
    if (!file) return new NextResponse('Not found', { status: 404 })
    return new NextResponse(file.stream, { headers: {
      'Content-Type': file.blob.contentType,
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    } })
  } catch {
    return new NextResponse('Unable to load image', { status: 500 })
  }
}
