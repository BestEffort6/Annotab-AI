import type Stripe from '@stripe/stripe-js';

export interface PaymentMethod {
  id: string;
  workspaceId: string;
  userId: string;
  stripePaymentMethodId: string;
  stripePaymentMethod: Stripe.PaymentMethod;
}
