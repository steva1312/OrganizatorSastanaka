import React, { useState } from "react"
import { add, format, startOfDay } from "date-fns"
import ReactCalendar from 'react-calendar'
import { useAuth } from '../context/AuthContext'
import axios from '../api/axios'
import '../styles/Schedule.css'
import PopupMenu from './PopupMenu'
import { Link, useNavigate } from 'react-router-dom'

function Schedule() {
  const { user, setUser, calls, setCalls } = useAuth()

  const [selectedDate, setSelectedDate] = useState(startOfDay(new Date()))
  const [selectedTime, setSelectedTime] = useState('')

  const navigate = useNavigate()

  const getTimes = () => {
    const start = add(selectedDate, { hours: 9 })
    const end = add(selectedDate, { hours: 18 })
    const interval = 45

    const times = []
    for (let i = start; i <= end; i = add(i, { minutes: interval })) times.push(i)

    return times
  }

  const times = getTimes()

  const schedule = async () => {
    const menu = document.querySelector('.scheduling-menu')
    const blackFilter = document.querySelector('.black-filter')
    menu.classList.remove('hidden')
    blackFilter.classList.add('black-filter-active')

    const accessToken = localStorage.getItem('accessToken')

    const response = await axios.post(
      '/calls', 
      { datetime: selectedTime }, 
      { headers: { accessToken: accessToken }}
    )

    if (response.data.error) return

    setCalls(prevCalls => [...prevCalls, response.data])
    setUser({...user, callsLeft: user.callsLeft - 1})

    menu.classList.add('hidden')
    blackFilter.classList.remove('black-filter-active')

    navigate('/profile')
  }

  return (
    <div className='flex flex-col items-center pb-5'>
      <h1 className='profile-title mb-8 max-sm:mb-4'>Schedule a call</h1>

      { user.callsLeft == 0 ?
        <>
          <p className='text-lg max-sm:text-base text-center'>You have scheduled all available calls. If you need more practice add more calls!</p>
          <Link to='/profile/more-calls' className='mt-6 bg-secondary text-white text-xl max-sm:text-lg py-3 max-sm:py-2 px-6 max-sm:px-4 rounded-md'>More Calls</Link>
        </> 
        :
        <>
          <p className='text-lg max-sm:text-base text-center p-3'>Feel free to schedule your call whenever you are ready. You will receive zoom link for the call 24 hours before scheduled time.</p>

          <div className="mt-10 max-sm:mt-4 max-md:px-[7%] flex max-md:flex-col items-center md:space-x-10">
            <ReactCalendar
              className='calendar'
              locale="en"
              minDate={new Date()}
              value={selectedDate}
              onClickDay={date => {
                setSelectedDate(startOfDay(date))
                setSelectedTime('')
              }} 
            />

            <div className="max-md:mt-6 times flex flex-col overflow-y-scroll">
              {times.map((time, i) => (
                <div 
                  key={`time-${i}`} 
                  className={
                    `time 
                    ${time.toString() == selectedTime.toString() ? 'time-active' : ''}
                    ${calls.findIndex(call => call.datetime == time.toISOString()) != -1 ? 'time-booked' : ''}
                    text-center`
                  }
                  onClick={() => {
                    if (calls.findIndex(call => call.datetime == time.toISOString()) != -1) return
                    setSelectedTime(time)
                  }}
                >
                  {`${format(time, 'kk:mm')} - ${format(add(time, {minutes: 45}), 'kk:mm')}`}
                </div>
              ))}
            </div>
          </div>
          {
            selectedTime ? 
            <div className='mt-8 flex flex-col items-center'>
              <p className='text-lg text-center'>
                Your call will be scheduled for 
                <br className='sm:hidden' />
                <b className='mx-2 text-2xl text-blue-700'>{`${format(selectedTime, 'kk:mm')} - ${format(add(selectedTime, { minutes: 45 }), 'kk:mm')}`}</b>
                <br className='sm:hidden' />
                <b className='text-xl'>{`${format(selectedTime, 'EEEE d MMMM')}`}</b>
                <b className='ml-2 text-lg text-gray-400'>{`${format(selectedTime, 'yyyy')}`}</b>
              </p>
              <p className='mt-2 max-sm:mt-5 text-gray-500'>You can cancel the call anytime you want.</p>
              <button className="mt-5 max-sm:mt-3 bg-teriary text-white text-2xl max-sm:text-xl px-6 py-3 rounded-md" onClick={schedule}>Schedule</button>
            </div>
            : 
            <p className='mt-5 text-lg'>Select a date and time to schedule the call.</p>
          }
        </>
      }
    </div>
  )
}

export default Schedule
