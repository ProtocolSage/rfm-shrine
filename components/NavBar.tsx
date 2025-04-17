import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession, signOut } from 'next-auth/react'
import { useState } from 'react'

export default function NavBar() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [showDropdown, setShowDropdown] = useState(false)
  
  const isActive = (path: string) => router.pathname === path
  const isAuthenticated = status === 'authenticated'
  
  const toggleDropdown = () => setShowDropdown(!showDropdown)
  const closeDropdown = () => setShowDropdown(false)
  
  const handleSignOut = async () => {
    await signOut({ redirect: false })
    router.push('/')
  }
  
  return (
    <nav className="bg-gray-900 p-4 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <Link href="/" className="text-blue-400 font-bold text-xl">
          Recursive Fractal Mind
        </Link>
        
        <div className="flex items-center space-x-6">
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
            href="/reflect"
            className={`hover:text-blue-400 transition-colors ${
              isActive('/reflect') ? 'text-white font-bold' : 'text-gray-300'
            }`}
          >
            Reflect
          </Link>
          
          <Link
            href="/whitepaper"
            className={`hover:text-blue-400 transition-colors ${
              isActive('/whitepaper') ? 'text-white font-bold' : 'text-gray-300'
            }`}
          >
            Whitepaper
          </Link>
          
          <div className="hidden md:flex space-x-6">
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
          
          {/* Auth button */}
          <div className="relative ml-2">
            {isAuthenticated ? (
              <>
                <button 
                  onClick={toggleDropdown}
                  className="flex items-center space-x-2 bg-blue-700 hover:bg-blue-600 text-white px-3 py-2 rounded transition-colors"
                >
                  <span className="hidden md:inline">{session?.user?.name || 'Account'}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-10">
                    <div className="py-1">
                      {session?.user && (
                        <div className="px-4 py-2 text-sm text-gray-300 border-b border-gray-700">
                          Signed in as<br />
                          <span className="font-medium text-white">{session.user.email}</span>
                        </div>
                      )}
                      
                      <Link 
                        href="/profile" 
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                        onClick={closeDropdown}
                      >
                        Your Profile
                      </Link>
                      
                      {(session?.user as any)?.isAdmin && (
                        <Link 
                          href="/admin" 
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                          onClick={closeDropdown}
                        >
                          Admin Dashboard
                        </Link>
                      )}
                      
                      <button
                        onClick={handleSignOut}
                        className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <Link
                href="/auth/signin"
                className="bg-blue-700 hover:bg-blue-600 text-white px-3 py-2 rounded transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}