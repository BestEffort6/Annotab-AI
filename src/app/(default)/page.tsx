import { getServerSession } from 'next-auth';

import Home from '@/components/annotab/home';
import { fetchInvitations } from '@/hooks/queries/useInvitations';
import type { ApiResponse } from '@/interfaces/api-response';
import type { Invitation } from '@/interfaces/invitation';
import { authOptions } from '@/libs/auth';

export default async function Homepage() {
  const session = await getServerSession(authOptions);

  let invitations: ApiResponse<Invitation[]> | undefined;
  try {
    invitations = await fetchInvitations(session?.user.access.token, 1, 10);
  } catch (error) {
    invitations = undefined;
  }

  return <Home invitations={invitations} />;
}
