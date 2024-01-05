'use client'

import { useRouter } from 'next/navigation'
import { useUser } from './store/user'
import { setCookie } from './modules/client/cookies'

import type { FormEvent } from "react"

export default function HomePage () {
  const { push } = useRouter()
  const { setUser } = useUser()

  async function onSubmit (evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault()

    const formData = new FormData(evt.target as HTMLFormElement)
    const email = formData.get('email')
    const password = formData.get('password')

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password})
      })

      const result = await response.json()

      if (result.token) {
        // кука на 7 дней
        setCookie('jwt', result.token, { 'max-age': 604800 })
        setUser(result.user)
        push('/admin')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form name='login' onSubmit={onSubmit}>
      <label htmlFor='email'>email</label>
      <input id='email' name='email' required />
      <label htmlFor='password'>password</label>
      <input id='password' name='password' required />
      <button>Войти</button>
    </form>
  )
}
