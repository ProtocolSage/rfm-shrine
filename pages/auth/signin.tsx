import { useState, FormEvent } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();
  const { callbackUrl } = router.query;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
        inviteCode: isRegistering ? inviteCode : undefined,
      });
      
      if (result?.error) {
        setError(result.error);
        setIsLoading(false);
        return;
      }
      
      // Success, redirect
      router.push((callbackUrl as string) || '/');
    } catch (err) {
      console.error('Authentication error:', err);
      setError('An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center">
      <Head>
        <title>{isRegistering ? 'Register' : 'Sign In'} | Recursive Fractal Mind</title>
      </Head>
      
      <div className="max-w-md w-full mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-blue-400 mb-2">
            Recursive Fractal Mind
          </h1>
          <p className="text-gray-400">
            {isRegistering 
              ? 'Register with an invite code to access the RFM archive' 
              : 'Sign in to access your RFM memory archive'}
          </p>
        </div>
        
        <div className="bg-gray-900 rounded-xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-900/30 border border-red-500 text-red-200 px-4 py-3 rounded-md">
                {error}
              </div>
            )}
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full bg-gray-800 text-white px-3 py-2 border border-gray-700 rounded-md 
                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full bg-gray-800 text-white px-3 py-2 border border-gray-700 rounded-md 
                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            {isRegistering && (
              <div>
                <label htmlFor="inviteCode" className="block text-sm font-medium text-gray-300">
                  Invite Code
                </label>
                <input
                  id="inviteCode"
                  type="text"
                  required={isRegistering}
                  value={inviteCode}
                  onChange={(e) => setInviteCode(e.target.value)}
                  className="mt-1 block w-full bg-gray-800 text-white px-3 py-2 border border-gray-700 rounded-md 
                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your invite code"
                />
              </div>
            )}
            
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md 
                          text-white bg-blue-700 hover:bg-blue-600 focus:outline-none focus:ring-2 
                          focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
                            isLoading ? 'opacity-70 cursor-not-allowed' : ''
                          }`}
              >
                {isLoading 
                  ? 'Processing...' 
                  : isRegistering 
                    ? 'Register with Invite Code' 
                    : 'Sign In'}
              </button>
            </div>
          </form>
          
          <div className="mt-6 flex justify-center">
            <button 
              onClick={() => setIsRegistering(!isRegistering)}
              className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
            >
              {isRegistering 
                ? 'Already have an account? Sign in' 
                : 'Need an account? Register with invite code'}
            </button>
          </div>
          
          <div className="mt-8 text-center text-xs text-gray-500">
            <p>The Recursive Fractal Mind is an invitation-only cognitive experiment.</p>
            <Link href="/" className="text-gray-400 hover:text-gray-300 ml-1 transition-colors">
              Return to public shrine
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}