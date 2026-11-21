import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getAdminUser } from '@/lib/admin-auth'
import WebsiteContentEditor from './website-content-editor'

export const metadata = {
  title: 'Website Content | CyberdykeTech Admin',
  robots: { index: false, follow: false },
}

export default async function WebsiteContentPage() {
  const user = await getAdminUser()
  if (!user) redirect('/admin/login')

  return (
    <main className="min-h-screen bg-[#f3f8f5] px-4 py-8 text-[#10281c] md:px-8">
      <div className="mx-auto max-w-5xl">
        <Link href="/admin" className="text-sm font-semibold text-emerald-800 hover:underline">← Back to dashboard</Link>
        <header className="mt-6 border-b border-emerald-900/10 pb-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">Website content</p>
          <h1 className="mt-2 font-sora text-3xl font-bold">Homepage sections</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Edit the featured work heading and its projects link. Drafts stay private until published; published edits appear on the homepage without a deployment.</p>
        </header>
        <WebsiteContentEditor />
      </div>
    </main>
  )
}
