import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';

export default function Profile() {
  const { data: session } = useSession();
  const [exportFormat, setExportFormat] = useState('json');
  const [isExporting, setIsExporting] = useState(false);
  const [memoryCount, setMemoryCount] = useState(0);
  
  useEffect(() => {
    // Fetch memory count
    async function fetchMemoryCount() {
      try {
        const res = await fetch('/api/memory');
        const data = await res.json();
        setMemoryCount(data.memories?.length || 0);
      } catch (err) {
        console.error('Error fetching memory count:', err);
      }
    }
    
    fetchMemoryCount();
  }, []);
  
  const handleExport = async () => {
    setIsExporting(true);
    
    try {
      // Initiate download
      window.location.href = `/api/export-memory?format=${exportFormat}`;
      
      // Add small delay before resetting isExporting
      setTimeout(() => {
        setIsExporting(false);
      }, 1500);
    } catch (err) {
      console.error('Export error:', err);
      setIsExporting(false);
    }
  };
  
  if (!session) {
    return (
      <div className="min-h-screen py-12">
        <Head>
          <title>Profile | Recursive Fractal Mind</title>
        </Head>
        
        <div className="max-w-md mx-auto bg-gray-900 rounded-xl shadow-xl p-8">
          <p className="text-center text-gray-300">Please sign in to view your profile.</p>
          <div className="mt-6 text-center">
            <Link 
              href="/auth/signin?callbackUrl=/profile"
              className="inline-block px-5 py-3 bg-blue-700 hover:bg-blue-600 text-white rounded-md transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen py-6 sm:py-12">
      <Head>
        <title>Your Profile | Recursive Fractal Mind</title>
      </Head>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-blue-400 mb-2">Your Profile</h1>
          <p className="text-gray-400">
            Manage your RFM settings and data
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left column - User info */}
          <div className="md:col-span-1">
            <div className="bg-gray-900 rounded-xl overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-center w-20 h-20 bg-blue-700 rounded-full mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">
                    {session.user?.name?.charAt(0) || session.user?.email?.charAt(0) || 'U'}
                  </span>
                </div>
                
                <h2 className="text-xl font-bold text-white text-center mb-1">
                  {session.user?.name || 'RFM User'}
                </h2>
                <p className="text-gray-400 text-center text-sm mb-4">
                  {session.user?.email}
                </p>
                
                <div className="border-t border-gray-800 pt-4 mt-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Account Type</span>
                    <span className="text-white font-medium">
                      {(session.user as any)?.hasSubscription ? 'Premium' : 'Standard'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Memories</span>
                    <span className="text-white font-medium">{memoryCount}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Joined</span>
                    <span className="text-white font-medium">April 2025</span>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-800 p-4">
                {(session.user as any)?.hasSubscription ? (
                  <button
                    onClick={async () => {
                      // In a real app, this would redirect to the Stripe Customer Portal
                      alert('This would redirect to Stripe Customer Portal in a real app');
                    }}
                    className="w-full py-2 px-4 bg-transparent hover:bg-gray-800 border border-gray-700 rounded text-gray-300 text-sm transition-colors"
                  >
                    Manage Subscription
                  </button>
                ) : (
                  <Link
                    href="/subscribe"
                    className="block w-full py-2 px-4 bg-blue-700 hover:bg-blue-600 text-center rounded text-white text-sm transition-colors"
                  >
                    Upgrade to Premium
                  </Link>
                )}
              </div>
            </div>
          </div>
          
          {/* Right column - Actions and settings */}
          <div className="md:col-span-2 space-y-8">
            {/* Memory Export */}
            <div className="bg-gray-900 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">
                Export Memory Archive
              </h2>
              <p className="text-gray-400 text-sm mb-6">
                Download your complete RFM memory archive in various formats.
              </p>
              
              <div className="mb-4">
                <label htmlFor="exportFormat" className="block text-sm font-medium text-gray-300 mb-2">
                  Export Format
                </label>
                <select
                  id="exportFormat"
                  value={exportFormat}
                  onChange={(e) => setExportFormat(e.target.value)}
                  className="w-full bg-gray-800 text-white px-3 py-2 border border-gray-700 rounded-md"
                >
                  <option value="json">JSON (Raw Data)</option>
                  <option value="mdx">MDX (Markdown)</option>
                  <option value="zip">ZIP (All Formats)</option>
                </select>
              </div>
              
              <button
                onClick={handleExport}
                disabled={isExporting || memoryCount === 0}
                className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-700 hover:bg-blue-600 ${
                  (isExporting || memoryCount === 0) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isExporting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Exporting...
                  </>
                ) : memoryCount === 0 ? (
                  'No memories to export'
                ) : (
                  'Export Memory Archive'
                )}
              </button>
              
              <p className="mt-2 text-xs text-gray-500">
                {memoryCount} memories available for export
              </p>
            </div>
            
            {/* Account Settings */}
            <div className="bg-gray-900 rounded-xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">
                Account Settings
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Display Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    defaultValue={session.user?.name || ''}
                    placeholder="Enter your name"
                    className="w-full bg-gray-800 text-white px-3 py-2 border border-gray-700 rounded-md"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={session.user?.email || ''}
                    disabled
                    className="w-full bg-gray-800 text-white px-3 py-2 border border-gray-700 rounded-md opacity-70 cursor-not-allowed"
                  />
                  <p className="mt-1 text-xs text-gray-500">Contact support to change your email</p>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                  <button
                    onClick={() => {
                      // Save profile changes (placeholder)
                      alert('Profile updates would be saved in a real app');
                    }}
                    className="px-4 py-2 bg-blue-700 hover:bg-blue-600 text-white rounded text-sm transition-colors"
                  >
                    Save Changes
                  </button>
                  
                  <button
                    onClick={() => {
                      // Would show modal to confirm password change in a real app
                      alert('Password change would be implemented in a real app');
                    }}
                    className="px-4 py-2 bg-transparent hover:bg-gray-800 text-gray-300 rounded text-sm transition-colors"
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </div>
            
            {/* Coming Soon */}
            <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-xl p-6 border border-blue-800">
              <div className="flex items-center mb-4">
                <div className="bg-blue-500/20 rounded-full p-2 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-white">Coming Soon</h2>
              </div>
              
              <p className="text-gray-300 mb-4">
                The Recursive Fractal Mind is evolving. Here's what's coming next:
              </p>
              
              <ul className="space-y-2 text-sm text-gray-300 mb-4">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Personal RFM instance deployments
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Vector search across your memory archive
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Auto-published thought journals & curated insights
                </li>
              </ul>
              
              <a 
                href="#" 
                className="text-blue-400 hover:text-blue-300 text-sm flex items-center"
                onClick={(e) => {
                  e.preventDefault();
                  // Would show newsletter signup in a real app
                  alert('Newsletter signup would be implemented in a real app');
                }}
              >
                Get notified when these features launch
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}