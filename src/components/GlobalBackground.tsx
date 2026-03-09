// 4-layer background: gradient (body CSS), radial glows, grain, ultra-faint grid

export function GlobalBackground() {
  return (
    <>
      {/* Layer 2: Radial blue glows */}
      <div className="global-bg" aria-hidden="true">
        {/* Top-center glow behind cover */}
        <div
          className="global-bg-glow"
          style={{
            width: '900px',
            height: '700px',
            background: 'radial-gradient(ellipse at center, rgba(77,141,255,0.14) 0%, transparent 68%)',
            top: '-120px',
            left: '50%',
            transform: 'translateX(-50%)',
            filter: 'blur(80px)',
          }}
        />
        {/* Mid-right glow behind featured */}
        <div
          className="global-bg-glow"
          style={{
            width: '700px',
            height: '600px',
            background: 'radial-gradient(ellipse at center, rgba(77,141,255,0.09) 0%, transparent 70%)',
            top: '55vh',
            right: '-200px',
            filter: 'blur(100px)',
          }}
        />
        {/* Mid-left glow */}
        <div
          className="global-bg-glow"
          style={{
            width: '600px',
            height: '500px',
            background: 'radial-gradient(ellipse at center, rgba(60,120,255,0.08) 0%, transparent 70%)',
            top: '120vh',
            left: '-150px',
            filter: 'blur(100px)',
          }}
        />
        {/* Bottom glow behind contact */}
        <div
          className="global-bg-glow"
          style={{
            width: '700px',
            height: '500px',
            background: 'radial-gradient(ellipse at center, rgba(77,141,255,0.07) 0%, transparent 70%)',
            bottom: '5vh',
            left: '30%',
            filter: 'blur(120px)',
          }}
        />
      </div>

      {/* Layer 3: Grain / noise texture */}
      <div className="global-bg-grain" aria-hidden="true" />

      {/* Layer 4: Ultra-faint alignment grid */}
      <div className="global-bg-grid" aria-hidden="true" />
    </>
  )
}
