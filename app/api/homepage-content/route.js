import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('cms_content_published')
      .select('payload, published_at')
      .eq('content_key', 'homepage-work')
      .maybeSingle()

    if (error) throw error

    return NextResponse.json(
      { publishedContent: data?.payload || null, publishedAt: data?.published_at || null },
      { headers: { 'Cache-Control': 'no-store, max-age=0' } },
    )
  } catch {
    return NextResponse.json({ error: 'Unable to load published homepage content.' }, { status: 503 })
  }
}
