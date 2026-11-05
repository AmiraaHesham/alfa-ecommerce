import type { ColumnDef } from "@tanstack/react-table";
import Select from "react-select";
import { FaUserLarge } from "react-icons/fa6";

import type { OrderRow } from "../types/api.types";

interface OrderColumnActions {
  mode: "admin" | "user";
  t: (key: string) => string;
  onOpen: (orderId: number) => void;
  onUpdateState: (orderId: number, state: string) => void;
  onCancel: (orderId: number) => void;
}

const NEXT_STATES: Record<string, string[]> = {
  PENDING: ["PROCESSING"],
  PROCESSING: ["SHIPPED"],
  SHIPPED: ["DELIVERED"],
  DELIVERED: [],
  CANCELLED: [],
};

const STATE_COLORS: Record<string, string> = {
  PROCESSING: "#3b82f6",
  SHIPPED: "#eab308",
  PENDING: "#c2410c",
  CANCELLED: "#f21818",
  DELIVERED: "#22c55e",
};

export function formatOrderDate(value?: string | null) {
  if (!value) return "--";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "--";
  return date.toLocaleDateString("en-GB");
}

export function OrderStateFilter({
  value,
  onChange,
  t,
}: {
  value: string;
  onChange: (value: string) => void;
  t: (key: string) => string;
}) {
  const options = [
    { value: "", label: t("all_statuses") },
    { value: "PENDING", label: t("PENDING") },
    { value: "PROCESSING", label: t("PROCESSING") },
    { value: "SHIPPED", label: t("SHIPPED") },
    { value: "DELIVERED", label: t("DELIVERED") },
    { value: "CANCELLED", label: t("CANCELLED") },
  ];
  return (
    <div className="flex h-9 items-center justify-center rounded-md border bg-gray-100 px-3">
      <Select
        value={value ? { value, label: t(value) } : null}
        onChange={(option) => onChange(option?.value ?? "")}
        options={options}
        placeholder={t("all_statuses")}
        isClearable
        isSearchable={false}
        className="w-[200px] text-sm font-semibold"
        styles={{
          control: (base) => ({
            ...base,
            backgroundColor: "#f3f4f6",
            border: "none",
            borderRadius: "0.375rem",
            minHeight: "36px",
            cursor: "pointer",
            boxShadow: "none",
          }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected
              ? "#dc2626"
              : state.isFocused
                ? "#fee2e2"
                : "#ffffff",
            color: state.isSelected ? "#ffffff" : "#374151",
            cursor: "pointer",
            fontSize: "14px",
          }),
          menu: (base) => ({
            ...base,
            backgroundColor: "#ffffff",
            borderRadius: "0.375rem",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
            zIndex: 9999,
          }),
          placeholder: (base) => ({
            ...base,
            color: "#374151",
            fontSize: "14px",
            fontWeight: "600",
          }),
          singleValue: (base) => ({
            ...base,
            color: "#374151",
            fontSize: "14px",
            fontWeight: "600",
          }),
          input: (base) => ({ ...base, color: "#374151" }),
        }}
      />
    </div>
  );
}

function statusSelect(
  order: OrderRow,
  t: (key: string) => string,
  onChange: (state: string) => void,
  className = "w-[200px] text-sm font-semibold",
) {
  return (
    <Select
      value={{ value: order.state, label: t(order.state) }}
      onChange={(option) => {
        if (option?.value) onChange(option.value);
      }}
      options={(NEXT_STATES[order.state] ?? []).map((state) => ({
        value: state,
        label: t(state),
      }))}
      isSearchable={false}
      className={className}
      styles={{
        control: (base) => ({
          ...base,
          backgroundColor: "#f3f4f6",
          border: "none",
          borderRadius: "0.375rem",
          minHeight: "36px",
          cursor: "pointer",
          boxShadow: "none",
          "&:hover": { borderColor: "#dc2626" },
          "&:focus": {
            borderColor: "#b91c1c",
            boxShadow: "0 0 0 3px rgba(185, 28, 28, 0.2)",
          },
        }),
        option: (base, state) => ({
          ...base,
          backgroundColor: state.isSelected
            ? "#dc2626"
            : state.isFocused
              ? "#fee2e2"
              : "#ffffff",
          color: state.isSelected ? "#ffffff" : "#374151",
          cursor: "pointer",
          fontSize: "14px",
        }),
        menu: (base) => ({
          ...base,
          backgroundColor: "#ffffff",
          borderRadius: "0.375rem",
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
          zIndex: 9999,
        }),
        placeholder: (base) => ({
          ...base,
          color: "#374151",
          fontSize: "14px",
          fontWeight: "600",
        }),
        singleValue: (base) => ({
          ...base,
          color: STATE_COLORS[order.state] ?? "#22c55e",
          fontSize: "14px",
          fontWeight: "600",
        }),
        input: (base) => ({ ...base, color: "#374151" }),
      }}
    />
  );
}

