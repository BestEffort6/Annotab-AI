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

type CoreTableProps = {
  data: any[];
  columns: ColumnDef<any>[];
  loading: boolean;
  page: number;
  pageSize: number;
  totalPage: number;
  total: number;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
};

const pageSizes = [
  { label: '1', value: 1 },
  { label: '10', value: 10 },
  { label: '25', value: 25 },
  { label: '50', value: 50 },
  { label: '100', value: 100 },
];

export default function CoreTable({
  data,
  columns,
  loading,
  page,
  pageSize,
  totalPage,
  total,
  setPage,
  setPageSize,
}: CoreTableProps) {
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
        <div>
          <span className="mr-2">Total: {total}</span>
          <Select
            disabled={loading}
            size="sm"
            label="Page size"
            placeholder=""
            className="max-w-[100px]"
            defaultSelectedKeys={[pageSize.toString()]}
            onChange={(value) => setPageSize(Number(value))}
          >
            {pageSizes.map((size) => (
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
