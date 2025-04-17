import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/[...nextauth]';
import { createCheckoutSession } from '../../lib/stripe';

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

    const userId = (session.user as any).id;

    // Get the price ID from environment variable
    const priceId = process.env.REFLECT_SUBSCRIPTION_PRICE_ID;

    if (!priceId) {
      return res.status(500).json({ error: 'Stripe price ID not configured' });
    }

    // Create Stripe checkout session
    const checkoutSession = await createCheckoutSession(userId, priceId);

    // Return the checkout URL
    return res.status(200).json({ url: checkoutSession.url });
  } catch (error) {
    console.error('Checkout session error:', error);
    return res.status(500).json({ error: 'Failed to create checkout session' });
  }
}