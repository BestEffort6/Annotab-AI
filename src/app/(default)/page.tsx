import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getServerSession } from 'next-auth';

import { fetchInvitations } from '@/hooks/queries/useInvitations';
import { fetchSubscriptions } from '@/hooks/queries/useSubscriptions';
import { authOptions } from '@/libs/auth';
import { DEFAULT_PAGINATION } from '@/libs/constants';

import OverviewPage from './oveview/page';

export default async function Homepage() {
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
    queryKey: ['subscriptions', session?.user.access.token],
    queryFn: () => fetchSubscriptions(session?.user.access.token),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <OverviewPage />
    </HydrationBoundary>
  );
}
