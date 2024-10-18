import React, { useMemo, useState, useEffect } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table';
import { MyGlobalFilter } from './GlobalFilter';
import { ColumnFilter } from './ColumnFilter';

const TableComponentThree = () => {
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [editingRowIndex, setEditingRowIndex] = useState(null); // Track editing row
  const [editedRowData, setEditedRowData] = useState(null); // Track row data being edited

  // Simulate fetching data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await new Promise((resolve) =>
        setTimeout(() => {
          resolve([
            { id: 1, name: 'John', age: 28, email: 'john1@example.com' },
            { id: 2, name: 'Jane', age: 22, email: 'jane1@example.com' },
            { id: 3, name: 'Alice', age: 25, email: 'alice1@example.com' },
            { id: 4, name: 'Bob', age: 34, email: 'bob1@example.com' },
            { id: 5, name: 'Charlie', age: 31, email: 'charlie1@example.com' },
          ]);
        }, 1000)
      );
      setData(response);
      setLoading(false);
    };

    fetchData();
  }, []);

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
        cell: (info) => (
          <EditableCell
            info={info}
            isEditing={editingRowIndex === info.row.index}
            editedRowData={editedRowData}
            setEditedRowData={setEditedRowData}
            field="name"
          />
        ),
        footer: (info) => info.column.id,
      },
      {
        accessorKey: 'age',
        header: 'Age',
        cell: (info) => (
          <EditableCell
            info={info}
            isEditing={editingRowIndex === info.row.index}
            editedRowData={editedRowData}
            setEditedRowData={setEditedRowData}
            field="age"
          />
        ),
        footer: (info) => info.column.id,
      },
      {
        accessorKey: 'email',
        header: 'Email',
        cell: (info) => (
          <EditableCell
            info={info}
            isEditing={editingRowIndex === info.row.index}
            editedRowData={editedRowData}
            setEditedRowData={setEditedRowData}
            field="email"
          />
        ),
        footer: (info) => info.column.id,
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <div>
            {editingRowIndex === row.index ? (
              <>
                <button onClick={handleUpdate}>Update</button>
                <button onClick={() => cancelEdit()}>Cancel</button>
              </>
            ) : (
              <>
                <button onClick={() => startEdit(row)}>Edit</button>
                <button onClick={() => handleDelete(row.original.id)}>Delete</button>
              </>
            )}
          </div>
        ),
      },
    ],
    [editingRowIndex, editedRowData] // Recompute when editingRowIndex or editedRowData changes
  );

  // Create the table instance
  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const startEdit = (row) => {
    setEditingRowIndex(row.index);
    setEditedRowData({ ...row.original });
  };

  const handleUpdate = () => {
    const updatedData = data.map((row, index) =>
      index === editingRowIndex ? editedRowData : row
    );
    setData(updatedData);
    setEditingRowIndex(null);
  };

  const cancelEdit = () => {
    setEditingRowIndex(null);
  };

  const handleDelete = (id) => {
    setData((prevData) => prevData.filter((row) => row.id !== id));
  };

  const handleExport = () => {
    const csvData = data.map((row) => ({
      ID: row.id,
      Name: row.name,
      Age: row.age,
      Email: row.email,
    }));

    const csvContent = [
      'data:text/csv;charset=utf-8,',
      Object.keys(csvData[0]).join(','), // Header
      ...csvData.map((row) => Object.values(row).join(',')), // Rows
    ].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'table_data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const EditableCell = ({ info, isEditing, editedRowData, setEditedRowData, field }) => {
    const value = isEditing ? editedRowData[field] : info.getValue();

    const handleChange = (e) => {
      setEditedRowData({
        ...editedRowData,
        [field]: e.target.value,
      });
    };

    return isEditing ? (
      <input type="text" value={value} onChange={handleChange} />
    ) : (
      value
    );
  };

  return (
    <>
      {/* Loader */}
      {loading && <div>Loading data...</div>}

      {/* Global Filter */}
      <MyGlobalFilter globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />

      {/* Column Visibility Toggle */}
      <div>
        {table.getAllColumns().map((column) => (
          <div key={column.id}>
            <label>
              <input
                type="checkbox"
                checked={column.getIsVisible()}
                onChange={column.getToggleVisibilityHandler()}
              />
              {column.id}
            </label>
          </div>
        ))}
      </div>

      <table className="table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  style={{ cursor: 'pointer' }}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {header.column.getIsSorted() && (
                    <span>
                      {header.column.getIsSorted() === 'asc' ? ' 🔼' : ' 🔽'}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} style={{ background: rowSelection[row.id] ? 'lightgray' : 'white' }}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Row Actions */}
      <button onClick={handleExport}>Export to CSV</button>

      {/* Pagination */}
      <div className="pagination">
        <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Previous
        </button>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </button>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
        >
          {[5, 10, 20, 30, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default TableComponentThree;
