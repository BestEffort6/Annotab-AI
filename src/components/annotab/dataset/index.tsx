'use client';

import { PlusIcon } from '@heroicons/react/24/outline';
import type { ColumnDef } from '@tanstack/react-table';
import { createColumnHelper } from '@tanstack/react-table';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import { useDatasets } from '@/hooks/queries/useDatasets';
import type { Dataset } from '@/interfaces/dataset';
import { DEFAULT_PAGINATION } from '@/libs/constants';

import CoreTable from '../table';

const columnHelper = createColumnHelper<Dataset>();

const defaultColumns: ColumnDef<Dataset, string>[] = [
  columnHelper.accessor((row) => row.firstData?.file?.url, {
    id: 'image',
    cell: (info) => (
      <LazyLoadImage
        src={info.getValue()}
        className="aspect-square h-9 w-9 object-cover"
      />
    ),
    header: () => <span>Image</span>,
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor((row) => row.id, {
    id: 'id',
    cell: (info) => info.getValue(),
    header: () => <span>Id</span>,
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor((row) => row.id, {
    id: 'detail',
    cell: (info) => (
      <Link
        href={`/dataset/${info.getValue()}`}
        className="rounded-lg border  border-dark-navy-blue/10 bg-mostly-white px-4 py-2 text-sm font-semibold text-dark-navy-blue transition duration-700 ease-in-out hover:drop-shadow-lg"
      >
        Go to detail
      </Link>
    ),
    header: () => <span>Detail</span>,
    footer: (props) => props.column.id,
  }),
];

const DatasetScreen = () => {
  const { data: session } = useSession();

  const [page, setPage] = useState(DEFAULT_PAGINATION.PAGE);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGINATION.LIMIT);

  const { data } = useDatasets(session?.user.access.token, page, pageSize);

  return (
    <div className="flex h-full w-full flex-col gap-y-9 px-6 py-7">
      <div className="flex h-10 w-full flex-row items-center justify-between">
        <p className="text-base font-semibold text-dark-navy-blue">Dataset</p>
        <Link
          href="/dataset/create"
          className="flex flex-row items-center justify-center gap-x-2 rounded-lg border  border-dark-navy-blue/10 bg-mostly-white px-5 py-2 text-base font-semibold text-dark-navy-blue transition duration-700 ease-in-out hover:drop-shadow-lg"
        >
          <PlusIcon width={15} height={15} className="text-dark-navy-blue" />
          Create Dataset
        </Link>
      </div>
      <CoreTable
        data={data?.data || []}
        columns={defaultColumns}
        loading={false}
        page={page}
        pageSize={pageSize}
        total={data?.meta.itemCount || 0}
        totalPage={data?.meta.pageCount || 0}
        setPage={setPage}
        setPageSize={setPageSize}
      />
    </div>
  );
};

export default DatasetScreen;
