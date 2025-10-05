import { useEffect, useState } from 'react'

export default function useIsTouchDevice() {
  const isTouchDevice = (): boolean => {
    return (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      ('msMaxTouchPoints' in navigator &&
        (navigator as Navigator & { msMaxTouchPoints: number })
          .msMaxTouchPoints > 0)
    )
  }

  const [touchEnabled, setTouchEnabled] = useState(false)

  useEffect(() => {
    setTouchEnabled(isTouchDevice()) // 초기 실행
  }, [])

  return touchEnabled
}
