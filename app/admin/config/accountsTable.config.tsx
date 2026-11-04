import type { ColumnDef } from "@tanstack/react-table";
import { FaCircle } from "react-icons/fa";
import { FaUserLarge } from "react-icons/fa6";
import { ImBlocked } from "react-icons/im";

import type { AdminUserRow } from "../types/api.types";

interface AccountColumnActions {
  mode: "admin" | "user";
  t: (key: string) => string;
  onOpen: (userId: number) => void;
  onToggleBlocked: (userId: number, blocked: boolean) => void;
}

function formatDate(value?: string | null) {
  if (!value) return "--";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "--";
  return date.toLocaleDateString("en-GB");
}

export function createAccountColumns({
  mode,
  t,
  onOpen,
  onToggleBlocked,
}: AccountColumnActions): ColumnDef<AdminUserRow, unknown>[] {
  const columns: ColumnDef<AdminUserRow, unknown>[] = [
    {
      id: "status",
      header: t("status"),
      meta: {
        backendField: "active",
        dataType: "BOOLEAN",
        filterable: true,
        headerClassName: "px-4",
        cellClassName: "",
      },
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div className="flex items-center gap-4 rounded-full px-5 py-1 font-semibold">
            <span
              className={`flex items-center justify-center text-sm ${
                user.active ? "text-green-600" : "text-gray-600"
              }`}
            >
              <FaCircle />
            </span>
            <button
              type="button"
              className={`flex items-center justify-center text-base ${
                user.blocked ? "text-red-600" : "text-gray-600"
              }`}
              onClick={(event) => {
                event.stopPropagation();
                onToggleBlocked(user.userId, !user.blocked);
              }}
            >
              <ImBlocked />
            </button>
          </div>
        );
      },
    },
    {
      id: "identity",
      accessorFn: (row) => row.firstName,
      header: mode === "admin" ? t("admin") : t("User"),
      meta: {
        backendField: "firstName",
        dataType: "STRING",
        sortable: true,
        filterable: true,
        headerClassName: "px-10",
        cellClassName: "",
      },
      cell: ({ row }) => {
        const user = row.original;
        return (
          <div
            className="flex items-center gap-3 px-10"
            onClick={() => onOpen(user.userId)}
          >
            <span className="my-2 flex h-[40px] w-[40px] items-center justify-center rounded-full border bg-gray-50 p-2 text-gray-600">
              <FaUserLarge />
            </span>
            <div>
              <h1 className="text-sm font-semibold">
                {user.firstName + " " + user.lastName}
              </h1>
              <h1 className="text-xs text-gray-400">
                {mode === "admin" ? user.email : user.username}
              </h1>
            </div>
          </div>
        );
      },
    },
  ];

  if (mode === "admin") {
    columns.push(
      {
        id: "username",
        accessorKey: "username",
        header: t("username"),
        meta: {
          backendField: "username",
          dataType: "STRING",
          sortable: true,
          filterable: true,
          headerClassName: "",
          cellClassName: "",
        },
        cell: ({ row }) => (
          <h1
            className="text-gray-500"
            onClick={() => onOpen(row.original.userId)}
          >
            {row.original.username}
          </h1>
        ),
      },
      {
        id: "lastLoginDate",
        accessorKey: "lastLoginDate",
        header: t("last_login"),
        meta: {
          backendField: "lastLoginDate",
          dataType: "DATETIME",
          sortable: true,
          filterable: true,
          headerClassName: "",
          cellClassName: "text-sm",
        },
        cell: ({ row }) => (
          <div
            className="text-sm text-gray-500"
            onClick={() => onOpen(row.original.userId)}
          >
            {formatDate(row.original.lastLoginDate)}
          </div>
        ),
      },
    );
  } else {
    columns.push(
      {
        id: "email",
        accessorKey: "email",
        header: t("email"),
        meta: {
          backendField: "email",
          dataType: "STRING",
          sortable: true,
          filterable: true,
          headerClassName: "",
          cellClassName: "",
        },
        cell: ({ row }) => (
          <h1
            className="text-gray-500"
            onClick={() => onOpen(row.original.userId)}
          >
            {row.original.email ?? "--"}
          </h1>
        ),
      },
      {
        id: "registrationDate",
        accessorKey: "registrationDate",
        header: t("registered-on"),
        meta: {
          backendField: "registrationDate",
          dataType: "DATETIME",
          sortable: true,
          filterable: true,
          headerClassName: "",
          cellClassName: "text-sm",
        },
        cell: ({ row }) => (
          <div
            className="text-sm text-gray-500"
            onClick={() => onOpen(row.original.userId)}
          >
            {formatDate(row.original.registrationDate)}
          </div>
        ),
      },
      {
        id: "ordersCount",
        header: t("orders"),
        meta: {
          headerClassName: "px-4",
          cellClassName: "",
        },
        cell: ({ row }) => (
          <div
            className="w-[80px] rounded-full bg-red-100 px-2 text-center font-semibold text-red-700"
            onClick={() => onOpen(row.original.userId)}
          >
            <h1>{row.original.ordersCount ?? 0}</h1>
            <h2 className="text-xs">{t("orders")}</h2>
          </div>
        ),
      },
    );
  }

  return columns;
}

export { formatDate as formatAccountDate };
