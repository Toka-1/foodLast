import { Plus } from "lucide-react";

export const AddDishCard = ({ categoryName, onClick }: any) => {
    return (
        <button
            onClick={onClick}
            className="h-full min-h-[220px] border-2 border-dashed border-red-200 hover:border-red-400 bg-red-50/30 hover:bg-red-50 rounded-2xl p-4 flex flex-col items-center justify-center gap-3 transition group cursor-pointer"
        >
            <div className="w-10 h-10 rounded-full bg-red-500 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition">
                <Plus className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-gray-600 text-center">
                Add new dish to <br />
                <span className="text-red-500 font-bold">{categoryName}</span>
            </span>
        </button>
    );
};