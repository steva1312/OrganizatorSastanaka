import React from "react"
import '../styles/Menu.css'
import { IoIosClose } from "react-icons/io";

function PopupMenu({ children, show, setShow }) {
  return (
    !show ? null :
    <>
      <div onClick={() => { if (setShow) setShow(false) }} className="cover"></div>
      
      <div className="menu">
        { setShow ?
          <div  onClick={() => setShow(false)} className='absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 bg-gray-400 rounded-full cursor-pointer'>
            <IoIosClose className='text-white size-10' /> 
          </div> 
          : null }

        {children}
      </div>
    </>
  )
}

export default PopupMenu
