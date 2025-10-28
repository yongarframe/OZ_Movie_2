import { useEffect, useState } from 'react'
import NavbarPcView from '../component/NavbarPcView'
import NavbarMobileView from '../component/NavbarMobileView'
import { useUserInfo } from '@/store/useUserInfo'

export default function NavBar() {
  const [search, setSearch] = useState('')
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  const { userInfo, setUserInfo } = useUserInfo()

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return isMobile ? (
    <NavbarMobileView
      search={search}
      setSearch={setSearch}
      userInfo={userInfo}
      useImageUrl={userInfo?.user?.profileImageUrl}
      setUserInfo={setUserInfo}
    />
  ) : (
    <NavbarPcView
      search={search}
      setSearch={setSearch}
      userInfo={userInfo}
      useImageUrl={userInfo?.user?.profileImageUrl}
      setUserInfo={setUserInfo}
    />
  )
}
