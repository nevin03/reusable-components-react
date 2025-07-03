import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import Pagination from "../Pagination";

const LOCAL_STORAGE_KEY = "columnWidths";

const Table = ({
  columns,
  data,
  initialPageSize = 5,
  controlledPagination,
  isFetching = false,
}) => {
  const [internalPagination, setInternalPagination] = useState({
    pageIndex: 0,
    pageSize: initialPageSize,
  });

  // ✅ FIXED: Prevent JSON.parse error
  const [columnSizing, setColumnSizing] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved && saved !== "undefined" ? JSON.parse(saved) : {};
  });

  const handleColumnResize = (newSizing) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newSizing));
    setColumnSizing(newSizing);
  };

  const isControlled = !!controlledPagination;
  const pagination = isControlled
    ? {
        pageIndex: controlledPagination.pageIndex,
        pageSize: initialPageSize,
      }
    : internalPagination;

  const table = useReactTable({
    data,
    columns,
    state: {
      pagination,
      columnSizing,
    },
    onPaginationChange: isControlled
      ? ({ pageIndex }) => controlledPagination.setPageIndex(pageIndex)
      : setInternalPagination,
    onColumnSizingChange: handleColumnResize,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: isControlled,
    pageCount: controlledPagination?.pageCount,
    enableColumnResizing: true,
    columnResizeMode: "onChange",
  });

  return (
    <div className="overflow-x-auto border rounded-lg shadow">
      <table className="min-w-full border-collapse">
        <thead className="bg-primary-100 text-secondary-900">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  style={{ width: header.getSize() }}
                  className={`relative group p-3 border-b border-secondary-200 font-medium text-${
                    header.column.columnDef.meta?.align || "left"
                  }`}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {header.column.getCanResize() && (
                    <div
                      onMouseDown={header.getResizeHandler()}
                      onTouchStart={header.getResizeHandler()}
                      className="absolute right-0 top-0 h-full w-1 cursor-col-resize select-none bg-gray-300 opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {isFetching ? (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-6 text-sm text-gray-500"
              >
                Loading...
              </td>
            </tr>
          ) : table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="hover:bg-primary-50 transition">
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className={`p-3 border-b border-secondary-100 text-secondary-800 text-${
                      cell.column.columnDef.meta?.align || "left"
                    }`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-6 text-sm text-gray-500"
              >
                No data found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Pagination
        pageIndex={pagination.pageIndex}
        pageCount={table.getPageCount()}
        setPageIndex={
          isControlled
            ? controlledPagination.setPageIndex
            : (i) =>
                setInternalPagination((prev) => ({ ...prev, pageIndex: i }))
        }
        isFetching={isFetching}
      />
    </div>
  );
};

export default Table;
