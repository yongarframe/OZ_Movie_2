import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import MovieCardRender from '../page/MovieCardRender'
import { useSearchMovie } from '@/store/useSearchMovie'

export default function Search() {
  const [searchParms] = useSearchParams()
  const params = searchParms.get('movie')
  const { searchMovie, fetchSearchMovie } = useSearchMovie()

  useEffect(() => {
    fetchSearchMovie(params)
  }, [params])

  return <MovieCardRender movieData={searchMovie} />
}
