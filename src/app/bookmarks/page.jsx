'use client'
import { useBookmarks } from '../../context/BookmarksContext'
import Card from '../../components/Card'
import Button from '../../components/Button'

export default function BookmarksPage() {
  const { bookmarks, toggleBookmark } = useBookmarks()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-300 mb-2">Bookmarked Employees</h1>
        <p className="text-gray-600">Your saved team members</p>
      </div>

      {bookmarks.length === 0 ? (
        <div className="text-center py-12">
          <svg className="mx-auto h-24 w-24 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path>
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-300">No bookmarks yet</h3>
          <p className="mt-1 text-gray-500">Save employees to view them here</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {bookmarks.map(u => (
            <Card key={u.id} className="transition-all duration-300 hover:shadow-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-gray-300">{u.firstName} {u.lastName}</h3>
                  <p className="text-sm text-gray-500">{u.email}</p>
                </div>
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
              </div>
              
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-300">Department: <span className="font-normal">{u.department}</span></p>
                <p className="text-sm font-medium text-gray-300 mt-1">Performance:</p>
                <div className="mt-1">
                  <Stars value={u.performance}/>
                </div>
              </div>
              
              <div className="flex space-x-3 mt-6">
                <Button 
                  onClick={() => toggleBookmark(u)}
                  className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 transition-colors"
                >
                  Remove
                </Button>
                <Button 
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 transition-colors"
                >
                  Promote
                </Button>
                <Button 
                  className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-700 transition-colors"
                >
                  Assign
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}