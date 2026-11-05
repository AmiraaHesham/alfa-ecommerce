"use client";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { FaUserLarge } from "react-icons/fa6";

import { useLanguage } from "../../../../context/LanguageContext";
import { DataTable, DataTableToolbar } from "../../components/data-table";
import { useServerDataTable } from "../../hooks/useServerDataTable";
import {
  createReturnColumns,
  formatReturnDate,
  ReturnStateFilter,
} from "../../config/returnsTable.config";

const PAGE_SIZE = 15;

export default function ReturnTable() {
  const { t } = useLanguage();
  const router = useRouter();

  const columns = useMemo(
    () =>
      createReturnColumns({
        t,
        onOpen: (returnOrderId) =>
          router.push(`/admin/returnorderdetails/${returnOrderId}`),
      }),
    [router, t],
  );

  const tableState = useServerDataTable({
    endpoint: "/api/admin/return-orders/search",
    columns,
    pageSize: PAGE_SIZE,
    getRowId: (order) => String(order.returnOrderId),
  });

  const stateValue =
    tableState.columnFilters.find((filter) => filter.id === "state")?.value
      ?.value ?? "";

  const applyStateFilter = (value) => {
    tableState.setColumnFilters((prev) => {
      const others = prev.filter((filter) => filter.id !== "state");
      return value
        ? [...others, { id: "state", value: { operator: "EQUALS", value } }]
        : others;
    });
  };

  const renderMobileCard = (order) => {
    const dateOnly = formatReturnDate(order.createdDate);
    return (
      <div
        key={order.returnOrderId}
        className="mb-3 cursor-pointer rounded-xl border bg-white p-3 hover:bg-gray-50"
        onClick={() =>
          router.push(`/admin/returnorderdetails/${order.returnOrderId}`)
        }
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <span className="text-sm font-bold text-red-600">{order.code}</span>
            <div className="mt-1 text-xs text-gray-500">{dateOnly}</div>
          </div>
          <span
            className={`shrink-0 text-xs font-semibold ${
              order.state === "PROCESSING"
                ? "text-blue-500"
                : order.state === "SHIPPED"
                  ? "text-yellow-500"
                  : order.state === "PENDING"
                    ? "text-orange-700"
                    : order.state === "CANCELLED" || order.state === "REJECTED"
                      ? "text-red-500"
                      : "text-green-500"
            }`}
          >
            {t(order.state)}
          </span>
        </div>
        <div className="mt-3 flex items-center gap-3 border-t pt-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border bg-gray-50 p-2 text-gray-600">
            <FaUserLarge />
          </span>
          <div className="min-w-0">
            <h1 className="truncate text-sm font-semibold">
              {(order.user?.firstName ?? "") +
                " " +
                (order.user?.lastName ?? "")}
            </h1>
            <h1 className="truncate text-xs text-gray-500">
              {order.user?.email}
            </h1>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between gap-3 border-t pt-3">
          <span className="break-words text-base font-bold">
            {Number(order.unitPrice ?? 0).toLocaleString("en-US")}{" "}
            {t("currency")}
          </span>
          <span className="text-right text-xs font-semibold text-gray-600">
            {t(order.reason).length <= 30
              ? t(order.reason)
              : `${t(order.reason).slice(0, 30)} ...`}
          </span>
        </div>
      </div>
    );
  };

  const toolbar = (
    <DataTableToolbar
      table={tableState.table}
      searchValue={tableState.globalFilter}
      onSearchChange={tableState.setGlobalFilter}
      className="!p-4"
      leading={
        <ReturnStateFilter
          value={stateValue}
          onChange={applyStateFilter}
          t={t}
        />
      }
    />
  );

  return (
    <DataTable
      table={tableState.table}
      loading={tableState.loading}
      loadingMore={tableState.loadingMore}
      hasMore={tableState.hasMore}
      error={tableState.error}
      sentinelRef={tableState.sentinelRef}
      onRetry={tableState.reload}
      toolbar={toolbar}
      mobileCard={renderMobileCard}
      mobileWrapperClassName="lg:hidden mt-5"
      desktopWrapperClassName="hidden lg:block max-h-[520px] border-t mt-3 w-full min-w-0 overflow-x-auto overflow-y-auto"
      tableClassName="w-full h-auto min-w-[800px]"
      headerClassName="bg-[#f0eff0] text-xs text-justify sticky top-0 z-10"
      rowClassName="w-full transition-colors hover:bg-gray-50 cursor-pointer"
      emptyMessage={t("no_data")}
    />
  );
}
