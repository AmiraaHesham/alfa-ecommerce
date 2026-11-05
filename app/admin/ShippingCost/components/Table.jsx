"use client";
import { useMemo } from "react";
import { BiEdit } from "react-icons/bi";

import { useLanguage } from "../../../../context/LanguageContext";
import { useRefresh } from "../../../../context/refreshContext";
import { DataTable, DataTableToolbar } from "../../components/data-table";
import { useServerDataTable } from "../../hooks/useServerDataTable";
import { createShippingColumns } from "../../config/shippingTable.config";

const PAGE_SIZE = 15;

export default function Table({
  setGovernorate,
  setGovernorateId,
  setGovernoratePrice,
  setShowForm,
}) {
  const { t, locale } = useLanguage();
  const { refreshKey } = useRefresh();

  const editRate = (rate) => {
    setGovernorate(
      locale === "ar" ? rate.governorate?.nameAr : rate.governorate?.nameEn,
    );
    setGovernorateId(rate.shippingRateId);
    setGovernoratePrice(rate.shippingCost);
    setShowForm(true);
  };

  const columns = useMemo(
    () => createShippingColumns({ t, locale, onEdit: editRate }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t, locale],
  );

  const tableState = useServerDataTable({
    endpoint: "/api/admin/shipping-rates/search",
    columns,
    pageSize: PAGE_SIZE,
    refreshKey,
    getRowId: (rate) => String(rate.shippingRateId),
  });

  const renderMobileCard = (rate) => (
    <div
      key={rate.shippingRateId}
      className="mb-3 rounded-xl border bg-white p-3 hover:bg-gray-50"
    >
      <div className="flex items-start justify-between gap-3">
        <h1 className="min-w-0 break-words text-sm font-semibold">
          {locale === "ar"
            ? rate.governorate?.nameAr
            : rate.governorate?.nameEn}
        </h1>
        <button
          type="button"
          className="shrink-0 rounded-full p-2 text-red-600 hover:bg-red-200"
          onClick={() => editRate(rate)}
        >
          <BiEdit />
        </button>
      </div>
      <div className="mt-3 flex items-center justify-between border-t pt-3">
        <span className="text-base font-bold">
          {t("shippingCost")} : {rate.shippingCost}
        </span>
      </div>
    </div>
  );

  const toolbar = (
    <DataTableToolbar
      table={tableState.table}
      searchValue={tableState.globalFilter}
      onSearchChange={tableState.setGlobalFilter}
      className="!p-3"
    />
  );

  return (
    <div className="h-full w-full px-0 pt-3 xs:px-0 md:px-16">
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
        mobileWrapperClassName="lg:hidden p-3"
        desktopWrapperClassName="hidden lg:block max-h-[570px] min-w-0 mt-3 w-full overflow-x-auto overflow-y-auto"
        tableClassName="w-full min-w-[560px] border"
        headerClassName="bg-[#f0eff0] text-xs text-justify sticky top-0 z-10"
        rowClassName="border w-full h-14 hover:bg-gray-50"
        emptyMessage={t("no_data")}
      />
    </div>
  );
}
