'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Menu, X, LogOut, User, Settings, ChevronDown } from 'lucide-react'
import { Avatar } from 'primereact/avatar'
import { Button } from 'primereact/button'
import LanguageDropdown from '@/components/language-dropdown'

export function Header() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)

  const isAuthenticated = status === 'authenticated'
  const user = session?.user

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Places', href: '/place' },
    { label: 'Reviews', href: '/review' },
    { label: 'About', href: '/about' },
    { label: 'Blogs', href: '/blogs' },
  ]

  const userMenuItems: Array<{
    label: string
    icon: React.ComponentType<{ className?: string }>
    href?: string
    action?: string
    divider?: boolean
  }> = [
    { label: 'Profile', icon: User, href: '/me' },
    { label: 'Settings', icon: Settings, href: '/settings' },
    { label: 'Logout', icon: LogOut, action: 'logout', divider: true },
  ]

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false)
      }
    }

    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isUserMenuOpen])

  const handleLogout = async () => {
    // Clear localStorage token
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token')
    }
    await signOut({ redirect: false })
    router.push('/')
    router.refresh()
    setIsOpen(false)
    setIsUserMenuOpen(false)
  }

  const handleUserMenuItemClick = (item: any) => {
    if (item.action === 'logout') {
      handleLogout()
    } else {
      setIsUserMenuOpen(false)
      router.push(item.href)
    }
  }

  return (
    <>
      <header className="bg-brand-teal">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo - Desktop & Mobile */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="relative">
                <Image src="/images/logo.svg" alt="Logo" width={150} height={40} />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-12">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-black text-sm md:text-lg font-medium hover:text-brand-light transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop Language Dropdown & Auth Section */}
            <div className="hidden md:flex items-center gap-6">
              {/* Language Dropdown */}
              <div className="w-32">
                <LanguageDropdown />
              </div>

              {/* Unauthenticated State */}
              {!isAuthenticated ? (
                <div className="flex items-center gap-3">
                  <Link href="/login">
                    <Button className="rounded-xl border-0 bg-brand-light! px-5 py-2 font-medium text-teal-900">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button
                      className="rounded-xl px-5 py-2 font-medium border-2 border-brand-light text-brand-light"
                      outlined
                    >
                      Register
                    </Button>
                  </Link>
                </div>
              ) : (
                /* Authenticated State - User Menu with Dropdown */
                <div className="relative border-l border-gray-200 pl-4" ref={userMenuRef}>
                  {/* User Info Button - Clickable */}
                  <button
                    type="button"
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-3 hover:opacity-80 transition-opacity cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-teal focus:ring-offset-2 rounded-lg p-1"
                  >
                    <Avatar
                      label={user?.full_name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'}
                      shape="circle"
                      size="large"
                      className="bg-brand-teal"
                    />
                    <div className="hidden lg:block text-left">
                      <p className="text-sm font-medium text-gray-900">{user?.full_name || 'User'}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-500 hidden lg:block transition-transform ${
                        isUserMenuOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      {userMenuItems.map((item, index) => (
                        <div key={index}>
                          {item.divider && index > 0 && <hr className="my-2 border-gray-200" />}
                          {item.action ? (
                            <button
                              type="button"
                              onClick={() => handleUserMenuItemClick(item)}
                              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-left hover:bg-gray-100 transition-colors"
                            >
                              <item.icon className={`w-4 h-4 ${item.action === 'logout' ? 'text-red-600' : ''}`} />
                              <span className={item.action === 'logout' ? 'text-red-600 font-medium' : 'text-gray-700'}>
                                {item.label}
                              </span>
                            </button>
                          ) : (
                            <Link
                              href={item.href}
                              onClick={() => handleUserMenuItemClick(item)}
                              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                            >
                              <item.icon className="w-4 h-4" />
                              <span>{item.label}</span>
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              {/* Mobile Language Selector */}
              <div className="w-24">
                <LanguageDropdown />
              </div>

              {/* Hamburger Menu */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden border-t border-gray-200 bg-white">
              <nav className="flex flex-col">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-teal-700 border-b border-gray-100 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}

                {/* Mobile Auth Section */}
                <div className="px-4 py-4 bg-gray-50 border-t border-gray-100">
                  {!isAuthenticated ? (
                    <div className="flex flex-col gap-3">
                      <Link href="/login" className="w-full">
                        <Button className="w-full justify-center text-gray-700 border border-gray-300">Sign In</Button>
                      </Link>
                      <Link href="/register" className="w-full">
                        <Button className="w-full bg-teal-700 hover:bg-teal-800 text-white font-medium">
                          Register
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
                        <Avatar
                          label={
                            user?.full_name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'
                          }
                          shape="circle"
                          size="large"
                          className="bg-brand-teal"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{user?.full_name || 'User'}</p>
                          <p className="text-xs text-gray-500">{user?.email}</p>
                        </div>
                      </div>
                      {userMenuItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          <item.icon className="w-4 h-4" />
                          <span className="text-sm font-medium">{item.label}</span>
                        </Link>
                      ))}
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors border-t border-gray-200 mt-2 pt-3"
                      >
                        <LogOut className="w-4 h-4" />
                        <span className="text-sm font-medium">Logout</span>
                      </button>
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
