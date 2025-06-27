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

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-300 mb-2">Employee Directory</h1>
        <p className="text-gray-400">Browse and manage your team members</p>
      </div>

      <div className="relative mb-8 max-w-2xl mx-auto">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search employees by name, email or department..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="block w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition duration-200"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No employees found</h3>
          <p className="mt-1 text-gray-500">Try adjusting your search query</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map(u => (
            <Card key={u.id} className="transition-all duration-300 hover:shadow-lg hover:border-blue-300 hover:scale-[1.02]">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-gray-300">{u.firstName} {u.lastName}</h3>
                  <p className="text-sm text-gray-500 truncate">{u.email}</p>
                </div>
                
              </div>
              
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase">Age</p>
                  <p className="text-gray-300 font-medium">{u.age}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase">Department</p>
                  <p className="text-gray-300 font-medium truncate">{u.department}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase">Performance</p>
                  <Stars value={u.performance}/>
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <Button 
                  onClick={() => router.push(`/employee/${u.id}`)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                >
                  View Profile
                </Button>
                <Button 
                  onClick={() => toggleBookmark(u)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-400 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                  </svg>
                  Save
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}