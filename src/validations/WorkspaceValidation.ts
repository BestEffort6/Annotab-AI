import { z } from 'zod';

export const UpdateWorkspaceValidation = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
});
export const InvitePeople = z.object({
  email: z.string().email(),
  role: z.string().min(1),
});
