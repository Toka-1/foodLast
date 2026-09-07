import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

interface AddDishCardProps {
  categoryName: string;
}

export const AddDishCard = ({ categoryName }: AddDishCardProps) => {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-[#EF4444]/40 rounded-xl h-[290px] hover:bg-[#FEF2F2] transition-colors">
          <div className="w-11 h-11 rounded-full bg-[#EF4444] flex items-center justify-center">
            <Plus className="w-5 h-5 text-white" />
          </div>
          <p className="text-[13px] text-black text-center px-4">
            Add new Dish to
            <br />
            {categoryName}
          </p>
        </div>
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-col h-67 w-full justify-between gap-4">
          <h1 className="text-lg font-bold">Add New Category</h1>
          <div className="flex gap-3 flex-col font-bold">
            {" "}
            <p>Category name</p>
            <Input
              placeholder="Category Name"
              value={categoryName}
              onChange={(e) => e.target.value}
            />
          </div>
          <button
            className="ml-auto border-[#EF4444] cursor-pointer text-white bg-black rounded-full px-4 py-2 font-bold flex items-center justify-center"
            // onClick={}
          >
            Add category
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
