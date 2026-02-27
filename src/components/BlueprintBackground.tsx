export function BlueprintBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="blueprint-solid absolute inset-0" />
      <div className="blueprint-grid absolute inset-0" />
      <div className="blueprint-major-lines absolute inset-0" />
      <div className="blueprint-markers absolute inset-0" />
      <div className="blueprint-vignette absolute inset-0" />
    </div>
  )
}

