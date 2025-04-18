import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  // Stripe integration has been removed
  // This is a placeholder webhook handler
  
  console.log('Webhook received (Stripe integration disabled)');
  
  res.status(200).json({ 
    received: true,
    message: 'Stripe integration is currently disabled'
  });
}