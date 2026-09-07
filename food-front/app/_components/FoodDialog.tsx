"use client";

import { useState } from "react";
import { X, Plus, Minus } from "lucide-react";
import { useCart } from "./context/CartContext"; // Замаа зөв заагаарай

interface Food {
  _id?: string;
  id?: string;
  foodName?: string;
  name?: string;
  description?: string;
  ingredients?: string;
  price: number;
  image?: string;
}

interface FoodDialogProps {
  food: Food | null;
  isOpen: boolean;
  onClose: () => void;
}

export const FoodDialog = ({ food, isOpen, onClose }: FoodDialogProps) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  if (!isOpen || !food) return null;

  const foodName = food.foodName || food.name || "Sunshine Stackers";
  const foodDesc =
    food.description ||
    food.ingredients ||
    "Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.";
  const foodImage =
    food.image ||
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"; // Fallback image

  const handleAddToCart = () => {
    addToCart(food, quantity);
    onClose();
    setQuantity(1); // Төлөвийг буцааж 1 болгоно
  };

  const handleDecrease = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  return (
    <>
      {/* 1. Backdrop (Арын харанхуй хэсэг) */}
      <div
        className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* 2. Dialog Container */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-[32px] max-w-[720px] w-full p-6 shadow-2xl relative flex gap-6 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Хаах товч (X) */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-500 hover:bg-zinc-100 transition-colors z-10"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Зүүн тал: Хоолны зураг */}
          <div className="w-[320px] h-[300px] flex-shrink-0 rounded-2xl overflow-hidden bg-zinc-100">
            <img
              src={foodImage}
              alt={foodName}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Баруун тал: Хоолны мэдээлэл болон удирдлага */}
          <div className="flex-1 flex flex-col justify-between py-2 pr-6">
            <div>
              <h2 className="text-2xl font-bold text-[#EF4444] mb-3">
                {foodName}
              </h2>
              <p className="text-sm text-zinc-500 leading-relaxed">
                {foodDesc}
              </p>
            </div>

            <div className="space-y-4">
              {/* Тоо ширхэг болон Нийт үнэ */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-zinc-400 block mb-0.5">
                    Total price
                  </span>
                  <span className="text-xl font-bold text-zinc-900">
                    ${(food.price * quantity).toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center gap-3 bg-zinc-100 p-1.5 rounded-full">
                  <button
                    onClick={handleDecrease}
                    className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-zinc-700 shadow-sm hover:bg-zinc-50 transition-colors disabled:opacity-50"
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>

                  <span className="text-sm font-semibold w-4 text-center">
                    {quantity}
                  </span>

                  <button
                    onClick={handleIncrease}
                    className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-zinc-700 shadow-sm hover:bg-zinc-50 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Add to Cart товч */}
              <button
                onClick={handleAddToCart}
                className="w-full py-3.5 bg-[#18181B] hover:bg-zinc-800 text-white font-medium rounded-full text-sm transition-colors shadow-sm"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};