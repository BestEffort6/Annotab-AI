export interface Invitation {
  id: string;
  createdAt: string;
  updatedAt: string;
  workspaceId: string;
  userId: string;
  datasetId: string;
  role: string;
  invitationAcceptedAt: string;
}

export interface InviteMember {
  email: string;
  role: string;
}
