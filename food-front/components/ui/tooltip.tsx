"use client"

import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip"

import { cn } from "@/lib/utils"

function TooltipProvider({
  delay = 0,
  ...props
}: TooltipPrimitive.Provider.Props) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delay={delay}
      {...props}
    />
  )
}

function Tooltip({ ...props }: TooltipPrimitive.Root.Props) {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />
}

function TooltipTrigger({ ...props }: TooltipPrimitive.Trigger.Props) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />
}

function TooltipContent({
  className,
  side = "top",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  children,
  ...props
}: TooltipPrimitive.Popup.Props &
  Pick<
    TooltipPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className="isolate z-50"
      >
        <TooltipPrimitive.Popup
          data-slot="tooltip-content"
          className={cn(
            "z-50 inline-flex w-fit max-w-xs origin-(--transform-origin) items-center gap-1.5 rounded-md bg-foreground px-3 py-1.5 text-xs text-background has-data-[slot=kbd]:pr-1.5 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 **:data-[slot=kbd]:relative **:data-[slot=kbd]:isolate **:data-[slot=kbd]:z-50 **:data-[slot=kbd]:rounded-sm data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            className
          )}
          {...props}
        >
          {children}
          <TooltipPrimitive.Arrow className="z-50 size-2.5 translate-y-[calc(-50%-2px)] rotate-45 rounded-[2px] bg-foreground fill-foreground data-[side=bottom]:top-1 data-[side=inline-end]:top-1/2! data-[side=inline-end]:-left-1 data-[side=inline-end]:-translate-y-1/2 data-[side=inline-start]:top-1/2! data-[side=inline-start]:-right-1 data-[side=inline-start]:-translate-y-1/2 data-[side=left]:top-1/2! data-[side=left]:-right-1 data-[side=left]:-translate-y-1/2 data-[side=right]:top-1/2! data-[side=right]:-left-1 data-[side=right]:-translate-y-1/2 data-[side=top]:-bottom-2.5" />
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  )
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
"use client";

import { useState } from "react";
import { ShoppingCart, X } from "lucide-react";

interface OrderDetailSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrderDetailSheet = ({
  isOpen,
  onClose,
}: OrderDetailSheetProps) => {
  const [activeTab, setActiveTab] = useState<"cart" | "order">("cart");

  if (!isOpen) return null;

  return (
    <>
      {/* Background overlay */}
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

      {/* Sheet / Drawer Container */}
      <div className="fixed right-0 top-0 h-full w-[400px] bg-[#27272A] text-white z-50 p-6 shadow-2xl flex flex-col justify-between transition-transform duration-300">
        <div>
          {/* Sheet Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-white" />
              <h2 className="text-lg font-semibold text-white">Order detail</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-zinc-700 text-gray-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex bg-white p-1 rounded-full mb-6">
            <button
              onClick={() => setActiveTab("cart")}
              className={`flex-1 py-1.5 text-sm font-medium rounded-full transition-all cursor-pointer ${
                activeTab === "cart"
                  ? "bg-[#EF4444] text-white"
                  : "text-gray-700 hover:text-black"
              }`}
            >
              Cart
            </button>
            <button
              onClick={() => setActiveTab("order")}
              className={`flex-1 py-1.5 text-sm font-medium rounded-full transition-all cursor-pointer ${
                activeTab === "order"
                  ? "bg-[#EF4444] text-white"
                  : "text-gray-700 hover:text-black"
              }`}
            >
              Order
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "cart" ? (
            <div className="bg-[#F4F4F5] rounded-2xl p-8 text-center my-4 flex flex-col items-center justify-center min-h-[240px]">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-3 shadow-sm">
                <ShoppingCart className="w-6 h-6 text-[#EF4444]" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">
                Your cart is empty
              </h3>
              <p className="text-xs text-gray-500">
                Hungry? Pick something tasty.
              </p>
            </div>
          ) : (
            <div className="bg-[#F4F4F5] rounded-2xl p-8 text-center my-4 text-gray-500 text-sm">
              No active orders yet.
            </div>
          )}
        </div>

        {/* Payment info & Footer */}
        <div className="bg-white text-zinc-900 rounded-2xl p-5 space-y-3">
          <h4 className="font-semibold text-base text-zinc-900">
            Payment info
          </h4>
          <div className="flex justify-between text-sm text-zinc-500">
            <span>Items</span>
            <span className="font-medium text-zinc-900">$0.00</span>
          </div>
          <div className="flex justify-between text-sm text-zinc-500">
            <span>Shipping</span>
            <span>-</span>
          </div>
          <div className="flex justify-between font-semibold text-base text-zinc-900 pt-2 border-t border-dashed border-zinc-200">
            <span>Total</span>
            <span>-</span>
          </div>
          <button
            disabled
            className="w-full bg-[#EF4444]/40 text-white cursor-not-allowed font-medium py-3 rounded-full mt-2 text-sm transition-colors"
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
};

