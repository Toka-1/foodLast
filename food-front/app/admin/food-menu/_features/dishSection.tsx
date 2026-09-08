"use client";

import { useEffect, useState } from "react";
import { DishCard, FoodType } from "./dishCard";
import { AddDishCard } from "./AddDishCard";
import { CategoryType } from "./categoryFilter";

export const DishSection = ({
  category,
}: {
  category: CategoryType;
}) => {
  const [foods, setFoods] = useState<FoodType[]>([]);

  const getFoods = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/category/${category._id}`,
      );

      if (!response.ok) {
        throw new Error("Food татахад алдаа гарлаа");
      }

      const data = await response.json();
      setFoods(data.foods ?? []);
    } catch (error) {
      console.error(error);
      setFoods([]);
    }
  };

  useEffect(() => {
    if (category._id) {
      getFoods();
    }
  }, [category._id]);

  return (
    <div className="bg-white rounded-2xl p-5">
      <h2 className="text-[15px] font-semibold text-black mb-4">
        {category.categoryName} ({foods.length})
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <AddDishCard categoryName={category.categoryName} />

        {foods.map((food) => (
          <DishCard key={food._id} food={food} />
        ))}
      </div>
    </div>
  );
};