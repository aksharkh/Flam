export default function Badge({ children, color = 'green' }) {
  const colorMap = {
    green: 'bg-green-100 text-green-800 border border-green-200',
    red: 'bg-red-100 text-red-800 border border-red-200',
    blue: 'bg-blue-100 text-blue-800 border border-blue-200',
    yellow: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
    purple: 'bg-purple-100 text-purple-800 border border-purple-200',
  }
  
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${colorMap[color]}`}>
      {children}
    </span>
  )
}