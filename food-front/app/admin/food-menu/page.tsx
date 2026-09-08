"use client";

import { useEffect, useState } from "react";
import { Sidebar } from "../_features/Sidebar";
import {
  CategoryFilter,
  CategoryType,
} from "./_features/categoryFilter";
import { DishSection } from "./_features/dishSection";

export default function FoodMenuPage() {
  const [categories, setCategories] = useState<CategoryType[]>([]);

  const getCategories = async () => {
    try {
      const response = await fetch("http://localhost:8000/category");

      if (!response.ok) {
        throw new Error("Category татахад алдаа гарлаа");
      }

      const data = await response.json();
      setCategories(data.categories ?? []);
    } catch (error) {
      console.error(error);
      setCategories([]);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="flex h-screen bg-[#FAFAFA]">
      <Sidebar />

      <main className="flex-1 p-8 overflow-auto flex flex-col gap-6">
        <CategoryFilter />

        {categories.map((category) => (
          <DishSection
            key={category._id}
            category={category}
          />
        ))}
      </main>
    </div>
  );
}