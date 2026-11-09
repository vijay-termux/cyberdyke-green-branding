import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#062817] px-6 text-center text-white">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">404</p>
      <h1 className="mt-5 font-sora text-5xl font-black tracking-tight md:text-7xl">Page not found.</h1>
      <p className="mt-5 max-w-lg text-base leading-7 text-emerald-50/70">The page you requested does not exist or may have moved.</p>
      <Link href="/" className="mt-8 rounded-full bg-emerald-400 px-6 py-3 font-semibold text-[#062817] transition hover:bg-emerald-300">Back home</Link>
    </main>
  )
}
