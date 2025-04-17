import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';

export default function ErrorPage() {
  const router = useRouter();
  const { error } = router.query;
  
  // Error messages
  const errorMessages: Record<string, string> = {
    default: 'An error occurred during authentication.',
    AccessDenied: 'You do not have permission to access this resource.',
    Verification: 'The verification link is no longer valid.',
    CredentialsSignin: 'The email or password you entered is incorrect.',
    SessionRequired: 'You must be signed in to access this page.',
    InvalidInviteCode: 'The invite code you entered is invalid or has been used.'
  };
  
  const message = error ? errorMessages[error as string] || errorMessages.default : errorMessages.default;

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center items-center p-4">
      <Head>
        <title>Authentication Error | Recursive Fractal Mind</title>
      </Head>
      
      <div className="max-w-md w-full text-center">
        <div className="text-red-500 text-5xl mb-6">⚠️</div>
        <h1 className="text-2xl font-bold text-white mb-4">Authentication Error</h1>
        <div className="bg-gray-900 rounded-xl p-6 mb-6">
          <p className="text-gray-300 mb-6">{message}</p>
          
          <div className="flex flex-col space-y-4">
            <Link 
              href="/auth/signin"
              className="inline-block px-5 py-3 bg-blue-700 hover:bg-blue-600 text-white rounded-md transition-colors"
            >
              Return to Sign In
            </Link>
            
            <Link 
              href="/"
              className="inline-block text-gray-400 hover:text-gray-300 transition-colors"
            >
              Return to Public Shrine
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}