'use client'
import { createContext, useContext, useState } from 'react'

const BookmarksContext = createContext()
export const useBookmarks = () => useContext(BookmarksContext)

export function BookmarksProvider({ children }) {
  const [bookmarks, setBookmarks] = useState([])

  const toggleBookmark = user =>
    setBookmarks(bs =>
      bs.find(u => u.id === user.id)
        ? bs.filter(u => u.id !== user.id)
        : [...bs, user]
    )

  return (
    <BookmarksContext.Provider value={{ bookmarks, toggleBookmark }}>
      {children}
    </BookmarksContext.Provider>
  )
}
