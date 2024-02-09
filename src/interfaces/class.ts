export interface IClass {
  id: string;
  createdAt: string;
  updatedAt: string;
  workspaceId: string;
  name: string;
  annotationClass: string;
  subAnnotationClass: string;
  color: string;
  description: string;
  deletedAt?: string;
}
