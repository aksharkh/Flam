export default function Card({ children, className = '' }) {
  return (
    <div className={
      `bg-white dark:bg-gray-600 rounded-xl border border-gray-200 dark:border-gray-700 
      shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden
      ${className}`
    }>
      <div className="p-5">
        {children}
      </div>
    </div>
  )
}