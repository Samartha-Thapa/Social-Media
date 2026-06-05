'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { 
  Heart, 
  Home, 
  Search, 
  Compass, 
  Mail, 
  Bell, 
  Bookmark, 
  Settings, 
  MoreHorizontal,
  LogOut
} from 'lucide-react'
import { handleLogout } from '@/app/api/auth'

const mainNav = [
  { href: '/home', label: 'Home', icon: Home },
  { href: '/explore', label: 'Explore', icon: Compass },
  { href: '/search', label: 'Search', icon: Search },
  { href: '/messages', label: 'Messages', icon: Mail },
  { href: '/notifications', label: 'Notifications', icon: Bell },
  { href: '/saved', label: 'Saved', icon: Bookmark },
]

const bottomNav = [
  { href: '/settings', label: 'Settings', icon: Settings },
  { href: '/profile', label: 'Profile', icon: Heart },
]

export function Sidebar() {
  const pathname = usePathname()

  const isNavItemActive = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`)
  }
  return (
    <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:flex lg:w-64 lg:flex-col border-r border-border bg-background">
      <div className="flex h-16 items-center gap-2 border-b border-border px-6">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
          <Heart className="w-5 h-5 text-primary-foreground" />
        </div>
        <span className="text-lg font-bold">SocialHub</span>
      </div>

      <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-6">
        {mainNav.map((item) => {
          const Icon = item.icon
          const isActive = isNavItemActive(item.href)
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? 'default' : 'ghost'}
                className={`w-full justify-start gap-3 text-base h-12 ${
                  isActive ? '' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span>{item.label}</span>
              </Button>
            </Link>
          )
        })}
      </nav>

      {/* Post Button */}
      <div className="border-t border-border p-4">
        <Button className="w-full text-base h-12 font-semibold">
          Create Post
        </Button>
      </div>

      {/* Bottom Navigation */}
      <div className="border-t border-border space-y-2 px-4 py-4">
        {bottomNav.map((item) => {
          const Icon = item.icon
          const isActive = isNavItemActive(item.href)
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? 'default' : 'ghost'}
                className={`w-full justify-start gap-3 text-base h-10 ${
                  isActive ? '' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm">{item.label}</span>
              </Button>
            </Link>
          )
        })}

        <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground text-sm h-10" onClick={handleLogout}>
          <LogOut className="w-4 h-4 flex-shrink-0" />
          <span>Logout</span>
        </Button>
      </div>

      {/* User Profile Card */}
      <div className="border-t border-border p-4">
        <button className="w-full flex items-center justify-between gap-3 rounded-lg hover:bg-secondary/50 transition-colors p-2">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-full bg-primary/30 flex-shrink-0" />
            <div className="min-w-0 text-left">
              <p className="text-sm font-medium truncate">John Doe</p>
              <p className="text-xs text-muted-foreground truncate">@johndoe</p>
            </div>
          </div>
          <MoreHorizontal className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        </button>
      </div>
    </aside>
  )
}
