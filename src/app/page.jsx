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
import { 
  FaSearch, 
  FaUserFriends, 
  FaBookmark, 
  FaRegBookmark,
  FaUserCircle 
} from 'react-icons/fa'

export default function DashboardPage() {
  const { data: users, loading } = useFetch(fetchUsers)
  const [enriched, setEnriched] = useState([])
  const { query, setQuery, filtered } = useSearch(enriched, [
    'firstName','lastName','email','department'
  ])
  const { bookmarks, toggleBookmark } = useBookmarks()
  const router = useRouter()

  useEffect(() => {
    if (users) {

      const seededEnriched = users.map(u => {
        const deptIndex = (u.id * 13) % departments.length;
        const perf = (u.id * 7) % 5 + 1;
        
        return {
          ...u,
          department: departments[deptIndex],
          performance: Math.ceil(perf),
        }
      });
      
      setEnriched(seededEnriched);
    }
  }, [users])

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">Employee Directory</h1>
        <p className="text-gray-600 dark:text-gray-400">Browse and manage your team members</p>
      </div>

      <div className="relative mb-8 max-w-2xl mx-auto">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FaSearch className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search employees by name, email or department..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="block w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition duration-200 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12">
          <FaUserFriends className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-800 dark:text-gray-200">No employees found</h3>
          <p className="mt-1 text-gray-600 dark:text-gray-400">Try adjusting your search query</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map(u => {
            const isBookmarked = bookmarks.some(b => b.id === u.id);
            
            return (
              <Card key={u.id} className="transition-all duration-300 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700 hover:scale-[1.02]">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">{u.firstName} {u.lastName}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{u.email}</p>
                  </div>
                  <div className="bg-gray-200 dark:bg-gray-700 rounded-full p-2">
                    <FaUserCircle className="h-8 w-8 text-gray-500 dark:text-gray-400" />
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs font-semibold text-gray-300 uppercase">Age</p>
                    <p className="text-gray-800 dark:text-gray-200 font-medium">{u.age}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-300 uppercase">Department</p>
                    <p className="text-gray-800 dark:text-gray-200 font-medium truncate">{u.department}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs font-semibold text-gray-300 uppercase">Performance</p>
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
                    className={`flex-1 transition-colors flex items-center justify-center
                      ${isBookmarked 
                        ? 'bg-green-500 hover:bg-green-600 text-white' 
                        : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                  >
                    {isBookmarked ? (
                      <>
                        <FaBookmark className="mr-1" />
                        Saved
                      </>
                    ) : (
                      <>
                        <FaRegBookmark className="mr-1" />
                        Save
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}