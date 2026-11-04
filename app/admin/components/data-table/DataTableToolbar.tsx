"use client";
import type { ReactNode } from "react";
import type { Table } from "@tanstack/react-table";
import { IoMdSearch } from "react-icons/io";

import { useLanguage } from "../../../../context/LanguageContext.js";
import { DataTableFilters } from "./DataTableFilters";

interface DataTableToolbarProps<T> {
  table: Table<T>;
  searchValue: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  leading?: ReactNode;
  actions?: ReactNode;
  className?: string;
}

export function DataTableToolbar<T>({
  table,
  searchValue,
  onSearchChange,
  searchPlaceholder,
  leading,
  actions,
  className = "",
}: DataTableToolbarProps<T>) {
  const { t } = useLanguage();

  return (
    <div
      className={`w-full rounded-lg border bg-white p-4 ${className}`}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center justify-between rounded-md border bg-gray-100 px-1">
            <input
              type="text"
              value={searchValue}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder={searchPlaceholder ?? t("search")}
              className="h-8 rounded-lg bg-gray-100 p-2 text-sm outline-none placeholder:text-xs"
            />
            <span className="rounded-md bg-red-300 p-1 text-lg text-white">
              <IoMdSearch />
            </span>
          </div>
          {leading}
          <DataTableFilters table={table} />
        </div>
        {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
      </div>
    </div>
  );
}
