import { NextResponse } from 'next/server'
import { desc } from 'drizzle-orm'
import { requireAdmin } from '@/lib/admin-auth'
import { db } from '@/lib/db'
import { contactMessages } from '@/lib/db/schema'

export async function GET() {
  try {
    await requireAdmin()
    const leads = await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt)).limit(100)
    return NextResponse.json(leads)
  } catch (error) {
    return NextResponse.json({ error: error.status === 401 ? 'Unauthorized.' : 'Unable to load leads.' }, { status: error.status || 500 })
  }
}
