"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { ChevronRight, X } from "lucide-react";

export function HeaderDialog() {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="p-3 bg-white gap-1 text-black rounded-lg w-62.75 h-9 items-center flex text-xs justify-center">
          <img
            src="/icons/location.svg"
            alt="location"
            width={13.33}
            height={16.67}
          />
          <p className="text-[#EF4444]">Delivery address:</p>
          <p className="text-[#71717A]">Add Location</p>
          <ChevronRight className="text-xs" />
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm p-0 gap-0 overflow-hidden">
        <DialogHeader className="flex-row items-center justify-between px-5 py-4 border-b">
          <DialogTitle className="text-base font-semibold">
            Please write your delivery address!
          </DialogTitle>
        </DialogHeader>

        <div className="px-5 py-4">
          <Textarea
            placeholder="Please share your complete address"
            className="min-h-24 border-dashed border-2 border-purple-400 rounded-lg resize-none focus-visible:ring-purple-400"
          />
        </div>

        <DialogFooter className="flex-row justify-end gap-2 px-5 pb-5">
          <DialogClose
            render={
              <Button variant="outline" className="rounded-lg">
                Cancel
              </Button>
            }
          />
          <Button
            type="submit"
            className="bg-[#18181B] hover:bg-[#27272A] text-white rounded-lg"
          >
            Deliver Here
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
