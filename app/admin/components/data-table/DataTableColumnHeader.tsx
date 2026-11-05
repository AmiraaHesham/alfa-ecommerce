"use client";
import type { Column } from "@tanstack/react-table";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";
import type { ReactNode } from "react";

interface DataTableColumnHeaderProps<T> {
  column: Column<T, unknown>;
  title: ReactNode;
  className?: string;
}

export function DataTableColumnHeader<T>({
  column,
  title,
  className = "",
}: DataTableColumnHeaderProps<T>) {
  if (!column.getCanSort() || column.columnDef.meta?.sortable !== true) {
    return <span className={className}>{title}</span>;
  }

  const sorted = column.getIsSorted();

  return (
    <button
      type="button"
      onClick={column.getToggleSortingHandler()}
      className={`inline-flex items-center gap-1 font-semibold ${className}`}
      title="Shift + click to sort by multiple columns"
    >
      <span>{title}</span>
      <span className="text-[10px] text-gray-400">
        {sorted === "asc" ? (
          <FaSortUp />
        ) : sorted === "desc" ? (
          <FaSortDown />
        ) : (
          <FaSort />
        )}
      </span>
    </button>
  );
}
