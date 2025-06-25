export default function Card({ children }) {
  return (
    <div className="bg-white dark:bg-gray-700 shadow rounded-lg p-4">
      {children}
    </div>
  )
}
