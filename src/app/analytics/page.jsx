'use client'
import { fetchUsers } from '../../lib/api'
import useFetch from '../../hooks/useFetch'
import { departments } from '../../lib/departments'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement)

export default function AnalyticsPage() {
  const { data: users, loading } = useFetch(fetchUsers)
  if (loading) return <p>Loading…</p>
  // enrich as before
  const enriched = users.map(u => ({
    ...u,
    department: departments[Math.floor(Math.random() * departments.length)],
    performance: Math.ceil(Math.random() * 5),
  }))

  // group & average
  const deptMap = {}
  enriched.forEach(u => {
    if (!deptMap[u.department]) deptMap[u.department] = []
    deptMap[u.department].push(u.performance)
  })
  const labels = Object.keys(deptMap)
  const averages = labels.map(
    d =>
      deptMap[d].reduce((sum, r) => sum + r, 0) / deptMap[d].length
  )

  const data = {
    labels,
    datasets: [{ label: 'Avg Rating', data: averages }]
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Analytics</h1>
      <Bar data={data} />
    </div>
  )
}
