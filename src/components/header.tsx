'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { X, LogOut, Settings, User2, MenuIcon } from 'lucide-react'
import { Avatar } from 'primereact/avatar'
import { Button } from 'primereact/button'
import LanguageDropdown from '@/components/language-dropdown'
import { useAppContext } from '@/components/providers/app-provider'
import { Menu } from 'primereact/menu'
import { useToast } from '@/components/providers/toast-provider'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Places', href: '/places' },
  { label: 'Map', href: '/map' },
  // { label: 'Reviews', href: '/reviews' },
  // { label: 'About', href: '/about' },
  // { label: 'Blogs', href: '/blogs' },
]

export function Header() {
  const { user, logout } = useAppContext()
  const router = useRouter()
  const { showSuccess } = useToast()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<Menu>(null)

  const handleLogout = async () => {
    await logout()
    showSuccess('Đăng xuất thành công', 'Bạn đã đăng xuất khỏi tài khoản')
    router.push('/')
    router.refresh()
  }

  const userMenuItems = [
    {
      label: 'Profile',
      icon: User2,
      href: '/me',
      template: () => (
        <Link
          href="/me"
          className="flex items-center gap-3 px-4 py-3 text-white hover:bg-brand-light hover:text-teal-900 rounded-md transition-colors w-full"
        >
          <User2 className="w-4 h-4" />
          <span className="text-sm font-medium">Profile</span>
        </Link>
      ),
    },
    // {
    //   label: 'Settings',
    //   icon: Settings,
    //   href: '/settings',
    //   template: () => (
    //     <Link
    //       href="/settings"
    //       className="flex items-center gap-3 px-4 py-3 text-white hover:bg-brand-light hover:text-teal-900 rounded-md transition-colors w-full"
    //     >
    //       <Settings className="w-4 h-4" />
    //       <span className="text-sm font-medium">Settings</span>
    //     </Link>
    //   ),
    // },
    {
      separator: true,
    },
    {
      label: 'Logout',
      icon: LogOut,
      template: () => (
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 text-white hover:bg-brand-light hover:text-teal-900 rounded-md transition-colors w-full text-left"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      ),
    },
  ]

  return (
    <>
      <header className="bg-brand-teal sticky top-0 z-50 shadow-md">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
            {/* Logo - Responsive */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="relative">
                <Image
                  src="/images/logo.svg"
                  alt="Logo"
                  width={120}
                  height={32}
                  className="sm:w-[140px] md:w-[150px]"
                />
              </div>
            </Link>

            {/* Desktop Navigation - Hidden on mobile/tablet */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-12">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white text-sm lg:text-base xl:text-lg font-medium hover:text-brand-light transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop Auth Section - Hidden on mobile/tablet */}
            <div className="hidden lg:flex items-center gap-10 xl:gap-6">
              {/* Language Dropdown */}
              <div className="w-28 xl:w-32">
                <LanguageDropdown />
              </div>

              {/* Unauthenticated State */}
              {!user ? (
                <div className="flex items-center gap-2 xl:gap-3">
                  <Link href="/login">
                    <Button className="rounded-xl border-0 bg-brand-light! px-4 xl:px-5 py-2 font-medium text-teal-900 text-sm">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button
                      className="rounded-xl px-4 xl:px-5 py-2 font-medium border-2 border-brand-light text-brand-light text-sm"
                      outlined
                    >
                      Register
                    </Button>
                  </Link>
                </div>
              ) : (
                /* Authenticated State - User Menu */
                <>
                  <div
                    className="flex items-center gap-3 border-l border-brand-light/30 pl-4 cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={(e) => menuRef.current?.toggle(e)}
                  >
                    <Avatar
                      image={user?.avatar_url}
                      label={user?.full_name?.charAt(0) || 'U'}
                      shape="circle"
                      size="normal"
                      className="border-2 border-brand-light"
                    />
                    <div className="hidden xl:block">
                      <p className="text-sm font-medium text-white">{user?.full_name}</p>
                      <p className="text-xs text-brand-light">{user?.email}</p>
                    </div>
                  </div>

                  <Menu
                    model={userMenuItems}
                    popup
                    ref={menuRef}
                    pt={{
                      root: { className: 'bg-brand-teal rounded-lg shadow-xl border-0 mt-2 min-w-[200px]' },
                      menu: { className: 'p-2' },
                      separator: { className: 'border-brand-light my-2' },
                    }}
                  />
                </>
              )}
            </div>

            {/* Mobile & Tablet Controls */}
            <div className="flex lg:hidden items-center gap-12 sm:gap-8">
              {/* Language Selector - Compact on mobile */}
              <div className="">
                <LanguageDropdown />
              </div>

              {/* User Avatar for authenticated users on tablet */}
              {user && (
                <div className="hidden md:block">
                  <Avatar
                    image={user?.avatar_url}
                    label={user?.full_name?.charAt(0) || 'U'}
                    shape="circle"
                    size="normal"
                    className="border-2 border-brand-light"
                  />
                </div>
              )}

              {/* Hamburger Menu */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 hover:bg-brand-light/20 rounded-lg transition-colors"
                aria-label="Toggle menu"
                aria-expanded={isOpen}
              >
                {isOpen ? (
                  <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                ) : (
                  <MenuIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile & Tablet Menu */}
          {isOpen && (
            <div className="lg:hidden border-t border-brand-light/30 bg-white animate-fade-in">
              <nav className="flex flex-col max-h-[calc(100vh-4rem)] overflow-y-auto">
                {/* Navigation Links */}
                {navLinks.map((link, index) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 sm:px-6 py-3 sm:py-4 text-gray-700 hover:bg-teal-50 hover:text-teal-700 transition-colors font-medium text-sm sm:text-base ${
                      index !== navLinks.length - 1 ? 'border-b border-gray-100' : ''
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}

                {/* Auth Section */}
                <div className="px-4 sm:px-6 py-4 sm:py-6 bg-gray-50 border-t-2 border-gray-200">
                  {!user ? (
                    /* Unauthenticated State */
                    <div className="flex flex-col gap-3">
                      <Link href="/login" className="w-full" onClick={() => setIsOpen(false)}>
                        <Button className="w-full justify-center text-white hover:text-brand-light border-2 border-brand-teal hover:border-brand-light hover:bg-white font-medium rounded-xl py-2.5 text-sm sm:text-base bg-brand-teal">
                          Sign In
                        </Button>
                      </Link>
                      <Link href="/register" className="w-full" onClick={() => setIsOpen(false)}>
                        <Button className="w-full justify-center text-white hover:text-brand-light border-2 border-brand-teal hover:border-brand-light hover:bg-white font-medium rounded-xl py-2.5 text-sm sm:text-base bg-brand-teal">
                          Register
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    /* Authenticated State */
                    <div className="flex flex-col gap-4">
                      {/* User Info Card */}
                      <div className="flex items-center gap-3 sm:gap-4 pb-4 border-b border-gray-200">
                        <Avatar
                          image={user?.avatar_url}
                          label={user?.full_name?.charAt(0) || 'U'}
                          shape="circle"
                          size="large"
                          className="border-2 border-teal-700"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm sm:text-base font-semibold text-gray-900 truncate">{user?.full_name}</p>
                          <p className="text-xs sm:text-sm text-gray-500 truncate">{user?.email}</p>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="flex flex-col gap-1">
                        {userMenuItems
                          .filter((item) => !item.separator)
                          .map((item) => {
                            const Icon = item.icon
                            if (item.label === 'Logout') {
                              return (
                                <button
                                  key={item.label}
                                  onClick={() => {
                                    setIsOpen(false)
                                    handleLogout()
                                  }}
                                  className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors w-full text-left"
                                >
                                  {Icon && <Icon className="w-5 h-5 flex-shrink-0" />}
                                  <span className="text-sm sm:text-base font-medium">{item.label}</span>
                                </button>
                              )
                            }
                            return (
                              <Link
                                key={item.href}
                                href={item.href as string}
                                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-teal-50 hover:text-teal-700 rounded-lg transition-colors"
                                onClick={() => setIsOpen(false)}
                              >
                                {Icon && <Icon className="w-5 h-5 flex-shrink-0" />}
                                <span className="text-sm sm:text-base font-medium">{item.label}</span>
                              </Link>
                            )
                          })}
                      </div>
                    </div>
                  )}
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  )
}
