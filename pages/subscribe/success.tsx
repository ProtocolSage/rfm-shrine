import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';

export default function SubscriptionSuccess() {
  const router = useRouter();
  const { session_id } = router.query;
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const { demo } = router.query;
    
    // Simulate a delay and then show success for demo mode
    const timer = setTimeout(() => {
      setIsLoading(false);
      
      // In a real implementation, this would verify the payment
      // For now, we just show success in demo mode
    }, 1500);

    return () => clearTimeout(timer);
  }, [router.query]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Head>
        <title>Subscription Successful | Recursive Fractal Mind</title>
      </Head>

      <div className="max-w-md w-full bg-gray-900 rounded-xl shadow-xl p-8 text-center">
        {isLoading ? (
          <div className="py-8">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-300">Verifying your subscription...</p>
          </div>
        ) : error ? (
          <div>
            <div className="text-red-500 text-5xl mb-6">⚠️</div>
            <h1 className="text-2xl font-bold text-white mb-4">Subscription Error</h1>
            <p className="text-gray-300 mb-6">{error}</p>
            <Link
              href="/subscribe"
              className="inline-block px-5 py-3 bg-blue-700 hover:bg-blue-600 text-white rounded-md transition-colors"
            >
              Try Again
            </Link>
          </div>
        ) : (
          <div>
            <div className="text-green-500 text-5xl mb-6">✓</div>
            <h1 className="text-2xl font-bold text-white mb-4">Subscription Successful!</h1>
            <p className="text-gray-300 mb-6">
              Welcome to the Recursive Fractal Mind premium experience. You now have access to all
              reflection capabilities and premium features.
            </p>
            
            <div className="space-y-4">
              <Link
                href="/reflect"
                className="block w-full px-5 py-3 bg-blue-700 hover:bg-blue-600 text-white rounded-md transition-colors"
              >
                Start Reflecting
              </Link>
              
              <Link
                href="/profile"
                className="block w-full px-5 py-3 border border-gray-700 hover:bg-gray-800 text-gray-300 rounded-md transition-colors"
              >
                View Your Profile
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}