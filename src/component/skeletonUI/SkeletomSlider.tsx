export default function SkeletonSlider() {
  return (
    <div className="relative overflow-hidden min-h-[500px] bg-gray-700 animate-pulse">
      <div className="absolute inset-0 bg-gray-600/40" />
      <div className="absolute bottom-5 left-5 max-w-2xl w-full h-32 bg-gray-500 rounded" />
      <div className="absolute bottom-5 left-5 max-w-3xl w-full h-20 mt-2 bg-gray-400 rounded" />
    </div>
  )
}
