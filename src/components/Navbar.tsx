import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

type NavItem = {
  path: string
  label: string
}

type NavbarProps = {
  items: NavItem[]
  currentPath: string
  onNavigate: (path: string) => void
}

const sectionNavItems = [
  { id: 'about', label: 'About' },
  { id: 'featured', label: 'Featured' },
  { id: 'projects', label: 'Projects' },
  { id: 'blog', label: 'Blog' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

export function Navbar({ onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSectionNav = (id: string) => {
    setMobileOpen(false)
    scrollTo(id)
  }

  return (
    <header className={`navbar-minimal ${scrolled ? 'scrolled' : ''}`} role="banner">
      <button
        type="button"
        className="navbar-brand btn-reset"
        onClick={() => scrollTo('home')}
      >
        Pranav Emmadi
      </button>

      <nav aria-label="Main navigation">
        <ul className="navbar-links">
          {sectionNavItems.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className="navbar-link"
                onClick={() => handleSectionNav(item.id)}
              >
                {item.label}
              </button>
            </li>
          ))}
          <li>
            <button
              type="button"
              className="navbar-link"
              onClick={() => onNavigate('/blog')}
            >
              All Posts
            </button>
          </li>
        </ul>
      </nav>

      <button
        type="button"
        className="navbar-mobile-btn"
        onClick={() => setMobileOpen(true)}
        aria-label="Open navigation"
        >
        <Menu size={18} />
      </button>

      {mobileOpen && (
        <>
          <div className="mobile-nav-overlay" onClick={() => setMobileOpen(false)} />
          <div className="mobile-nav-panel" role="dialog" aria-label="Navigation menu">
            <div className="mobile-nav-header">
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--text-muted)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}
              >
                NAV
              </span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text-primary)',
                  padding: '4px',
                }}
              >
                <X size={18} />
              </button>
            </div>
            {sectionNavItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className="mobile-nav-link"
                onClick={() => handleSectionNav(item.id)}
              >
                {item.label}
              </button>
            ))}
            <button
              type="button"
              className="mobile-nav-link"
              onClick={() => {
                setMobileOpen(false)
                onNavigate('/blog')
              }}
            >
              All Posts
            </button>
          </div>
        </>
      )}
    </header>
  )
}
