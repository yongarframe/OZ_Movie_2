import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import type { movieCardData } from '@/types/movieCardData'
import { Star } from 'lucide-react'
import { addFavorite, removeFavorite } from '@/supabase/moviefavorite/favorites'
import type { MovieCardRenderData } from '@/types/movieCardRenderData'
import { useFavorites } from '@/API/useFavorites'
import { useQueryClient } from '@tanstack/react-query'

interface MovieCardPropsType extends MovieCardRenderData {
  userId: string | undefined
  onToggleFavorite?: () => void
}

const API = import.meta.env.VITE_API_TOKEN

export default function MovieCard({
  id,
  poster_path,
  vote_average,
  title,
  popularity,
  userId,
  onToggleFavorite,
}: MovieCardPropsType) {
  const navigate = useNavigate()
  const [hover, setHover] = useState(false)
  const [trailerKey, setTrailerKey] = useState<string | null>(null)

  const queryClient = useQueryClient()
  const { data: favorites = [] } = useFavorites(userId)

  const isFavorite = favorites.some((fav) => fav.movie_id === id)

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
      const data: movieCardData = await res.json()
      const trailer = data.results.find(
        (v) => v.type === 'Trailer' && v.site === 'YouTube'
      )
      if (trailer) setTrailerKey(trailer?.key)
    }
    fetchTrailer()
  }, [id])

  const YT_EMBED = (key: string | null) =>
    `https://www.youtube.com/embed/${key}?autoplay=1&mute=1&controls=0&playsinline=1&loop=1&playlist=${key}`

  const toggleFavorite = async (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation()
    if (!userId) return
    if (isFavorite) {
      await removeFavorite(userId, id)
    } else {
      await addFavorite({
        userId,
        movieId: id,
        title: title,
        poster_path,
        vote_average,
        popularity,
      })
    }
    queryClient.invalidateQueries({ queryKey: ['favorites', userId] })
    onToggleFavorite?.()
  }

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
          <iframe
            title="trailer"
            className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${hover ? 'opacity-100 pointer-events-none' : 'opacity-0 '}`}
            src={hover ? YT_EMBED(trailerKey) : undefined}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="p-4 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold text-gray-800 line-clamp-1 mb-2">
              {title}
            </h2>
            <div className="flex items-center justify-between text-sm">
              <span className="text-blue-600 font-semibold">
                인기도: {Math.round(popularity)}
              </span>
            </div>
          </div>
          <Star
            className="text-gray-400 hover:text-yellow-500 transition w-5 h-5"
            fill={isFavorite ? 'currentColor' : 'none'}
            stroke="currentColor"
            onClick={toggleFavorite}
          />
        </div>
      </div>
    </li>
  )
}
