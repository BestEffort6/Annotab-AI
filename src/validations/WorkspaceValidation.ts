import { z } from 'zod';

export const UpdateWorkspaceValidation = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
});
