import { supabaseClient } from '@/supabase/context/supabaseClient'

// 즐겨찾기 추가
export async function addFavorite({
  userId,
  movieId,
  title,
  poster_path,
  vote_average,
  popularity,
}: {
  userId: string
  movieId: number
  title: string
  poster_path: string
  vote_average: number
  popularity: number
}) {
  const { data, error } = await supabaseClient
    .from('favorites')
    .insert([
      {
        user_id: userId,
        movie_id: movieId,
        title,
        poster_path,
        vote_average,
        popularity,
      },
    ])
    .select()

  if (error) throw error
  return data
}

// 즐겨찾기 삭제
export async function removeFavorite(userId: string, movieId: number) {
  const { error } = await supabaseClient
    .from('favorites')
    .delete()
    .eq('user_id', userId)
    .eq('movie_id', movieId)

  if (error) throw error
}

// 내 즐겨찾기 목록 가져오기
export async function getFavorites(userId: string) {
  const { data, error } = await supabaseClient
    .from('favorites')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}
