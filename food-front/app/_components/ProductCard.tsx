"use client";

import { Pencil, Trash2 } from "lucide-react";

type ProductCardProps = {
  id: string;
  foodName: string;
  price: number;
  ingredients: string;
  image: string;
  categoryId?: string;
  onEdit?: (food: {
    id: string;
    foodName: string;
    price: number;
    ingredients: string;
    image: string;
    categoryId?: string;
  }) => void;
  onDelete?: (foodId: string) => void | Promise<void>;
};

export const ProductCard = ({
  id,
  foodName,
  price,
  ingredients,
  image,
  categoryId,
  onEdit,
  onDelete,
}: ProductCardProps) => {
  return (
    <div className="relative w-full bg-white rounded-2xl p-3 border border-gray-100 shadow-sm flex flex-col justify-between gap-3 hover:shadow-md transition">
      <div className="w-full h-36 rounded-xl overflow-hidden bg-gray-100 relative">
        <img
          src={
            image ||
            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
          }
          alt={foodName}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1546069901-ba9599a7e63c";
          }}
        />

        <div className="absolute bottom-3 right-3 z-10 flex items-center gap-2">
          {onDelete && (
            <button
              type="button"
              onClick={() => onDelete(id)}
              className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-red-500 hover:bg-red-50 transition shadow-md"
              aria-label="Delete dish"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
          {onEdit && (
            <button
              type="button"
              onClick={() =>
                onEdit({
                  id,
                  foodName,
                  price,
                  ingredients,
                  image,
                  categoryId,
                })
              }
              className="w-9 h-9 bg-[#EF4444] rounded-full flex items-center justify-center text-white hover:bg-red-600 transition shadow-md"
              aria-label="Edit dish"
            >
              <Pencil className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1 px-1 pb-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-bold text-sm text-[#EF4444] truncate">
            {foodName}
          </h3>
          <span className="font-bold text-sm text-gray-900 shrink-0">
            ${price}
          </span>
        </div>
        <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
          {ingredients || "No ingredients listed"}
        </p>
      </div>
    </div>
  );
};
