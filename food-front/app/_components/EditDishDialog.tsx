"use client";

import { useEffect, useState } from "react";
import { Image as ImageIcon, Loader2, Trash2, X } from "lucide-react";

export type EditableDish = {
  id: string;
  foodName: string;
  price: number;
  ingredients: string;
  image: string;
  categoryId?: string;
};

type CategoryOption = {
  _id: string;
  categoryName: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
const UPLOAD_PRESET =
  process.env.NEXT_PUBLIC_API_CLOUDINARY_UPLOAD_PRESET || "fooood";
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "avugyogo";

export const EditDishDialog = ({
  food,
  categories,
  onClose,
  onSaved,
}: {
  food: EditableDish;
  categories: CategoryOption[];
  onClose: () => void;
  onSaved: () => void;
}) => {
  const [foodName, setFoodName] = useState(food.foodName);
  const [categoryId, setCategoryId] = useState(food.categoryId || "");
  const [ingredients, setIngredients] = useState(food.ingredients || "");
  const [price, setPrice] = useState(String(food.price ?? ""));
  const [image, setImage] = useState(food.image || "");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setFoodName(food.foodName);
    setCategoryId(food.categoryId || "");
    setIngredients(food.ingredients || "");
    setPrice(String(food.price ?? ""));
    setImage(food.image || "");
  }, [food]);

  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      { method: "POST", body: formData },
    );
    const data = await response.json();
    if (!response.ok) {
      alert(`Зураг хуулахад алдаа гарлаа: ${data.error?.message || "Алдаа"}`);
      return null;
    }
    return data.secure_url as string;
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      if (url) setImage(url);
    } finally {
      setUploading(false);
    }
  };

  const saveChanges = async () => {
    if (!foodName.trim() || !price) {
      alert("Нэр болон үнийг бөглөнө үү");
      return;
    }

    try {
      setSaving(true);
      const res = await fetch(`${API_URL}/food`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: food.id,
          foodName: foodName.trim(),
          price: Number(price),
          ingredients,
          image,
          category: categoryId || undefined,
        }),
      });

      if (!res.ok) throw new Error("Update failed");
      onSaved();
      onClose();
    } catch (error) {
      console.error("Update food error:", error);
      alert("Хоол засахад алдаа гарлаа");
    } finally {
      setSaving(false);
    }
  };

  const deleteDish = async () => {
    try {
      setSaving(true);
      const res = await fetch(`${API_URL}/food`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: food.id }),
      });
      if (!res.ok) throw new Error("Delete failed");
      onSaved();
      onClose();
    } catch (error) {
      console.error("Delete food error:", error);
      alert("Хоол устгахад алдаа гарлаа");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-[480px] rounded-3xl bg-white p-6 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">Dishes info</h3>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mb-6 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <label className="flex flex-col gap-1.5 text-xs font-semibold text-gray-700">
              Dish name
              <input
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
                className="rounded-xl border border-gray-200 px-3 py-2.5 text-xs font-normal outline-none focus:border-black"
              />
            </label>
            <label className="flex flex-col gap-1.5 text-xs font-semibold text-gray-700">
              Dish category
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="rounded-xl border border-gray-200 px-3 py-2.5 text-xs font-normal outline-none focus:border-black"
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.categoryName}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="flex flex-col gap-1.5 text-xs font-semibold text-gray-700">
            Ingredients
            <textarea
              rows={3}
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="resize-none rounded-xl border border-gray-200 px-3 py-2.5 text-xs font-normal outline-none focus:border-black"
            />
          </label>

          <label className="flex flex-col gap-1.5 text-xs font-semibold text-gray-700">
            Price
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="rounded-xl border border-gray-200 px-3 py-2.5 text-xs font-normal outline-none focus:border-black"
            />
          </label>

          <div className="flex flex-col gap-1.5 text-xs font-semibold text-gray-700">
            Image
            <div className="relative h-36 overflow-hidden rounded-2xl border border-dashed border-gray-200 bg-gray-50">
              {uploading ? (
                <div className="flex h-full items-center justify-center gap-2 text-gray-500">
                  <Loader2 className="h-5 w-5 animate-spin text-red-500" />
                  Uploading...
                </div>
              ) : image ? (
                <>
                  <img
                    src={image}
                    alt={foodName}
                    className="h-full w-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setImage("")}
                    className="absolute right-2 top-2 rounded-full bg-black/70 px-2 py-1 text-[10px] font-medium text-white"
                  >
                    Remove
                  </button>
                </>
              ) : (
                <label className="flex h-full cursor-pointer flex-col items-center justify-center gap-2 text-gray-500">
                  <ImageIcon className="h-5 w-5" />
                  <span>Click to upload image</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={deleteDish}
            disabled={saving}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-red-500 hover:bg-red-50 disabled:opacity-50"
            aria-label="Delete dish"
          >
            <Trash2 className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={saveChanges}
            disabled={saving || uploading}
            className="rounded-xl bg-[#18181B] px-5 py-2.5 text-xs font-bold text-white hover:bg-black disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save changes"}
          </button>
        </div>
      </div>
    </div>
  );
};
