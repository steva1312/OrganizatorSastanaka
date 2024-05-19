import Home from "./pages/Home"
import Buy from './pages/Buy'
import { Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import Profile from "./pages/Profile"
import { useAuth } from './context/AuthContext'
import { useEffect } from "react"
import Login from "./pages/Login"
import { BuyProvider } from './context/BuyContext'
import Schedule from './components/Schedule'
import BuyMore from './components/Profile/BuyMore'
import Ebook from './components/Profile/Ebook'
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const NotLoggedRoute = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) navigate('/profile')
  }, [user])

  return <Outlet />
};

const ProtectedRoute = () => {
  const { user, fetched } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user && fetched) navigate('/')
  }, [fetched])

  return user ? <Outlet /> : <p>Loading...</p>
};

const PrivilegedRoute = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user.plan == 'CALLS') navigate('/profile')
  }, [])

  return <Outlet />
};

function App() {
  return (
    <Routes>
      <Route element={ <NotLoggedRoute /> }>
        <Route path='/' element={ <Home /> } />

        <Route path='/plan/charmer' element={ 
          <BuyProvider>
            <Buy /> 
          </BuyProvider>
        } />

        <Route path='/plan/macho' element={ 
          <BuyProvider>
            <Buy /> 
          </BuyProvider>
        } />

        <Route path='/plan/calls' element={ 
          <BuyProvider>
            <Buy /> 
          </BuyProvider>
        } />
        <Route path='/login/' element={ <Login /> } />
      </Route>

      <Route element={ <ProtectedRoute /> }>
        <Route path='/profile' element={ <Profile /> }>
          <Route path='schedule' element={ <Schedule /> } />
          <Route path='more-calls' element={ <BuyMore /> } />
          <Route path='help' element={<p>help</p>} />

          <Route element={ <PrivilegedRoute /> }>
            <Route path='course' element={<p>course</p>} />
            <Route path='ebook' element={ <Ebook /> } />
          </Route>
        </Route>
      </Route>
    </Routes>
  )
}

export default App
