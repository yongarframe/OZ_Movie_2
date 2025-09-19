import { supabaseClient } from '@/supabase/context/supabaseClient'

export async function fetchComments(postId: string) {
  const { data, error } = await supabaseClient
    .from('comments')
    .select('*')
    .eq('post_id', postId)
    .order('created_at', { ascending: true })

  if (error) throw error
  return data
}

export async function addComment(
  postId: string,
  userId: string,
  content: string
) {
  const { data, error } = await supabaseClient
    .from('comments')
    .insert([{ post_id: postId, user_id: userId, content }])
    .select()

  if (error) throw error
  return data
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
