"use client";

import React from "react";
import Image from "next/image";
import { LayoutGrid, ChevronRight } from "lucide-react";
import { categories } from "@/data/products";
import { useCartStore } from "@/store/useCartStore";

export function CategorySection() {
  const { selectedCategory, setSelectedCategory } = useCartStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-3">
        <div className="order-2 lg:order-1 lg:col-span-8 h-auto min-h-[130px]">
          <section className="h-full flex flex-col justify-center bg-white rounded-xl p-3 sm:p-4 border border-gray-100 shadow-[0_2px_15px_rgba(0,0,0,0.02)]">
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-2">
                <LayoutGrid className="w-4 h-4 text-[#542A0C]" />
                <h2 className="text-sm font-bold text-gray-800">
                  Shop by Category
                </h2>
              </div>
              <button
                onClick={() => setSelectedCategory("All")}
                className="text-[11px] font-bold text-[#542A0C] flex items-center gap-0.5 hover:underline cursor-pointer"
              >
                See All
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide px-1 items-start">
              <button
                onClick={() => setSelectedCategory("All")}
                className={`group flex flex-col items-center gap-2 min-w-[76px] cursor-pointer transition-all ${
                  selectedCategory === "All" ? "opacity-100 scale-105" : "opacity-85 hover:opacity-100"
                }`}
              >
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center border-2 transition-all ${
                    selectedCategory === "All"
                      ? "border-[#542A0C] bg-[#542A0C] text-white shadow-md"
                      : "border-dashed border-gray-300 bg-gray-50 text-gray-600 group-hover:border-[#542A0C]"
                  }`}
                >
                  <LayoutGrid className="w-6 h-6" />
                </div>
                <span
                  className={`text-[11px] font-medium text-center leading-tight transition-colors line-clamp-2 w-full ${
                    selectedCategory === "All"
                      ? "text-[#542A0C] font-bold"
                      : "text-gray-700 group-hover:text-[#542A0C]"
                  }`}
                >
                  All Watches
                </span>
              </button>

              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.name;
                return (
                  <button
                    key={cat.id}
                    onClick={() =>
                      setSelectedCategory(isSelected ? "All" : cat.name)
                    }
                    className={`group flex flex-col items-center gap-2 min-w-[76px] cursor-pointer transition-all ${
                      isSelected ? "scale-105" : "hover:scale-102"
                    }`}
                  >
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center overflow-hidden border-2 transition-all bg-gray-50 p-1.5 ${
                        isSelected
                          ? "border-[#542A0C] shadow-md ring-2 ring-[#542A0C]/20"
                          : "border-gray-100 group-hover:border-[#542A0C]/50"
                      }`}
                    >
                      <Image
                        src={cat.image}
                        alt={cat.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <span
                      className={`text-[11px] font-medium text-center leading-tight transition-colors line-clamp-2 w-full ${
                        isSelected
                          ? "text-[#542A0C] font-bold"
                          : "text-gray-700 group-hover:text-[#542A0C]"
                      }`}
                    >
                      {cat.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        <div className="order-1 lg:order-2 lg:col-span-4 h-auto min-h-[130px]">
          <div className="h-full w-full overflow-hidden relative group rounded-xl shadow-[0_2px_15px_rgba(0,0,0,0.03)] border border-gray-100 bg-white">
            <div className="w-full h-full relative overflow-hidden bg-gray-50 rounded-xl">
              <div className="hidden md:block w-full h-[155px] relative">
                <Image
                  src="/images/banners/promo-banner.gif"
                  alt="Exclusive Offer Banner"
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(min-width: 1024px) 33vw, 100vw"
                />
              </div>
              <div className="block md:hidden w-full h-[120px] relative">
                <Image
                  src="/images/banners/promo-banner-mobile.gif"
                  alt="Exclusive Offer Banner Mobile"
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="100vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
