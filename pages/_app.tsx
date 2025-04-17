import type { AppProps } from 'next/app'
import { Analytics } from '@vercel/analytics/react'
import NavBar from '../components/NavBar'
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className="min-h-screen bg-black text-white">
        <NavBar />
        <main className="container mx-auto px-4 py-6">
          <Component {...pageProps} />
        </main>
      </div>
      <Analytics />
    </>
  )
}