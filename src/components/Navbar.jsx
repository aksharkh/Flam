'use client'
import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-gray-100 dark:bg-gray-800 p-4 flex space-x-4">
      <Link href="/" className="font-bold">Dashboard</Link>
      <Link href="/analytics">Analytics</Link>
      <Link href="/bookmarks">Bookmarks</Link>
    </nav>
  )
}
