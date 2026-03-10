import { useNavigate, useLocation } from 'react-router-dom'

const SECTIONS = [
  { path: '/',         label: 'Cover'    },
  { path: '/about',    label: 'About'    },
  { path: '/projects', label: 'Projects' },
  { path: '/writing',  label: 'Writing'  },
  { path: '/skills',   label: 'Skills'   },
  { path: '/timeline', label: 'Timeline' },
  { path: '/contact',  label: 'Contact'  },
]

/**
 * Tiny floating section indicator with dots — desktop only.
 * Navigates between section routes with page transitions.
 */
export function HomeSectionIndicator() {
  const navigate = useNavigate()
  const location = useLocation()
  const activePath = location.pathname

  return (
    <nav
      className="section-indicator"
      aria-label="Page sections"
    >
      {SECTIONS.map(({ path, label }) => (
        <button
          key={path}
          type="button"
          aria-label={`Go to ${label}`}
          title={label}
          onClick={() => navigate(path)}
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
          <span className={`section-indicator-dot${activePath === path ? ' active' : ''}`} />
        </button>
      ))}
    </nav>
  )
}
