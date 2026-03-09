export function GlobalBackground() {
  return (
    <div className="global-bg" aria-hidden="true">
      <div
        className="global-bg-glow"
        style={{
          width: '800px',
          height: '800px',
          background: 'radial-gradient(circle, rgba(77, 141, 255, 0.35) 0%, transparent 70%)',
          top: '-200px',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      />
      <div
        className="global-bg-glow"
        style={{
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(77, 141, 255, 0.15) 0%, transparent 70%)',
          top: '60vh',
          right: '-200px',
        }}
      />
      <div
        className="global-bg-glow"
        style={{
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(77, 100, 255, 0.12) 0%, transparent 70%)',
          bottom: '10vh',
          left: '-100px',
        }}
      />
    </div>
  )
}
