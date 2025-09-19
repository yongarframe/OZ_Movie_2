import { useEffect, useState } from 'react'
import {
  fetchComments,
  addComment,
  updateComment,
  deleteComment,
} from '@/supabase/Comments.ts/CRUDcomments'
import type { CommentType } from '@/types/movieDetail'
import Comment from '@/component/Comment'

export default function CommentList({
  postId,
  userId,
}: {
  postId: string | undefined
  userId: string
}) {
  const [comments, setComments] = useState<CommentType[]>([])
  const [newComment, setNewComment] = useState('')

  useEffect(() => {
    if (!postId) return
    fetchComments(postId).then(setComments)
  }, [postId])

  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!postId) {
      alert('영화 정보가 없습니다. 잠시 후 다시 시도해 주세요')
      return
    }
    if (!newComment.trim()) {
      alert('리뷰내용이 없습니다.')
      return
    }
    if (!userId) {
      alert('로그인이 필요합니다.')
      return
    }
    const data = await addComment(postId, userId, newComment)
    setComments([...comments, ...data])
    setNewComment('')
  }

  const handleUpdate = async (id: number, content: string) => {
    const data = await updateComment(id, content)
    setComments(comments.map((c) => (c.id === id ? data[0] : c)))
  }

  const handleDelete = async (id: number) => {
    await deleteComment(id)
    setComments(comments.filter((c) => c.id !== id))
  }

  return (
    <section className="mt-12 px-4 sm:px-8 md:px-20">
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">리뷰</h2>

      {/* 댓글 작성 폼 */}
      <form onSubmit={handleAdd} className="flex items-center gap-3 mb-8">
        <input
          type="text"
          placeholder="리뷰를 작성하세요..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-600"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-semibold transition"
        >
          작성
        </button>
      </form>

      {/* 댓글 리스트 */}
      <div className="flex flex-col gap-4">
        {comments.length === 0 && (
          <p className="text-gray-500">
            리뷰가 없습니다. 첫 리뷰를 남겨보세요!
          </p>
        )}

        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            userId={userId}
            handleUpdate={handleUpdate}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </section>
  )
}
