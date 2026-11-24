import { NextResponse } from 'next/server'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import { eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { shootSchedules } from '@/lib/db/schema'
import { requireAdmin } from '@/lib/admin-auth'

export const runtime = 'nodejs'

const formatDate = value => new Date(`${value}T00:00:00`).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
const formatTime = value => new Date(`1970-01-01T${value}`).toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' })

export async function GET(request, { params }) {
  try {
    await requireAdmin()
    const { id } = await params
    if (!/^[0-9a-f-]{36}$/i.test(id)) return NextResponse.json({ error: 'Invalid schedule.' }, { status: 400 })
    const [shoot] = await db.select().from(shootSchedules).where(eq(shootSchedules.id, id)).limit(1)
    if (!shoot) return NextResponse.json({ error: 'Schedule not found.' }, { status: 404 })

    const pdf = await PDFDocument.create()
    const regular = await pdf.embedFont(StandardFonts.Helvetica)
    const bold = await pdf.embedFont(StandardFonts.HelveticaBold)
    const green = rgb(0.035, 0.22, 0.13)
    const emerald = rgb(0.08, 0.48, 0.29)
    const muted = rgb(0.37, 0.43, 0.39)
    const pale = rgb(0.94, 0.97, 0.94)
    const width = 595.28
    const height = 841.89
    const white = rgb(1, 1, 1)
    let page
    let y

    async function addPage(first = false) {
      page = pdf.addPage([width, height])
      if (first) {
        page.drawRectangle({ x: 0, y: height - 138, width, height: 138, color: green })
        try {
          const logoBytes = await readFile(join(process.cwd(), 'public', 'logo-new.png'))
          const logo = await pdf.embedPng(logoBytes)
          const dims = logo.scale(Math.min(146 / logo.width, 48 / logo.height))
          page.drawImage(logo, { x: 48, y: height - 76, width: dims.width, height: dims.height })
        } catch {
          page.drawText('CYBERDYKETECH', { x: 48, y: height - 62, size: 19, font: bold, color: white })
        }
        page.drawText('SHOOT SCHEDULE', { x: 48, y: height - 110, size: 9, font: bold, color: rgb(0.70, 0.91, 0.77), characterSpacing: 2 })
        page.drawText('CyberdykeTech · Hyderabad, Telangana', { x: 48, y: height - 127, size: 8, font: regular, color: rgb(0.88, 0.94, 0.89) })
        y = height - 184
      } else {
        page.drawRectangle({ x: 0, y: height - 58, width, height: 58, color: green })
        page.drawText('CYBERDYKETECH  ·  SHOOT SCHEDULE', { x: 48, y: height - 36, size: 10, font: bold, color: white, characterSpacing: 1 })
        y = height - 82
      }
    }

    function wrappedLines(value, maxWidth) {
      const words = String(value || '—').split(/\s+/)
      const lines = []
      let line = ''
      for (const word of words) {
        const candidate = line ? `${line} ${word}` : word
        if (regular.widthOfTextAtSize(candidate, 10) > maxWidth && line) {
          lines.push(line)
          line = word
        } else line = candidate
      }
      if (line) lines.push(line)
      return lines
    }

    await addPage(true)
    page.drawRectangle({ x: 38, y: y - 5, width: width - 76, height: 45, color: pale })
    page.drawText(shoot.clientName, { x: 50, y: y + 17, size: 17, font: bold, color: green, maxWidth: width - 120 })
    page.drawText(shoot.clientCompany || 'Client shoot', { x: 50, y: y - 1, size: 10, font: regular, color: muted })
    y -= 72

    async function drawSection(title, rows) {
      if (y < 100) await addPage()
      page.drawText(title.toUpperCase(), { x: 48, y, size: 9, font: bold, color: emerald, characterSpacing: 1.2 })
      y -= 20
      for (const [label, value] of rows) {
        const lines = wrappedLines(value, 345)
        if (y - Math.max(26, lines.length * 14 + 10) < 70) await addPage()
        page.drawText(label, { x: 48, y, size: 9, font: bold, color: green, maxWidth: 132 })
        lines.forEach((line, index) => page.drawText(line, { x: 190, y: y - index * 14, size: 10, font: regular, color: muted }))
        y -= Math.max(26, lines.length * 14 + 10)
      }
      y -= 8
    }

    await drawSection('Schedule details', [
      ['Shoot date', formatDate(shoot.shootDate)],
      ['Time', `${formatTime(shoot.startTime)} – ${formatTime(shoot.endTime)}`],
      ['Location', shoot.shootLocation],
      ['Shoot type', shoot.shootType],
      ['Status', shoot.status],
    ])
    await drawSection('Client contact', [['Contact person', shoot.contactPerson], ['Mobile number', shoot.mobileNumber]])
    await drawSection('Assigned team', [['Photographer / videographer', shoot.assignedPhotographer], ['Team members', shoot.assignedTeamMembers.join(', ') || 'No additional team members']])
    await drawSection('Production brief', [['Requirements', shoot.requirements || 'No requirements provided'], ['Special instructions', shoot.specialInstructions || 'No special instructions']])

    for (const currentPage of pdf.getPages()) {
      currentPage.drawLine({ start: { x: 48, y: 45 }, end: { x: width - 48, y: 45 }, thickness: 0.7, color: rgb(0.83, 0.88, 0.84) })
      currentPage.drawText('Prepared by CyberdykeTech · Please keep this schedule available on shoot day.', { x: 48, y: 29, size: 8, font: regular, color: muted })
      currentPage.drawText('CONFIDENTIAL', { x: width - 110, y: 29, size: 8, font: bold, color: emerald })
    }
    const bytes = await pdf.save()
    const mode = new URL(request.url).searchParams.get('preview') === '1' ? 'inline' : 'attachment'
    return new Response(bytes, { headers: { 'Content-Type': 'application/pdf', 'Content-Disposition': `${mode}; filename="shoot-schedule-${shoot.shootDate}-${shoot.id.slice(0, 8)}.pdf"`, 'Cache-Control': 'private, no-store' } })
  } catch (error) {
    const status = error.status || 500
    return NextResponse.json({ error: status === 401 ? 'Unauthorized.' : 'Unable to generate the schedule PDF.' }, { status })
  }
}
