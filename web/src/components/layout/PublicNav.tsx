'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { clsx } from 'clsx'

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Download', href: '/download' },
  { name: 'Docs', href: '/docs' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Blog', href: '/blog' },
]

export function PublicNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.svg" alt="CookiePass" width={32} height={32} />
            <span className="text-xl font-bold text-gray-900">CookiePass</span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={clsx(
                  "text-sm font-medium transition-colors",
                  pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
                    ? "text-indigo-600"
                    : "text-gray-600 hover:text-gray-900"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/auth/login"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/auth/register"
              className="bg-indigo-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-indigo-700 shadow-sm transition-all"
            >
              Get Started
            </Link>
          </div>

          <button
            onClick={() => setIsMenuOpen(true)}
            className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
            aria-label="Open menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </nav>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white lg:hidden">
          <div className="flex flex-col h-full px-6 py-4">
            <div className="flex items-center justify-between mb-8">
              <Link href="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
                <Image src="/logo.svg" alt="CookiePass" width={32} height={32} />
                <span className="text-xl font-bold text-gray-900">CookiePass</span>
              </Link>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 text-gray-600 hover:text-gray-900"
                aria-label="Close menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="flex flex-col gap-6 flex-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={clsx(
                    "text-lg font-medium",
                    pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
                      ? "text-indigo-600"
                      : "text-gray-900"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="flex flex-col gap-3 pb-8">
              <Link
                href="/auth/login"
                onClick={() => setIsMenuOpen(false)}
                className="w-full text-center py-3 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50"
              >
                Sign In
              </Link>
              <Link
                href="/auth/register"
                onClick={() => setIsMenuOpen(false)}
                className="w-full text-center py-3 text-sm font-medium bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 shadow-sm"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}