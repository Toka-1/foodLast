"use client";

import { useEffect, useState } from "react";
import { Sidebar } from "../_features/Sidebar";
import { OrdersTable } from "./_features/OrdersTable";
import { Pagination } from "./_features/Pagination";
import { Calendar } from "lucide-react";

export default function OrdersPage() {
  const [userInitial, setUserInitial] = useState("A");
  const [orderCount, setOrderCount] = useState(0);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("user");
      if (raw) {
        const user = JSON.parse(raw) as { name?: string; email?: string };
        const source = user.name?.trim() || user.email?.trim() || "A";
        setUserInitial(source.charAt(0).toUpperCase());
      }
    } catch {
      setUserInitial("A");
    }
  }, []);

  return (
    <div className="flex h-screen bg-[#FAFAFA]">
      <Sidebar />

      <main className="flex-1 p-8 overflow-auto relative">
        <div className="absolute top-6 right-8">
          <div className="w-10 h-10 rounded-full bg-[#EF4444] text-white text-sm font-bold flex items-center justify-center shadow-sm">
            {userInitial}
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-[20px] font-semibold text-black">Orders</h1>
            <p className="text-[13px] text-[#71717A]">{orderCount} items</p>
          </div>

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 border border-[#E4E4E7] rounded-lg text-[13px] text-black">
              <Calendar className="w-4 h-4" />
              13 June 2023 - 14 July 2023
            </button>
            <button
              className="px-4 py-2 rounded-lg text-[13px] bg-[#E4E4E7] text-[#A1A1AA]"
              disabled
            >
              Change delivery state
            </button>
          </div>
        </div>

        <OrdersTable onCountChange={setOrderCount} />
        <Pagination />
      </main>
    </div>
  );
}
