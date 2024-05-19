import React, { useEffect } from "react"
import { useAuth } from '../context/AuthContext'
import '../styles/Profile.css'
import Header from "../components/Profile/Header"
import { useOutlet } from "react-router-dom"
import SideMenu from "../components/Profile/SideMenu"
import Dashboard from '../components/Profile/Dashboard'
import { IoClose } from "react-icons/io5";

function Profile() {
  const { user, deauthorize } = useAuth()

  const outlet = useOutlet()

  useEffect(() => {
    const logoutMenu = document.querySelector('.logout-menu')
    const logoutMenuClose = document.querySelector('.logout-menu-close')
    const blackFilter = document.querySelector('.black-filter')

    logoutMenuClose.addEventListener('click', () => {
      logoutMenu.classList.add('hidden')
      blackFilter.classList.remove('black-filter-active')
    })
  }, [])

  return (
    !user ? <h1>Loading data...</h1> :
    <div>
      <Header />

      <div className="main mt-[7vh] max-lg:flex place-content-center">
        <SideMenu />

        <div className='lg:absolute top-[7vh] lg:left-56 lg:right-0 flex flex-col items-center pt-8'>
          { outlet || <Dashboard /> }
        </div>
        
      </div>

      <div className="black-filter"></div>

      <div className='logout-menu hidden'>
        <img className="h-14" src="/img/user-black.png" />
        <p className="mt-2 text-2xl max-sm:text-lg font-bold">{user.fullName}</p>
        <p className="mt-1 max-sm:mt-0 font-normal">{user.email}</p>
        <button onClick={deauthorize} className="mt-7 max-sm:mt-4 bg-secondary rounded-md text-white font-normal px-3 py-1">Sign Out</button>

        <IoClose className='logout-menu-close absolute right-0 top-0 translate-x-1/4 -translate-y-1/4 bg-secondary cursor-pointer text-white size-8 rounded-full' />
      </div>

      <div className='scheduling-menu hidden'>
        <p className='text-xl'>Scheduling the call...</p>
      </div>
    </div>
  )
}

export default Profile
