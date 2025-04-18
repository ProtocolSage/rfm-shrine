import Stripe from 'stripe';

// Create Stripe instance if API key exists
const getStripe = () => {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    console.warn('No Stripe secret key found. Stripe functionality will be disabled.');
    return null;
  }
  
  return new Stripe(stripeKey, {
    typescript: true,
  });
};

export const stripe = getStripe();

export async function createCheckoutSession(userId: string, priceId: string) {
  if (!stripe) {
    throw new Error('Stripe is not configured');
  }
  
  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXTAUTH_URL}/subscribe/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXTAUTH_URL}/subscribe/cancel`,
    client_reference_id: userId,
    metadata: {
      userId: userId,
    },
  });

  return checkoutSession;
}

export async function createPortalSession(customerId: string) {
  if (!stripe) {
    throw new Error('Stripe is not configured');
  }
  
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.NEXTAUTH_URL}/profile`,
  });
  
  return session;
}

export async function getSubscriptionStatus(customerId: string) {
  if (!stripe) {
    return {
      hasActiveSubscription: false,
      subscriptions: [],
    };
  }
  
  try {
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: 'active',
    });
    
    return {
      hasActiveSubscription: subscriptions.data.length > 0,
      subscriptions: subscriptions.data,
    };
  } catch (error) {
    console.error('Error checking subscription status:', error);
    return {
      hasActiveSubscription: false,
      subscriptions: [],
    };
  }
}