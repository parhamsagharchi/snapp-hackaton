import { Edit2, Trash2 } from "lucide-react";
import clsx from "clsx";
import type { DataTableProps, Column } from "./DataTable.types";

/**
 * Reusable data table component following Single Responsibility and Open-Closed Principles
 * Open for extension (custom columns), closed for modification
 */
export function DataTable<T = Record<string, unknown>>({
  data,
  columns,
  emptyMessage,
  onEdit,
  onDelete,
  showActions = true,
}: DataTableProps<T>) {
  const renderCell = (column: Column<T>, row: T, index: number) => {
    if (typeof column.accessor === "function") {
      return column.accessor(row, index);
    }
    const value = row[column.accessor];
    return value !== null && value !== undefined ? String(value) : "-";
  };

  return (
    <div className="rounded-lg border border-slate-700/50 bg-slate-800/50 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-700/50">
            <tr>
              {columns.map((column, idx) => (
                <th
                  key={idx}
                  className={clsx(
                    "px-3 py-2 text-right text-xs font-medium text-slate-300",
                    column.className
                  )}
                >
                  {column.header}
                </th>
              ))}
              {showActions && (onEdit || onDelete) && (
                <th className="px-3 py-2 text-right text-xs font-medium text-slate-300">
                  عملیات
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-3 py-6 text-center text-xs text-slate-400"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="transition hover:bg-slate-700/30"
                >
                  {columns.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      className={clsx(
                        "px-3 py-2 text-xs text-slate-300",
                        column.className
                      )}
                    >
                      {renderCell(column, row, rowIndex)}
                    </td>
                  ))}
                  {showActions && (onEdit || onDelete) && (
                    <td className="px-3 py-2">
                      <div className="flex items-center gap-1.5">
                        {onEdit && (
                          <button
                            onClick={() => onEdit(rowIndex)}
                            className="rounded p-0.5 text-blue-400 transition hover:bg-blue-400/20"
                            aria-label="ویرایش"
                          >
                            <Edit2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                        {onDelete && (
                          <button
                            onClick={() => onDelete(rowIndex)}
                            className="rounded p-0.5 text-red-400 transition hover:bg-red-400/20"
                            aria-label="حذف"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

