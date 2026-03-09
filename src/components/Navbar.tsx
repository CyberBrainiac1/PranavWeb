import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '../lib/utils'

type NavItem = {
  path: string
  label: string
}

type NavbarProps = {
  items: NavItem[]
  currentPath: string
  onNavigate: (path: string) => void
}

export function Navbar({ items, currentPath, onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const isActive = (path: string) => {
    if (path === '/') return currentPath === '/'
    return currentPath.startsWith(path)
  }

  const handleNav = (path: string) => {
    onNavigate(path)
    setMobileOpen(false)
  }

  return (
    <header className="site-nav" role="banner">
      <div className="flex w-full items-center justify-between gap-3">
        <div>
          <p className="nav-micro-label">NAV / INDEX</p>
          <button
            type="button"
            onClick={() => handleNav('/home')}
            className="nav-brand"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            Pranav Emmadi
          </button>
        </div>

        <nav className="hidden items-center gap-5 lg:flex" aria-label="Main navigation">
          {items.map((item) => (
            <button
              key={item.path}
              type="button"
              onClick={() => handleNav(item.path)}
              className={cn('nav-text-link', isActive(item.path) && 'is-active')}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button
          type="button"
          className="mobile-nav-btn lg:hidden"
          onClick={() => setMobileOpen(true)}
          aria-label="Open navigation menu"
        >
          <Menu size={18} />
        </button>
      </div>

      {mobileOpen ? (
        <>
          <div className="mobile-nav-overlay" onClick={() => setMobileOpen(false)} />
          <div className="mobile-nav-panel" role="dialog" aria-label="Navigation menu">
            <div className="flex items-center justify-between" style={{ marginBottom: 16 }}>
              <p className="nav-micro-label">NAV / INDEX</p>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="mobile-nav-btn"
                aria-label="Close navigation menu"
              >
                <X size={18} />
              </button>
            </div>
            <nav aria-label="Main navigation">
              {items.map((item) => (
                <button
                  key={item.path}
                  type="button"
                  onClick={() => handleNav(item.path)}
                  className={cn('mobile-nav-link', isActive(item.path) && 'is-active')}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </>
      ) : null}
    </header>
  )
}

