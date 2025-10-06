import { useState, useCallback } from 'react'

export default function useSearchEnter(
  onEnter: (e?: React.MouseEvent | React.FormEvent) => void
) {
  const [isComposing, setIsComposing] = useState(false)

  const searchEnterKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      // IME 조합 중일 때는 무시
      if (isComposing) return

      // 모바일에서는 key가 "Enter" 대신 "Search", "Go", "Done" 등일 수 있음
      if (
        e.key === 'Enter' ||
        e.key === 'Search' ||
        e.key === 'Go' ||
        e.key === 'Done'
      ) {
        e.preventDefault()
        onEnter()
      }
    },
    [isComposing, onEnter]
  )

  const handleCompositionStart = useCallback(() => {
    setIsComposing(true)
  }, [])

  const handleCompositionEnd = useCallback(() => {
    setIsComposing(false)
  }, [])

  return { searchEnterKeyDown, handleCompositionStart, handleCompositionEnd }
}
