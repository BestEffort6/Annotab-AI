'use client';

import { createColumnHelper } from '@tanstack/react-table';
import { useState } from 'react';

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
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  return (
    <div className="m-4">
      <CoreTable
        data={[]}
        columns={defaultColumns}
        loading={false}
        page={page}
        pageSize={pageSize}
        total={0}
        setPage={setPage}
        setPageSize={setPageSize}
      />
    </div>
  );
}
