export function BlueprintBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="blueprint-grid absolute inset-0 opacity-55" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_16%,rgba(64,201,255,0.18),transparent_38%),radial-gradient(circle_at_78%_2%,rgba(79,235,255,0.14),transparent_34%)]" />
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent_0_68px,rgba(159,221,255,0.1)_68px_69px),repeating-linear-gradient(90deg,transparent_0_220px,rgba(159,221,255,0.16)_220px_221px)] opacity-35" />
      <div className="absolute left-[14%] top-[16%] h-6 w-6 rounded-full border border-cyan-200/40" />
      <div className="absolute right-[18%] top-[24%] h-7 w-7 border border-dashed border-cyan-200/30" />
      <div className="absolute bottom-[18%] left-[24%] h-5 w-5 border border-cyan-200/35" />
      <div className="scanline-layer absolute inset-0 opacity-35" />
    </div>
  )
}
