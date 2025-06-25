'use client'
import { useBookmarks } from '../../context/BookmarksContext'
import Card from '../../components/Card'
import Button from '../../components/Button'

export default function BookmarksPage() {
  const { bookmarks, toggleBookmark } = useBookmarks()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Bookmarked Employees</h1>
      {bookmarks.length === 0 && <p>No bookmarks yet.</p>}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {bookmarks.map(u => (
          <Card key={u.id}>
            <h3 className="font-bold">{u.firstName} {u.lastName}</h3>
            <p>{u.email}</p>
            <div className="flex space-x-2 mt-2">
              <Button onClick={() => toggleBookmark(u)}>Remove</Button>
              <Button>Promote</Button>
              <Button>Assign to Project</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
