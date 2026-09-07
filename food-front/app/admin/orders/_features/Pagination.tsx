"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Pagination = () => {
  const [activePage, setActivePage] = useState(1);
  const pages = [1, 2, 3, 4, 5];

  return (
    <div className="flex items-center justify-end gap-1 mt-4">
      <button className="w-8 h-8 flex items-center justify-center rounded-full text-[#71717A] hover:bg-[#F4F4F5]">
        <ChevronLeft className="w-4 h-4" />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => setActivePage(page)}
          className={`w-8 h-8 flex items-center justify-center rounded-full text-[13px] ${
            activePage === page
              ? "bg-[#121316] text-white"
              : "text-[#71717A] hover:bg-[#F4F4F5]"
          }`}
        >
          {page}
        </button>
      ))}

      <span className="px-1 text-[#71717A]">...</span>

      <button
        onClick={() => setActivePage(10)}
        className={`w-8 h-8 flex items-center justify-center rounded-full text-[13px] ${
          activePage === 10
            ? "bg-[#121316] text-white"
            : "text-[#71717A] hover:bg-[#F4F4F5]"
        }`}
      >
        10
      </button>

      <button className="w-8 h-8 flex items-center justify-center rounded-full text-[#71717A] hover:bg-[#F4F4F5]">
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};
