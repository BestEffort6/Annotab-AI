import { getServerSession } from 'next-auth';

import Home from '@/components/annotab/home';
import { fetchInvitations } from '@/hooks/queries/useInvitations';
import { authOptions } from '@/libs/auth';

export default async function Homepage() {
  const session = await getServerSession(authOptions);

  const invitations = await fetchInvitations(session?.user.access.token, 1, 10);
  return <Home invitations={invitations} />;
}
