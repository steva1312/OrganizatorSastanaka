import React, { useEffect } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { FaCheck } from "react-icons/fa6";
import { useBuy } from "../context/BuyContext"
import '../styles/Schedule.css'
import Payment from '../components/Buy/Payment';
import Register from '../components/Buy/Register';
import Schedule from '../components/Buy/Schedule';

const steps = ['Registration', 'Schedule a call', 'Payment']

function Buy() {
  const planName = window.location.pathname.split('/').at(-1)

  const [searchParams, setSearchParams] = useSearchParams()
  const callsCount = searchParams.get('count')

  const { currentStep } = useBuy()

  useEffect(() => {
    console.log(planName)
  }, [])

  return (
    <div className='flex flex-col items-center pt-28'>
      <header className="absolute top-0 z-50 w-full flex px-12 max-md:px-5 h-[8vh] place-content-between items-center bg-primary text-xl font-extralight">
        <Link className="h-8 max-md:h-[40%]" to='/'>
          <img className="h-full" src="/img/logo.png" />
        </Link>

        <Link className='text-xl font-extralight text-white' to='/'>HOME</Link>
      </header>

      <p className="text-4xl max-sm:text-3xl">Getting {callsCount != null ? callsCount : ''} {planName} plan</p>

      <div className="flex my-10">
        {
          steps.map((step, i) => (
            <div key={i} className={`step ${i == currentStep ? 'step-active' : ''} ${i < currentStep ? 'step-completed' : ''}`}>
              <p className='step-number'>
                {i >= currentStep ? i + 1 : <FaCheck />}
              </p>
              <p className='step-name'>{step}</p>
            </div>
          ))
        }
      </div>
      

      <p className="text-3xl max-sm:text-2xl">{steps[currentStep]}</p>

      {
        currentStep == 0 ? <Register /> :
        currentStep == 1 ? <Schedule /> :
        <Payment />
      }

    </div>
  )
}

export default Buy
