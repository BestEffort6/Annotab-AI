import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getServerSession } from 'next-auth';

import DatasetScreen from '@/components/annotab/dataset';
import { fetchDatasets } from '@/hooks/queries/useDatasets';
import { authOptions } from '@/libs/auth';
import { DEFAULT_PAGINATION } from '@/libs/constants';

export default async function DatasetPage() {
  const session = await getServerSession(authOptions);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [
      'datasets',
      session?.user.access.token,
      DEFAULT_PAGINATION.PAGE,
      DEFAULT_PAGINATION.LIMIT,
    ],
    queryFn: () =>
      fetchDatasets(
        session?.user.access.token,
        DEFAULT_PAGINATION.PAGE,
        DEFAULT_PAGINATION.LIMIT
      ),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DatasetScreen />
    </HydrationBoundary>
  );
}
