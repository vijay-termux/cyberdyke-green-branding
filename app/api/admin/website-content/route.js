import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin-auth'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

const CONTENT_KEY = 'homepage-work'
const FALLBACK_CONTENT = {
  heading: 'Work That Speaks\nFor Itself.',
  buttonText: 'View All Projects',
  buttonUrl: '/work',
}

function validateContent(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null
  const heading = typeof value.heading === 'string' ? value.heading.trim() : ''
  const buttonText = typeof value.buttonText === 'string' ? value.buttonText.trim() : ''
  const buttonUrl = typeof value.buttonUrl === 'string' ? value.buttonUrl.trim() : ''
  const safeInternalUrl = buttonUrl.startsWith('/') && !buttonUrl.startsWith('//') && !/[\\\r\n]/.test(buttonUrl)

  if (!heading || heading.length > 160 || !buttonText || buttonText.length > 80 || !safeInternalUrl || buttonUrl.length > 300) return null

  return { heading, buttonText, buttonUrl }
}

export async function GET() {
  try {
    await requireAdmin()
    const supabase = await createClient()
    const [draftResult, publishedResult] = await Promise.all([
      supabase.from('cms_content_drafts').select('payload, updated_at').eq('content_key', CONTENT_KEY).maybeSingle(),
      supabase.from('cms_content_published').select('payload, published_at').eq('content_key', CONTENT_KEY).maybeSingle(),
    ])

    if (draftResult.error || publishedResult.error) throw draftResult.error || publishedResult.error

    return NextResponse.json({
      draftContent: validateContent(draftResult.data?.payload) || validateContent(publishedResult.data?.payload) || FALLBACK_CONTENT,
      publishedContent: validateContent(publishedResult.data?.payload) || FALLBACK_CONTENT,
      updatedAt: draftResult.data?.updated_at || null,
      publishedAt: publishedResult.data?.published_at || null,
    }, { headers: { 'Cache-Control': 'no-store, max-age=0' } })
  } catch (error) {
    const status = error.status || 500
    return NextResponse.json({ error: status === 401 ? 'Unauthorized.' : 'Unable to load website content.' }, { status })
  }
}

export async function PUT(request) {
  try {
    const user = await requireAdmin()
    const body = await request.json()
    const content = validateContent(body?.content)
    const mode = body?.mode

    if (!content || !['draft', 'publish'].includes(mode)) {
      return NextResponse.json({ error: 'Enter a heading, button label, and a valid internal button URL.' }, { status: 400 })
    }

    const supabase = await createClient()
    const { error: draftError } = await supabase.from('cms_content_drafts').upsert({
      content_key: CONTENT_KEY,
      payload: content,
      updated_at: new Date().toISOString(),
      updated_by: user.id,
    }, { onConflict: 'content_key' })

    if (draftError) throw draftError

    if (mode === 'publish') {
      const { error: publishError } = await supabase.from('cms_content_published').upsert({
        content_key: CONTENT_KEY,
        payload: content,
        published_at: new Date().toISOString(),
        published_by: user.id,
      }, { onConflict: 'content_key' })

      if (publishError) throw publishError
    }

    return NextResponse.json({ ok: true, mode, content }, { headers: { 'Cache-Control': 'no-store, max-age=0' } })
  } catch (error) {
    const status = error.status || 500
    return NextResponse.json({ error: status === 401 ? 'Unauthorized.' : 'Unable to save website content.' }, { status })
  }
}
