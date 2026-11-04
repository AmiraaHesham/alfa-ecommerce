import type { ColumnDef } from "@tanstack/react-table";
import { FaUserLarge } from "react-icons/fa6";

import type { PendingOrderRow } from "../types/api.types";

interface DashboardColumnActions {
  t: (key: string) => string;
  onOpen: (orderId: number) => void;
}

function formatDate(value?: string | null) {
  if (!value) return "--";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "--";
  return date.toLocaleDateString("en-GB");
}

export function createDashboardColumns({
  t,
  onOpen,
}: DashboardColumnActions): ColumnDef<PendingOrderRow, unknown>[] {
  return [
    {
      id: "orderCode",
      accessorKey: "orderCode",
      header: t("order_id"),
      meta: {
        headerClassName: "px-5",
        cellClassName: "font-semibold text-red-500",
      },
      cell: ({ row }) => (
        <span onClick={() => onOpen(row.original.orderId)}>
          {row.original.orderCode}
        </span>
      ),
    },
    {
      id: "createdDate",
      accessorKey: "createdDate",
      header: t("date"),
      meta: {
        headerClassName: "",
        cellClassName: "text-sm",
      },
      cell: ({ row }) => formatDate(row.original.createdDate),
    },
    {
      id: "user",
      header: t("user"),
      meta: {
        headerClassName: "",
        cellClassName: "",
      },
      cell: ({ row }) => {
        const order = row.original;
        return (
          <div
            className="flex items-center gap-3"
            onClick={() => onOpen(order.orderId)}
          >
            <div>
              <span className="my-2 flex h-[40px] w-[40px] items-center justify-center rounded-full border bg-gray-50 p-2 text-gray-600">
                <FaUserLarge />
              </span>
            </div>
            <div>
              <h1 className="text-sm font-semibold">{order.userName}</h1>
              <h1 className="text-xs text-gray-500">{order.userEmail}</h1>
            </div>
          </div>
        );
      },
    },
    {
      id: "orderTotal",
      accessorKey: "orderTotal",
      header: t("total"),
      meta: {
        headerClassName: "",
        cellClassName: "text-sm font-semibold",
      },
      cell: ({ row }) =>
        `${Number(row.original.orderTotal ?? 0).toLocaleString("en-US")} ${t(
          "currency",
        )}`,
    },
    {
      id: "state",
      accessorKey: "state",
      header: t("state_order"),
      meta: {
        headerClassName: "",
        cellClassName: "text-sm font-semibold text-red-500",
      },
      cell: ({ row }) => t(row.original.state),
    },
  ];
}
