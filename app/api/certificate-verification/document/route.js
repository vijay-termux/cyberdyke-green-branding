import { get } from '@vercel/blob'
import { NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { certificateRecords } from '@/lib/db/schema'

export async function GET(request) {
  const id = new URL(request.url).searchParams.get('id')?.trim().slice(0, 120)
  if (!id) return new NextResponse('Not found', { status: 404 })
  try {
    const [record] = await db.select({ pdfPath: certificateRecords.pdfPath, expiresOn: certificateRecords.expiresOn, status: certificateRecords.status })
      .from(certificateRecords).where(eq(certificateRecords.certificateId, id)).limit(1)
    const expired = record?.expiresOn && new Date(record.expiresOn) < new Date()
    if (!record?.pdfPath || record.status !== 'valid' || expired) return new NextResponse('Not found', { status: 404 })
    const file = await get(record.pdfPath, { access: 'private' })
    if (!file) return new NextResponse('Not found', { status: 404 })
    return new NextResponse(file.stream, { headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="certificate.pdf"',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    } })
  } catch {
    return new NextResponse('Unable to load certificate', { status: 500 })
  }
}
