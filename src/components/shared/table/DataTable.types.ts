import type { ReactNode } from "react";

export interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T, index: number) => ReactNode);
  className?: string;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  emptyMessage: string;
  onEdit?: (index: number) => void;
  onDelete?: (index: number) => void;
  showActions?: boolean;
}

