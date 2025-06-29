import { useState, useEffect } from "react"
import { LoginForm } from "@/components/LoginForm"
import { RegisterForm } from "@/components/RegisterForm"
import { Dashboard } from "@/components/Dashboard"
import axios from "axios"

interface User {
  id: number
  email: string
  fullName: string | null
  createdAt: string
  updatedAt: string | null
}

type AuthMode = 'login' | 'register'

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [authMode, setAuthMode] = useState<AuthMode>('login')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is already authenticated on app load
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const response = await axios.get('http://localhost:63078/auth/user', {
        withCredentials: true,
      })
      if (response.data.success) {
        setUser(response.data.user)
      }
    } catch {
      // User is not authenticated, which is fine
      console.log('User not authenticated')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLoginSuccess = (userData: User) => {
    setUser(userData)
  }

  const handleRegisterSuccess = (userData: User) => {
    setUser(userData)
  }

  const handleLogout = () => {
    setUser(null)
  }

  const switchToRegister = () => {
    setAuthMode('register')
  }

  const switchToLogin = () => {
    setAuthMode('login')
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (user) {
    return <Dashboard user={user} onLogout={handleLogout} />
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Military Cat Agency
          </h1>
          <p className="text-gray-600">
            Secure authentication system
          </p>
        </div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {authMode === 'login' ? (
            <LoginForm 
              onLoginSuccess={handleLoginSuccess}
              onSwitchToRegister={switchToRegister}
            />
          ) : (
            <RegisterForm 
              onRegisterSuccess={handleRegisterSuccess}
              onSwitchToLogin={switchToLogin}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default App
