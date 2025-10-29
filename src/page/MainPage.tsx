import MovieRow from '@/component/MovieRow'
import MovieSlider from '@/component/MovieSlider'
import useIsTouchDevice from '@/hooks/useIsTouchDevice'
import { usePopular } from '@/store/useMovieCategories'
import { useSupabaseUser } from '@/supabase/moviefavorite/useSupabaseUser'
import type { MovieRowsType } from '@/types/MovieRowsType'

const SLIDE_IMAGE_COUNT = 4

const movieRows: MovieRowsType[] = [
  { title: '인기 영화', category: 'popular', immediate: true },
  { title: '현재 상영작', category: 'nowPlaying' },
  { title: '평점 높은 영화', category: 'topRated' },
  { title: '개봉 예정작', category: 'upcoming' },
]

export default function MainPage() {
  const { data: popular = [] } = usePopular(true) // 즉시 fetch
  const slideMovieData = popular.slice(0, SLIDE_IMAGE_COUNT)
  const user = useSupabaseUser()
  const touchEnabled = useIsTouchDevice()

  return (
    <div className="bg-black min-h-screen">
      <MovieSlider slideMovieData={slideMovieData} />
      <div className="mt-20 mx-10 space-y-10">
        {movieRows.map(({ title, category, immediate }) => (
          <MovieRow
            key={category}
            title={title}
            category={category}
            immediate={immediate}
            userId={user?.id}
            touchEnabled={touchEnabled}
          />
        ))}
      </div>
    </div>
  )
}
