export interface DefaultPrice {
  id: string;
  object: string;
  active: boolean;
  billing_scheme: string;
  created: string;
  currency: string;
  custom_unit_amount: string;
  livemode: boolean;
  lookup_key: string;
  metadata: string;
  nickname: string;
  product: string;
  recurring: string;
  tax_behavior: string;
  tiers_mode: string;
  transform_quantity: string;
  type: string;
  unit_amount: number;
  unit_amount_decimal: string;
}

export interface StripeSubscription {
  id: string;
  object: string;
  active: boolean;
  attributes: string;
  created: string;
  default_price: DefaultPrice;
  description: string;
  features: string;
  images: string;
  livemode: boolean;
  metadata: string;
  name: string;
  package_dimensions: string;
  shippable: string;
  statement_descriptor: string;
  tax_code: string;
  type: string;
  unit_label: string;
  updated: string;
  url: string;
}

export interface Subscription {
  seatCount: number;
  id: string;
  createdAt: string;
  updatedAt: string;
  stripeProductId: string;
  currency: string;
  order: number;
  name: string;
  description: string;
  isDisplay: boolean;
  isCustomPrice: boolean;
  isActive: boolean;
  isDefault: boolean;
  isTrial: boolean;
  trialDays: number;
  validityDays: number;
  deletedAt: string;
  stripeSubscription: StripeSubscription | undefined;
}

export interface InviteMember {
  email: string;
  role: string;
}
