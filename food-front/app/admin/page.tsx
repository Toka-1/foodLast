"use client";

import { useState, useEffect } from "react";
import {
  Utensils,
  ShoppingBag,
  Plus,
  X,
  Trash2,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";
import { AdminFoodList } from "../_components/adminFoodList";
import { AdminOrders } from "../_components/AdminOrders";

export type CategoryType = {
  _id: string;
  categoryName: string;
  foodCount?: number;
};

const UPLOAD_PRESET =
  process.env.NEXT_PUBLIC_API_CLOUDINARY_UPLOAD_PRESET || "fooood";
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "avugyogo";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"menu" | "orders">("menu");

  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [allFoodCount, setAllFoodCount] = useState<number>(0);

  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [categoryNameInput, setCategoryNameInput] = useState("");

  const [isFoodDialogOpen, setIsFoodDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(
    null,
  );
  const [foodName, setFoodName] = useState("");
  const [foodPrice, setFoodPrice] = useState("");
  const [foodIngredients, setFoodIngredients] = useState("");
  const [foodImage, setFoodImage] = useState("");
  const [uploading, setUploading] = useState(false);

  const [loading, setLoading] = useState(false);

  const resetFoodForm = () => {
    setFoodName("");
    setFoodPrice("");
    setFoodIngredients("");
    setFoodImage("");
    setIsFoodDialogOpen(false);
  };

  const getCategory = async () => {
    try {
      const res = await fetch(`${API_URL}/category`);
      if (!res.ok) throw new Error("Fetch failed");

      const data = await res.json();
      setCategories(data.categories || []);
      setAllFoodCount(data.allFoodcount || 0);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const deleteCategory = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();

    try {
      const res = await fetch(`${API_URL}/category`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        getCategory();
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const createCategory = async () => {
    if (!categoryNameInput.trim()) return;

    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/category`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categoryName: categoryNameInput }),
      });

      if (res.ok) {
        setCategoryNameInput("");
        setIsCategoryDialogOpen(false);
        getCategory();
      }
    } catch (error) {
      console.error("Create category error:", error);
    } finally {
      setLoading(false);
    }
  };

  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("Cloudinary error response:", data);
        alert(
          `Зураг хуулахад алдаа гарлаа: ${data.error?.message || "Алдаа гарлаа"}`,
        );
        return null;
      }

      return data.secure_url;
    } catch (error) {
      console.error("Cloudinary upload failed:", error);
      alert("Сүлжээний алдаа гарлаа. Cloudinary руу холбогдож чадсангүй.");
      return null;
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      if (url) {
        setFoodImage(url);
      }
    } catch (error) {
      console.error("Image upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  const createFood = async () => {
    if (!foodName || !foodPrice || !selectedCategory || !foodImage) {
      alert("Шаардлагатай мэдээллийг бүрэн бөглөнө үү!");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/food`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          foodName,
          price: Number(foodPrice),
          ingredients: foodIngredients,
          image: foodImage,
          category: selectedCategory._id,
        }),
      });

      if (res.ok) {
        resetFoodForm();
        getCategory();
      }
    } catch (error) {
      console.error("Create food error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div className="flex min-h-screen w-full bg-[#F4F4F5] font-sans text-gray-900">
      {/* Sidebar */}
      <aside className="w-72 bg-white p-7 flex flex-col justify-between border-r border-gray-200 shrink-0">
        <div>
          <div className="flex items-center gap-3 mb-10 cursor-pointer">
            <div className="w-9 h-9 bg-red-500 rounded-full flex items-center justify-center text-white font-extrabold text-base">
              N
            </div>
            <div>
              <h1 className="font-extrabold text-lg leading-none">NomNom</h1>
              <span className="text-xs text-gray-400 font-medium">
                Swift delivery
              </span>
            </div>
          </div>

          <nav className="flex flex-col gap-2.5">
            <button
              onClick={() => setActiveTab("menu")}
              className={`flex items-center gap-3.5 px-6 py-3.5 rounded-full text-base font-semibold transition ${
                activeTab === "menu"
                  ? "bg-black text-white"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              <Utensils className="w-5 h-5" />
              Food menu
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`flex items-center gap-3.5 px-6 py-3.5 rounded-full text-base font-semibold transition ${
                activeTab === "orders"
                  ? "bg-black text-white"
                  : "text-gray-500 hover:bg-gray-100"
              }`}
            >
              <ShoppingBag className="w-5 h-5" />
              Orders
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto w-full">
        {activeTab === "orders" ? (
          <AdminOrders />
        ) : (
          <div className="flex flex-col gap-8 w-full">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm w-full">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">
                Dishes category
              </h2>

              <div className="flex items-center gap-3.5 flex-wrap">
                <span className="px-6 py-3 rounded-full border-2 border-red-500 text-red-500 text-base font-bold flex items-center gap-3 cursor-pointer">
                  All Dishes
                  <span className="bg-black text-white px-2.5 py-0.5 rounded-full text-xs font-bold">
                    {allFoodCount}
                  </span>
                </span>

                {categories.map((cat) => (
                  <div
                    key={cat._id}
                    className="group relative px-6 py-3 rounded-full bg-gray-100 hover:bg-gray-200 text-base font-semibold flex items-center gap-3 transition cursor-pointer"
                  >
                    <span>{cat.categoryName}</span>
                    <span className="bg-black text-white px-2.5 py-0.5 rounded-full text-xs font-bold">
                      {cat.foodCount ?? 0}
                    </span>

                    <button
                      type="button"
                      onClick={(e) => deleteCategory(e, cat._id)}
                      className="hidden group-hover:block text-red-500 hover:text-red-700 ml-1 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                <button
                  onClick={() => setIsCategoryDialogOpen(true)}
                  className="w-12 h-12 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center transition shadow-md"
                >
                  <Plus className="w-6 h-6" />
                </button>
              </div>
            </div>

            {categories.map((category) => (
              <AdminFoodList
                key={category._id}
                category={category}
                onFoodChange={getCategory}
                onOpenAddFoodModal={(catId: string) => {
                  const found = categories.find((c) => c._id === catId);
                  setSelectedCategory(found || null);
                  setIsFoodDialogOpen(true);
                }}
              />
            ))}
          </div>
        )}
      </main>

      {/* Category Dialog */}
      {isCategoryDialogOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-3xl w-full max-w-[500px] p-8 shadow-2xl relative">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-xl text-gray-900">
                Add new category
              </h3>
              <button
                onClick={() => setIsCategoryDialogOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col gap-2 mb-6">
              <label className="text-sm font-semibold text-gray-700">
                Category name
              </label>
              <input
                type="text"
                placeholder="Type category name..."
                value={categoryNameInput}
                onChange={(e) => setCategoryNameInput(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-black transition"
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={createCategory}
                disabled={loading}
                className="px-6 py-3 rounded-xl bg-[#18181B] hover:bg-black text-white text-sm font-bold transition disabled:opacity-50"
              >
                {loading ? "Adding..." : "Add category"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Food Dialog */}
      {isFoodDialogOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[24px] w-full max-w-[520px] p-6 shadow-2xl relative">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-lg text-gray-900">
                Add new Dish to {selectedCategory?.categoryName || ""}
              </h3>
              <button
                onClick={resetFoodForm}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col gap-4 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-700">
                    Food name
                  </label>
                  <input
                    type="text"
                    placeholder="Type food name"
                    value={foodName}
                    onChange={(e) => setFoodName(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-xs outline-none focus:border-black transition"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-gray-700">
                    Food price
                  </label>
                  <input
                    type="number"
                    placeholder="Enter price..."
                    value={foodPrice}
                    onChange={(e) => setFoodPrice(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-xs outline-none focus:border-black transition"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-700">
                  Ingredients
                </label>
                <textarea
                  placeholder="List ingredients..."
                  rows={3}
                  value={foodIngredients}
                  onChange={(e) => setFoodIngredients(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-xs outline-none focus:border-black transition resize-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-gray-700">
                  Food image
                </label>
                <div className="relative border-2 border-dashed border-gray-200 bg-gray-50 hover:bg-gray-100 rounded-2xl h-36 flex flex-col items-center justify-center text-center transition overflow-hidden">
                  {uploading ? (
                    <div className="flex items-center gap-2 text-gray-500">
                      <Loader2 className="w-5 h-5 animate-spin text-red-500" />
                      <span className="text-xs font-medium">Uploading...</span>
                    </div>
                  ) : foodImage ? (
                    <div className="relative w-full h-full group">
                      <img
                        src={foodImage}
                        alt="Food preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setFoodImage("")}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full shadow-md hover:bg-red-600 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <label
                      htmlFor="admin-file-input"
                      className="flex flex-col items-center justify-center w-full h-full cursor-pointer p-4"
                    >
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm mb-2 text-gray-600">
                        <ImageIcon className="w-4 h-4" />
                      </div>
                      <p className="text-xs text-gray-500 font-medium">
                        Click to upload image
                      </p>
                      <input
                        id="admin-file-input"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={createFood}
                disabled={loading || uploading}
                className="px-5 py-2.5 rounded-xl bg-[#18181B] hover:bg-black text-white text-xs font-bold transition disabled:opacity-50"
              >
                {loading ? "Adding..." : "Add Dish"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
