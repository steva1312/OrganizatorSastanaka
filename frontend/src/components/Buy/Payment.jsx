import React, { useEffect, useRef } from "react"
import { useSearchParams } from "react-router-dom"
import axios from '../../api/axios'
import { useBuy } from "../../context/BuyContext"

const pricing = {
  charmer: 99,
  macho: 199,
  calls: [29, 35, 55, 70]
}

function Payment() {
  const paypal = useRef();
  
  const planName = window.location.pathname.split('/').at(-1)

  const [searchParams, setSearchParams] = useSearchParams()
  const callsCount = searchParams.get('count')

  const { prevStep, finish } = useBuy()

  useEffect(() => {
    window.paypal.Buttons({
      createOrder: (data, actions) => {
        return axios.post('/payment/buy', {
          id: planName.toUpperCase(),
          callsCount: callsCount
        })
        .then(response => {
          return response.data.id
        })
      },
      onApprove: (data, actions) => {
        return actions.order.capture().then(details => {
          finish()
        })
      },
      onError: (err) => {
        alert('Error: ' + err)
      }
    }).render(paypal.current)
  }, [])

  return (
    <div className='flex flex-col items-center pb-5'> 
      <p className='mt-4 max-sm:mt-0 mb-10 max-sm:mb-2 text-lg max-sm:text-base p-5 text-center'>This is the last step! After the payment you will be redirected to your profile dashboard.</p>
      <p className='mb-2'>
        Your payment is $
        {
          planName == 'charmer' ? pricing.charmer
          : planName == 'macho' ? pricing.macho
          : pricing.calls[callsCount - 1]
        }
      </p>
      <div className='w-[300px]' ref={paypal}></div>
      <button className='mt-8 max-sm:mt-4 bg-secondary text-white text-xl py-2 px-5 rounded-sm' onClick={prevStep}>Back</button>
    </div>
  )
}

export default Payment