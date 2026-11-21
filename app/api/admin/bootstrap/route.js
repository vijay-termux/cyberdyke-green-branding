import { NextResponse } from 'next/server'
import { timingSafeEqual } from 'node:crypto'
import { createAdminClient } from '@/lib/supabase/admin'

export const runtime = 'nodejs'
const attempts = new Map()

function blocked(ip) {
  const now = Date.now()
  const current = attempts.get(ip)
  if (!current || current.until < now) {
    attempts.set(ip, { count: 1, until: now + 15 * 60 * 1000 })
    return false
  }
  current.count += 1
  return current.count > 5
}

export async function POST(request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  if (blocked(ip)) return NextResponse.json({ error: 'Too many setup attempts. Try again later.' }, { status: 429 })
  if (Number(request.headers.get('content-length') || 0) > 12000) return NextResponse.json({ error: 'Request too large.' }, { status: 413 })

  try {
    const { email, password, setupToken } = await request.json()
    const ownerEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase()
    const expectedToken = process.env.ADMIN_SETUP_TOKEN || ''
    const suppliedToken = typeof setupToken === 'string' ? setupToken : ''
    const tokenMatches = expectedToken.length > 0 && suppliedToken.length === expectedToken.length && timingSafeEqual(Buffer.from(suppliedToken), Buffer.from(expectedToken))

    if (!ownerEmail || !expectedToken || !tokenMatches || typeof email !== 'string' || email.trim().toLowerCase() !== ownerEmail || typeof password !== 'string' || password.length < 12 || password.length > 128) {
      return NextResponse.json({ error: 'Setup details are invalid or incomplete.' }, { status: 400 })
    }

    const supabase = createAdminClient()
    const { data: users, error: lookupError } = await supabase.auth.admin.listUsers({ page: 1, perPage: 100 })
    if (lookupError) throw lookupError
    if (users.users.some(user => user.email?.toLowerCase() === ownerEmail)) {
      return NextResponse.json({ error: 'The owner account has already been initialized.' }, { status: 409 })
    }

    const { error } = await supabase.auth.admin.createUser({ email: ownerEmail, password, email_confirm: true, app_metadata: { role: 'owner' } })
    if (error) throw error
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Admin bootstrap failed:', error.message)
    return NextResponse.json({ error: 'Unable to initialize the owner account.' }, { status: 500 })
  }
}
