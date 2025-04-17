import Link from 'next/link'
import { useRouter } from 'next/router'

export default function NavBar() {
  const router = useRouter()
  
  const isActive = (path: string) => router.pathname === path
  
  return (
    <nav className="bg-gray-900 p-4">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <Link href="/" className="text-blue-400 font-bold text-xl">
          Recursive Fractal Mind
        </Link>
        
        <div className="flex space-x-6">
          <Link
            href="/"
            className={`hover:text-blue-400 transition-colors ${
              isActive('/') ? 'text-white font-bold' : 'text-gray-300'
            }`}
          >
            Home
          </Link>
          
          <Link
            href="/memory"
            className={`hover:text-blue-400 transition-colors ${
              isActive('/memory') ? 'text-white font-bold' : 'text-gray-300'
            }`}
          >
            Memory
          </Link>
          
          <Link
            href="/whitepaper"
            className={`hover:text-blue-400 transition-colors ${
              isActive('/whitepaper') ? 'text-white font-bold' : 'text-gray-300'
            }`}
          >
            Whitepaper
          </Link>
          
          <Link
            href="/architecture"
            className={`hover:text-blue-400 transition-colors ${
              isActive('/architecture') ? 'text-white font-bold' : 'text-gray-300'
            }`}
          >
            Architecture
          </Link>
          
          <Link
            href="/logs"
            className={`hover:text-blue-400 transition-colors ${
              isActive('/logs') ? 'text-white font-bold' : 'text-gray-300'
            }`}
          >
            Logs
          </Link>
          
          <Link
            href="/about"
            className={`hover:text-blue-400 transition-colors ${
              isActive('/about') ? 'text-white font-bold' : 'text-gray-300'
            }`}
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  )
}