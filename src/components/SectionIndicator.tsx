import { useEffect, useState } from 'react'

const SECTIONS = [
  { id: 'home',     label: 'Cover'    },
  { id: 'about',    label: 'About'    },
  { id: 'projects', label: 'Projects' },
]

/**
 * Tiny floating section indicator with dots — desktop only.
 * Rendered only within the HomeExperiencePage, so it's always on /home.
 * Uses IntersectionObserver to highlight the most visible section.
 */
export function HomeSectionIndicator() {
  const [activeId, setActiveId] = useState('home')

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(id)
            }
          })
        },
        // Sweet spot: section must occupy the middle 35% of viewport to be "active"
        { rootMargin: '-30% 0px -60% 0px', threshold: 0 },
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <nav
      className="section-indicator"
      aria-label="Page sections"
    >
      {SECTIONS.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          aria-label={`Jump to ${label}`}
          title={label}
          onClick={() =>
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
          }
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '6px 4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            pointerEvents: 'all',
          }}
        >
          <span className={`section-indicator-dot${activeId === id ? ' active' : ''}`} />
        </button>
      ))}
    </nav>
  )
}
