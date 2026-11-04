import type { ColumnDef } from "@tanstack/react-table";
import Select from "react-select";
import { FaUserLarge } from "react-icons/fa6";

import type { ReturnOrderRow } from "../types/api.types";

interface ReturnColumnActions {
  t: (key: string) => string;
  onOpen: (returnOrderId: number) => void;
}

const RETURN_STATES = [
  "PENDING",
  "APPROVED",
  "REJECTED",
  "REFUNDED",
  "CANCELLED",
];

const RETURN_REASONS = [
  "DAMAGED",
  "DEFECTIVE",
  "WRONG_ITEM",
  "MISSING_ACCESSORIES",
  "NOT_AS_DESCRIBED",
  "PERFORMANCE_ISSUES",
  "CONNECTIVITY_ISSUES",
  "COMPATIBILITY_ISSUES",
  "SOFTWARE_ISSUES",
  "CHANGED_MIND",
  "FOUND_BETTER_PRICE",
  "ORDERED_BY_MISTAKE",
  "ARRIVED_LATE",
  "WARRANTY_CLAIM",
  "OTHER",
];

export function formatReturnDate(value?: string | null) {
  if (!value) return "--";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "--";
  return date.toLocaleDateString("en-GB");
}

export function ReturnStateFilter({
  value,
  onChange,
  t,
}: {
  value: string;
  onChange: (value: string) => void;
  t: (key: string) => string;
}) {
  return (
    <div className="flex h-9 items-center justify-center rounded-md border bg-gray-100 px-3">
      <Select
        value={value ? { value, label: t(value) } : null}
        onChange={(option) => onChange(option?.value ?? "")}
        options={[
          { value: "", label: t("all_statuses") },
          ...RETURN_STATES.map((state) => ({
            value: state,
            label: t(state),
          })),
        ]}
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

export function createReturnColumns({
  t,
  onOpen,
}: ReturnColumnActions): ColumnDef<ReturnOrderRow, unknown>[] {
  return [
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
        <span onClick={() => onOpen(row.original.returnOrderId)}>
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
      cell: ({ row }) => formatReturnDate(row.original.createdDate),
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
            onClick={() => onOpen(order.returnOrderId)}
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
      id: "unitPrice",
      accessorKey: "unitPrice",
      header: t("price"),
      meta: {
        backendField: "unitPrice",
        dataType: "NUMBER",
        sortable: true,
        filterable: true,
        headerClassName: "",
        cellClassName: "text-sm",
      },
      cell: ({ row }) =>
        `${Number(row.original.unitPrice ?? 0).toLocaleString("en-US")} ${t(
          "currency",
        )}`,
    },
    {
      id: "reason",
      accessorKey: "reason",
      header: t("Reason_for_return"),
      meta: {
        backendField: "reason",
        dataType: "ENUM",
        sortable: true,
        filterable: true,
        filterOptions: RETURN_REASONS.map((reason) => ({
          value: reason,
          label: t(reason),
        })),
        headerClassName: "px-5",
        cellClassName: "text-xs font-semibold",
      },
      cell: ({ row }) => {
        const reason = t(row.original.reason);
        return reason.length <= 30 ? reason : `${reason.slice(0, 30)} ...`;
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
        filterOptions: RETURN_STATES.map((state) => ({
          value: state,
          label: t(state),
        })),
        headerClassName: "",
        cellClassName: "text-xs font-semibold",
      },
      cell: ({ row }) => {
        const state = row.original.state;
        return (
          <span
            className={
              state === "PROCESSING"
                ? "text-blue-500"
                : state === "SHIPPED"
                  ? "text-yellow-500"
                  : state === "PENDING"
                    ? "text-orange-700"
                    : state === "CANCELLED" || state === "REJECTED"
                      ? "text-red-500"
                      : "text-green-500"
            }
          >
            {t(state)}
          </span>
        );
      },
    },
  ];
}
