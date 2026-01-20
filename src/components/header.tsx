'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { X, LogOut, Settings, User2, MenuIcon } from 'lucide-react'
import { Avatar } from 'primereact/avatar'
import { Button } from 'primereact/button'
import LanguageDropdown from '@/components/language-dropdown'
import { useAppContext } from '@/components/providers/app-provider'
import { Menu } from 'primereact/menu'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Places', href: '/places' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'About', href: '/about' },
  { label: 'Blogs', href: '/blogs' },
]

const userMenuItems = [
  {
    label: 'Profile',
    icon: User2,
    href: '/profile',
    template: () => (
      <Link
        href="/profile"
        className="flex items-center gap-3 px-4 py-3 text-white hover:bg-brand-light hover:text-teal-900 rounded-md transition-colors w-full"
      >
        <User2 className="w-4 h-4" />
        <span className="text-sm font-medium">Profile</span>
      </Link>
    ),
  },
  {
    label: 'Settings',
    icon: Settings,
    href: '/settings',
    template: () => (
      <Link
        href="/settings"
        className="flex items-center gap-3 px-4 py-3 text-white hover:bg-brand-light hover:text-teal-900 rounded-md transition-colors w-full"
      >
        <Settings className="w-4 h-4" />
        <span className="text-sm font-medium">Settings</span>
      </Link>
    ),
  },
  {
    separator: true,
  },
  {
    label: 'Logout',
    icon: LogOut,
    href: '/logout',
    template: () => (
      <Link
        href="/logout"
        className="flex items-center gap-3 px-4 py-3 text-white hover:bg-brand-light hover:text-teal-900 rounded-md transition-colors w-full"
      >
        <LogOut className="w-4 h-4" />
        <span className="text-sm font-medium">Logout</span>
      </Link>
    ),
  },
]
export function Header() {
  const { user } = useAppContext()
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<Menu>(null)

  return (
    <>
      <header className=" bg-brand-teal">
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
              {!user ? (
                <div className="flex items-center gap-3">
                  <Link href="/login">
                    <Button className="rounded-xl border-0 bg-brand-light! px-5 py-2 font-medium text-teal-900">
                      Sign In
                    </Button>
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
                <>
                  <div
                    className="flex items-center gap-3 border-l border-gray-200 pl-4 cursor-pointer"
                    onClick={(e) => menuRef.current?.toggle(e)}
                  >
                    <Avatar
                      image={user?.avatar_url}
                      label={user?.full_name?.charAt(0) || 'U'}
                      shape="circle"
                      size="large"
                    />
                    <div className="hidden lg:block">
                      <p className="text-sm font-medium text-gray-900">{user?.full_name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                  </div>

                  <Menu
                    model={userMenuItems}
                    popup
                    ref={menuRef}
                    pt={{
                      root: { className: 'bg-brand-teal rounded-lg shadow-lg border-0 mt-2' },
                      menu: { className: 'p-2' },
                      separator: { className: 'border-brand-light my-2' },
                    }}
                  />
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-10">
              {/* Mobile Language Selector */}
              <div className="w-20">
                <LanguageDropdown />
              </div>

              {/* Hamburger Menu */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 hover:bg-brand-light/20 rounded-lg transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-6 h-6 text-white" /> : <MenuIcon className="w-6 h-6 text-white" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden border-t border-brand-light/30 bg-white animate-fade-in">
              <nav className="flex flex-col">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-4 py-3 text-gray-700 hover:bg-teal-50 hover:text-teal-700 border-b border-gray-100 transition-colors font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}

                {/* Mobile Auth Section */}
                <div className="px-4 py-4 bg-gray-50">
                  {!user ? (
                    <div className="flex flex-col gap-3">
                      <Link href="/login" className="w-full" onClick={() => setIsOpen(false)}>
                        <Button className="w-full justify-center text-teal-700 border-2 border-teal-700 hover:bg-teal-50 font-medium rounded-xl py-2.5">
                          Sign In
                        </Button>
                      </Link>
                      <Link href="/register" className="w-full" onClick={() => setIsOpen(false)}>
                        <Button className="w-full bg-teal-700 hover:bg-teal-800 text-white font-medium rounded-xl py-2.5">
                          Register
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      {/* User Info */}
                      <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
                        <Avatar
                          image={user?.avatar_url}
                          label={user?.full_name?.charAt(0) || 'U'}
                          shape="circle"
                          size="large"
                          className="border-2 border-teal-700"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 truncate">{user?.full_name}</p>
                          <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="flex flex-col gap-1">
                        {userMenuItems
                          .filter((item) => !item.separator)
                          .map((item) => {
                            const Icon = item.icon
                            return (
                              <Link
                                key={item.href}
                                href={item.href as any}
                                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-teal-50 hover:text-teal-700 rounded-lg transition-colors"
                                onClick={() => setIsOpen(false)}
                              >
                                {Icon && <Icon className="w-5 h-5 flex-shrink-0" />}
                                <span className="text-sm font-medium">{item.label}</span>
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
