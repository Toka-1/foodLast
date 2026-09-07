"use client";

import { useState } from "react";
import { FoodDialog } from "./FoodDialog";
import { MenuContainerCard } from "./menuContainerCard";

export type CardItem = {
  _id?: string;
  foodName?: string;
  name?: string;
  price: number;
  image?: string;
  ingredients?: string;
  description?: string;
  category?: any;
};

type Props = {
  category: string;
  items: CardItem[];
};

export const MenuContainer = ({ category, items }: Props) => {
  const [selectedFood, setSelectedFood] = useState<CardItem | null>(null);

  // Хэрэв тухайн категорид хоол байхгүй бол категорийг нууна
  if (!items || items.length === 0) return null;

  return (
    <section className="w-full mx-auto flex flex-col justify-center">
      <h2 className="text-2xl font-bold text-white pt-13.5">{category}</h2>

      <div className="flex flex-wrap gap-4 mt-4">
        {items.map((item, index) => (
          <MenuContainerCard
            key={item._id || index}
            // MongoDB-ээс foodName эсвэл name ирснийг ашиглана
            name={item.foodName || item.name || ""}
            price={item.price}
            // MongoDB-ээс ingredients эсвэл description ирснийг ашиглана
            description={item.ingredients || item.description || ""}
            image={item.image}
            onClick={() => setSelectedFood(item)}
          />
        ))}
      </div>

    <FoodDialog
  food={selectedFood}
  isOpen={!!selectedFood} 
  onClose={() => setSelectedFood(null)}
/>
    </section>
  );
};