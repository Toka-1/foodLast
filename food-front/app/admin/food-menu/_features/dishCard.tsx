import { Pencil } from "lucide-react";

export type FoodType = {
  _id: string;
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  category: string | { _id: string };
};

export const DishCard = ({
  food,
  onEdit,
}: {
  food: FoodType;
  onEdit: (food: FoodType) => void;
}) => {
  return (
    <div className="rounded-xl overflow-hidden border border-[#F4F4F5]">
      <div className="relative h-[180px]">
        <img
          src={food.image}
          alt={food.foodName}
          className="w-full h-full object-cover"
        />

        <button
          type="button"
          onClick={() => onEdit(food)}
          className="absolute bottom-3 right-3 w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-md hover:bg-red-50 transition"
          aria-label="Edit dish"
        >
          <Pencil className="w-4 h-4 text-[#EF4444]" />
        </button>
      </div>

      <div className="p-3">
        <div className="flex items-center justify-between mb-1">
          <p className="text-[13px] font-semibold text-[#EF4444]">
            {food.foodName}
          </p>

          <p className="text-[13px] font-semibold text-black">${food.price}</p>
        </div>

        <p className="text-[12px] text-[#71717A] leading-snug">
          {food.ingredients}
        </p>
      </div>
    </div>
  );
};
