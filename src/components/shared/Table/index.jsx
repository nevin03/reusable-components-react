import React, { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import Pagination from "@components/Pagination";
import Spinner from "@/components/Loading";

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

  const [columnSizing, setColumnSizing] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved && saved !== "undefined" ? JSON.parse(saved) : {};
    } catch (e) {
      console.error("Invalid column sizing data in localStorage:", e);
      localStorage.removeItem(LOCAL_STORAGE_KEY); // optional: clear corrupted data
      return {};
    }
  });

  const handleColumnResize = (newSizing) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newSizing));
    setColumnSizing(newSizing);
  };

  const isControlled = Boolean(controlledPagination);
  const pagination = isControlled
    ? {
        pageIndex: controlledPagination.pageIndex,
        pageSize: initialPageSize,
      }
    : internalPagination;

  const table = useReactTable({
    data,
    columns,
    state: { pagination, columnSizing },
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

  const currentRows = table.getRowModel().rows;

  return (
    <div className="overflow-x-auto border rounded-lg shadow">
      <div className="min-h-[400px]">
        <table className="min-w-full border-collapse table-fixed">
          <thead className="bg-primary-100 text-secondary-900">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    style={{ width: columnSizing[header.column.id] || "auto" }}
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
                <td colSpan={columns.length} className="p-0">
                  <div className="h-[300px] flex items-center justify-center">
                    <div className="flex items-center gap-2">
                      <Spinner size="md" color="primary" />
                      <span className="text-gray-500 text-sm">Loading...</span>
                    </div>
                  </div>
                </td>
              </tr>
            ) : currentRows.length > 0 ? (
              currentRows.map((row) => (
                <tr
                  key={row.id}
                  className="hover:bg-primary-50 transition h-[60px]"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      style={{ width: columnSizing[cell.column.id] || "auto" }}
                      className={`p-3 border-b border-secondary-100 text-secondary-800 text-${
                        cell.column.columnDef.meta?.align || "left"
                      }`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
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
      </div>

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
