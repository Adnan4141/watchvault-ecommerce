"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Sparkles, SlidersHorizontal, Check, ShoppingBag } from "lucide-react";
import { products } from "@/data/products";
import { Product } from "@/types";
import { ProductCard } from "./ProductCard";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";

export function ProductGrid() {
  const { searchQuery, selectedCategory, addItem } = useCartStore();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeBrandFilter, setActiveBrandFilter] = useState<string>("All");
  const [modalAdded, setModalAdded] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        searchQuery.trim() === "" ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.color && p.color.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        selectedCategory === "All" || p.category === selectedCategory;

      const matchesBrand =
        activeBrandFilter === "All" || p.brand === activeBrandFilter;

      return matchesSearch && matchesCategory && matchesBrand;
    });
  }, [searchQuery, selectedCategory, activeBrandFilter]);

  const brands = ["All", "Binbond", "POEDAGAR", "Olevs"];

  const handleModalAddToCart = () => {
    if (!selectedProduct) return;
    addItem(selectedProduct, 1);
    setModalAdded(true);
    setTimeout(() => setModalAdded(false), 1500);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-2 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-6 bg-[#542A0C] rounded-full" />
          <Sparkles className="w-5 h-5 text-[#542A0C]" />
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">
            New & Trending
          </h2>
          <span className="text-xs bg-amber-100 text-[#542A0C] px-2 py-0.5 rounded-full font-semibold ml-2">
            {filteredProducts.length} items
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
          <SlidersHorizontal className="w-4 h-4 text-gray-400 shrink-0 hidden sm:block" />
          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() => setActiveBrandFilter(brand)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeBrandFilter === brand
                  ? "bg-[#542A0C] text-white shadow-xs"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-[#542A0C]"
              }`}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 md:gap-5">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setSelectedProduct(p)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200">
          <p className="text-gray-500 text-sm">
            No watches found matching your filter criteria &quot;{searchQuery}&quot;.
          </p>
          <Button
            variant="secondary"
            size="sm"
            className="mt-4"
            onClick={() => {
              setActiveBrandFilter("All");
            }}
          >
            Reset Filters
          </Button>
        </div>
      )}

      <Modal
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        title={selectedProduct?.brand + " - " + selectedProduct?.model}
      >
        {selectedProduct && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="relative w-44 h-44 bg-gray-50 rounded-xl overflow-hidden shrink-0 border border-gray-100">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  fill
                  className="object-cover mix-blend-multiply"
                />
              </div>

              <div className="flex-1 space-y-2">
                <h4 className="text-sm font-semibold text-gray-900 leading-snug">
                  {selectedProduct.name}
                </h4>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-[#542A0C]">
                    {formatPrice(selectedProduct.currentPrice)}
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    {formatPrice(selectedProduct.originalPrice)}
                  </span>
                  <span className="bg-red-50 text-red-600 text-[10px] font-bold px-1.5 py-0.5 rounded border border-red-100">
                    -{selectedProduct.discountPercentage}% OFF
                  </span>
                </div>
                <div className="text-xs text-gray-600">
                  <span className="font-semibold text-gray-800">Color/Variant: </span>
                  {selectedProduct.color}
                </div>
                <div className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> In Stock & Ready to Ship
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-600 bg-stone-50 p-3 rounded-lg border border-stone-100 leading-relaxed">
              {selectedProduct.description}
            </p>

            {selectedProduct.features && (
              <div>
                <h5 className="text-xs font-bold text-gray-800 mb-1.5">Key Highlights:</h5>
                <ul className="grid grid-cols-2 gap-1 text-[11px] text-gray-600">
                  {selectedProduct.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#542A0C]" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="pt-3 border-t border-gray-100 flex gap-2">
              <Button
                variant="outline"
                className="flex-1 text-xs"
                onClick={() => setSelectedProduct(null)}
              >
                Close
              </Button>
              <Button
                className="flex-1 text-xs flex items-center justify-center gap-2"
                onClick={handleModalAddToCart}
              >
                {modalAdded ? (
                  <>
                    <Check className="w-4 h-4" /> Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" /> Add to Cart
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
