export interface CreateCheckoutSessionPayload {
  subscriptionId: string;
}

export interface ExpireCheckoutSessionPayload {
  sessionId: string;
}

export interface CreateCheckoutSessionResponse {
  id: string;
  client_secret: string;
}
