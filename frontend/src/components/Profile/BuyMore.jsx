import React, { useEffect, useRef, useState } from "react"
import axios from '../../api/axios'
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaMinus } from "react-icons/fa";

const callPrices = [19, 34, 55, 63]

function BuyMore() {
  const [callsCount, setCallsCount] = useState(1)

  const paypal = useRef();

  const { user, setUser } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    paypal.current.innerHTML = ''

    window.paypal.Buttons({
      createOrder: (data, actions) => {
        return axios.post('/payment/buy', {
          id: 'CALLS',
          callsCount: callsCount
        })
        .then(response => response.data.id)
      },

      onApprove: (data, actions) => {
        return actions.order.capture().then(async details => {
          const accessToken = localStorage.getItem('accessToken')

          await axios.post('/calls/add-count', 
          { callsCount: callsCount },
          { headers: { accessToken: accessToken }})

          setUser({...user, callsLeft: user.callsLeft + callsCount})

          navigate('/profile')
        })
      },

      onError: (err) => {
        alert('Error: ' + err)
      }
    }).render(paypal.current)
  }, [callsCount])

  return (
    <div className='flex flex-col items-center'>
      <h1 className='profile-title'>Add More Calls</h1>

      <p className='mt-7 text-xl max-sm:text-lg text-center px-5'>Choose how many calls you want to add (up to 4)</p>

      <div className='relative my-7 flex items-center space-x-5 max-sm:space-x-3'>
        <button className='addsub text-lg max-sm:text-base bg-gray-200 p-3 rounded-sm' onClick={() => callsCount > 1 ? setCallsCount(callsCount - 1) : null}>
          <FaMinus />
        </button>
        <p className='font-bold text-3xl max-sm:text-2xl'>{callsCount}</p>
        <button className='addsub text-lg max-sm:text-base bg-gray-200 p-3 rounded-sm' onClick={() => callsCount < 4 ? setCallsCount(callsCount + 1) : null}>
          <FaPlus />
        </button>
        <div className='absolute translate-x-full right-[-20px] max-sm:right-[-10px] flex items-center space-x-2'>
          <p className='font-bold text-3xl max-sm:text-2xl'>${callPrices[callsCount - 1]}</p>
          {callsCount > 1 ?<p className='text-2xl max-sm:text-xl text-gray-500 line-through'>${29 + 30 * (callsCount - 1)}</p> : null}
        </div>
      </div>

      <p className='text-lg max-sm:text-base px-5 text-center'>By completing the purchase you will have a total of <b className='text-blue-500 text-2xl max-sm:text-xl mx-1'>{user.callsLeft + callsCount}</b> available calls</p>

      <p className='mt-7 text-lg max-sm:text-base'>Your purchase is ${callPrices[callsCount - 1]}.</p>

      <div className='mt-3 w-[300px] max-sm:w-[80%] z-10' ref={paypal}></div>

    </div>
  )
}

export default BuyMore
