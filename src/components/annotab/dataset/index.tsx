'use client';

import { PlusIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

import { useDatasets } from '@/hooks/queries/useDatasets';
import { DEFAULT_PAGINATION } from '@/libs/constants';

import CoreTable from '../table';
import DatasetItem from './item';

const Dataset = () => {
  const { data: session } = useSession();

  const [page, setPage] = useState(DEFAULT_PAGINATION.PAGE);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGINATION.LIMIT);

  const { data } = useDatasets(session?.user.access.token, page, pageSize);

  return (
    <div className="flex h-full w-full flex-col gap-y-9 px-6 py-7">
      <div className="flex h-10 w-full flex-row items-center justify-between">
        <p className="text-base font-semibold text-dark-navy-blue">Dataset</p>
        <button
          type="button"
          className="flex flex-row items-center justify-center gap-x-2 rounded-lg border  border-dark-navy-blue/10 bg-mostly-white px-5 py-2 text-base font-semibold text-dark-navy-blue transition duration-700 ease-in-out hover:drop-shadow-lg"
        >
          <PlusIcon width={15} height={15} className="text-dark-navy-blue" />
          Create Dataset
        </button>
      </div>
      <CoreTable
        data={data?.data || []}
        columns={[]}
        loading={false}
        page={page}
        pageSize={pageSize}
        total={data?.meta.itemCount || 0}
        totalPage={data?.meta.pageCount || 0}
        setPage={setPage}
        setPageSize={setPageSize}
        type="grid"
        itemGrid={DatasetItem}
      />
    </div>
  );
};

export default Dataset;
