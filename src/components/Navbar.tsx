import { Menu } from 'lucide-react'
import { cn } from '../lib/utils'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from './ui/sheet'

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
  const isActive = (path: string) => {
    if (path === '/') {
      return currentPath === '/'
    }
    return currentPath.startsWith(path)
  }

  return (
    <header className="site-nav">
      <div className="flex items-center justify-between gap-3">
        <div className="space-y-1">
          <p className="nav-micro-label">NAV / INDEX</p>
          <p className="nav-brand">Pranav Emmadi</p>
        </div>

        <nav className="hidden items-center gap-4 lg:flex">
          {items.map((item) => (
            <button
              key={item.path}
              type="button"
              onClick={() => onNavigate(item.path)}
              className={cn(
                'nav-text-link',
                isActive(item.path) && 'is-active',
              )}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <Sheet>
          <SheetTrigger className="inline-flex rounded-md border border-sky-200/25 p-2 text-sky-100 lg:hidden">
            <Menu size={18} />
            <span className="sr-only">Open menu</span>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Navigation</SheetTitle>
              <SheetDescription>NAV / INDEX</SheetDescription>
            </SheetHeader>
            <div className="flex flex-col gap-2 pt-2">
              {items.map((item) => (
                <SheetClose asChild key={item.path}>
                  <button
                    type="button"
                    onClick={() => onNavigate(item.path)}
                    className={cn(
                      'w-full rounded-md border border-sky-200/20 px-3 py-2 text-left text-sm text-slate-100',
                      isActive(item.path) && 'border-sky-200/70 text-sky-100',
                    )}
                  >
                    {item.label}
                  </button>
                </SheetClose>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

