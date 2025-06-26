'use client'
import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center">
        <div className="flex items-center space-x-10">
          <Link 
            href="/" 
            className="font-bold text-white text-lg flex items-center hover:text-blue-100 transition-colors"
          >
            <div className="mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            Employee Portal
          </Link>
          <div className="hidden md:flex space-x-8">
            <Link 
              href="/" 
              className="text-blue-100 hover:text-white font-medium flex items-center transition-colors group"
            >
              <span className="group-hover:border-b-2 group-hover:border-white pb-1">Dashboard</span>
            </Link>
            <Link 
              href="/analytics" 
              className="text-blue-100 hover:text-white font-medium flex items-center transition-colors group"
            >
              <span className="group-hover:border-b-2 group-hover:border-white pb-1">Analytics</span>
            </Link>
            <Link 
              href="/bookmarks" 
              className="text-blue-100 hover:text-white font-medium flex items-center transition-colors group"
            >
              <span className="group-hover:border-b-2 group-hover:border-white pb-1">Bookmarks</span>
            </Link>
          </div>
        </div>
        
        <div className="ml-auto flex items-center space-x-4">
          <div className="w-10 h-10 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-white font-bold">
            JD
          </div>
        </div>
      </div>
    </nav>
  )
}