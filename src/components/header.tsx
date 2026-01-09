'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Menu, X, LogOut, User, Settings, BarChart3 } from 'lucide-react'
import { Avatar } from 'primereact/avatar'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import LanguageDropdown from '@/components/language-dropdown'
import { logout } from '@/lib/api/auth'
import { useAuth } from '@/contexts/auth-context'

export function Header() {
  const router = useRouter()
  const { isAuthenticated, user, clearAuth } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    clearAuth()
    setIsMobileMenuOpen(false)
    setIsUserMenuOpen(false)
  }

  // Format user for display
  const finalUser = user
    ? {
        name: user.full_name || 'User',
        email: user.email || '',
        avatar: user.avatar_url || undefined,
      }
    : null

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isUserMenuOpen) return

    const handleClickOutside = () => {
      setIsUserMenuOpen(false)
    }
    // Delay to avoid immediate close
    setTimeout(() => {
      document.addEventListener('click', handleClickOutside)
    }, 0)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isUserMenuOpen])

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Places', href: '/places' },
    { label: 'Reviews', href: '/reviews' },
    { label: 'About', href: '/about' },
    { label: 'Blogs', href: '/blogs' },
  ]

  const userMenuItems = [
    { label: 'Profile', icon: User, href: '/me', action: null },
    { label: 'Dashboard', icon: BarChart3, href: '/dashboard', action: null },
    { label: 'Settings', icon: Settings, href: '/dashboard/settings', action: null },
    { label: 'Logout', icon: LogOut, href: '#', action: handleLogout, divider: true },
  ]

  return (
    <>
      <header className=" ">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo - Desktop & Mobile */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="relative ">
                <Image src="/images/logo.svg" alt="Logo" width={150} height={40} />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-12">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-700 text-sm md:text-lg font-medium hover:text-teal-700 transition-colors"
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
                    <Button className="rounded-xl bg-brand-light px-5 py-2 font-medium text-teal-900">Sign In</Button>
                  </Link>
                  <Link href="/register">
                    <Button
                      className="rounded-xl  px-5 py-2 font-medium border-2 border-brand-light text-brand-light"
                      outlined
                    >
                      Register
                    </Button>
                  </Link>
                </div>
              ) : (
                /* Authenticated State - User Menu */
                <div className="flex items-center gap-4">
                  <Link
                    href="/me"
                    className="flex items-center gap-3 border-l border-gray-200 pl-4 hover:opacity-80 transition-opacity"
                  >
                    <Avatar
                      image={finalUser?.avatar}
                      label={finalUser?.name?.charAt(0) || 'U'}
                      shape="circle"
                      size="large"
                      className="cursor-pointer"
                    />
                    <div className="hidden lg:block">
                      <p className="text-sm font-medium text-gray-900">{finalUser?.name}</p>
                      <p className="text-xs text-gray-500">{finalUser?.email}</p>
                    </div>
                  </Link>

                  {/* Desktop User Dropdown Menu */}
                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setIsUserMenuOpen(!isUserMenuOpen)
                      }}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <Settings className="w-5 h-5 text-gray-600" />
                    </button>
                    {isUserMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                        {userMenuItems.map((item) => (
                          <div key={item.label}>
                            {item.action ? (
                              <button
                                onClick={() => {
                                  item.action?.()
                                  setIsUserMenuOpen(false)
                                }}
                                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 w-full text-left"
                              >
                                <item.icon className="w-4 h-4" />
                                <span className="text-sm">{item.label}</span>
                              </button>
                            ) : (
                              <Link
                                href={item.href}
                                onClick={() => setIsUserMenuOpen(false)}
                                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 w-full"
                              >
                                <item.icon className="w-4 h-4" />
                                <span className="text-sm">{item.label}</span>
                              </Link>
                            )}
                            {item.divider && <div className="border-t border-gray-200 my-1" />}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
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
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-gray-700" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-700" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 bg-white">
              <nav className="flex flex-col">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-teal-700 border-b border-gray-100 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
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
                        <Button className="w-full bg-teal-700 hover:bg-teal-800 text-white font-medium">Explore</Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <Link
                        href="/me"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-3 pb-3 border-b border-gray-200 hover:opacity-80 transition-opacity"
                      >
                        <Avatar
                          image={finalUser?.avatar}
                          label={finalUser?.name?.charAt(0) || 'U'}
                          shape="circle"
                          size="large"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{finalUser?.name}</p>
                          <p className="text-xs text-gray-500">{finalUser?.email}</p>
                        </div>
                      </Link>
                      {userMenuItems.map((item) =>
                        item.action ? (
                          <button
                            key={item.label}
                            onClick={() => {
                              item.action?.()
                              setIsMobileMenuOpen(false)
                            }}
                            className={`flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors w-full text-left ${
                              item.divider ? 'border-t border-gray-200 mt-2 pt-3' : ''
                            }`}
                          >
                            <item.icon className="w-4 h-4" />
                            <span className="text-sm font-medium">{item.label}</span>
                          </button>
                        ) : (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors ${
                              item.divider ? 'border-t border-gray-200 mt-2 pt-3' : ''
                            }`}
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <item.icon className="w-4 h-4" />
                            <span className="text-sm font-medium">{item.label}</span>
                          </Link>
                        ),
                      )}
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
