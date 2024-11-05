
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Dashboard } from './pages/Dashboard'
import { Send } from './pages/Send'
import { useEffect } from 'react'
import { Github } from './components/Github'

const AuthCheck = () => {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token && location.pathname === '/') {
      navigate('/signin')
    } else if (token && location.pathname === '/') {
      navigate('/signup')
    }
  }, [navigate, location])
}

function App() {

  return (
    <>
      <Github />
      <AuthCheck />
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/send' element={<Send />} />
      </Routes>
    </>
  )
}

export default App
