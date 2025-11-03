import { useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import type { movieCardData } from '@/types/movieCardData'
import type { MovieCardRenderData } from '@/types/movieCardRenderData'
import { useFavorites } from '@/API/useFavorites'
import { Heart } from 'lucide-react'
import CommonModal from '@/component/common/CommonModal'
import CommonButton from '@/component/common/CommonButton'
import ShareButtonGroup from '@/component/ShareButtonGroup'

interface MovieCardPropsType extends MovieCardRenderData {
  userId?: string | undefined
  onToggleFavorite?: () => void
  touchEnabled?: boolean
  preventClick?: boolean
}

const API = import.meta.env.VITE_API_TOKEN

const HOVER_DELAY_MS = 300

export default function MovieCard({
  id,
  poster_path,
  vote_average,
  title,
  userId,
  onToggleFavorite,
  touchEnabled,
  preventClick = false, // 드래그 시 클릭방지 플래그
}: MovieCardPropsType) {
  const navigate = useNavigate()
  const [hover, setHover] = useState(false)
  const [trailerKey, setTrailerKey] = useState<string | null>(null)
  const hoverTimer = useRef<NodeJS.Timeout | null>(null)
  const [isShareErrorModalOpen, setIsShareErrorModalOpen] = useState(false)
  const [shareErrorMessage, setShareErrorMessage] = useState<string | null>(
    null
  )
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

  const handleMouseEnter = () => {
    // 마우스 진입 시, 0.5초 후에 isHovered를 true로 설정
    hoverTimer.current = setTimeout(() => {
      setHover(true)
    }, HOVER_DELAY_MS)
  }

  const handleMouseLeave = () => {
    // 마우스 이탈 시, 타이머를 클리어하고 isHovered를 false로 설정
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current)
    }
    setHover(false)
  }

  const handleClick = () => {
    if (preventClick) return // 드래그 중이면 클릭 무시
    navigate(`/movie/${id}`)
  }

  return (
    <>
      <li
        className="relative flex justify-center list-none transition-all duration-300 transform cursor-pointer hover:-translate-y-2 group"
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="w-[256px]">
          <div className="relative overflow-hidden rounded-[10px]">
            <img
              className="w-full h-[344px] object-cover"
              src={`https://image.tmdb.org/t/p/w342${poster_path}`}
              alt={title}
              draggable={false}
            />
            <iframe
              title="trailer"
              className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${hover ? 'opacity-100 pointer-events-none' : 'opacity-0 pointer-events-none'}`}
              src={hover ? YT_EMBED(trailerKey) : undefined}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              draggable={false}
            />
            <button
              aria-label="toggle favorite"
              className="absolute right-2 top-2 z-30 inline-flex items-center justify-center rounded-full bg-black/40 p-1.5 text-white transition hover:bg-black/60"
              onClick={(e) => {
                e.stopPropagation()
                onToggleFavorite?.()
              }}
            >
              <Heart
                className={`h-5 w-5 cursor-pointer z-30 ${
                  isFavorite ? 'text-red-500' : 'text-white/80'
                }`}
                fill={isFavorite ? 'currentColor' : 'none'}
                stroke="currentColor"
              />
            </button>
            <ShareButtonGroup
              className=""
              setShareErrorMessage={setShareErrorMessage}
              setIsShareErrorModalOpen={setIsShareErrorModalOpen}
              id={id}
              title={title}
              poster_path={poster_path}
              touchEnabled={touchEnabled}
            />
          </div>
          <div className="flex items-center justify-between h-8 mt-2">
            <h2 className="max-w-[140px] truncate text-base font-medium text-white">
              {title}
            </h2>
            <span className="inline-flex h-8 items-center justify-center rounded-[5px] bg-black/70 px-2 text-sm font-semibold text-yellow-300">
              ⭐ {vote_average.toFixed(1)}
            </span>
          </div>
        </div>
      </li>
      <CommonModal
        className="text-black"
        title={shareErrorMessage || 'Error'}
        isOpen={isShareErrorModalOpen}
        onClose={() => setIsShareErrorModalOpen(false)}
      >
        <CommonButton
          className="bg-black"
          onClick={() => setIsShareErrorModalOpen(false)}
        >
          확인
        </CommonButton>
      </CommonModal>
    </>
  )
}
