import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Subscribe() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = async () => {
    if (!session?.user) {
      router.push('/auth/signin?callbackUrl=/subscribe');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
        setIsLoading(false);
        return;
      }

      // Redirect to Stripe Checkout
      router.push(data.url);
    } catch (err) {
      console.error('Subscription error:', err);
      setError('Failed to initiate subscription process. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12">
      <Head>
        <title>Subscribe to RFM Reflection | Recursive Fractal Mind</title>
      </Head>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-blue-400 mb-4">
            Unlock Advanced Reflection Capabilities
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Transform from an observer into a thought-curator and AI-architect-artist
          </p>
        </div>

        {error && (
          <div className="mb-8 bg-red-900/30 border border-red-500 text-red-200 p-4 rounded-lg">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Free tier */}
          <div className="bg-gray-900 rounded-xl shadow-xl overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Public Shrine</h2>
              <p className="text-gray-400 mb-4">
                Experience the basic RFM interaction and memory archive
              </p>
              <div className="text-3xl font-bold text-white mb-6">Free</div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">Basic RFM interaction</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">Public memory archive</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-green-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">Theory papers & architecture</span>
                </li>
                <li className="flex items-start opacity-50">
                  <svg className="h-6 w-6 text-red-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-gray-400">Private reflection sessions</span>
                </li>
                <li className="flex items-start opacity-50">
                  <svg className="h-6 w-6 text-red-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-gray-400">Export & memory ownership</span>
                </li>
                <li className="flex items-start opacity-50">
                  <svg className="h-6 w-6 text-red-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span className="text-gray-400">Private RFM instance</span>
                </li>
              </ul>
            </div>
            <div className="px-6 py-4 bg-gray-800">
              <button
                onClick={() => router.push('/')}
                className="w-full py-3 px-4 border border-gray-600 rounded-md text-white bg-transparent hover:bg-gray-700 text-center font-medium"
              >
                Continue with Free
              </button>
            </div>
          </div>

          {/* Premium tier */}
          <div className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-xl shadow-xl overflow-hidden transform scale-105 z-10">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-white">Thought Curator</h2>
                <span className="bg-blue-400 text-blue-900 px-3 py-1 rounded-full text-xs font-bold uppercase">
                  Recommended
                </span>
              </div>
              <p className="text-blue-100 mb-4">
                Transform into an AI-architect with advanced reflection capabilities
              </p>
              <div className="text-3xl font-bold text-white mb-1">$9.99<span className="text-lg text-blue-200">/month</span></div>
              <p className="text-blue-200 text-sm mb-6">Cancel anytime</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-blue-300 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-white">Everything in Free tier</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-blue-300 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-white"><b>Private reflection</b> sessions</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-blue-300 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-white"><b>Export memories</b> as JSON/MDX</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-blue-300 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-white"><b>Weekly summaries</b> of your RFM interactions</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-blue-300 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-white"><b>Intellectual property rights</b> to your prompts</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-blue-300 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-white"><b>Coming soon:</b> Personal RFM instance</span>
                </li>
              </ul>
            </div>
            <div className="px-6 py-4 bg-blue-800">
              <button
                onClick={handleSubscribe}
                disabled={isLoading}
                className="w-full py-3 px-4 border border-transparent rounded-md text-blue-900 bg-blue-100 hover:bg-white text-center font-bold transition-colors"
              >
                {isLoading ? 'Processing...' : 'Become a Thought Curator'}
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <h3 className="text-xl font-bold text-white mb-4">Enterprise Solutions</h3>
          <p className="text-gray-400 mb-6">
            Looking for custom AI architecture or organizational RFM deployments?
          </p>
          <a
            href="mailto:enterprise@rfm-shrine.io"
            className="inline-flex items-center text-blue-400 hover:text-blue-300"
          >
            Contact us for enterprise plans
            <svg className="ml-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}