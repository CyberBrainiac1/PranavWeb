export function BlueprintBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="blueprint-grid absolute inset-0 opacity-65" />
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent_0_128px,rgba(148,163,184,0.12)_128px_129px),repeating-linear-gradient(90deg,transparent_0_128px,rgba(148,163,184,0.12)_128px_129px)] opacity-25" />
    </div>
  )
}

