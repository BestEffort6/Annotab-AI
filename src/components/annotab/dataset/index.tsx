'use client';

import { PlusIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { useDatasets } from '@/hooks/queries/useDatasets';
import type { DatasetProps } from '@/interfaces/dataset';
import { DEFAULT_PAGINATION } from '@/libs/constants';

import CoreTable from '../table';

const Dataset = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [page, setPage] = useState(DEFAULT_PAGINATION.PAGE);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGINATION.LIMIT);

  const { data } = useDatasets(session?.user.access.token, page, pageSize);

  const handleDatasetItemClick = (id: string) => {
    router.push(`/dataset/${id}`);
  };
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
        isType={false}
        content={
          <div className="flex flex-wrap gap-6">
            {data &&
              data.data.map((item: DatasetProps) => (
                <div
                  onClick={() => handleDatasetItemClick(item.id)}
                  key={item.id}
                  className="flex w-60 cursor-pointer flex-col gap-y-1 rounded-lg bg-grey-purple-white px-4 py-4 shadow-md"
                  aria-hidden="true"
                >
                  <div className="flex h-40 w-full flex-row">
                    <LazyLoadImage
                      src={item.firstData?.file?.url ?? '/images/no-image.png'}
                      className="full h-full w-full rounded-lg object-cover shadow-md"
                    />
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <p className="truncate text-sm font-semibold text-dark-navy-blue">
                      {item.name}
                    </p>
                    <p className="text-xs font-normal text-dark-navy-blue">
                      {/* {item.dataList.length} Items */}
                    </p>
                    <p className="text-xs font-normal text-dark-navy-blue">
                      0% Annotated
                    </p>
                  </div>
                </div>
              ))}
          </div>
        }
      />
    </div>
  );
};

export default Dataset;