export function OrderStatusSelect({
  order,
  t,
  onChange,
  className,
}: {
  order: OrderRow;
  t: (key: string) => string;
  onChange: (state: string) => void;
  className?: string;
}) {
  return statusSelect(order, t, onChange, className);
}

export function createOrderColumns({
  mode,
  t,
  onOpen,
  onUpdateState,
  onCancel,
}: OrderColumnActions): ColumnDef<OrderRow, unknown>[] {
  const columns: ColumnDef<OrderRow, unknown>[] = [
    {
      id: "code",
      accessorKey: "code",
      header: t("order_id"),
      meta: {
        backendField: "code",
        dataType: "STRING",
        searchable: true,
        sortable: true,
        filterable: true,
        headerClassName: "px-5",
        cellClassName: "font-semibold text-red-500",
      },
      cell: ({ row }) => (
        <span onClick={() => onOpen(row.original.orderId)}>
          {row.original.code}
        </span>
      ),
    },
    {
      id: "createdDate",
      accessorKey: "createdDate",
      header: t("date"),
      meta: {
        backendField: "createdDate",
        dataType: "DATETIME",
        sortable: true,
        filterable: true,
        headerClassName: "",
        cellClassName: "text-sm",
      },
      cell: ({ row }) => formatOrderDate(row.original.createdDate),
    },
    {
      id: "user",
      accessorFn: (row) => row.user?.firstName,
      header: t("user"),
      meta: {
        backendField: "user.firstName",
        dataType: "STRING",
        sortable: true,
        filterable: true,
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
            <span className="my-2 flex h-[40px] w-[40px] items-center justify-center rounded-full border bg-gray-50 p-2 text-gray-600">
              <FaUserLarge />
            </span>
            <div>
              <h1 className="text-sm font-semibold">
                {(order.user?.firstName ?? "") +
                  " " +
                  (order.user?.lastName ?? "")}
              </h1>
              <h1 className="text-xs text-gray-500">{order.user?.email}</h1>
            </div>
          </div>
        );
      },
    },
    {
      id: "items",
      header: t("items"),
      meta: {
        headerClassName: "",
        cellClassName: "text-sm",
      },
      cell: ({ row }) => (
        <span
          className="cursor-pointer rounded-full bg-red-100 px-5 py-2 font-semibold text-red-600"
          onClick={() => onOpen(row.original.orderId)}
        >
          {row.original.orderItemLines?.length ?? 0}
        </span>
      ),
    },
    {
      id: "total",
      accessorFn: (row) => (mode === "admin" ? row.netTotal : row.total),
      header: t("total"),
      meta: {
        backendField: mode === "admin" ? "netTotal" : "total",
        dataType: "NUMBER",
        sortable: true,
        filterable: true,
        headerClassName: "",
        cellClassName: "text-sm font-bold",
      },
      cell: ({ row }) => {
        const value =
          mode === "admin" ? row.original.netTotal : row.original.total;
        return `${Number(value ?? 0).toLocaleString("en-US")} ${t("currency")}`;
      },
    },
    {
      id: "state",
      accessorKey: "state",
      header: t("state_order"),
      meta: {
        backendField: "state",
        dataType: "ENUM",
        sortable: true,
        filterable: true,
        filterOptions: [
          "PENDING",
          "PROCESSING",
          "SHIPPED",
          "DELIVERED",
          "CANCELLED",
        ].map((state) => ({ value: state, label: t(state) })),
        headerClassName: "",
        cellClassName: "",
      },
      cell: ({ row }) => {
        const order = row.original;
        if (mode === "user") {
          return (
            <span
              className={`text-xs font-semibold ${
                order.state === "PROCESSING"
                  ? "text-blue-500"
                  : order.state === "SHIPPED"
                    ? "text-yellow-500"
                    : order.state === "PENDING"
                      ? "text-orange-500"
                      : order.state === "DELIVERED"
                        ? "text-green-500"
                        : "text-red-500"
              }`}
            >
              {t(order.state)}
            </span>
          );
        }
        return statusSelect(order, t, (state) =>
          onUpdateState(order.orderId, state),
        );
      },
    },
  ];

  if (mode === "admin") {
    columns.push({
      id: "actions",
      header: t("order_cancel"),
      meta: {
        headerClassName: "",
        cellClassName: "",
      },
      cell: ({ row }) => {
        const order = row.original;
        if (order.state === "CANCELLED" || order.state === "DELIVERED") {
          return null;
        }
        return (
          <button
            type="button"
            className="flex items-center justify-center rounded-3xl border border-red-700 bg-red-100 px-4 py-1 text-center font-semibold text-red-700 hover:bg-red-200 xs:text-xs md:text-sm"
            onClick={() => onCancel(order.orderId)}
          >
            {t("order_cancel")}
          </button>
        );
      },
    });
  }

  return columns;
}
