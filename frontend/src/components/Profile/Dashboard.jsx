import React from "react"
import { useAuth } from '../../context/AuthContext'
import { format, add, parseISO } from "date-fns"
import axios from '../../api/axios'
import { PiPhoneCallFill } from "react-icons/pi";
import { FaVideo } from "react-icons/fa";

function Dashboard() {
  const { user, setUser, setCalls, userCalls } = useAuth()

  return (
    <div className="flex flex-col items-center">
      <h1 className='profile-title'>Dashboard</h1>

      <h4 className="mt-8 max-sm:mt-4 flex items-center text-2xl max-sm:text-xl">
        Available calls:
        <PiPhoneCallFill className='size-7 max-sm:size-6 mr-1 ml-3 text-blue-500' />
        <b className='text-blue-500'>{user.callsLeft}</b>
      </h4>

      <h2 className='mt-14 max-sm:mt-8 mb-8 max-sm:mb-4 text-4xl max-sm:text-3xl'>Scheduled calls</h2>
      <div className="flex flex-col space-y-8 max-sm:px-5 pb-5">
        {[...userCalls].sort((a, b) => a.datetime.localeCompare(b.datetime)).map(call =>
          <div className="call max-sm:flex max-sm:flex-col max-sm:items-start" key={call.id}>
            <div>
              <p className='text-lg'>
                <b className='mr-2 text-2xl max-sm:text-xl text-blue-700'>{`${format(call.datetime, 'kk:mm')} - ${format(add(call.datetime, { minutes: 30 }), 'kk:mm')}`}</b>
                <br className='sm:hidden'/>
                <b className='text-xl max-sm:text-lg'>{`${format(call.datetime, 'EEEE d MMMM')}`}</b>
                <b className='ml-2 text-lg max-sm:text-base text-gray-400'>{`${format(call.datetime, 'yyyy')}`}</b>
              </p>
              <div className='mt-2 flex items-center text-xl'>
                <FaVideo className='text-blue-700 mr-3 size-7' />
                <a className='italic underline hover:text-blue-700 transition duration-200' href={call.zoomUrl}>Zoom link</a>
              </div>
            </div>
            <button 
              className="max-sm:mt-5 bg-secondary text-white rounded-md text-xl max-sm:text-lg px-4 max-sm:px-3 py-2 max-sm:py-1"
              onClick={async () => {
                const accessToken = localStorage.getItem('accessToken')

                await axios.delete(
                  `/calls/${call.id}`,
                  { headers: { accessToken: accessToken }}
                )

                setCalls(prevCalls => prevCalls.filter(c => c.id != call.id))
                setUser({...user, callsLeft: user.callsLeft + 1})
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
