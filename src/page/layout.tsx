import NavBar from '@/page/NavBar'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <>
      <NavBar />
      <div className="pt-20">
        <Outlet />
      </div>
    </>
  )
}
