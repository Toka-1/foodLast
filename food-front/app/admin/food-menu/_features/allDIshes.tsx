import { X } from "lucide-react";
import { CategoryType } from "./categoryFilter";

export const AllDishes = ({
  cat,
  active,
  setActive,
  deleteCategory,
}: {
  cat: CategoryType;
  active: string;
  setActive: (name: string) => void;
  deleteCategory: (id: string) => void;
}) => {
  
  return (
    <button
      key={cat._id}
      onClick={() => setActive(cat.categoryName)}
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium border transition-colors ${
        active === cat.categoryName
          ? "border-[#EF4444] text-[#EF4444] bg-white"
          : "border-[#E4E4E7] text-black bg-white hover:bg-[#FAFAFA]"
      }`}
    >
      {cat.categoryName}
      <span
        className={`text-[11px] px-1.5 py-0.5 rounded-full ${
          active === cat.categoryName
            ? "bg-[#EF4444] text-white"
            : "bg-black text-white"
        }`}
      >
        {cat.foodCount}
      </span>
      <div
        onClick={(e) => {
          e.stopPropagation();
          deleteCategory(cat._id);
        }}
        className={`flex items-center gap-2 px-2 py-1 rounded-full text-[13px] font-medium border transition-colors ${
          "All Dishes" === cat.categoryName ? "hidden" : ""
        }`}
      >
        <X width={12} height={12} />
      </div>
    </button>
  );
};
