'use client'

import { useUser } from "../store/user"

export default function AdminPage () {
  const { user, loading } = useUser()
  return (
    <>{ loading ? 'Загрузка...' : JSON.stringify(user)}</>
  )
}
