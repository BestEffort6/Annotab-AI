import type { File } from './file';

export interface DataProps {
  id: string;
  datasetId: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  file: File;
}
