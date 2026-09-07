"use client";

import { useState } from "react";
import { CardItem } from "./menuContainer";

type ModalProps = {
  item: CardItem;
  onClose: () => void;
};

export const FoodModal = ({ item, onClose }: ModalProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const totalPrice = (item.price * quantity).toFixed(2);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-[650px] bg-white rounded-3xl p-6 shadow-2xl flex flex-col sm:flex-row gap-6 animate-in fade-in zoom-in-95 duration-200">

        {/* Хаах (X) товч */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-100 text-sm font-semibold transition z-10"
        >
          ✕
        </button>

        {/* Зүүн хэсэг: Зураг */}
        <div className="w-full sm:w-1/2 h-[240px] sm:h-auto">
          <img
            src={item.image || "/image/Product Image.svg"}
            alt={item.name}
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>

        {/* Баруун хэсэг: Мэдээлэл болон Тохиргоо */}
        <div className="w-full sm:w-1/2 flex flex-col justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-[#EF4444]">{item.name}</h2>
            <p className="text-gray-500 text-sm mt-2">{item.description}</p>
          </div>

          <div className="flex flex-col gap-4">
            {/* Үнэ ба Тоо ширхэг сонгогч */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400 font-medium">Total price</p>
                <p className="text-2xl font-bold text-black">${totalPrice}</p>
              </div>

              {/* + - Товчлуурууд */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleDecrease}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-lg font-medium hover:bg-gray-100 transition"
                >
                  -
                </button>
                <span className="font-semibold text-lg">{quantity}</span>
                <button
                  onClick={handleIncrease}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-lg font-medium hover:bg-gray-100 transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* Сагсанд хийх товч */}
            <button
              onClick={() => {
                // Ирээдүйд cart API руу дата илгээх хэсэг
                alert(`${item.name} (${quantity}ш) сагсанд нэмэгдлээ!`);
                onClose();
              }}
              className="w-full py-3.5 bg-black text-white font-medium rounded-2xl hover:bg-gray-800 transition shadow-lg active:scale-[0.98]"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};