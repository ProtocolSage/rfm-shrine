import Link from 'next/link';
import Head from 'next/head';

export default function SubscriptionCancel() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Head>
        <title>Subscription Cancelled | Recursive Fractal Mind</title>
      </Head>

      <div className="max-w-md w-full bg-gray-900 rounded-xl shadow-xl p-8 text-center">
        <div className="text-blue-500 text-5xl mb-6">ℹ️</div>
        <h1 className="text-2xl font-bold text-white mb-4">Subscription Cancelled</h1>
        <p className="text-gray-300 mb-6">
          Your subscription process was cancelled. No charges have been made to your account.
        </p>
        
        <div className="space-y-4">
          <Link
            href="/subscribe"
            className="block w-full px-5 py-3 bg-blue-700 hover:bg-blue-600 text-white rounded-md transition-colors"
          >
            Try Again
          </Link>
          
          <Link
            href="/"
            className="block w-full px-5 py-3 border border-gray-700 hover:bg-gray-800 text-gray-300 rounded-md transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}