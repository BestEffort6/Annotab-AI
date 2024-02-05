import { dehydrate, QueryClient } from '@tanstack/query-core';
import { HydrationBoundary } from '@tanstack/react-query';
import Link from 'next/link';
import { getServerSession } from 'next-auth';

import SettingsAccount from '@/components/annotab/settings/account';
import { fetchInvitations } from '@/hooks/queries/useInvitations';
import { authOptions } from '@/libs/auth';
import { DEFAULT_PAGINATION } from '@/libs/constants';

export default async function AccountSetting() {
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
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="w-2/4 pt-6 2xl:w-3/4">
        <Link
          href="/"
          className="mb-[120px] ml-auto block w-[260px] rounded-lg border border-gray-100 bg-gray-100 px-8 py-1 text-dark-navy-blue hover:bg-gray-100/80 hover:text-black/80"
        >
          Go to your personal setting
        </Link>
        <SettingsAccount />
      </div>
    </HydrationBoundary>
  );
}
