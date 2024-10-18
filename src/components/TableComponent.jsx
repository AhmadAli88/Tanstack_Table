// TableComponent.js
import React, { useMemo, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';
import {  MyGlobalFilter } from './GlobalFilter';
import { ColumnFilter } from './ColumnFilter';

const TableComponent = () => {
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnFilters, setColumnFilters] = useState([]);

  // Sample data
  const data = useMemo(
    () => [
      { id: 1, name: 'John', age: 28, email: 'john1@example.com' },
      { id: 2, name: 'Jane', age: 22, email: 'jane1@example.com' },
      { id: 3, name: 'Alice', age: 25, email: 'alice1@example.com' },
      { id: 4, name: 'Bob', age: 34, email: 'bob1@example.com' },
      { id: 5, name: 'Charlie', age: 31, email: 'charlie1@example.com' },
      { id: 6, name: 'John', age: 28, email: 'john2@example.com' },
      { id: 7, name: 'Jane', age: 22, email: 'jane2@example.com' },
      { id: 8, name: 'Alice', age: 25, email: 'alice2@example.com' },
      { id: 9, name: 'Bob', age: 34, email: 'bob2@example.com' },
      { id: 10, name: 'Charlie', age: 31, email: 'charlie2@example.com' },
      { id: 11, name: 'John', age: 28, email: 'john3@example.com' },
      { id: 12, name: 'Jane', age: 22, email: 'jane3@example.com' },
      { id: 13, name: 'Alice', age: 25, email: 'alice3@example.com' },
      { id: 14, name: 'Bob', age: 34, email: 'bob3@example.com' },
      { id: 15, name: 'Charlie', age: 31, email: 'charlie3@example.com' },
      { id: 16, name: 'John', age: 28, email: 'john4@example.com' },
      { id: 17, name: 'Jane', age: 22, email: 'jane4@example.com' },
      { id: 18, name: 'Alice', age: 25, email: 'alice4@example.com' },
      { id: 19, name: 'Bob', age: 34, email: 'bob4@example.com' },
      { id: 20, name: 'Charlie', age: 31, email: 'charlie4@example.com' },
      { id: 21, name: 'John', age: 28, email: 'john5@example.com' },
      { id: 22, name: 'Jane', age: 22, email: 'jane5@example.com' },
      { id: 23, name: 'Alice', age: 25, email: 'alice5@example.com' },
      { id: 24, name: 'Bob', age: 34, email: 'bob5@example.com' },
      { id: 25, name: 'Charlie', age: 31, email: 'charlie5@example.com' },
      { id: 26, name: 'John', age: 28, email: 'john6@example.com' },
      { id: 27, name: 'Jane', age: 22, email: 'jane6@example.com' },
      { id: 28, name: 'Alice', age: 25, email: 'alice6@example.com' },
      { id: 29, name: 'Bob', age: 34, email: 'bob6@example.com' },
      { id: 30, name: 'Charlie', age: 31, email: 'charlie6@example.com' },
      { id: 31, name: 'John', age: 28, email: 'john7@example.com' },
      { id: 32, name: 'Jane', age: 22, email: 'jane7@example.com' },
      { id: 33, name: 'Alice', age: 25, email: 'alice7@example.com' },
      { id: 34, name: 'Bob', age: 34, email: 'bob7@example.com' },
      { id: 35, name: 'Charlie', age: 31, email: 'charlie7@example.com' },
      { id: 36, name: 'John', age: 28, email: 'john8@example.com' },
      { id: 37, name: 'Jane', age: 22, email: 'jane8@example.com' },
      { id: 38, name: 'Alice', age: 25, email: 'alice8@example.com' },
      { id: 39, name: 'Bob', age: 34, email: 'bob8@example.com' },
      { id: 40, name: 'Charlie', age: 31, email: 'charlie8@example.com' },
      { id: 41, name: 'John', age: 28, email: 'john9@example.com' },
      { id: 42, name: 'Jane', age: 22, email: 'jane9@example.com' },
      { id: 43, name: 'Alice', age: 25, email: 'alice9@example.com' },
      { id: 44, name: 'Bob', age: 34, email: 'bob9@example.com' },
      { id: 45, name: 'Charlie', age: 31, email: 'charlie9@example.com' },
      { id: 46, name: 'John', age: 28, email: 'john10@example.com' },
      { id: 47, name: 'Jane', age: 22, email: 'jane10@example.com' },
      { id: 48, name: 'Alice', age: 25, email: 'alice10@example.com' },
      { id: 49, name: 'Bob', age: 34, email: 'bob10@example.com' },
      { id: 50, name: 'Charlie', age: 31, email: 'charlie10@example.com' },
    ],
    []
  );
  

  // Column definitions
  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        cell: (info) => info.getValue(),
        footer: (info) => info.column.id,
      },
      {
        accessorKey: 'name',
        header: 'Name',
        cell: (info) => info.getValue(),
        footer: (info) => info.column.id,
      },
      {
        accessorKey: 'age',
        header: 'Age',
        cell: (info) => info.getValue(),
        footer: (info) => info.column.id,
      },
      {
        accessorKey: 'email',
        header: 'Email',
        cell: (info) => info.getValue(),
        footer: (info) => info.column.id,
      },
    ],
    []
  );

  // Create the table instance
  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      columnFilters,
    },
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      <MyGlobalFilter globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
      <table className="table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </button>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of{' '}
          {table.getPageCount()}
        </span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </button>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default TableComponent;
