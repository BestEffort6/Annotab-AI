export interface Subscription {
  id: string;
  createdAt: string;
  updatedAt: string;
  stripeProductId: string;
  currency: string;
  order: number;
  name: string;
  description: string;
  isCustomPrice: boolean;
  isActive: boolean;
  isDefault: boolean;
  isTrial: boolean;
  trialDays: number;
  validityDays: number;
  deletedAt: string;
  stripeSubscription: object | undefined;
}

export interface InviteMember {
  email: string;
  role: string;
}
