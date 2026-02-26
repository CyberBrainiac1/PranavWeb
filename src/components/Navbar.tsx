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
    <header className="sticky top-3 z-40 mb-8 border border-sky-200/20 bg-slate-950/75 px-4 py-3 backdrop-blur-xl md:px-5">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-sky-200/55" />
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-sky-200/80">NAV / INDEX</p>
          <p className="font-display text-2xl leading-none text-white">Pranav Emmadi</p>
        </div>

        <nav className="hidden items-center gap-2 lg:flex">
          {items.map((item) => (
            <button
              key={item.path}
              type="button"
              onClick={() => onNavigate(item.path)}
              className={cn(
                'nav-link-chip',
                isActive(item.path) && 'border-sky-200/60 bg-sky-300/12 text-sky-100',
              )}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <Sheet>
          <SheetTrigger className="inline-flex rounded-lg border border-sky-200/30 p-2 text-sky-100 lg:hidden">
            <Menu size={18} />
            <span className="sr-only">Open menu</span>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Navigation</SheetTitle>
              <SheetDescription>NAV / INDEX</SheetDescription>
            </SheetHeader>
            <div className="flex flex-col gap-2">
              {items.map((item) => (
                <SheetClose asChild key={item.path}>
                  <button
                    type="button"
                    onClick={() => onNavigate(item.path)}
                    className={cn(
                      'w-full rounded-lg border border-sky-200/20 bg-slate-900/70 px-3 py-2 text-left text-sm text-slate-100',
                      isActive(item.path) && 'border-sky-200/60 text-sky-100',
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

