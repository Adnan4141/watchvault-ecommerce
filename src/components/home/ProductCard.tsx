"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ShoppingBag, Eye, Check } from "lucide-react";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const { addItem } = useCartStore();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1200);
  };

  return (
    <div
      onClick={() => onQuickView(product)}
      className="group relative flex flex-col bg-white rounded-xl overflow-hidden shadow-[0_2px_15px_rgba(0,0,0,0.03)] border border-gray-100 hover:shadow-[0_10px_35px_rgba(84,42,12,0.08)] transition-all duration-300 hover:-translate-y-1 cursor-pointer"
    >
      <div className="relative aspect-square w-full bg-gray-50 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />

        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
          className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 bg-white/90 hover:bg-white text-gray-700 hover:text-[#542A0C] p-1.5 rounded-full shadow-md transition-all duration-200 transform translate-y-2 group-hover:translate-y-0"
          title="Quick View"
        >
          <Eye className="w-4 h-4" />
        </button>

        <div className="absolute top-2.5 left-2.5">
          <div className="bg-red-50 text-red-600 px-1.5 sm:px-2 py-0.5 rounded-md text-[10px] sm:text-xs font-bold border border-red-100 shadow-xs">
            -{product.discountPercentage}%
          </div>
        </div>
      </div>

      <div className="p-3 sm:p-4 flex flex-col flex-1 relative bg-white">
        <div className="text-[10px] uppercase font-bold tracking-wider text-amber-900/60 mb-1">
          {product.brand}
        </div>
        <h3
          className="text-xs sm:text-[13px] md:text-sm text-gray-800 font-medium leading-[1.3rem] line-clamp-2 overflow-hidden h-[2.6rem] mb-3 group-hover:text-[#542A0C] transition-colors"
          title={product.name}
        >
          {product.name}
        </h3>

        <div className="mt-auto flex items-end justify-between border-t border-gray-100 pt-3">
          <div className="flex flex-col">
            <span className="text-base sm:text-lg md:text-xl font-bold text-[#542A0C] leading-none block tracking-tight">
              {formatPrice(product.currentPrice)}
            </span>
            <span className="text-[11px] sm:text-[12px] text-gray-400 line-through mt-1 font-medium">
              {formatPrice(product.originalPrice)}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            aria-label="Add to cart"
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-300 border shrink-0 cursor-pointer shadow-xs ${
              isAdded
                ? "bg-emerald-600 text-white border-emerald-600"
                : "bg-gray-50 text-gray-600 hover:bg-[#542A0C] hover:text-white border-gray-200 group-hover:border-[#542A0C]"
            }`}
          >
            {isAdded ? (
              <Check className="w-4 h-4 animate-in zoom-in" />
            ) : (
              <ShoppingBag className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
