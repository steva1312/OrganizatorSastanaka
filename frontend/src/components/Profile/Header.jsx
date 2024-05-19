import React, { useEffect, useState } from "react"
import { useAuth } from "../../context/AuthContext"
import PopupMenu from "../PopupMenu"
import { Link, useLocation } from 'react-router-dom'

function Header() {
  const { user } = useAuth()

  const location = useLocation()
  const matchPath = link => location.pathname.replace('/profile', '') == link

  useEffect(() => {
    const burger = document.querySelector('.burger')
    const phoneLinks = document.querySelector('.phone-links')
    const blackFilter = document.querySelector('.black-filter')
    const links = document.querySelectorAll('.phone-links a')
    const logoutLink = document.querySelector('.logout-link')
    const logoutMenu = document.querySelector('.logout-menu')
    const userButton = document.querySelector('.user-button')

    const toggleClasses = () => {
      burger.classList.toggle('burger-x')
      phoneLinks.classList.toggle('phone-links-show')
      blackFilter.classList.toggle('black-filter-active')
    }

    const openLogoutMenu = () => {
      blackFilter.classList.add('black-filter-active')
      console.log(blackFilter)
      logoutMenu.classList.remove('hidden')
      phoneLinks.classList.remove('phone-links-show')
    }

    burger.addEventListener('click', () => {
      toggleClasses()
    })

    for(let i = 0; i < links.length; i++) {
      links[i].addEventListener('click', () => {
        toggleClasses()
      })
    }

    logoutLink.addEventListener('click', () => {
      openLogoutMenu()
      burger.classList.remove('burger-x')
    })

    userButton.addEventListener('click', () => {
      openLogoutMenu()
    })
  }, [])

  return (
    <header className="fixed top-0 z-50 w-full flex px-8 max-md:px-5 h-[7vh] place-content-between items-center bg-primary font-extralight">
      <img className="h-7 max-md:h-[40%]" src="/img/logo.png" />

      <button className="user-button text-xl max-lg:hidden" onClick={() => null}>
        <img className="h-7 mr-2" src="/img/user.png" />
        {user.fullName}
      </button>

      <div className="burger lg:hidden">
        <div></div>
        <div></div>
        <div></div>
      </div>

      <ul className="lg:hidden phone-links absolute top-[100%] pb-[100px] right-0 w-[70%] h-[93vh] flex flex-col bg-primary place-content-around items-center ">
        <Link to='/profile' className='w-full'><li className={`link-phone ${matchPath('') ? 'link-phone-active' : ''}`}>Dashboard</li></Link>
        <Link to='/profile/schedule' className='w-full'><li className={`link-phone ${matchPath('/schedule') ? 'link-phone-active' : ''}`}>Schedule a call</li></Link>
        <Link to='/profile/more-calls' className='w-full'><li className={`link-phone ${matchPath('/more-calls') ? 'link-phone-active' : ''}`}>More calls</li></Link>

        {
          user.plan != 'CALLS' ?
          <>
            <Link to='/profile/course' className='w-full'><li className={`link-phone ${matchPath('/course') ? 'link-phone-active' : ''}`}>Course</li></Link>
            <Link to='/profile/ebook' className='w-full'><li className={`link-phone ${matchPath('/ebook') ? 'link-phone-active' : ''}`}>E-book</li></Link>
          </>
          : null
        }
        
        <Link to='/profile/help' className='w-full'><li className={`link-phone ${matchPath('/help') ? 'link-phone-active' : ''}`}>Help</li></Link>
        <li className={`link-phone text-teriary logout-link cursor-pointer `}>Sign Out</li>
      </ul>

    </header>
  )
}

export default Header
