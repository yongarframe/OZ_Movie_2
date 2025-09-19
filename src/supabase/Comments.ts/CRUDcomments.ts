import { supabaseClient } from '@/supabase/context/supabaseClient'
import type { CommentType } from '@/types/movieDetail'

export async function fetchComments(postId: string) {
  const { data, error } = await supabaseClient
    .from('comments')
    .select(
      `
      id,
      post_id,
      user_id,
      content,
      created_at,
      updated_at,
      profiles:profiles!comments_user_id_fkey (
        id,
        username,
        user_profile_img
      )
    `
    )
    .eq('post_id', postId)
    .order('created_at', { ascending: true })

  if (error) throw error
  return data as unknown as CommentType[]
}

export async function addComment(
  postId: string,
  userId: string,
  content: string
) {
  const { data, error } = await supabaseClient
    .from('comments')
    .insert([{ post_id: postId, user_id: userId, content }])
    .select(
      `
      id,
      post_id,
      user_id,
      content,
      created_at,
      updated_at,
      profiles:profiles!comments_user_id_fkey (
        id,
        username,
        user_profile_img
      )
    `
    )

  if (error) throw error
  return data as unknown as CommentType[]
}

export async function updateComment(commentId: number, content: string) {
  const { data, error } = await supabaseClient
    .from('comments')
    .update({ content, updated_at: new Date().toISOString() })
    .eq('id', commentId)
    .select()

  if (error) throw error
  return data
}

export async function deleteComment(commentId: number) {
  const { error } = await supabaseClient
    .from('comments')
    .delete()
    .eq('id', commentId)

  if (error) throw error
}
