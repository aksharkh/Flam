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

  useEffect(() => {
    if (user) {
      setHistory(
        Array.from({ length: 5 }).map((_, i) => ({
          year: 2021 + i,
          rating: Math.ceil(Math.random() * 5),
        }))
      )
    }
  }, [user])

  if (loading) return <p>Loading…</p>
  if (!user) return <p>User not found</p>

  return (
    <div>
      <h1 className="text-2xl font-bold">
        {user.firstName} {user.lastName}
      </h1>
      <div className="flex space-x-4 mt-4">
        {['Overview','Projects','Feedback'].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-3 py-1 rounded ${
              tab === t ? 'bg-blue-200' : 'bg-gray-200'
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {tab === 'Overview' && (
          <>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>Address: {user.address.address}, {user.address.city}</p>
            <p>Bio: Lorem ipsum dolor sit amet…</p>
            <Stars value={Math.ceil(Math.random() * 5)}/>
            <h2 className="mt-4 font-bold">Performance History</h2>
            {history.map(h => (
              <div key={h.year} className="flex items-center space-x-2">
                <span>{h.year}</span>
                <Stars value={h.rating}/>
                <Badge color={h.rating >= 3 ? 'green' : 'red'}>
                  {h.rating >= 3 ? 'Good' : 'Needs Improvement'}
                </Badge>
              </div>
            ))}
          </>
        )}
        {tab === 'Projects' && <p>Projects content…</p>}
        {tab === 'Feedback' && <p>Feedback form…</p>}
      </div>
    </div>
  )
}
