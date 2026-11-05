"use client";
import OrdersTable from "../../orders/components/Orders_Table";

export default function UserOrders({ userId }) {
  return <OrdersTable mode="user" userId={userId} />;
}
