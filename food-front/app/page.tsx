"use client";

import { Header } from "./_components/header";
import { MenuContainer } from "./_components/menuContainer";
import { Footer } from "./_components/footer";
import { useEffect, useState } from "react";

export type CardItem = {
  _id?: string;
  foodName?: string;
  name?: string;
  price: number;
  ingredients?: string;
  description?: string;
  image?: string;
  category?: any;
};

type CategoryItem = {
  _id: string;
  categoryName: string;
};

export default function Home() {
  const [foods, setFoods] = useState<CardItem[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      // 1. Категори татах
      const catRes = await fetch("http://localhost:8000/category");
      const catData = await catRes.json();
      const loadedCategories = Array.isArray(catData) ? catData : catData.categories || [];
      
      
      console.log("--- 1. CATEGORIES DATA ---", loadedCategories);
      setCategories(loadedCategories);

    
      const foodRes = await fetch("http://localhost:8000/food");
      const foodData = await foodRes.json();
      const loadedFoods = Array.isArray(foodData) ? foodData : foodData.foods || [];

  
      console.log("--- 2. FOODS DATA ---", loadedFoods);
      setFoods(loadedFoods);

    } catch (error) {
      console.error("Дата татахад алдаа гарлаа:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filterByCategory = (cat: CategoryItem) => {
    return foods.filter((item) => {
      if (!item.category) return false;

      // Хэрэв category нь объект байвал (Populated)
      if (typeof item.category === "object") {
        return (
          item.category._id === cat._id ||
          item.category.categoryName === cat.categoryName
        );
      }

      // Хэрэв category нь зөвхөн ID (String) байвал
      if (typeof item.category === "string") {
        return item.category === cat._id || item.category === cat.categoryName;
      }

      return false;
    });
  };

  return (
    <main className="w-full h-full mx-auto flex justify-center flex-col bg-[#404040]">
      <Header />
      <section className="w-full mx-auto">
        <img
          src="/image/BG.svg"
          alt="heroImg"
          className="w-full h-auto max-h-142.5 object-cover"
        />

        <div className="p-22">
          {loading ? (
            <p className="text-white text-center py-10">Уншиж байна...</p>
          ) : categories.length === 0 ? (
            <p className="text-white text-center py-10">
              Категори олдсонгүй. Консол цонхоо шалгана уу.
            </p>
          ) : (
            categories.map((cat) => (
              <MenuContainer
                key={cat._id}
                category={cat.categoryName}
                items={filterByCategory(cat)}
              />
            ))
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}