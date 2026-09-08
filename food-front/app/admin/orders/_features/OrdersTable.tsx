"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Loader2 } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { OrderFoodsPopover } from "@/app/_components/OrderFoodsPopover";

type Status = "Pending" | "Delivered" | "Canceled";
type OrderStatus = "PENDING" | "DELIVERED" | "CANCELED";

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

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const STATUS_OPTIONS: OrderStatus[] = ["PENDING", "DELIVERED", "CANCELED"];

const normalizeStatus = (status?: string): OrderStatus => {
  const s = (status || "PENDING").toUpperCase();
  if (s === "DELIVERED") return "DELIVERED";
  if (s === "CANCELED" || s === "CANCELLED") return "CANCELED";
  return "PENDING";
};

const toBadgeStatus = (status: OrderStatus): Status => {
  if (status === "DELIVERED") return "Delivered";
  if (status === "CANCELED") return "Canceled";
  return "Pending";
};

const statusLabel = (status: OrderStatus) => {
  if (status === "PENDING") return "Pending";
  if (status === "DELIVERED") return "Delivered";
  return "Canceled";
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
    <div className="relative inline-flex" ref={ref}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((v) => !v)}
        className={disabled ? "opacity-60 cursor-wait" : "cursor-pointer"}
      >
        <StatusBadge status={toBadgeStatus(status)} />
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

export const OrdersTable = ({
  onCountChange,
}: {
  onCountChange?: (count: number) => void;
}) => {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/order`);
      const data = await res.json();
      const list = Array.isArray(data)
        ? data
        : data.data && Array.isArray(data.data)
          ? data.data
          : [];
      setOrders(list);
      onCountChange?.(list.length);
    } catch (error) {
      console.error("Orders авчрахад алдаа гарлаа:", error);
      setOrders([]);
      onCountChange?.(0);
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

      if (!res.ok) throw new Error("Status update failed");

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status } : order,
        ),
      );
    } catch (error) {
      console.error("Status солиход алдаа гарлаа:", error);
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-[#E4E4E7] flex justify-center items-center py-20 text-[#71717A] gap-2">
        <Loader2 className="w-5 h-5 animate-spin text-[#EF4444]" />
        <span>Ачаалж байна...</span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-[#E4E4E7] overflow-hidden">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-[#E4E4E7] text-[12px] text-[#71717A]">
            <th className="px-4 py-3 w-10">
              <input type="checkbox" />
            </th>
            <th className="px-2 py-3">№</th>
            <th className="px-2 py-3">Customer</th>
            <th className="px-2 py-3">
              <div className="flex items-center gap-1">
                Food <ChevronDown className="w-3 h-3" />
              </div>
            </th>
            <th className="px-2 py-3">
              <div className="flex items-center gap-1">
                Date <ChevronDown className="w-3 h-3" />
              </div>
            </th>
            <th className="px-2 py-3">Total</th>
            <th className="px-2 py-3">Delivery Address</th>
            <th className="px-2 py-3">
              <div className="flex items-center gap-1">
                Delivery state <ChevronDown className="w-3 h-3" />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td
                colSpan={8}
                className="px-4 py-12 text-center text-[13px] text-[#A1A1AA]"
              >
                Захиалга одоогоор байхгүй байна.
              </td>
            </tr>
          ) : (
            orders.map((order, i) => {
              const status = normalizeStatus(order.status);
              return (
                <tr
                  key={order._id || i}
                  className="border-b border-[#F4F4F5] text-[13px] text-black last:border-0"
                >
                  <td className="px-4 py-3">
                    <input type="checkbox" />
                  </td>
                  <td className="px-2 py-3">{i + 1}</td>
                  <td className="px-2 py-3 text-[#71717A]">
                    {customerLabel(order)}
                  </td>
                  <td className="px-2 py-3">
                    <OrderFoodsPopover items={order.foodOrderItems} />
                  </td>
                  <td className="px-2 py-3 text-[#71717A]">
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString()
                      : "—"}
                  </td>
                  <td className="px-2 py-3">
                    ${(order.totalPrice || 0).toFixed(2)}
                  </td>
                  <td className="px-2 py-3 text-[#71717A] max-w-[220px] truncate">
                    {order.address || "—"}
                  </td>
                  <td className="px-2 py-3">
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
  );
};
