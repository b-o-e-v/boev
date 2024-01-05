'use client'

import { createContext, useContext, useEffect, useState } from 'react'

import type { ReactNode } from 'react'

interface IProps { children: ReactNode }
interface IContext { user?: any, loading: boolean, setUser: (user: any) => void }

// Формируем контекст, в который поместим данные
const StoreContext = createContext({} as IContext)

// Формируем стор, через который будем забирать эти данные
const useStore = () => useContext(StoreContext)

// Экспортируем хук
export function useUser (): IContext {
  const { user, loading, setUser }: IContext = useStore()
  return { user, loading, setUser }
}

export function UserProvider ({ children }: IProps): JSX.Element {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<any>()

  useEffect(() => {
    if (!user && !loading) {
      setLoading(true)
      fetch('/api/user')
        .then(res => res.json())
        .then(res => { setUser(res) })
        .finally(() => { setLoading(false) })
    }
  }, [user, loading, setUser])

  return (
    <StoreContext.Provider value={{ user, loading, setUser }}>
      {children}
    </StoreContext.Provider>
  )
}
