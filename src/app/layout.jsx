import './globals.css'
import { BookmarksProvider } from '../context/BookmarksContext'
import Navbar from '../components/Navbar'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <BookmarksProvider>
          <Navbar />
          <main className="p-4">{children}</main>
        </BookmarksProvider>
      </body>
    </html>
  )
}
