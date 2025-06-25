export default function Button({ children, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={
        'px-3 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 ' +
        className
      }
    >
      {children}
    </button>
  )
}
