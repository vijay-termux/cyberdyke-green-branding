import { put } from '@vercel/blob'
import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin-auth'

export const runtime = 'nodejs'

const MAX_FILE_SIZE = 8 * 1024 * 1024

function isAllowedFile(bytes, type) {
  if (type === 'application/pdf') return bytes.subarray(0, 5).toString() === '%PDF-'
  if (type === 'image/png') return bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))
  if (type === 'image/jpeg') return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff
  if (type === 'image/webp') return bytes.subarray(0, 4).toString() === 'RIFF' && bytes.subarray(8, 12).toString() === 'WEBP'
  return false
}

export async function POST(request) {
  try {
    await requireAdmin()
    const form = await request.formData()
    const file = form.get('file')
    const category = form.get('category')
    if (!(file instanceof File) || !['certificate', 'student-photo'].includes(category)) return NextResponse.json({ error: 'Choose a supported file.' }, { status: 400 })
    const allowedTypes = category === 'certificate' ? ['application/pdf'] : ['image/jpeg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type) || file.size < 1 || file.size > MAX_FILE_SIZE) return NextResponse.json({ error: 'Choose a PDF or image up to 8 MB.' }, { status: 400 })
    const bytes = Buffer.from(await file.arrayBuffer())
    if (!isAllowedFile(bytes, file.type)) return NextResponse.json({ error: 'The file contents do not match the selected file type.' }, { status: 400 })
    const extension = file.type === 'application/pdf' ? 'pdf' : file.type.split('/')[1].replace('jpeg', 'jpg')
    const blob = await put(`${category}/${crypto.randomUUID()}.${extension}`, new Blob([bytes], { type: file.type }), {
      access: 'private',
      addRandomSuffix: false,
      contentType: file.type,
      cacheControlMaxAge: 60,
    })
    return NextResponse.json({ pathname: blob.pathname }, { status: 201 })
  } catch (error) {
    const status = error.status || 500
    return NextResponse.json({ error: status === 401 ? 'Unauthorized.' : 'Unable to upload this file.' }, { status })
  }
}
