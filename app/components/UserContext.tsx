// context/UserContext.tsx
'use client'
import { createContext, useContext, useEffect, useState } from 'react'

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

type User = {
  _id: string
  companyName: string
  email: string
  inn: string
  role: string
}

const UserContext = createContext<{
  user: User | null
  login: (token: string, userData: User) => void
  logout: () => void
}>({
  user: null,
  login: () => {},
  logout: () => {}
})

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      fetch(`${apiUrl}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => res.json()).then(data => setUser(data.user))
    }
  }, [])

  const login = (token: string, userData: User) => {
    localStorage.setItem('token', token)
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)