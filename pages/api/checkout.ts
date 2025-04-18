import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get user from session
    const session = await getServerSession(req, res, authOptions);

    if (!session?.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Stripe integration has been removed
    // Returning a mock response for now
    return res.status(200).json({ 
      url: '/subscribe/success?demo=true',
      message: 'Stripe integration is disabled in development mode'
    });
  } catch (error) {
    console.error('Checkout session error:', error);
    return res.status(500).json({ error: 'Checkout functionality is currently disabled' });
  }
}