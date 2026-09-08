"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDown } from "lucide-react";

export type OrderFoodLine = {
  food?:
    | {
        foodName?: string;
        image?: string;
        name?: string;
      }
    | string
    | null;
  foodName?: string;
  name?: string;
  image?: string;
  quantity?: number;
};

const lineName = (line: OrderFoodLine) => {
  if (line.food && typeof line.food === "object") {
    return line.food.foodName || line.food.name || "Unknown dish";
  }
  return line.foodName || line.name || "Unknown dish";
};

const lineImage = (line: OrderFoodLine) => {
  if (line.food && typeof line.food === "object") {
    return line.food.image;
  }
  return line.image;
};

export const OrderFoodsPopover = ({
  items,
}: {
  items?: OrderFoodLine[] | null;
}) => {
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const lines = items ?? [];
  const count = lines.length;

  const updatePosition = () => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;
    setCoords({ top: rect.bottom + 6, left: rect.left });
  };

  useEffect(() => {
    if (!open) return;
    updatePosition();
    const onClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        buttonRef.current?.contains(target) ||
        panelRef.current?.contains(target)
      ) {
        return;
      }
      setOpen(false);
    };
    window.addEventListener("mousedown", onClickOutside);
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("mousedown", onClickOutside);
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [open]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 text-[#71717A] hover:text-black transition"
      >
        {count} foods
        <ChevronDown
          className={`w-3.5 h-3.5 transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open &&
        createPortal(
          <div
            ref={panelRef}
            style={{ top: coords.top, left: coords.left }}
            className="fixed z-[80] min-w-[240px] rounded-xl border border-zinc-200 bg-white p-2 shadow-lg"
          >
            {count === 0 ? (
              <p className="px-2 py-3 text-xs text-zinc-400">Хоол байхгүй</p>
            ) : (
              <ul className="flex max-h-64 flex-col gap-1 overflow-auto">
                {lines.map((line, index) => {
                  const name = lineName(line);
                  const image = lineImage(line);
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
          </div>,
          document.body,
        )}
    </>
  );
};
