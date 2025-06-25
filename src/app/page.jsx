'use client'
import { useRouter } from 'next/navigation'
import useFetch from '../hooks/useFetch'
import { fetchUsers } from '../lib/api'
import { departments } from '../lib/departments'
import useSearch from '../hooks/useSearch'
import { useBookmarks } from '../context/BookmarksContext'
import Card from '../components/Card'
import Button from '../components/Button'
import Stars from '../components/Stars'
import { useEffect, useState } from 'react'

export default function DashboardPage() {
  const { data: users, loading } = useFetch(fetchUsers)
  const [enriched, setEnriched] = useState([])
  const { query, setQuery, filtered } = useSearch(enriched, [
    'firstName','lastName','email','department'
  ])
  const { toggleBookmark } = useBookmarks()
  const router = useRouter()

  useEffect(() => {
    if (users) {
      setEnriched(
        users.map(u => ({
          ...u,
          department: departments[Math.floor(Math.random() * departments.length)],
          performance: Math.ceil(Math.random() * 5),
        }))
      )
    }
  }, [users])

  if (loading) return <p>Loading…</p>

  return (
    <>
      <input
        type="text"
        placeholder="Search…"
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="border p-2 mb-4 w-full"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map(u => (
          <Card key={u.id}>
            <h3 className="font-bold">{u.firstName} {u.lastName}</h3>
            <p className="text-sm">{u.email}</p>
            <p>Age: {u.age}</p>
            <p>Dept: {u.department}</p>
            <Stars value={u.performance}/>
            <div className="flex space-x-2 mt-2">
              <Button onClick={() => router.push(`/employee/${u.id}`)}>View</Button>
              <Button onClick={() => toggleBookmark(u)}>Bookmark</Button>
              <Button>Promote</Button>
            </div>
          </Card>
        ))}
      </div>
    </>
  )
}
