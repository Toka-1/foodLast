"use client";

import React, { createContext, useContext, useState } from "react";

export type CartItem = {
  id: string;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  image?: string;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (food: any, quantity: number) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // 📌 "Add to cart" дарахад ажиллах функц
  const addToCart = (food: any, quantity: number) => {
    if (!food) return;

    setCartItems((prevItems) => {
      const foodId = food._id || food.id;
      const existingItem = prevItems.find((item) => item.id === foodId);

      if (existingItem) {
        // Хэрэв сагсанд байгаа хоол байвал тоо хэмжээг нэмнэ
        return prevItems.map((item) =>
          item.id === foodId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Шинээр сагсанд нэмнэ
        return [
          ...prevItems,
          {
            id: foodId,
            name: food.foodName || food.name || "",
            description: food.ingredients || food.description || "",
            price: food.price,
            quantity: quantity,
            image: food.image,
          },
        ];
      }
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, updateQuantity, removeItem, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};