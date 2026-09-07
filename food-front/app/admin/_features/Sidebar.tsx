"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutGrid, Truck } from "lucide-react";
import Image from "next/image";

const navItems = [
  { name: "Food menu", href: "/admin/food-menu", icon: LayoutGrid },
  { name: "Orders", href: "/admin/orders", icon: Truck },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-[220px] h-screen bg-white border-r border-[#E4E4E7] flex flex-col px-4 py-6">
      <Link href={"/"}>
        <div className="flex items-center gap-2 mb-8 px-2">
          <div className="w-8 h-8 flex items-center justify-center">
            <Image
              src="/icons/BrandLogo.svg"
              alt="Logo"
              width={32}
              height={32}
              className="w-8 h-8"
            />
          </div>
          <div>
            <p className="font-semibold text-[14px] text-black leading-tight">
              NomNom
            </p>
            <p className="text-[11px] text-[#8E8E8E]">Swift delivery</p>
          </div>
        </div>
      </Link>

      <nav className="flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-[14px] transition-colors ${
                isActive
                  ? "bg-[#121316] text-white"
                  : "text-[#71717A] hover:bg-[#F4F4F5]"
              }`}
            >
              <Icon className="w-4 h-4" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};
