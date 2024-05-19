import React, { useState } from "react"
import { Link } from "react-router-dom"
import { FaCheck } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const cena = count => {
  switch (count) {
    case 1: return 19
    case 2: return 34
    case 3: return 55
    case 4: return 63
  }
}

function Pricing() {
  const [callCount, setCallCount] = useState(1)

  return (
    <section id="pricing" className="bg-primary flex flex-col items-center pt-12 pb-20 max-md:pb-10">
      <h1 className='title'>PRACTICE NOW</h1>

      <div className='plans'>
        <div className='plan calls'>
          <h2>Only Calls</h2>
          <div className='lajna'></div>
          <div className='recenice'>
            <p>If you have no more calls from your plan</p>
            <p>Or you feel capable enough to talk to girls right NOW</p>
            <p>You can schedule as many calls you want, here.</p>
          </div>
          <p className='text-lg mb-1'>Amount of calls:</p>
          <div className='dugmici'>
            <button className="baton" onClick={() => callCount < 4 ? setCallCount(callCount + 1) : null}>+</button>
            <button className="count">{callCount}</button>
            <button className="baton" onClick={() => callCount > 1 ? setCallCount(callCount - 1) : null}>-</button>
          </div>
          <div className='cena-div flex items-end mt-5'>
            <p className='cena'>${cena(callCount)}</p>
            <p className='one-time'>(one time fee)</p>
          </div>
          <Link to={`/plan/calls?count=${callCount}`} className='choose-btn'>Choose Plan</Link>
        </div>

        <div className='plan scale-105'>
          <h2>Charmer</h2>
          <div className='lajna'></div>
          <h3>Services Included</h3>
          <div className='services'>
            <p className='service'><div className='icon-div'><FaCheck className='icon-check' /></div>2 one-on-one video call sessions with real women (20 min)</p>
            <p className='service'><div className='icon-div'><FaCheck className='icon-check' /></div>Exclusive online dating course</p>
            <p className='service'><div className='icon-div'><FaCheck className='icon-check' /></div>"Mastering The Dating Game" e-book</p>
            <p className='service'><div className='icon-div'><FaCheck className='icon-check' /></div>Feedback report after each session</p>
            <p className='service'><div className='icon-div'><FaCheck className='icon-check' /></div>You don't need any previous knowledge or experience</p>
            <p className='service'><div className='icon-div'><FaCheck className='icon-check' /></div>Personalized coaching and feedback</p>
            <p className='service not-included'><div className='icon-div'><IoClose className='icon-check' /></div>One bonus consultation session with a dating expert for personalized advice and guidance</p>
          </div>
          <div className='cena-div flex items-end mt-5'>
            <p className='cena'>$48</p>
            <p className='one-time'>(one time fee)</p>
          </div>
          <Link to='/plan/charmer' className='choose-btn'>Choose Plan</Link>
        </div>

        <div className='plan'>
          <h2>Macho</h2>
          <div className='lajna'></div>
          <h3>Services Included</h3>
          <div className='services'>
            <p className='service'><div className='icon-div'><FaCheck className='icon-check' /></div>4 one-on-one video call sessions with real women (20 min)</p>
            <p className='service'><div className='icon-div'><FaCheck className='icon-check' /></div>Exclusive online dating course</p>
            <p className='service'><div className='icon-div'><FaCheck className='icon-check' /></div>"Mastering The Dating Game" e-book</p>
            <p className='service'><div className='icon-div'><FaCheck className='icon-check' /></div>Feedback report after each session</p>
            <p className='service'><div className='icon-div'><FaCheck className='icon-check' /></div>You don't need any previous knowledge or experience</p>
            <p className='service'><div className='icon-div'><FaCheck className='icon-check' /></div>Personalized coaching and feedback</p>
            <p className='service'><div className='icon-div'><FaCheck className='icon-check' /></div>One bonus consultation session with a dating expert for personalized advice and guidance</p>
          </div>
          <div className='cena-div flex items-end mt-5'>
            <p className='cena'>$79</p>
            <p className='one-time'>(one time fee)</p>
          </div>
          <Link to='/plan/macho' className='choose-btn'>Choose Plan</Link>
        </div>
      </div>
      
      <p className="mt-24 max-2xl:mt-16 max-md:mt-10 max-xl:mt-14 text-3xl max-xl:text-2xl max-md:text-base max-sm:text-base text-center font-extralight max-sm:px-[7%]">Don't let <span className="font-bold">fear</span> hold you back from the dating life you deserve. <br className="max-sm:hidden"/> Join Flirtly today and unlock your full dating potential.</p>
    </section>
  )
}

export default Pricing
