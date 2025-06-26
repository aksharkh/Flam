export default function Button({ children, onClick, className = '' }) {
  return (
    <button
      onClick={onClick}
      className={
        `relative overflow-hidden px-4 py-2 rounded-lg font-medium transition-all duration-200
         shadow-sm hover:shadow-md active:scale-[0.98] transform
         bg-white text-gray-700 border border-gray-200 hover:bg-gray-50
         dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700
         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
         ${className}`
      }
    >
      <span className="relative z-10 flex items-center justify-center">
        {children}
      </span>
      <span className="absolute inset-0 bg-gradient-to-b from-white/80 to-white/0 opacity-0 hover:opacity-100 transition-opacity dark:from-gray-900/30 dark:to-gray-900/0"></span>
    </button>
  )
}