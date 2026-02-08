import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 lg:px-8">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-100 rounded-full opacity-30"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full opacity-30"></div>
      </div>

      <div className="relative text-center max-w-2xl mx-auto">
        {/* Cookie jar illustration */}
        <div className="mb-12">
          <div className="w-32 h-32 mx-auto relative">
            {/* Cookie jar */}
            <div className="w-28 h-24 bg-blue-100 rounded-lg mx-auto mb-2 relative overflow-hidden">
              <div className="absolute inset-2 bg-blue-50 rounded-lg"></div>
              {/* Cookie crumbs */}
              <div className="absolute top-3 left-4 w-2 h-2 bg-amber-400 rounded-full"></div>
              <div className="absolute top-6 right-5 w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
              <div className="absolute bottom-4 left-6 w-1 h-1 bg-amber-400 rounded-full"></div>
              <div className="absolute bottom-3 right-4 w-1.5 h-1.5 bg-amber-600 rounded-full"></div>
            </div>
            {/* Cookie jar lid */}
            <div className="w-32 h-6 bg-blue-200 rounded-full mx-auto border-4 border-blue-300 relative">
              <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-4 h-3 bg-blue-300 rounded-t-full"></div>
            </div>
            {/* Flying cookie */}
            <div className="absolute -top-2 -right-8 w-8 h-8 bg-amber-100 rounded-full border-2 border-amber-200 animate-bounce">
              <div className="absolute top-1 left-1 w-1 h-1 bg-amber-500 rounded-full"></div>
              <div className="absolute top-2 right-1.5 w-1.5 h-1.5 bg-amber-600 rounded-full"></div>
              <div className="absolute bottom-1.5 left-2 w-1 h-1 bg-amber-400 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* 404 Error */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-200 mb-4 select-none">404</h1>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            This page got lost in the
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> cookie jar </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-md mx-auto mb-8">
            Looks like the page you're looking for has crumbled away. 
            Let's get you back to safety.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button size="lg">
            <Link href="/">Take Me Home</Link>
          </Button>
          <Button size="lg">
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
        </div>

        {/* Popular links */}
        <div className="border-t border-gray-200 pt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Popular destinations
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <Link 
              href="/docs" 
              className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <span className="font-medium text-gray-900">Documentation</span>
              </div>
              <p className="text-sm text-gray-600">
                Learn how to use CookiePass securely
              </p>
            </Link>

            <Link 
              href="/download" 
              className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <span className="font-medium text-gray-900">Download</span>
              </div>
              <p className="text-sm text-gray-600">
                Get the Chrome extension
              </p>
            </Link>

            <Link 
              href="/contact" 
              className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                  <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <span className="font-medium text-gray-900">Get Help</span>
              </div>
              <p className="text-sm text-gray-600">
                Contact our support team
              </p>
            </Link>
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Error code: PAGE_NOT_FOUND • If you believe this is a mistake, 
            <Link href="/contact" className="text-indigo-600 hover:text-indigo-700 ml-1">
              let us know
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}