export interface FavoriteMovieData {
  id?: number
  user_id?: string
  movie_id: number
  title: string
  poster_path: string
  vote_average: number
  popularity: number
  created_at?: string
}
