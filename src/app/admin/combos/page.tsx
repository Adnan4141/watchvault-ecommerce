"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Flame,
  Plus,
  Trash2,
  Gift,
  CheckCircle2,
  Sparkles,
  Percent,
} from "lucide-react";
import { useDashboardStore } from "@/store/useDashboardStore";
import { formatPrice } from "@/lib/utils";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

export default function AdminCombosPage() {
  const { combos, addCombo, deleteCombo } = useDashboardStore();
  const [modalOpen, setModalOpen] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [badge, setBadge] = useState("🔥 Special Combo");
  const [currentPrice, setCurrentPrice] = useState(1490);
  const [originalPrice, setOriginalPrice] = useState(2800);
  const [image, setImage] = useState("/images/products/combo-executive-duo.jpg");
  const [itemsInput, setItemsInput] = useState(
    "Luxury Wristwatch\nMatching Stainless Steel Bangle\nVelvet Gift Box\nWarranty Card"
  );

  const handleCreateCombo = (e: React.FormEvent) => {
    e.preventDefault();
    const curr = Number(currentPrice);
    const orig = Number(originalPrice);
    const savings = Math.max(0, orig - curr);
    const discount = Math.round(((orig - curr) / orig) * 100);

    const items = itemsInput
      .split("\n")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    addCombo({
      title,
      subtitle,
      badge,
      image,
      currentPrice: curr,
      originalPrice: orig,
      discountPercentage: discount > 0 ? discount : 0,
      savings,
      includedItems: items.length > 0 ? items : ["Exclusive Gift Set Item"],
    });

    setModalOpen(false);
    // Reset fields
    setTitle("");
    setSubtitle("");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
              Combo Offers & Gift Packs Management
            </h1>
            <span className="bg-amber-100 text-amber-900 text-xs font-bold px-2 py-0.5 rounded-full border border-amber-300">
              {combos.length} Combos Active
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Create, edit, and organize promotional super-bundle offers shown in the 4-column homepage grid.
          </p>
        </div>

        <Button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 self-start sm:self-auto bg-[#542A0C] hover:bg-[#3d1d07]"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Combo Pack</span>
        </Button>
      </div>

      {/* Grid of Combos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {combos.map((combo) => (
          <div
            key={combo.id}
            className="bg-white rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
          >
            <div>
              {/* Image banner */}
              <div className="relative aspect-[16/10] w-full bg-stone-100">
                <Image
                  src={combo.image}
                  alt={combo.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 left-2 bg-[#542A0C] text-amber-300 px-2 py-0.5 rounded-full text-[10px] font-bold border border-amber-400/30">
                  {combo.badge}
                </div>
                <div className="absolute bottom-2 left-2 bg-red-600 text-white px-2 py-0.5 rounded text-[10px] font-bold">
                  Save {formatPrice(combo.savings)}
                </div>
              </div>

              {/* Info */}
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="text-sm font-bold text-gray-900 leading-snug line-clamp-1">
                    {combo.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                    {combo.subtitle}
                  </p>
                </div>

                {/* Items */}
                <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-100 space-y-1">
                  <div className="text-[10px] font-bold text-[#542A0C] uppercase tracking-wider flex items-center gap-1">
                    <Gift className="w-3 h-3 text-amber-600" />
                    <span>Included Pack Items ({combo.includedItems.length})</span>
                  </div>
                  <ul className="text-[11px] text-gray-600 space-y-1">
                    {combo.includedItems.slice(0, 3).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 truncate">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="truncate">{item}</span>
                      </li>
                    ))}
                    {combo.includedItems.length > 3 && (
                      <li className="text-[10px] text-stone-400 font-semibold pl-4">
                        +{combo.includedItems.length - 3} more items
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>

            {/* Price & Delete Action */}
            <div className="p-4 pt-0 border-t border-gray-100 flex items-center justify-between mt-3">
              <div>
                <div className="text-base font-black text-[#542A0C]">
                  {formatPrice(combo.currentPrice)}
                </div>
                <div className="text-[11px] text-gray-400 line-through">
                  {formatPrice(combo.originalPrice)}
                </div>
              </div>

              <button
                onClick={() => {
                  if (confirm(`Are you sure you want to remove "${combo.title}"?`)) {
                    deleteCombo(combo.id);
                  }
                }}
                className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                title="Delete Combo Offer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Combo Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add New Super Combo Offer"
      >
        <form onSubmit={handleCreateCombo} className="space-y-4 pt-2">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Combo Offer Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Master Royalty Dual Time Pack"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#542A0C]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Subtitle / Description *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Luxury Automatic Watch + Italian Leather Wallet"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#542A0C]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Badge Tag
              </label>
              <input
                type="text"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                placeholder="🔥 Hot Deal"
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#542A0C]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Preset Image Banner
              </label>
              <select
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#542A0C] bg-white"
              >
                <option value="/images/products/combo-executive-duo.jpg">
                  Executive Duo Pack
                </option>
                <option value="/images/products/combo-royal-couple-box.jpg">
                  Royal Couple Box
                </option>
                <option value="/images/products/combo-vintage-chronograph.jpg">
                  Vintage Military Pack
                </option>
                <option value="/images/products/combo-blackout-tactical.jpg">
                  Blackout Tactical Pack
                </option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Combo Price (BDT) *
              </label>
              <input
                type="number"
                required
                min={100}
                value={currentPrice}
                onChange={(e) => setCurrentPrice(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#542A0C]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Original Market Value (BDT) *
              </label>
              <input
                type="number"
                required
                min={100}
                value={originalPrice}
                onChange={(e) => setOriginalPrice(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#542A0C]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              Included Items List (one per line)
            </label>
            <textarea
              rows={4}
              value={itemsInput}
              onChange={(e) => setItemsInput(e.target.value)}
              placeholder="List items separated by newlines..."
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#542A0C]"
            />
            <span className="text-[10px] text-gray-400">
              Each line will show as a checklist feature with a green checkmark.
            </span>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-100">
            <Button
              type="button"
              variant="outline"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-[#542A0C] hover:bg-[#3d1d07]">
              Create Combo Pack
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
