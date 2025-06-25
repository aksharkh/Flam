export default function Stars({ value }) {
  return (
    <div className="flex space-x-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i}>{i < value ? '★' : '☆'}</span>
      ))}
    </div>
  )
}
