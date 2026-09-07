"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Loader2 } from "lucide-react";

interface OrderItem {
  _id: string;
  user?: { email?: string; name?: string } | null;
  customerName?: string;
  customerEmail?: string;
  foodOrderItems?: {
    food?: { foodName?: string; image?: string };
    quantity?: number;
  }[];
  totalPrice: number;
  status: string;
  createdAt?: string;
  address?: string;
}

const customerLabel = (order: OrderItem) =>
  order.customerName?.trim() ||
  order.user?.name?.trim() ||
  order.customerEmail?.trim() ||
  order.user?.email?.trim() ||
  "—";

type OrderStatus = "PENDING" | "DELIVERED" | "CANCELED";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const STATUS_OPTIONS: OrderStatus[] = ["PENDING", "DELIVERED", "CANCELED"];

const normalizeStatus = (status?: string): OrderStatus => {
  const s = (status || "PENDING").toUpperCase();
  if (s === "DELIVERED") return "DELIVERED";
  if (s === "CANCELED" || s === "CANCELLED") return "CANCELED";
  return "PENDING";
};

const statusLabel = (status: OrderStatus) => {
  if (status === "PENDING") return "Pending";
  if (status === "DELIVERED") return "Delivered";
  return "Canceled";
};

const statusBadgeClass = (status: OrderStatus) => {
  if (status === "PENDING") {
    return "border border-[#EF4444] text-[#EF4444] bg-white";
  }
  if (status === "DELIVERED") {
    return "border border-transparent bg-zinc-100 text-zinc-600";
  }
  return "border border-[#A1A1AA] text-[#A1A1AA] bg-white";
};

function StatusSelect({
  status,
  onChange,
  disabled,
}: {
  status: OrderStatus;
  onChange: (next: OrderStatus) => void;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div className="relative inline-flex justify-center" ref={ref}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold transition ${statusBadgeClass(
          status,
        )} ${disabled ? "opacity-60 cursor-wait" : "cursor-pointer"}`}
      >
        {statusLabel(status)}
        <ChevronDown className="w-3 h-3" />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-20 mt-1 min-w-[130px] rounded-xl border border-zinc-200 bg-white p-1 shadow-lg">
          {STATUS_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                setOpen(false);
                if (option !== status) onChange(option);
              }}
              className={`w-full rounded-lg px-3 py-2 text-left text-xs font-medium transition hover:bg-zinc-50 ${
                option === status ? "bg-zinc-50 text-zinc-900" : "text-zinc-600"
              }`}
            >
              {statusLabel(option)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

type FoodOrderItem = NonNullable<OrderItem["foodOrderItems"]>[number];

function FoodItemsPopover({ items }: { items: FoodOrderItem[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const count = items.length;

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div className="relative inline-flex" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 font-medium cursor-pointer hover:text-gray-900"
      >
        <span>{count} foods</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-gray-400 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-30 mt-1.5 min-w-[260px] rounded-xl border border-gray-200 bg-white p-3 shadow-lg">
          {count === 0 ? (
            <p className="text-[12px] text-gray-400 px-1 py-2">Хоол байхгүй</p>
          ) : (
            <ul className="flex flex-col gap-3">
              {items.map((item, idx) => {
                const name = item.food?.foodName || "Food item";
                const image = item.food?.image;
                const qty = item.quantity || 1;

                return (
                  <li
                    key={`${name}-${idx}`}
                    className="flex items-center gap-3"
                  >
                    <div className="w-8 h-8 rounded-md overflow-hidden bg-gray-100 shrink-0">
                      {image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={image}
                          alt={name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200" />
                      )}
                    </div>
                    <span className="flex-1 text-[13px] text-blue-600 underline underline-offset-2 truncate">
                      {name}
                    </span>
                    <span className="text-[13px] text-gray-500 shrink-0">
                      x {qty}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export function AdminOrders() {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/order`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setOrders(data);
      } else if (data.data && Array.isArray(data.data)) {
        setOrders(data.data);
      }
    } catch (error) {
      console.error("Orders авчрахад алдаа гарлаа:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId: string, status: OrderStatus) => {
    try {
      setUpdatingId(orderId);
      const res = await fetch(`${API_URL}/order`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: orderId, status }),
      });

      if (!res.ok) {
        throw new Error("Status update failed");
      }

      const updated = await res.json();
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId
            ? { ...order, status: updated.status || status }
            : order,
        ),
      );
    } catch (error) {
      console.error("Status солиход алдаа гарлаа:", error);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Orders</h2>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 border border-gray-200 rounded-xl text-xs font-medium text-gray-600 bg-gray-50">
            12 June 2023 - 21 July 2023
          </div>
          <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-xs font-semibold rounded-xl text-gray-700 transition">
            Change delivery state
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20 text-gray-400 gap-2">
          <Loader2 className="w-5 h-5 animate-spin text-red-500" />
          <span>Ачаалж байна...</span>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 font-medium">
                <th className="pb-4 pl-2 w-10">
                  <input type="checkbox" className="rounded" />
                </th>
                <th className="pb-4">№</th>
                <th className="pb-4">Customer</th>
                <th className="pb-4">Food</th>
                <th className="pb-4">Date</th>
                <th className="pb-4">Total</th>
                <th className="pb-4">Delivery Address</th>
                <th className="pb-4 text-center">Delivery state</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-gray-700">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-gray-400">
                    Захиалга одоогоор байхгүй байна.
                  </td>
                </tr>
              ) : (
                orders.map((order, idx) => {
                  const status = normalizeStatus(order.status);
                  return (
                    <tr
                      key={order._id || idx}
                      className="hover:bg-gray-50/50 transition"
                    >
                      <td className="py-4 pl-2">
                        <input type="checkbox" className="rounded" />
                      </td>
                      <td className="py-4 font-bold text-gray-900">{idx + 1}</td>
                      <td className="py-4 font-semibold text-gray-900">
                        {customerLabel(order)}
                      </td>
                      <td className="py-4">
                        <FoodItemsPopover items={order.foodOrderItems || []} />
                      </td>
                      <td className="py-4 text-gray-500">
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleDateString()
                          : "—"}
                      </td>
                      <td className="py-4 font-bold text-gray-900">
                        ${(order.totalPrice || 0).toFixed(2)}
                      </td>
                      <td className="py-4 text-gray-500 max-w-[200px] truncate">
                        {order.address || "—"}
                      </td>
                      <td className="py-4 text-center">
                        <StatusSelect
                          status={status}
                          disabled={updatingId === order._id}
                          onChange={(next) => updateStatus(order._id, next)}
                        />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
