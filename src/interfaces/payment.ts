export interface CreateCheckoutSessionPayload {
  mode: 'subscription' | 'setup' | 'payment';
  subscriptionId: string;
  seatSubscriptionId: string;
  seatCount: number;
}

export interface ExpireCheckoutSessionPayload {
  sessionId: string;
}

export interface CreateCheckoutSessionResponse {
  id: string;
  client_secret: string;
}
