'use client'
import { fetchUsers } from '../../lib/api'
import useFetch from '../../hooks/useFetch'
import { departments } from '../../lib/departments'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js'
import { useEffect, useState } from 'react'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

export default function AnalyticsPage() {
  const { data: users, loading } = useFetch(fetchUsers)
  const [chartData, setChartData] = useState(null)
  
  useEffect(() => {
    if (users) {
      const enriched = users.map(u => ({
        ...u,
        department: departments[Math.floor(Math.random() * departments.length)],
        performance: Math.ceil(Math.random() * 5),
      }))
      
      const deptMap = {}
      enriched.forEach(u => {
        if (!deptMap[u.department]) deptMap[u.department] = []
        deptMap[u.department].push(u.performance)
      })
      
      const labels = Object.keys(deptMap)
      const averages = labels.map(
        d => parseFloat((deptMap[d].reduce((sum, r) => sum + r, 0) / deptMap[d].length).toFixed(2))
      )
      
      setChartData({
        labels,
        datasets: [{
          label: 'Avg Performance Rating',
          data: averages,
          backgroundColor: 'rgba(59, 130, 246, 0.7)',
          borderColor: 'rgb(29, 78, 216)',
          borderWidth: 1,
          borderRadius: 6,
          hoverBackgroundColor: 'rgba(29, 78, 216, 0.9)',
        }]
      })
    }
  }, [users])

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-300 mb-2">Department Analytics</h1>
        <p className="text-gray-400">Performance ratings by department</p>
      </div>

      {chartData ? (
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="h-96">
            <Bar 
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 5,
                    ticks: {
                      stepSize: 0.5
                    },
                    grid: {
                      color: 'rgba(0, 0, 0, 0.05)'
                    }
                  },
                  x: {
                    grid: {
                      display: false
                    }
                  }
                },
                plugins: {
                  legend: {
                    position: 'top',
                    labels: {
                      font: {
                        size: 14
                      }
                    }
                  },
                  tooltip: {
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    titleColor: '#1e293b',
                    bodyColor: '#1e293b',
                    borderColor: '#e2e8f0',
                    borderWidth: 1,
                    padding: 12,
                    boxPadding: 8,
                    usePointStyle: true,
                    callbacks: {
                      label: function(context) {
                        return `Rating: ${context.parsed.y}`;
                      }
                    }
                  }
                }
              }}
            />
          </div>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {chartData.labels.map((label, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h3 className="font-semibold text-gray-600">{label}</h3>
                <div className="flex items-center mt-2">
                  <div className="text-2xl font-bold text-blue-600">{chartData.datasets[0].data[index]}</div>
                  <div className="ml-4">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={i < Math.round(chartData.datasets[0].data[index]) ? "text-yellow-400" : "text-gray-300"}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="mt-2 text-lg font-medium text-gray-300">No analytics data</h3>
          <p className="mt-1 text-gray-500">Performance data will appear here</p>
        </div>
      )}
    </div>
  )
}