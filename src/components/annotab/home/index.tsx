'use client';

import { createColumnHelper } from '@tanstack/react-table';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

import { useLayoutActions } from '@/components/providers/LayoutProvider';
import { useInvitations } from '@/hooks/queries/useInvitations';
import { DEFAULT_PAGINATION } from '@/libs/constants';

import CoreTable from '../table';

const columnHelper = createColumnHelper<any>();

const defaultColumns = [
  columnHelper.accessor((row) => row.id, {
    id: 'id',
    cell: (info) => info.getValue(),
    header: () => <span>ID</span>,
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor((row) => row.role, {
    id: 'role',
    cell: (info) => info.getValue(),
    header: () => <span>Role</span>,
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor((row) => row.user.email, {
    id: 'email',
    cell: (info) => info.getValue(),
    header: () => <span>Email</span>,
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor((row) => row.status, {
    id: 'status',
    cell: (info) => info.getValue(),
    header: () => <span>Status</span>,
    footer: (props) => props.column.id,
  }),
];

export default function Home() {
  const { data: session } = useSession();
  const { setLoading } = useLayoutActions();
  const [page, setPage] = useState(DEFAULT_PAGINATION.PAGE);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGINATION.LIMIT);

  const { data, isLoading } = useInvitations(
    session?.user.access.token,
    page,
    pageSize
  );

  if (isLoading) {
    setLoading(true);
  }

  return (
    <div className="m-4">
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
}
