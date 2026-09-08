"use client";

import { useState, useEffect } from "react";
import { X, Plus, Minus, Edit2, Check } from "lucide-react";
import { useCart } from "./context/CartContext";

interface OrderItem {
  _id?: string;
  orderId?: string;
  foodOrderItems?: any[];
  items?: any[];
  totalPrice?: number;
  status?: string;
  address?: string;
}

const API_BASE_URL = "http://localhost:8000/order";

export const OrderDetailSheet = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [activeTab, setActiveTab] = useState<"cart" | "order">("cart");
  const { cartItems, updateQuantity, removeItem, clearCart } = useCart();
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Success Modal-ийн state
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const [address, setAddress] = useState(
    "Sukhbaatar District, Gurvan gol office, 4th floor, Pinecone academy",
  );
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const shipping = subtotal > 0 ? 0.99 : 0;
  const total = subtotal + shipping;

  const fetchOrders = async () => {
    try {
      const res = await fetch(API_BASE_URL);
      const result = await res.json();

      if (Array.isArray(result)) {
        setOrders(result);
      } else if (result.data && Array.isArray(result.data)) {
        setOrders(result.data);
      }
    } catch (error) {
      console.error("Orders авчрахад алдаа гарлаа:", error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchOrders();
    }
  }, [isOpen]);

  const handleCheckout = async () => {
    if (cartItems.length === 0 || !address.trim()) return;

    setIsLoading(true);

    const payload = {
      user: null,
      totalPrice: total,
      foodOrderItems: cartItems.map((item: any) => ({
        food: item.id || item._id,
        quantity: item.quantity,
      })),
      status: "PENDING",
    };

    try {
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const resData = await response.json();

      if (response.ok) {
        clearCart();
        await fetchOrders();
        setIsSuccessModalOpen(true);
      } else {
        console.error("Backend error:", resData);
        alert(resData?.message || "Захиалга үүсгэхэд алдаа гарлаа.");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("Сервертэй холбогдож чадсангүй.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />

      <div className="fixed right-0 top-0 h-full w-[420px] bg-[#27272A] z-50 p-6 text-zinc-900 shadow-2xl flex flex-col justify-between overflow-y-auto">
        <div>
          <div className="flex bg-white/10 p-1 rounded-full mb-6 border border-white/10">
            <button
              onClick={() => setActiveTab("cart")}
              className={`flex-1 py-2 text-xs font-semibold rounded-full transition-all ${
                activeTab === "cart"
                  ? "bg-[#EF4444] text-white shadow-md"
                  : "text-zinc-300 hover:text-white"
              }`}
            >
              Cart ({cartItems.length})
            </button>
            <button
              onClick={() => setActiveTab("order")}
              className={`flex-1 py-2 text-xs font-semibold rounded-full transition-all ${
                activeTab === "order"
                  ? "bg-[#EF4444] text-white shadow-md"
                  : "text-zinc-300 hover:text-white"
              }`}
            >
              Order ({orders.length})
            </button>
          </div>

          {activeTab === "cart" ? (
            <div className="space-y-4">
              <div className="bg-white rounded-[24px] p-5 space-y-4 shadow-sm">
                <h3 className="text-sm font-bold text-zinc-900">My cart</h3>

                {cartItems.length === 0 ? (
                  <div className="text-center py-6 text-zinc-400 text-xs">
                    Your cart is empty
                  </div>
                ) : (
                  cartItems.map((item, index) => (
                    <div key={item.id || index}>
                      <div className="flex gap-3 relative">
                        <img
                          src={
                            item.image ||
                            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
                          }
                          alt={item.name}
                          className="w-16 h-16 rounded-xl object-cover"
                        />
                        <div className="flex-1 min-w-0 pr-6">
                          <h4 className="text-xs font-bold text-[#EF4444] truncate">
                            {item.name}
                          </h4>
                          <p className="text-[10px] text-zinc-400 line-clamp-2 mt-0.5 leading-tight">
                            {item.description || "Fresh food item"}
                          </p>

                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-2 bg-zinc-100 px-2 py-0.5 rounded-full">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="text-zinc-600 hover:text-zinc-900"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-xs font-bold text-zinc-800">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="text-zinc-600 hover:text-zinc-900"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <span className="text-xs font-bold text-zinc-900">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="absolute top-0 right-0 w-5 h-5 rounded-full border border-red-200 flex items-center justify-center text-red-400 hover:bg-red-50 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>

                      {index !== cartItems.length - 1 && (
                        <hr className="border-dashed border-zinc-200 my-4" />
                      )}
                    </div>
                  ))
                )}
              </div>

              <div className="bg-white rounded-[24px] p-5 space-y-2 shadow-sm">
                <div className="flex justify-between items-center">
                  <h3 className="text-xs font-bold text-zinc-500">
                    Delivery location
                  </h3>
                  <button
                    onClick={() => setIsEditingAddress(!isEditingAddress)}
                    className="text-xs text-[#EF4444] hover:underline font-semibold flex items-center gap-1"
                  >
                    {isEditingAddress ? (
                      <>
                        <Check className="w-3 h-3" /> Save
                      </>
                    ) : (
                      <>
                        <Edit2 className="w-3 h-3" /> Change
                      </>
                    )}
                  </button>
                </div>

                {isEditingAddress ? (
                  <textarea
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    rows={2}
                    className="w-full text-xs font-medium text-zinc-800 p-2 border border-zinc-200 rounded-lg focus:outline-none focus:border-[#EF4444] resize-none"
                    placeholder="Enter delivery address..."
                  />
                ) : (
                  <p className="text-xs font-medium text-zinc-800 leading-relaxed">
                    {address || "Please enter your address"}
                  </p>
                )}
              </div>

              <div className="bg-white rounded-[24px] p-5 space-y-3 shadow-sm">
                <h3 className="text-sm font-bold text-zinc-900">
                  Payment info
                </h3>

                <div className="flex justify-between text-xs text-zinc-500">
                  <span>Items</span>
                  <span className="font-semibold text-zinc-900">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-xs text-zinc-500">
                  <span>Shipping</span>
                  <span className="font-semibold text-zinc-900">
                    ${shipping.toFixed(2)}
                  </span>
                </div>

                <hr className="border-dashed border-zinc-200 my-2" />

                <div className="flex justify-between text-sm font-bold text-zinc-900">
                  <span>Total</span>
                  <span className="text-zinc-900">${total.toFixed(2)}</span>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={
                    cartItems.length === 0 || !address.trim() || isLoading
                  }
                  className={`w-full py-3 mt-2 rounded-full text-xs font-semibold transition-colors ${
                    cartItems.length > 0 && address.trim() && !isLoading
                      ? "bg-[#EF4444] text-white hover:bg-red-600 shadow-md"
                      : "bg-red-300 text-white cursor-not-allowed"
                  }`}
                >
                  {isLoading ? "Processing..." : "Checkout"}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-white mb-2">
                Active Orders
              </h3>
              {orders.length === 0 ? (
                <div className="bg-white rounded-[24px] p-8 text-center text-xs text-zinc-500">
                  No active orders yet.
                </div>
              ) : (
                orders.map((order, index) => (
                  <div
                    key={order._id || index}
                    className="bg-white p-5 rounded-[24px] shadow-sm space-y-3"
                  >
                    <div className="flex justify-between items-center border-b pb-2">
                      <span className="text-xs font-bold text-zinc-900">
                        {order._id
                          ? `#${order._id.slice(-6)}`
                          : `Order #${index + 1}`}
                      </span>
                      <span className="text-[10px] bg-amber-100 text-amber-700 px-2.5 py-0.5 rounded-full font-bold">
                        {order.status || "PENDING"}
                      </span>
                    </div>

                    <div className="flex justify-between border-t pt-2 text-xs font-bold text-zinc-900">
                      <span>Total Paid:</span>
                      <span className="text-[#EF4444]">
                        ${(order.totalPrice || 0).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* SUCCESS POPUP MODAL */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[24px] p-8 max-w-sm w-full text-center shadow-2xl flex flex-col items-center animate-in fade-in zoom-in duration-200">
            <h3 className="text-[#18181B] font-bold text-base mb-6">
              Your order has been successfully placed !
            </h3>

            <div className="my-2 relative w-564 h-43 flex items-center justify-center">
              <img
                src="/icons/huuhed.png"
                alt="Order Successful"
                className="w-full h-full object-contain"
              />
            </div>

            <button
              onClick={handleCloseSuccessModal}
              className="mt-8 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-medium px-6 py-2.5 rounded-full transition-colors"
            >
              Back to home
            </button>
          </div>
        </div>
      )}
    </>
  );
};
