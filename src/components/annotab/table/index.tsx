import {
  Pagination,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import type { ColumnDef } from '@tanstack/react-table';
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useEffect } from 'react';

import { PAGE_SIZES } from '@/libs/constants';

type CoreTableProps<T> = {
  data: T[];
  columns: ColumnDef<T, string>[];
  loading: boolean;
  page: number;
  pageSize: number;
  totalPage: number;
  total: number;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
};

export default function CoreTable<T>({
  data,
  columns,
  loading,
  page,
  pageSize,
  totalPage,
  total,
  setPage,
  setPageSize,
}: CoreTableProps<T>) {
  const {
    getFlatHeaders,
    getRowModel,
    setPageSize: setTablePageSize,
  } = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualSorting: true,
  });

  useEffect(() => {
    setTablePageSize(pageSize);
  }, [pageSize]);

  return (
    <>
      <Table aria-label="Example empty table" className="mb-2">
        <TableHeader>
          {getFlatHeaders().map((header) => (
            <TableColumn key={header.id}>
              {flexRender(header.column.columnDef.header, header.getContext())}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody emptyContent="No rows to display.">
          {getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex flex-row justify-between">
        <Pagination
          size="lg"
          total={totalPage}
          initialPage={page}
          showControls
          onChange={(page) => setPage(page)}
        />
        <div className="flex w-1/2 flex-row justify-end gap-x-4">
          <span className="my-auto">Total: {total}</span>
          <Select
            disabled={loading}
            size="sm"
            label="Page size"
            placeholder=""
            className="max-w-[100px]"
            defaultSelectedKeys={[pageSize.toString()]}
            onChange={(value) => setPageSize(Number(value.target.value))}
          >
            {PAGE_SIZES.map((size) => (
              <SelectItem key={size.value} value={size.value}>
                {size.label}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>
    </>
  );
}
