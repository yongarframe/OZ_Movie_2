import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function MovieCard({
  id,
  poster_path,
  vote_average,
  title,
  popularity,
  gender,
}) {
  const navigate = useNavigate()
  const [hover, setHover] = useState(false)
  const [trailerKey, setTrailerKey] = useState(null)

  const API = import.meta.env.VITE_API_TOKEN

  useEffect(() => {
    // 카드 mount 시 한 번만 fetch
    async function fetchTrailer() {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos`,
        {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API}`,
          },
        }
      )
      const data = await res.json()
      const trailer = data.results.find(
        (v) => v.type === 'Trailer' && v.site === 'YouTube'
      )
      setTrailerKey(trailer?.key)
    }
    fetchTrailer()
  }, [id])

  const YT_EMBED = (key) =>
    `https://www.youtube.com/embed/${key}?autoplay=1&mute=1&controls=0&playsinline=1&loop=1&playlist=${key}`

  return (
    <li
      className="list-none transform hover:-translate-y-2 transition-all duration-300 cursor-pointer relative"
      onClick={() => navigate(`/movie/${id}`)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="relative">
          <img
            className="w-full h-[300px] object-cover"
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt={title}
          />

          <div className="absolute top-2 right-2 bg-yellow-400 text-black font-bold px-2 py-1 z-10 bg-opacity-80 backdrop-blur-sm rounded-full text-sm">
            ⭐ {vote_average.toFixed(1)}
          </div>
        </div>
        <div className="p-4">
          <h2 className="text-lg font-bold text-gray-800 line-clamp-1 mb-2">
            {title}
          </h2>
          <div className="flex items-center justify-between text-sm">
            <span className="text-blue-600 font-semibold">
              인기도: {Math.round(popularity)}
            </span>
            {gender && (
              <span className="text-purple-600 font-semibold">{gender}</span>
            )}
          </div>
        </div>
      </div>
      <iframe
        title="trailer"
        className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${hover ? 'opacity-100 pointer-events-none' : 'opacity-0 '}`}
        src={hover ? YT_EMBED(trailerKey) : ''}
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
      />
    </li>
  )
}
