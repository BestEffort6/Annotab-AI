'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';

import { useDatasets } from '@/hooks/queries/useDatasets';
import { DEFAULT_PAGINATION } from '@/libs/constants';

import ListChart from './list-chart';
import Members from './member';

export default function Overview() {
  const { data: session } = useSession();
  const [page] = useState(DEFAULT_PAGINATION.PAGE);
  const [pageSize] = useState(DEFAULT_PAGINATION.LIMIT);
  const { data } = useDatasets(session?.user.access.token, page, pageSize);

  return (
    <div className="flex h-full w-full flex-col gap-y-5 overflow-y-auto px-7 py-11">
      <div className="flex h-[12%] w-full flex-wrap">
        <div className="flex h-full w-1/5 flex-col justify-center gap-y-4 rounded-lg bg-mostly-white px-5">
          <p className="text-sm font-semibold text-light-red">
            {data && data.meta.itemCount}
          </p>
          <p className="text-base font-semibold text-dark-navy-blue">Total</p>
        </div>
      </div>
      <ListChart />
      <Members />
    </div>
  );
}
