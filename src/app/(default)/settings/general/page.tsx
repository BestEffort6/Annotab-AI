import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getServerSession } from 'next-auth';

import GeneralSettings from '@/components/annotab/settings/general';
import { fetchCurrentWorkspace } from '@/hooks/queries/useCurrentWorkspace';
import { authOptions } from '@/libs/auth';

export default async function GeneralSettingsPage() {
  const session = await getServerSession(authOptions);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['currentWorkspace', session?.user.access.token],
    queryFn: () => fetchCurrentWorkspace(session?.user.access.token),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <GeneralSettings />
    </HydrationBoundary>
  );
}
