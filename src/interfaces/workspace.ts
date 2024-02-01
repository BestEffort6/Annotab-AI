import type { File } from './file';

export interface Workspace {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  profilePictureId: string | null;
  stripeSubscriptionId: string | null;
  subscriptionId: string | null;
  description: string | null;
  billingEmail: string | null;
  billingAddress: string | null;
  profilePicture: File | null;
}

export type UpdateCurrentWorkspacePayload = 'name' | 'description' | 'file';

export interface UpdateCurrentWorkspaceFormData extends FormData {
  append(
    name: UpdateCurrentWorkspacePayload,
    value: string | Blob,
    fileName?: string
  ): void;
}
