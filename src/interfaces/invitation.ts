import type { User } from './user';

export interface Invitation {
  id: string;
  createdAt: string;
  updatedAt: string;
  workspaceId: string;
  userId: string;
  datasetId: string;
  role: string;
  invitationAcceptedAt: string;
  user: User;
  status: string;
}

export interface InviteMember {
  email: string;
  role: string;
}
