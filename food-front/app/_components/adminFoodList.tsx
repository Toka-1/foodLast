"use client";

import { useEffect, useState, useCallback } from "react";
import { ProductCard } from "./ProductCard";
import { AddDishCard } from "./AddDishCard";

interface CategoryType {
  _id: string;
  categoryName: string;
  foodCount?: number;
}

interface FoodType {
  _id: string;
  foodName: string;
  price: number;
  ingredients: string;
  image: string;
  category?: string | { _id: string };
}

export type EditableFood = {
  id: string;
  foodName: string;
  price: number;
  ingredients: string;
  image: string;
  categoryId?: string;
};

interface AdminFoodListProps {
  category: CategoryType;
  refreshKey: number;
  onOpenAddFoodModal: (catId: string) => void;
  onOpenEditFoodModal: (food: EditableFood) => void;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const AdminFoodList = ({
  category,
  refreshKey,
  onOpenAddFoodModal,
  onOpenEditFoodModal,
}: AdminFoodListProps) => {
  const [foods, setFoods] = useState<FoodType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getFoods = useCallback(async () => {
    if (!category?._id) return;
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/food?categoryId=${category._id}`, {
        cache: "no-store",
      });
      const data = await res.json();

      let fetchedFoods: FoodType[] = [];

      if (Array.isArray(data)) {
        fetchedFoods = data;
      } else if (data.foods && Array.isArray(data.foods)) {
        fetchedFoods = data.foods;
      } else if (data.data && Array.isArray(data.data)) {
        fetchedFoods = data.data;
      }

      const filtered = fetchedFoods.filter((item) => {
        const foodCatId =
          typeof item.category === "object" ? item.category?._id : item.category;
        return foodCatId === category._id;
      });

      setFoods(filtered);
    } catch (error) {
      console.error("Get foods error:", error);
      setFoods([]);
    } finally {
      setLoading(false);
    }
  }, [category._id]);

  useEffect(() => {
    getFoods();
  }, [getFoods, refreshKey]);

  return (
    <div className="flex flex-col gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mb-6">
      <h2 className="text-base font-bold text-gray-900">
        {category.categoryName} ({foods.length})
      </h2>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-5 w-full items-stretch">
        <AddDishCard
          categoryName={category.categoryName}
          onClick={() => onOpenAddFoodModal(category._id)}
        />

        {loading ? (
          <p className="text-sm text-gray-400 col-span-2">Уншиж байна...</p>
        ) : foods.length > 0 ? (
          foods.map((food) => {
            const foodCatId =
              typeof food.category === "object"
                ? food.category?._id
                : food.category;

            return (
              <ProductCard
                key={food._id}
                id={food._id}
                foodName={food.foodName}
                price={food.price}
                ingredients={food.ingredients}
                image={food.image}
                categoryId={foodCatId || category._id}
                onEdit={onOpenEditFoodModal}
              />
            );
          })
        ) : null}
      </div>
    </div>
  );
};
