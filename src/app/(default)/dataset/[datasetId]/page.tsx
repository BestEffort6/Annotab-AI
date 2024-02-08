import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { fetchDatas } from '@/hooks/queries/useDatas';
import { authOptions } from '@/libs/auth';
import { DEFAULT_PAGINATION } from '@/libs/constants';

import DatasetDetail from '../../../../components/annotab/dataset/detail';

export default async function DatasetDetailPage({
  params,
}: {
  params: { datasetId: string };
}) {
  const session = await getServerSession(authOptions);
  const queryClient = new QueryClient();

  if (!session) {
    redirect('/sign-in');
  }

  await queryClient.prefetchQuery({
    queryKey: [
      'datas',
      session?.user.access.token,
      DEFAULT_PAGINATION.PAGE,
      DEFAULT_PAGINATION.LIMIT,
      params.datasetId,
    ],
    queryFn: () =>
      fetchDatas(
        session?.user.access.token,
        DEFAULT_PAGINATION.PAGE,
        DEFAULT_PAGINATION.LIMIT,
        params.datasetId
      ),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DatasetDetail datasetId={params.datasetId} />
    </HydrationBoundary>
  );
}
