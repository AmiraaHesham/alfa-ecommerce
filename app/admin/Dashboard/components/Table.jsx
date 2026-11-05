"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { FaUserLarge } from "react-icons/fa6";

import { useLanguage } from "../../../../context/LanguageContext.js";
import { useNamePageInAdminContext } from "../../../../context/namePageInAdmin.jsx";
import { getRequest } from "../../../../utils/requestsUtils.js";
import { DataTable } from "../../components/data-table";
import { createDashboardColumns } from "../../config/dashboardTable.config";

export default function RecentOrders_table() {
  const { t } = useLanguage();
  const { setSelectedNamePage } = useNamePageInAdminContext();
  const [pendingOrders, setPendingOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        setLoading(true);
        const response = await getRequest("/api/admin/dashboard");
        if (alive) {
          setPendingOrders(response.data?.pendingOrders ?? []);
          setError(null);
        }
      } catch (requestError) {
        if (alive) setError(requestError);
      } finally {
        if (alive) setLoading(false);
      }
    };
    load();
    return () => {
      alive = false;
    };
  }, []);

  const goToOrder = (orderId) => {
    router.push(`/admin/orders/OrdersDetails/${orderId}`);
    setSelectedNamePage("Orders Management");
  };

  const columns = useMemo(
    () => createDashboardColumns({ t, onOpen: goToOrder }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t],
  );

  const table = useReactTable({
    data: pendingOrders,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (order) => String(order.orderId),
  });

  const renderMobileCard = (order) => {
    const date = new Date(order.createdDate);
    const dateOnly = Number.isNaN(date.getTime())
      ? "--"
      : date.toLocaleDateString("en-GB");
    return (
      <div
        key={order.orderId}
        className="mb-3 cursor-pointer rounded-xl border bg-white p-3 hover:bg-gray-50"
        onClick={() => goToOrder(order.orderId)}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <span className="text-sm font-bold text-red-600">
              {order.orderCode}
            </span>
            <div className="mt-1 text-xs text-gray-500">{dateOnly}</div>
          </div>
          <span className="text-xs font-semibold text-red-500">
            {t(order.state)}
          </span>
        </div>
        <div className="mt-3 flex items-center gap-3 border-t pt-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border bg-gray-50 p-2 text-gray-600">
            <FaUserLarge />
          </span>
          <div className="min-w-0">
            <h1 className="truncate text-sm font-semibold">{order.userName}</h1>
            <h1 className="truncate text-xs text-gray-500">
              {order.userEmail}
            </h1>
          </div>
        </div>
        <div className="mt-3 border-t pt-3">
          <span className="text-base font-bold">
            {Number(order.orderTotal ?? 0).toLocaleString("en-US")}{" "}
            {t("currency")}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="mt-5 w-full">
      <div className="flex min-h-16 h-auto items-center justify-between rounded-t-md border-s border-t bg-white px-5">
        <h1 className="font-semibold xs:text-sm lg:text-lg">
          {t("recent_orders")}
        </h1>
      </div>
      <DataTable
        table={table}
        loading={loading}
        error={error}
        mobileCard={renderMobileCard}
        mobileWrapperClassName="sm:hidden max-h-[370px] h-auto overflow-y-auto rounded-b-xl border bg-white p-3"
        desktopWrapperClassName="hidden sm:block max-h-[540px] min-w-0 overflow-x-auto overflow-y-auto"
        tableClassName="table-auto bg-white rounded-b-xl w-full min-w-[640px] border"
        headerClassName="bg-[#f0eff0] text-xs w-full text-justify sticky top-0 z-10"
        rowClassName="text-red-950 border-t w-full hover:bg-gray-50 cursor-pointer"
        emptyMessage={t("no_data")}
      />
    </div>
  );
}
