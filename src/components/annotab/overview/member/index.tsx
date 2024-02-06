'use client';

import { createColumnHelper } from '@tanstack/react-table';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

import { useInvitations } from '@/hooks/queries/useInvitations';
import { DEFAULT_PAGINATION } from '@/libs/constants';

import CoreTable from '../../table';

const columnHelper = createColumnHelper<any>();

const defaultColumns = [
  columnHelper.accessor((row) => row.user.firstName, {
    id: 'name',
    cell: (info) => info.getValue(),
    header: () => <span>Name</span>,
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor((row) => row.user.email, {
    id: 'email',
    cell: (info) => info.getValue(),
    header: () => <span>Email</span>,
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor((row) => row.role, {
    id: 'role',
    cell: (info) => info.getValue(),
    header: () => <span>Role</span>,
    footer: (props) => props.column.id,
  }),
];

const Members = () => {
  const { data: session } = useSession();
  const [keyword] = useState('');
  const [page, setPage] = useState(DEFAULT_PAGINATION.PAGE);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGINATION.LIMIT);

  const { data } = useInvitations(
    session?.user.access.token,
    page,
    pageSize,
    keyword
  );
  return (
    <div className="flex w-full flex-col  gap-y-4 rounded-lg bg-mostly-white px-5 py-3">
      <div className="flex flex-row items-center justify-between">
        <p className="text-sm font-bold capitalize text-dark-navy-blue">
          Members
        </p>
        <button
          type="button"
          className="rounded-lg border border-dark-navy-blue/10 px-4 py-1 text-sm font-normal capitalize text-dark-navy-blue"
        >
          Add People
        </button>
      </div>
      <div className="w-full">
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
    </div>
  );
};
export default Members;
