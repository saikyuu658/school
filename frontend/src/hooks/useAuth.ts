import { useState,  } from 'react'
import { authService } from '../services/auth.service'
import type { UserType } from '../@types/user'

export function useAuth() {
  const [user, setUser] = useState <UserType | null>(null)

  const login = async (credentials: {
    email: string,
    password: string,
  }) => {
    const data = await authService.login(credentials)
    localStorage.setItem('access_token', data.access)
    localStorage.setItem('refresh_token', data.refresh)
    setUser(user)
  }

  const getMe = async () => {
    const data = await authService.getMe()
    setUser(data)
  }

  const logout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    setUser(null)
  }

  return { user, login, logout , getMe}
}