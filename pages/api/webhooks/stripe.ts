import { NextApiRequest, NextApiResponse } from 'next';
import { buffer } from 'micro';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

// Disable body parser to get raw body for Stripe signature verification
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  const rawBody = await buffer(req);
  const signature = req.headers['stripe-signature'] as string;

  if (!signature) {
    return res.status(400).send('Missing Stripe signature');
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody.toString(),
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle specific Stripe events
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      
      // Get user ID from session
      const userId = session.client_reference_id;
      if (!userId) {
        console.error('No user ID found in session');
        return res.status(400).send('No user ID found in session');
      }

      // At this point, you would update the user's subscription status in your database
      // For this demo, we'll log the information
      console.log(`User ${userId} subscribed successfully`);
      
      // In a real implementation, you would update the user's subscription status in the database
      // const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
      // await db.user.update({
      //   where: { id: userId },
      //   data: {
      //     stripeCustomerId: session.customer as string,
      //     stripeSubscriptionId: subscription.id,
      //     hasSubscription: true,
      //   },
      // });
      
      break;
    }
    
    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription;
      
      // Update subscription status in database
      console.log(`Subscription ${subscription.id} updated: ${subscription.status}`);
      
      break;
    }
    
    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      
      // Remove subscription status in database
      console.log(`Subscription ${subscription.id} cancelled`);
      
      break;
    }
    
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.status(200).json({ received: true });
}