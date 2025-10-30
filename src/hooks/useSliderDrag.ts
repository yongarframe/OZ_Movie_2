import { useEffect, useRef } from 'react'

export default function useSliderDrag(
  currentImg: number,
  setCurrentImg: React.Dispatch<React.SetStateAction<number>>,
  slideLength: number
) {
  // 드래그 관련 상태
  const sliderRef = useRef<HTMLDivElement | null>(null)
  const startX = useRef<number>(0)
  const currentTranslate = useRef<number>(0)
  const prevTranslate = useRef<number>(0)
  const isDragging = useRef(false)
  const movedDistance = useRef(0)

  // ----- 슬라이드 이동 애니메이션 -----
  const setSliderPosition = (translateX: number, smooth = false) => {
    if (!sliderRef.current) return
    sliderRef.current.style.transition = smooth ? 'transform 0.4s ease' : 'none'
    sliderRef.current.style.transform = `translateX(${translateX}px)`
  }

  // ----- 드래그 시작 -----
  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    isDragging.current = true
    movedDistance.current = 0

    startX.current =
      'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX
    prevTranslate.current = -currentImg * (sliderRef.current?.clientWidth || 0)

    // transition 제거 (즉시 반응)
    setSliderPosition(prevTranslate.current, false)
  }

  // ----- 드래그 중 -----
  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging.current || !sliderRef.current) return
    const currentX =
      'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX
    const diff = currentX - startX.current
    movedDistance.current = Math.abs(diff) // 이동 거리 저장
    currentTranslate.current = prevTranslate.current + diff
    setSliderPosition(currentTranslate.current)
  }

  // ----- 드래그 종료 -----
  const handleEnd = () => {
    if (!isDragging.current || !sliderRef.current) return
    isDragging.current = false

    const movedBy = currentTranslate.current - prevTranslate.current
    const slideWidth = sliderRef.current.clientWidth
    const movedRatio = movedBy / slideWidth

    let nextIndex = currentImg

    // 손을 놓은 방향/거리 비율에 따라 다음 슬라이드 결정
    if (movedRatio > 0.2 && currentImg > 0) {
      nextIndex = currentImg - 1
    } else if (movedRatio < -0.2 && currentImg < slideLength - 1) {
      nextIndex = currentImg + 1
    }

    setCurrentImg(nextIndex)

    // 손을 놓은 위치에서 부드럽게 이동
    const finalX = -nextIndex * slideWidth
    setSliderPosition(finalX, true)
  }

  // currentImg가 바뀔 때 부드럽게 스냅
  useEffect(() => {
    if (!sliderRef.current) return
    const slideWidth = sliderRef.current.clientWidth
    setSliderPosition(-currentImg * slideWidth, true)
  }, [currentImg])

  return { handleStart, handleMove, handleEnd, sliderRef, movedDistance }
}
