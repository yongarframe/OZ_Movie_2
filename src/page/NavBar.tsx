import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useDebounce from '@/customHooks/useDebounce'
import NavbarPcView from '../component/NavbarPcView'
import NavbarMobileView from '../component/NavbarMobileView'
import { useUserInfo } from '@/store/useUserInfo'

export default function NavBar() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  const debounceValue = useDebounce(search, 1000)
  const { userInfo, setUserInfo } = useUserInfo()

  useEffect(() => {
    if (debounceValue) {
      navigate(`/search?movie=${debounceValue}`)
    }
  }, [debounceValue])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return isMobile ? (
    <NavbarMobileView
      setSearch={setSearch}
      userInfo={userInfo}
      useImageUrl={userInfo?.user?.profileImageUrl}
      setUserInfo={setUserInfo}
    />
  ) : (
    <NavbarPcView
      setSearch={setSearch}
      userInfo={userInfo}
      useImageUrl={userInfo?.user?.profileImageUrl}
      setUserInfo={setUserInfo}
    />
  )
}
