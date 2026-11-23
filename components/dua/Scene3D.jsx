export default function Scene3D() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-[radial-gradient(ellipse_at_68%_48%,#0d5937_0%,#06452c_46%,#032819_100%)]" aria-hidden="true">
      <div className="absolute -right-24 top-1/4 h-[28rem] w-[28rem] rounded-full bg-emerald-400/10 blur-3xl" />
      <div className="absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-green-500/10 blur-3xl" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#032819]/45 via-transparent to-transparent" />
    </div>
  )
}
