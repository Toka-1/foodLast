"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

export type OrderFoodLine = {
  food?: { foodName?: string; image?: string; name?: string } | null;
  quantity?: number;
};

export const OrderFoodsPopover = ({
  items,
}: {
  items?: OrderFoodLine[] | null;
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const lines = items ?? [];
  const count = lines.length;

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
        className="flex items-center gap-1 text-[#71717A] hover:text-black transition"
      >
        {count} foods
        <ChevronDown
          className={`w-3.5 h-3.5 transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-30 mt-1 min-w-[220px] rounded-xl border border-zinc-200 bg-white p-2 shadow-lg">
          {count === 0 ? (
            <p className="px-2 py-3 text-xs text-zinc-400">Хоол байхгүй</p>
          ) : (
            <ul className="flex flex-col gap-1">
              {lines.map((line, index) => {
                const name =
                  line.food?.foodName || line.food?.name || "Unknown dish";
                const image = line.food?.image;
                return (
                  <li
                    key={`${name}-${index}`}
                    className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-zinc-50"
                  >
                    <div className="h-8 w-8 shrink-0 overflow-hidden rounded-md bg-zinc-100">
                      {image ? (
                        <img
                          src={image}
                          alt={name}
                          className="h-full w-full object-cover"
                        />
                      ) : null}
                    </div>
                    <span className="flex-1 truncate text-xs font-medium text-zinc-800">
                      {name}
                    </span>
                    <span className="text-xs text-zinc-500">
                      x {line.quantity ?? 1}
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
};
