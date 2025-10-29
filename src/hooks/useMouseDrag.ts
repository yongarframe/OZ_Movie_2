import { useRef, useState } from 'react'

export default function useMouseDrag() {
  const scrollRef = useRef<HTMLUListElement | null>(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)
  const velocity = useRef(0) // 관성 속도
  const animationFrame = useRef(0) // requestAnimationFrame id
  const lastTime = useRef(0)
  const lastX = useRef(0)
  const [preventClick, setPreventClick] = useState(false)

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return
    isDragging.current = true
    startX.current = e.pageX - scrollRef.current.offsetLeft
    scrollLeft.current = scrollRef.current.scrollLeft
    lastX.current = e.pageX
    lastTime.current = performance.now()
    setPreventClick(false)
    cancelAnimationFrame(animationFrame.current)
  }
  const applyInertia = () => {
    if (!scrollRef.current) return
    let v = velocity.current * 20 // 속도 증폭
    const friction = 0.95 // 감속 계수

    const step = () => {
      if (!scrollRef.current) return
      scrollRef.current.scrollLeft += v
      v *= friction
      if (Math.abs(v) > 0.5) {
        animationFrame.current = requestAnimationFrame(step)
      }
    }

    animationFrame.current = requestAnimationFrame(step)
  }

  const handleMouseUp = () => {
    isDragging.current = false
    applyInertia()
  }
  const handleMouseLeave = () => {
    if (isDragging.current) handleMouseUp()
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = x - startX.current
    scrollRef.current.scrollLeft = scrollLeft.current - walk

    // 속도 계산 (관성용)
    const now = performance.now()
    const dt = now - lastTime.current
    if (dt > 0) {
      velocity.current = (lastX.current - e.pageX) / dt
      lastX.current = e.pageX
      lastTime.current = now
    }

    if (Math.abs(walk) > 5) setPreventClick(true) // 드래그 판정
  }

  return {
    scrollRef,
    handleMouseDown,
    handleMouseLeave,
    handleMouseMove,
    handleMouseUp,
    preventClick,
  }
}
