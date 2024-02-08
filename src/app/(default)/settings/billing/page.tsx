import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getServerSession } from 'next-auth';

import SettingsBilling from '@/components/annotab/settings/billing';
import { fetchSubscriptions } from '@/hooks/queries/useSubscriptions';
import { authOptions } from '@/libs/auth';

export default async function BillingSetting() {
  const session = await getServerSession(authOptions);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['subscriptions', session?.user.access.token],
    queryFn: () => fetchSubscriptions(session?.user.access.token),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SettingsBilling />
    </HydrationBoundary>
  );
}
