import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getServerSession } from 'next-auth';

import Overview from '@/components/annotab/overview';
import { fetchCurrentWorkspace } from '@/hooks/queries/useCurrentWorkspace';
import { fetchInvitations } from '@/hooks/queries/useInvitations';
import { authOptions } from '@/libs/auth';
import { DEFAULT_PAGINATION } from '@/libs/constants';

export default async function OverviewPage() {
  const session = await getServerSession(authOptions);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [
      'invitations',
      session?.user.access.token,
      DEFAULT_PAGINATION.PAGE,
      DEFAULT_PAGINATION.LIMIT,
      '',
    ],
    queryFn: () =>
      fetchInvitations(
        session?.user.access.token,
        DEFAULT_PAGINATION.PAGE,
        DEFAULT_PAGINATION.LIMIT,
        ''
      ),
  });

  await queryClient.prefetchQuery({
    queryKey: ['currentWorkspace', session?.user.access.token],
    queryFn: () => fetchCurrentWorkspace(session?.user.access.token),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Overview />
    </HydrationBoundary>
  );
}
