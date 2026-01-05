'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, LogOut, User, Settings, BarChart3 } from 'lucide-react'
import { Avatar } from 'primereact/avatar'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
import LanguageDropdown from '@/components/language-dropdown'

interface HeaderProps {
  isAuthenticated?: boolean
  user?: {
    name: string
    email: string
    avatar?: string
  }
}

export function Header({ isAuthenticated = false, user }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Places', href: '/places' },
    { label: 'Reviews', href: '/reviews' },
    { label: 'About', href: '/about' },
    { label: 'Blogs', href: '/blogs' },
  ]

  const userMenuItems = [
    { label: 'Profile', icon: User, href: '/dashboard/profile' },
    { label: 'Dashboard', icon: BarChart3, href: '/dashboard' },
    { label: 'Settings', icon: Settings, href: '/dashboard/settings' },
    { label: 'Logout', icon: LogOut, href: '/logout', divider: true },
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
                  <div className="flex items-center gap-3 border-l border-gray-200 pl-4">
                    <Avatar
                      image={user?.avatar}
                      label={user?.name?.charAt(0) || 'U'}
                      shape="circle"
                      size="large"
                      className="cursor-pointer"
                    />
                    <div className="hidden lg:block">
                      <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                  </div>

                  {/* Desktop User Dropdown Menu */}
                  <Dropdown
                    options={userMenuItems}
                    optionLabel="label"
                    className="w-40"
                    itemTemplate={(item) => (
                      <Link href={item.href}>
                        <div className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100 w-full">
                          <item.icon className="w-4 h-4" />
                          <span className="text-sm">{item.label}</span>
                        </div>
                      </Link>
                    )}
                  />
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
                        <Button className="w-full bg-teal-700 hover:bg-teal-800 text-white font-medium">Explore</Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-3 pb-3 border-b border-gray-200">
                        <Avatar image={user?.avatar} label={user?.name?.charAt(0) || 'U'} shape="circle" size="large" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                          <p className="text-xs text-gray-500">{user?.email}</p>
                        </div>
                      </div>
                      {userMenuItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors ${
                            item.divider ? 'border-t border-gray-200 mt-2 pt-3' : ''
                          }`}
                          onClick={() => setIsOpen(false)}
                        >
                          <item.icon className="w-4 h-4" />
                          <span className="text-sm font-medium">{item.label}</span>
                        </Link>
                      ))}
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
