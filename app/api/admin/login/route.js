import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const runtime = 'nodejs'
const attempts = new Map()

export async function POST(request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  const now = Date.now()
  const entry = attempts.get(ip)
  if (entry && entry.until > now && entry.count >= 8) return NextResponse.json({ error: 'Too many sign-in attempts. Try again later.' }, { status: 429 })
  if (!entry || entry.until < now) attempts.set(ip, { count: 1, until: now + 15 * 60 * 1000 })
  else entry.count += 1

  try {
    const { email, password } = await request.json()
    const ownerEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase()
    if (!ownerEmail || typeof email !== 'string' || email.trim().toLowerCase() !== ownerEmail || typeof password !== 'string' || password.length > 128) {
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 })
    }

    const supabase = await createClient()
    const { data, error } = await supabase.auth.signInWithPassword({ email: ownerEmail, password })
    if (error || data.user?.email?.toLowerCase() !== ownerEmail) {
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 })
    }
    attempts.delete(ip)
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Unable to sign in right now.' }, { status: 500 })
  }
}
