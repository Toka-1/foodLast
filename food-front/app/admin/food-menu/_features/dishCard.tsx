import { Pencil } from "lucide-react";

export type FoodType = {
  _id: string;
  foodName: string;
  price: number;
  image: string;
  ingredients: string;
  category: string;
};

export const DishCard = ({ food }: { food: FoodType }) => {
  return (
    <div className="rounded-xl overflow-hidden border border-[#F4F4F5]">
      <div className="relative h-[180px]">
        <img
          src={food.image}
          alt={food.foodName}
          className="w-full h-full object-cover"
        />

        <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white flex items-center justify-center">
          <Pencil className="w-3.5 h-3.5 text-black" />
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
