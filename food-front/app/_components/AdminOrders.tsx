"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Loader2 } from "lucide-react";

interface OrderItem {
  _id: string;
  user?: { email?: string } | null;
  foodOrderItems?: {
    food?: { foodName?: string; image?: string };
    quantity?: number;
  }[];
  totalPrice: number;
  status: string;
  createdAt?: string;
  address?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export function AdminOrders() {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);

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

  const getStatusBadge = (status: string) => {
    const s = status?.toLowerCase() || "pending";
    if (s === "delivered") {
      return (
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-600 border border-green-200">
          Delivered
        </span>
      );
    }
    if (s === "canceled" || s === "cancelled") {
      return (
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-500 border border-gray-200">
          Canceled
        </span>
      );
    }
    return (
      <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-500 border border-red-200">
        Pending
      </span>
    );
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
                orders.map((order, idx) => (
                  <tr
                    key={order._id || idx}
                    className="hover:bg-gray-50/50 transition"
                  >
                    <td className="py-4 pl-2">
                      <input type="checkbox" className="rounded" />
                    </td>
                    <td className="py-4 font-bold text-gray-900">{idx + 1}</td>
                    <td className="py-4 font-semibold text-gray-900">
                      {order.user?.email || "Test@gmail.com"}
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-1.5 font-medium">
                        <span>{order.foodOrderItems?.length || 2} foods</span>
                        <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                      </div>
                    </td>
                    <td className="py-4 text-gray-500">
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString()
                        : "2024/12/20"}
                    </td>
                    <td className="py-4 font-bold text-gray-900">
                      ${(order.totalPrice || 0).toFixed(2)}
                    </td>
                    <td className="py-4 text-gray-500 max-w-[200px] truncate">
                      {order.address ||
                        "Sukhbaatar District, Gurvan gol office, 4th floor"}
                    </td>
                    <td className="py-4 text-center">
                      {getStatusBadge(order.status)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
