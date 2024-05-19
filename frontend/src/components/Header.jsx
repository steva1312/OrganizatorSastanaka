import React from "react"
import { Link } from "react-router-dom"

function Header() {
  return (
    <header className="fixed top-0 z-50 w-full flex px-12 max-md:px-5 h-[8vh] place-content-between items-center bg-primary text-xl">
      <img className="h-8 max-md:h-[40%]" src="/img/logo.png" />

      <ul className="flex h-full max-xl:hidden">
        <li><a className='pc-link' href="#testimonials">PLANOVI</a></li>
        <li><a className='pc-link' href="#faq">PITANJA</a></li>
      </ul>

      <ul className="flex items-center h-full max-xl:hidden">
        <li className="pc-link text-teriary font-normal"><Link to='/login'>PRIJAVI SE</Link></li>
      </ul>
      
      <ul className="xl:hidden phone-links absolute top-[100%] right-0 w-[70%] h-[92vh] flex flex-col bg-primary place-content-center items-center space-y-[10vh]">
        <li className="max-md:text-base"><a href="#pricing">PLANOVI</a></li>
        <li className="max-md:text-base"><a href="#faq">PITANJA</a></li>
        <li className="max-md:text-base"><Link className='text-teriary' to='/login'>PRIJAVI SE</Link></li>
      </ul>

      <div className="burger 2xl:hidden">
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div className="absolute left-0 bottom-0 w-full h-[2px] bg-secondary"></div>
    </header>
  )
}

export default Header
