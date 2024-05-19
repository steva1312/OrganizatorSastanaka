import { createContext, useContext, useEffect, useState } from 'react'
import axios from '../api/axios'
import { useAuth } from '../context/AuthContext'
import { useNavigate, useSearchParams } from 'react-router-dom'

const BuyContext = createContext()

export function useBuy() {
  return useContext(BuyContext)
}

export function BuyProvider({ children }) {
  const planName = window.location.pathname.split('/').at(-1)

  const [calls, setCalls] = useState([])

  const [userData, setUserData] = useState({
    email: '',
    fullName: '',
    password: '',
    confirmPassword: ''
  })

  const [scheduleData, setScheduleData] = useState('')

  const [currentStep, setCurrentStep] = useState(0)

  const { authorize } = useAuth()

  const navigate = useNavigate()

  const [searchParams, setSearchParams] = useSearchParams()
  const callsCount = searchParams.get('count')

  useEffect(() => {
    getCalls()
  }, [])

  async function getCalls() {
    const response = await axios.get('/calls')

    setCalls(response.data)
  }

  function prevStep() {
    setCurrentStep(currentStep - 1)
  }

  function nextStep() {
    setCurrentStep(currentStep + 1)
  }

  async function finish() {
    const response = await axios.post('/auth/register', {
      userData: userData,
      scheduleData: scheduleData,
      plan: window.location.pathname.split('/').at(-1).toUpperCase(),
      callsCount: callsCount
    })

    const { error, accessToken } = response.data

    console.log(accessToken)

    if (error) {
      console.log(error)
      return
    }

    localStorage.setItem('accessToken', accessToken)

    if (scheduleData) {
      await axios.post(
        '/calls', 
        { datetime: scheduleData}, 
        { headers: { accessToken: accessToken }}
      )
    }
    
    await authorize()

    //navigate('/profile')
  }

  return <BuyContext.Provider value={{
    calls,
    userData, 
    setUserData, 
    scheduleData, 
    setScheduleData,
    currentStep, 
    setCurrentStep,
    prevStep, 
    nextStep,
    finish }}>
      {children}
  </BuyContext.Provider>
}