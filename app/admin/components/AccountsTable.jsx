"use client";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { FaCircle, FaPlus } from "react-icons/fa";
import { FaUserLarge } from "react-icons/fa6";
import { ImBlocked } from "react-icons/im";

import { useLanguage } from "../../../context/LanguageContext.js";
import { useRefresh } from "../../../context/refreshContext.jsx";
import { useIdContext } from "../../../context/idContext.jsx";
import { postRequest } from "../../../utils/requestsUtils.js";
import { DataTable, DataTableToolbar } from "./data-table";
import { useServerDataTable } from "../hooks/useServerDataTable";
import {
  createAccountColumns,
  formatAccountDate,
} from "../config/accountsTable.config";

const PAGE_SIZE = 15;

export default function AccountsTable({ mode, setIsFormOpen }) {
  const { t } = useLanguage();
  const { refreshKey } = useRefresh();
  const router = useRouter();
  const { setSelectedAdminId, setSelectedUserId } = useIdContext();
  const setItemsRef = useRef(null);

  const openAccount = useCallback(
    (userId) => {
      if (mode === "admin") {
        setIsFormOpen?.(true);
        setSelectedAdminId(userId);
        return;
      }
      setSelectedUserId(userId);
      router.push(`/admin/UsersPage/UserInfo/${userId}`);
    },
    [mode, router, setSelectedAdminId, setSelectedUserId, setIsFormOpen],
  );

  const toggleBlocked = useCallback(
    async (userId, blocked) => {
      const res = await postRequest(
        `/api/admin/users/${userId}/${blocked ? "block" : "unblock"}`,
        "",
        t("message"),
      );
      if (res) {
        setItemsRef.current?.((prev) =>
          prev.map((user) =>
            user.userId === userId ? { ...user, blocked } : user,
          ),
        );
      }
    },
    [t],
  );

  const columns = useMemo(
    () =>
      createAccountColumns({
        mode,
        t,
        onOpen: openAccount,
        onToggleBlocked: toggleBlocked,
      }),
    [mode, t, openAccount, toggleBlocked],
  );

  const tableState = useServerDataTable({
    endpoint:
      mode === "admin"
        ? "/api/admin/admins/search"
        : "/api/admin/users/search",
    columns,
    pageSize: PAGE_SIZE,
    refreshKey: mode === "admin" ? refreshKey : undefined,
    getRowId: (user) => String(user.userId),
  });

  useEffect(() => {
    setItemsRef.current = tableState.setItems;
  }, [tableState.setItems]);

  const renderMobileCard = (user) => {
    if (mode === "admin") {
      return (
        <div
          className="mx-2 my-3 cursor-pointer rounded-xl border-b bg-white p-3 hover:bg-gray-50"
          onClick={() => openAccount(user.userId)}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h1 className="truncate text-sm font-semibold">
                {user.firstName + " " + user.lastName}
              </h1>
              <h1 className="truncate text-xs text-gray-400">{user.email}</h1>
            </div>
            <div className="flex shrink-0 items-center gap-4">
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
                  toggleBlocked(user.userId, !user.blocked);
                }}
              >
                <ImBlocked />
              </button>
            </div>
          </div>
          <div className="mt-3 truncate border-t pt-3 text-xs text-gray-500">
            {t("username")} : {user.username}
          </div>
          <div className="mt-2 text-xs text-gray-500">
            {t("last_login")} : {formatAccountDate(user.lastLoginDate)}
          </div>
        </div>
      );
    }

    return (
      <div
        className="mx-2 my-3 cursor-pointer rounded-xl border-b bg-white p-3 hover:bg-gray-50"
        onClick={() => openAccount(user.userId)}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h1 className="truncate text-sm font-semibold">
              {user.firstName + " " + user.lastName}
            </h1>
            <h1 className="truncate text-xs text-gray-400">{user.username}</h1>
          </div>
          <div className="flex shrink-0 items-center gap-4">
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
                toggleBlocked(user.userId, !user.blocked);
              }}
            >
              <ImBlocked />
            </button>
          </div>
        </div>
        <div className="mt-3 truncate border-t pt-3 text-xs text-gray-500">
          {user.email}
        </div>
        <div className="mt-3 flex items-center justify-between gap-3 border-t pt-3">
          <div className="text-xs text-gray-500">
            {t("registered-on")} : {formatAccountDate(user.registrationDate)}
          </div>
          <div className="shrink-0 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
            {user.ordersCount ?? 0} {t("orders")}
          </div>
        </div>
      </div>
    );
  };

  const toolbar = (
    <DataTableToolbar
      table={tableState.table}
      searchValue={tableState.globalFilter}
      onSearchChange={tableState.setGlobalFilter}
      className={mode === "admin" ? "!p-4" : "!p-3"}
      actions={
        mode === "admin" ? (
          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-md bg-red-500 p-2 text-center text-white xs:text-xs md:text-sm"
            onClick={() => {
              setIsFormOpen?.(true);
              setSelectedAdminId(null);
            }}
          >
            <span className="text-xs">
              <FaPlus />
            </span>
            <h1>{t("add_admin")}</h1>
          </button>
        ) : null
      }
    />
  );

  return (
    <div className={mode === "admin" ? "h-full w-full" : "w-full"}>
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
        mobileWrapperClassName={
          mode === "admin"
            ? "lg:hidden mt-3 h-[600px] w-full overflow-y-auto rounded-xl border"
            : "lg:hidden mt-3 h-[600px] w-full overflow-x-scroll overflow-y-scroll rounded-xl border"
        }
        desktopWrapperClassName={
          mode === "admin"
            ? "hidden lg:block max-h-[570px] min-w-0 mt-3 w-full overflow-x-auto overflow-y-auto"
            : "hidden lg:block h-[520px] mt-3 w-full overflow-y-scroll"
        }
        tableClassName={
          mode === "admin" ? "h-auto w-full" : "h-auto w-full border"
        }
        headerClassName="bg-[#f0eff0] text-xs text-justify sticky top-0 z-10"
        rowClassName="text-red-950 border hover:bg-gray-50 cursor-pointer"
        emptyMessage={t("no_data")}
      />
    </div>
  );
}
