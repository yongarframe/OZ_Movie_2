import type { CommentType } from '@/types/movieDetail'
import { useState } from 'react'

export default function Comment({
  comment,
  userId,
  handleUpdate,
  handleDelete,
}: {
  comment: CommentType
  userId: string
  handleUpdate: (id: number, content: string) => Promise<void>
  handleDelete: (id: number) => Promise<void>
}) {
  const [isCommentUpdate, setIsCommentUpdate] = useState(false)
  const [editComment, setEditComment] = useState('')
  return (
    <div className="flex items-start gap-3 bg-gray-800 rounded-xl p-4 shadow-md">
      {comment.profiles.user_profile_img ? (
        <img
          src={comment.profiles.user_profile_img}
          alt={`${comment.profiles.username}의 유저 이미지`}
          className="w-10 h-10 rounded-full object-cover"
        />
      ) : (
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-600 text-white font-bold">
          {comment.profiles.username?.[0]?.toUpperCase() || 'U'}
        </div>
      )}
      {/* 본문 */}
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <span className="text-white font-medium">
            {comment.profiles?.username || '익명'}
          </span>
          <span className="text-xs text-gray-500">
            {new Date(comment.created_at).toLocaleDateString()}
          </span>
        </div>

        {/* 댓글 내용 */}
        <div className="flex justify-between mt-1">
          {isCommentUpdate ? (
            <input
              value={editComment}
              onChange={(e) => setEditComment(e.target.value)}
              className="flex-1 px-2 py-1 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-600"
            />
          ) : (
            <p className="text-gray-300 mt-1 whitespace-pre-line">
              {comment.content}
            </p>
          )}
          {userId === comment.user_id && (
            <div className="flex gap-2 ml-6">
              {!isCommentUpdate ? (
                <button
                  onClick={() => {
                    setIsCommentUpdate(true)
                    setEditComment(comment.content)
                  }}
                  className="px-3 py-1 bg-amber-600 rounded-lg text-white font-medium hover:bg-amber-700 transition cursor-pointer"
                >
                  수정
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsCommentUpdate(false)
                    handleUpdate(comment.id, editComment)
                  }}
                  className="px-3 py-1 bg-green-600 rounded-lg text-white font-medium hover:bg-amber-700 transition cursor-pointer"
                >
                  수정완료
                </button>
              )}

              <button
                onClick={() => handleDelete(comment.id)}
                className="px-3 py-1 bg-gray-500 rounded-lg text-white font-medium hover:bg-gray-600 transition cursor-pointer"
              >
                삭제
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
