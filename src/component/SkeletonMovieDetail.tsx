export default function SkeletonMovieDetail() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
          <div className="relative">
            <div className="w-full h-[300px] md:h-[500px] bg-gray-200 animate-pulse"></div>
            <div className="absolute top-4 right-4 h-10 w-20 bg-gray-200 animate-pulse rounded-full"></div>
          </div>

          <div className="p-6 md:p-8">
            <div className="h-10 w-3/4 bg-gray-200 animate-pulse rounded-lg mb-4"></div>

            <div className="flex flex-wrap gap-4 mb-6">
              <div className="h-10 w-32 bg-gray-200 animate-pulse rounded-full"></div>
              <div className="h-10 w-32 bg-gray-200 animate-pulse rounded-full"></div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <div className="h-8 w-1/4 bg-gray-200 animate-pulse rounded-lg mb-3"></div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-200 animate-pulse rounded"></div>
                <div className="h-4 w-full bg-gray-200 animate-pulse rounded"></div>
                <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
