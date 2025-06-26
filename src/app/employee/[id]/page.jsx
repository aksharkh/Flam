'use client'
import { useParams } from 'next/navigation'
import useFetch from '../../../hooks/useFetch'
import { fetchUserById } from '../../../lib/api'
import { useEffect, useState } from 'react'
import Badge from '../../../components/Badge'
import Stars from '../../../components/Stars'

export default function EmployeePage() {
  const { id } = useParams()
  const { data: user, loading } = useFetch(fetchUserById, [id])
  const [tab, setTab] = useState('Overview')
  const [history, setHistory] = useState([])
  const [performance, setPerformance] = useState(0)

  useEffect(() => {
    if (user) {
      // Generate random performance history
      const perfHistory = Array.from({ length: 5 }).map((_, i) => ({
        year: 2021 + i,
        rating: Math.ceil(Math.random() * 5),
      }))
      
      setHistory(perfHistory)
      
      // Set current performance as average of last 3 years
      const recent = perfHistory.slice(-3).map(h => h.rating)
      const avg = recent.reduce((a, b) => a + b, 0) / recent.length
      setPerformance(Math.round(avg * 2) / 2) // Round to nearest 0.5
    }
  }, [user])

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  )
  
  if (!user) return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
      <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
      </svg>
      <h3 className="mt-4 text-2xl font-medium text-gray-900">Employee not found</h3>
      <p className="mt-2 text-gray-500">The requested employee could not be found</p>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-24 h-24 md:w-32 md:h-32 flex-shrink-0" />
            
            <div className="mt-4 md:mt-0 md:ml-8 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start">
                <h1 className="text-2xl md:text-3xl font-bold text-white">
                  {user.firstName} {user.lastName}
                </h1>
                <Badge color={performance >= 3.5 ? 'green' : performance >= 2.5 ? 'blue' : 'yellow'} className="ml-3">
                  {performance >= 4 ? 'Top Performer' : performance >= 3 ? 'Solid' : 'Developing'}
                </Badge>
              </div>
              
              <div className="mt-2 flex flex-wrap justify-center md:justify-start">
                <div className="flex items-center mx-2 my-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="ml-1 text-blue-100">{user.email}</span>
                </div>
                <div className="flex items-center mx-2 my-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="ml-1 text-blue-100">{user.phone}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 md:mt-0 ml-auto bg-white/20 backdrop-blur-sm rounded-lg p-4">
              <p className="text-blue-50 text-sm">Current Rating</p>
              <div className="flex items-center">
                <div className="text-3xl font-bold text-white">{performance.toFixed(1)}</div>
                <div className="ml-3">
                  <Stars value={Math.round(performance)} />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <div className="flex overflow-x-auto">
            {['Overview', 'Projects', 'Feedback', 'Documents', 'Activity'].map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-5 py-4 font-medium text-sm relative ${
                  tab === t 
                    ? 'text-blue-600 border-b-2 border-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {t}
                {tab === t && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
                )}
              </button>
            ))}
          </div>
        </div>
        
        {/* Tab Content */}
        <div className="p-6">
          {tab === 'Overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Personal Details</h2>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Age</p>
                      <p className="font-medium">{user.age}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Birthday</p>
                      <p className="font-medium">Jan 15, 1990</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Gender</p>
                      <p className="font-medium">Male</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Hire Date</p>
                      <p className="font-medium">Jun 12, 2018</p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium">
                      {user.address.address}, {user.address.city}, {user.address.state}
                    </p>
                  </div>
                </div>
                
                <h2 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Department</h2>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="bg-blue-100 rounded-lg p-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <p className="font-medium">Engineering</p>
                      <p className="text-sm text-gray-500">Reports to: Sarah Johnson</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Performance History</h2>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  {history.map((h, index) => (
                    <div key={h.year} className={`flex items-center py-3 ${index !== history.length - 1 ? 'border-b border-gray-100' : ''}`}>
                      <div className="w-16">
                        <span className="text-gray-500">{h.year}</span>
                      </div>
                      <div className="flex-1 flex items-center">
                        <Stars value={h.rating} />
                        <Badge color={h.rating >= 4 ? 'green' : h.rating >= 3 ? 'blue' : 'yellow'} className="ml-3">
                          {h.rating >= 4 ? 'Excellent' : h.rating >= 3 ? 'Good' : 'Needs Improvement'}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <span className="font-medium">{h.rating.toFixed(1)}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <h2 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Skills & Expertise</h2>
                <div className="flex flex-wrap gap-2">
                  {['JavaScript', 'React', 'Node.js', 'UI/UX', 'Project Management', 'Agile Methodology'].map((skill, i) => (
                    <Badge key={i} color={i % 2 === 0 ? 'blue' : 'purple'}>{skill}</Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {tab === 'Projects' && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Current Projects</h2>
              <div className="space-y-4">
                {[1, 2, 3].map(project => (
                  <div key={project} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between">
                      <h3 className="font-medium">Project Apollo v{project}.0</h3>
                      <Badge color={project === 1 ? 'green' : project === 2 ? 'blue' : 'yellow'}>
                        {project === 1 ? 'On Track' : project === 2 ? 'In Review' : 'Planning'}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Next generation customer portal development</p>
                    
                    <div className="mt-4 flex justify-between items-center">
                      <div>
                        <p className="text-xs text-gray-500">Progress</p>
                        <div className="w-48 h-2 bg-gray-200 rounded-full mt-1">
                          <div 
                            className={`h-full rounded-full ${
                              project === 1 ? 'bg-green-500 w-3/4' : 
                              project === 2 ? 'bg-blue-500 w-1/2' : 
                              'bg-yellow-500 w-1/4'
                            }`}
                          ></div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Team</p>
                        <div className="flex -space-x-2">
                          {[1, 2, 3].map(member => (
                            <div key={member} className="bg-gray-200 border-2 border-white rounded-full w-8 h-8"></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {tab === 'Feedback' && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Feedback & Reviews</h2>
              <div className="bg-gray-50 rounded-lg p-5">
                <h3 className="font-medium text-gray-900">Submit Feedback</h3>
                <textarea 
                  placeholder="Share your feedback about this employee..."
                  className="mt-2 w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="4"
                ></textarea>
                <div className="mt-3 flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-700">Performance Rating</p>
                    <Stars value={0} />
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Submit Feedback
                  </Button>
                </div>
              </div>
              
              <h3 className="font-medium text-gray-900 mt-6 mb-4">Recent Feedback</h3>
              <div className="space-y-4">
                {[1, 2].map(review => (
                  <div key={review} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <div className="bg-gray-200 border-2 border-white rounded-full w-10 h-10"></div>
                        <div className="ml-3">
                          <p className="font-medium">Sarah Johnson</p>
                          <p className="text-sm text-gray-500">3 days ago</p>
                        </div>
                      </div>
                      <Stars value={4} />
                    </div>
                    <p className="mt-3 text-gray-700">
                      John has demonstrated exceptional problem-solving skills in the recent project. 
                      His ability to navigate complex technical challenges has been invaluable to the team.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {(tab === 'Documents' || tab === 'Activity') && (
            <div className="text-center py-12">
              <svg className="mx-auto h-16 w-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Coming Soon</h3>
              <p className="mt-2 text-gray-500">{tab} section is under development</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}