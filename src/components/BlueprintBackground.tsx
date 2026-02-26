export function BlueprintBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="blueprint-grid absolute inset-0 opacity-45" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_16%,rgba(97,191,145,0.15),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(185,231,146,0.08),transparent_34%)]" />
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent_0_86px,rgba(145,199,169,0.08)_86px_87px),repeating-linear-gradient(90deg,transparent_0_230px,rgba(145,199,169,0.12)_230px_231px)] opacity-28" />
      <div className="absolute left-[16%] top-[18%] h-5 w-5 rounded-full border border-emerald-200/30" />
      <div className="absolute bottom-[20%] right-[22%] h-6 w-6 border border-dashed border-emerald-200/24" />
      <div className="scanline-layer absolute inset-0 opacity-18" />
    </div>
  )
}

