import React from "react"
import { Link, useLocation } from "react-router-dom"
import '../../styles/SideMenu.css'
import { useAuth } from '../../context/AuthContext'

function SideMenu() {
  const location = useLocation()
  const { user } = useAuth()

  const matchPath = link => location.pathname.replace('/profile', '') == link

  return (
    <ul className='fixed left-0 top-[7vh] bottom-0 flex flex-col items-center w-56 bg-gray-200 max-lg:hidden'>
      <Link to='/profile' className='w-full'><li className={`link ${matchPath('') ? 'link-active' : ''}`}>Dashboard</li></Link>

      <div className='w-full h-[2px] bg-gray-300 rounded-full'></div>

      <Link to='/profile/schedule' className='w-full'><li className={`link ${matchPath('/schedule') ? 'link-active' : ''}`}>Schedule a call</li></Link>

      <div className='w-full h-[2px] bg-gray-300 rounded-full'></div>

      <Link to='/profile/more-calls' className='w-full'><li className={`link ${matchPath('/more-calls') ? 'link-active' : ''}`}>More calls</li></Link>

      <div className='w-full h-[2px] bg-gray-300 rounded-full'></div>

      {
        user.plan != 'CALLS' ?
        <>
          <Link to='/profile/course' className='w-full'><li className={`link ${matchPath('/course') ? 'link-active' : ''}`}>Course</li></Link>

          <div className='w-full h-[2px] bg-gray-300 rounded-full'></div>

          <Link to='/profile/ebook' className='w-full'><li className={`link ${matchPath('/ebook') ? 'link-active' : ''}`}>E-book</li></Link>

          <div className='w-full h-[2px] bg-gray-300 rounded-full'></div>
        </>
        : null
      }
      
      <Link to='/profile/help' className='w-full'><li className={`link ${matchPath('/help') ? 'link-active' : ''}`}>Help</li></Link>
    </ul>
  )
}

export default SideMenu
