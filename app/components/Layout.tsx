import { cookies } from 'next/headers'

import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

import Link from 'next/link'

import styles from './Layout.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Layout ({
  children,
}: {
  children: React.ReactNode
}) {
  const { value } = cookies().get('jwt') || {}
  return (
    <body className={`${inter.className} ${styles.body}`}>
      <header>
        <nav>
          <Link href='/'>Главная</Link>
          <Link href='/projects'>Проекты</Link>
          { value ? <Link href='/admin'>Редактура</Link> : null }
        </nav>
      </header>
      <main>{ children }</main>
      <footer></footer>
      <Analytics />
      <SpeedInsights />
    </body>
  )
}
