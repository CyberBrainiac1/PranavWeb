export function BlueprintBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="blueprint-grid absolute inset-0 opacity-55" />
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent_0_96px,rgba(136,182,255,0.08)_96px_97px),repeating-linear-gradient(90deg,transparent_0_240px,rgba(136,182,255,0.12)_240px_241px)] opacity-40" />
      <div className="absolute left-[16%] top-[18%] h-5 w-5 rounded-full border border-sky-200/35" />
      <div className="absolute bottom-[20%] right-[22%] h-6 w-6 border border-dashed border-sky-200/30" />
      <div className="scanline-layer absolute inset-0 opacity-15" />
    </div>
  )
}

