export interface Classes {
  id: string;
  createdAt: string;
  updatedAt: string;
  workspaceId: string;
  name: string;
  annotationClass: string;
  subAnnotationClass: string;
  color: string;
  description: string;
}

export interface ClassById extends Classes {
  deletedAt: string;
}
