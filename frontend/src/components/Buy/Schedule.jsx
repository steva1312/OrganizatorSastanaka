import React, { useEffect, useState } from "react"
import { useBuy } from "../../context/BuyContext"
import ReactCalendar from 'react-calendar'
import { add, format, startOfDay,  } from 'date-fns'
import '../../styles/Schedule.css'

function Schedule() {
  const { prevStep, nextStep, scheduleData, setScheduleData, calls } = useBuy()

  const [selectedDate, setSelectedDate] = useState(startOfDay(scheduleData ? scheduleData : new Date()))
  const [selectedTime, setSelectedTime] = useState(scheduleData)

  useEffect(() => {
    const calendarHeight = document.querySelector('.react-calendar').clientHeight
    document.querySelector('.times').style.height = calendarHeight + 'px'
    console.log(calendarHeight)
  }, [])

  const getTimes = () => {
    const start = add(selectedDate, { hours: 9 })
    const end = add(selectedDate, { hours: 18 })
    const interval = 30

    const times = []
    for (let i = start; i <= end; i = add(i, { minutes: interval })) times.push(i)

    return times
  }

  const times = getTimes()

  return (
    <div className='flex flex-col items-center mt-6 max-sm:mt-0'>
      <p className='text-lg max-sm:text-base p-5 mb-5 max-sm:mb-1 text-center'>You can schedule your first call right now! Or you can skip this step and do this later on.</p>
      
      <div className="flex max-md:flex-col max-md:px-[7%] items-center md:space-x-10">
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

        <div className="times flex-col overflow-y-scroll max-sm:mt-5">
          {times.map((time, i) => (
            <div 
              key={`time-${i}`} 
              className={
                `time 
                ${time.toString() == selectedTime.toString() ? 'time-active' : ''}
                ${calls.findIndex(call => call.datetime == time.toISOString()) != -1 ? 'time-booked' : ''}
                text-center`}
              onClick={() => {
                if (calls.findIndex(call => call.datetime == time.toISOString()) != -1) return
                setSelectedTime(time)
              }}
            >
              {`${format(time, 'kk:mm')} - ${format(add(time, {minutes: 30}), 'kk:mm')}`}
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
            <b className='mx-2 text-2xl text-blue-700'>{`${format(selectedTime, 'kk:mm')} - ${format(add(selectedTime, { minutes: 30 }), 'kk:mm')}`}</b>
            <br className='sm:hidden' />
            <b className='text-xl'>{`${format(selectedTime, 'EEEE d MMMM')}`}</b>
            <b className='ml-2 text-lg text-gray-400'>{`${format(selectedTime, 'yyyy')}`}</b>
          </p>
          <p className='mt-2 text-gray-500'>You can cancel the call anytime you want.</p>
          <button className="mt-5 bg-blue-500 text-white text-2xl max-sm:text-xl px-6 py-3 rounded-md" onClick={() => {
            setScheduleData(selectedTime)
            nextStep()
          }}>Schedule</button>
        </div>
        : null
      }

      <div className='mt-10 mb-10 space-x-5'>
        <button className='bg-secondary text-white text-xl py-2 px-5 rounded-sm' onClick={prevStep}>Back</button>
        <button className='bg-secondary text-white text-xl py-2 px-5 rounded-sm' onClick={() => {
          setScheduleData('')
          nextStep()
        }}>Skip</button>
      </div>
      
    </div>
  )
}

export default Schedule