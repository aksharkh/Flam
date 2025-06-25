export default function Badge({ children, color = 'green' }) {
  const bg = color === 'green' ? 'bg-green-200' : 'bg-red-200'
  return <span className={`px-2 py-1 rounded ${bg}`}>{children}</span>
}
