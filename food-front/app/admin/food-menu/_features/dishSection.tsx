"use client";

import { useEffect, useState } from "react";
import { DishCard, FoodType } from "./dishCard";
import { AddDishCard } from "./AddDishCard";
import { CategoryType } from "./categoryFilter";
import {
  EditDishDialog,
  EditableDish,
} from "@/app/_components/EditDishDialog";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const DishSection = ({
  category,
  categories,
}: {
  category: CategoryType;
  categories: CategoryType[];
}) => {
  const [foods, setFoods] = useState<FoodType[]>([]);
  const [editing, setEditing] = useState<EditableDish | null>(null);

  const getFoods = async () => {
    try {
      const response = await fetch(`${API_URL}/category/${category._id}`);

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
          <DishCard
            key={food._id}
            food={food}
            onEdit={(item) =>
              setEditing({
                id: item._id,
                foodName: item.foodName,
                price: item.price,
                ingredients: item.ingredients,
                image: item.image,
                categoryId:
                  typeof item.category === "object"
                    ? item.category._id
                    : item.category || category._id,
              })
            }
          />
        ))}
      </div>

      {editing && (
        <EditDishDialog
          food={editing}
          categories={categories}
          onClose={() => setEditing(null)}
          onSaved={getFoods}
        />
      )}
    </div>
  );
};