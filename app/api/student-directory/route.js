import { NextResponse } from 'next/server'
import { ilike, or, and, eq, ne, asc } from 'drizzle-orm'
import { db } from '@/lib/db'
import { students } from '@/lib/db/schema'

export async function GET(request) {
  const search = new URL(request.url).searchParams.get('q')?.trim().slice(0, 100) || ''
  if (search.length < 2) return NextResponse.json({ profiles: [] })
  try {
    const profiles = await db.select({
      studentCode: students.studentCode,
      fullName: students.fullName,
      profileImagePath: students.profileImagePath,
      education: students.education,
      training: students.training,
      skills: students.skills,
      portfolioUrl: students.portfolioUrl,
      status: students.status,
    }).from(students).where(and(
      eq(students.visibility, 'public'),
      ne(students.status, 'dropped'),
      or(ilike(students.studentCode, `%${search}%`), ilike(students.fullName, `%${search}%`)),
    )).orderBy(asc(students.fullName)).limit(20)
    return NextResponse.json({ profiles: profiles.map(({ profileImagePath, ...profile }) => ({
      ...profile,
      photoUrl: profileImagePath ? `/api/student-directory/${encodeURIComponent(profile.studentCode)}/photo` : '',
    })) }, { headers: { 'Cache-Control': 'no-store' } })
  } catch {
    return NextResponse.json({ error: 'Student profiles are temporarily unavailable.' }, { status: 500 })
  }
}
