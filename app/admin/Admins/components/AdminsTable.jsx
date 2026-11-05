"use client";
import AccountsTable from "../../components/AccountsTable";

export default function AdminsTable({ setIsFormOpen }) {
  return <AccountsTable mode="admin" setIsFormOpen={setIsFormOpen} />;
}
