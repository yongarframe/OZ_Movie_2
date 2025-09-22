export default function SkeletonMovieCard() {
  return (
    <div className="w-[256px] flex-shrink-0">
      <div className="relative overflow-hidden rounded-[10px] bg-gray-700 animate-pulse h-[344px]" />
      <div className="mt-2 flex h-8 items-center justify-between">
        <div className="h-4 w-[140px] bg-gray-600 rounded-md animate-pulse" />
        <div className="h-6 w-12 bg-gray-600 rounded-[5px] animate-pulse" />
      </div>
    </div>
  )
}
