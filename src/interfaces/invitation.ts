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
