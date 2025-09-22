export default function SkeletonMovieRow() {
  return (
    <div className="flex space-x-2 overflow-x-auto hide-scrollbar">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="w-32 h-48 bg-gray-700 animate-pulse rounded" />
      ))}
    </div>
  )
}
