import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import axios from '../api/axios'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [fetched, setFetched] = useState(false)
  const [calls, setCalls] = useState([])
  const [userCalls, setUserCalls] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    console.log('alobe')
    authorize()
  }, [])

  useEffect(() => {
    setUserCalls(calls.filter(call => call.userId == user.id))
  }, [calls])

  async function authorize() {
    console.log('degic')
    const accessToken = localStorage.getItem('accessToken')
    
    if (!accessToken) return
    
    const response = await axios.get('/auth/validate', {
      headers: {
        accessToken: accessToken
      },
    })
    console.log(response)
    
    if (response.data.user) {
      console.log('degic1312')
      setUser(response.data.user)
      setCalls(response.data.calls)
    }
    
    setFetched(true)
  }

  function deauthorize() {
    setUser(null)
    localStorage.setItem('accessToken', '')
    navigate('/')
  }

  return <AuthContext.Provider value={{ user, setUser, fetched, calls, setCalls, userCalls, authorize, deauthorize }}>{children}</AuthContext.Provider>
}