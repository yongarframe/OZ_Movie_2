import { useEffect, useState } from 'react'
import NavbarPcView from '../component/NavbarPcView'
import NavbarMobileView from '../component/NavbarMobileView'
import { useUserInfo } from '@/store/useUserInfo'
import { useMovieGenres } from '@/store/useMovieGenres'

export default function NavBar() {
  const [search, setSearch] = useState('')
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  const { userInfo, setUserInfo } = useUserInfo()
  const { genres, fetchGenres } = useMovieGenres()

  useEffect(() => {
    fetchGenres()
  }, [fetchGenres])

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
      genres={genres}
    />
  ) : (
    <NavbarPcView
      search={search}
      setSearch={setSearch}
      userInfo={userInfo}
      useImageUrl={userInfo?.user?.profileImageUrl}
      setUserInfo={setUserInfo}
      genres={genres}
    />
  )
}
