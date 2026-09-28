"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Sparkles,
  Gift,
  CheckCircle2,
  ShoppingBag,
  ArrowRight,
  Flame,
  Check,
} from "lucide-react";
import { comboOffers } from "@/data/combos";
import { ComboOffer, Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/button";

export function ComboSection() {
  const { addItem, setIsOpen } = useCartStore();
  const [addedCombos, setAddedCombos] = useState<Record<string, boolean>>({});

  const handleAddComboToCart = (combo: ComboOffer) => {
    // Map combo as a purchasable Product in cart
    const comboProduct: Product = {
      id: combo.id,
      name: combo.title + " (" + combo.subtitle + ")",
      brand: "WatchVault Exclusive Combo",
      category: "Combo Offer",
      image: combo.image,
      currentPrice: combo.currentPrice,
      originalPrice: combo.originalPrice,
      discountPercentage: combo.discountPercentage,
      color: "Full Combo Gift Set",
      inStock: true,
      description: combo.includedItems.join(", "),
      features: combo.includedItems,
    };

    addItem(comboProduct, 1);
    setAddedCombos((prev) => ({ ...prev, [combo.id]: true }));
    setTimeout(() => {
      setAddedCombos((prev) => ({ ...prev, [combo.id]: false }));
    }, 1800);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Section Header */}
      <div className="bg-gradient-to-r from-[#542A0C] via-[#3a1c07] to-[#241004] text-white rounded-3xl p-6 sm:p-10 mb-8 shadow-xl relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold mb-3 border border-amber-400/30">
            <Flame className="w-4 h-4 text-amber-400" />
            <span>Exclusive Mega Savings</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white mb-2">
            WatchVault Super Combos & Gift Packs
          </h2>

          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            Get premium luxury wristwatches bundled with matching titanium bracelets, interchangeable leather straps, and velvet gift boxes at unbeatable discounted package prices.
          </p>
        </div>
      </div>

      {/* 3-Column Combo Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {comboOffers.map((combo) => {
          const isAdded = addedCombos[combo.id];
          return (
            <div
              key={combo.id}
              className="bg-white rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group hover:-translate-y-1.5"
            >
              {/* Image & Badge container */}
              <div className="relative aspect-[16/10] w-full bg-stone-100 overflow-hidden">
                <Image
                  src={combo.image}
                  alt={combo.title}
                  fill
                  className="object-cover group-hover:scale-108 transition-transform duration-700"
                  sizes="(min-width: 1024px) 33vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Badge top left */}
                <div className="absolute top-3 left-3 bg-[#542A0C] text-amber-300 px-3 py-1 rounded-full text-xs font-extrabold shadow-md border border-amber-400/30">
                  {combo.badge}
                </div>

                {/* Savings Pill bottom left */}
                <div className="absolute bottom-3 left-3 bg-red-600 text-white px-2.5 py-0.5 rounded-lg text-xs font-bold shadow-sm">
                  Save {formatPrice(combo.savings)}
                </div>
              </div>

              {/* Combo Content Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-base font-bold text-gray-900 group-hover:text-[#542A0C] transition-colors leading-snug">
                    {combo.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                    {combo.subtitle}
                  </p>

                  {/* Included Items Checklist */}
                  <div className="mt-4 pt-3 border-t border-gray-100 space-y-2">
                    <div className="text-[11px] font-bold text-[#542A0C] uppercase tracking-wider flex items-center gap-1.5">
                      <Gift className="w-3.5 h-3.5 text-amber-600" />
                      <span>What&apos;s Inside The Box:</span>
                    </div>

                    <ul className="space-y-1.5 text-xs text-gray-600">
                      {combo.includedItems.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="leading-tight">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Pricing & Add to Cart */}
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-xl sm:text-2xl font-black text-[#542A0C] leading-none">
                      {formatPrice(combo.currentPrice)}
                    </div>
                    <div className="text-xs text-gray-400 line-through mt-1 font-semibold">
                      {formatPrice(combo.originalPrice)}
                    </div>
                  </div>

                  <Button
                    onClick={() => handleAddComboToCart(combo)}
                    className={`px-4 py-2.5 text-xs font-bold flex items-center gap-1.5 rounded-xl transition-all cursor-pointer ${
                      isAdded
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                        : "bg-[#542A0C] hover:bg-[#3d1d07] text-white"
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4 animate-in zoom-in" />
                        <span>Combo Added!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        <span>Grab Combo</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
