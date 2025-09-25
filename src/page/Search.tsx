import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import MovieCardRender from '@/component/MovieSearchRender'
import { useSearchMovie } from '@/store/useSearchMovie'

export default function Search() {
  const [searchParams] = useSearchParams()
  const params = searchParams.get('movie')
  const { searchMovie, fetchSearchMovie } = useSearchMovie()

  useEffect(() => {
    fetchSearchMovie(params)
  }, [params])

  return <MovieCardRender movieData={searchMovie} />
}
