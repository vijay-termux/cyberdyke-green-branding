import { NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { certificateRecords } from '@/lib/db/schema'

export async function GET(request) {
  const id = new URL(request.url).searchParams.get('id')?.trim().slice(0, 120)
  if (!id) return NextResponse.json({ error: 'Enter a certificate ID.' }, { status: 400 })
  try {
    const [record] = await db.select({ certificateId: certificateRecords.certificateId, recipientName: certificateRecords.recipientName, programTitle: certificateRecords.programTitle, issuedOn: certificateRecords.issuedOn, expiresOn: certificateRecords.expiresOn, issuer: certificateRecords.issuer, status: certificateRecords.status, pdfPath: certificateRecords.pdfPath }).from(certificateRecords).where(eq(certificateRecords.certificateId, id)).limit(1)
    if (!record) return NextResponse.json({ record: null }, { status: 404 })
    const expired = record.expiresOn && new Date(record.expiresOn) < new Date()
    const { pdfPath, ...publicRecord } = record
    const status = expired && record.status === 'valid' ? 'expired' : record.status
    return NextResponse.json({ record: { ...publicRecord, status, documentUrl: pdfPath && status === 'valid' ? `/api/certificate-verification/document?id=${encodeURIComponent(id)}` : '' } })
  } catch (error) {
    console.error('Certificate verification failed:', error.message)
    return NextResponse.json({ error: 'Verification is temporarily unavailable.' }, { status: 500 })
  }
}
