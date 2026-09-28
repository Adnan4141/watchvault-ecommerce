"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Plus,
  Search,
  Check,
  X,
  Trash2,
  Package,
  Layers,
  Filter,
} from "lucide-react";
import { useDashboardStore } from "@/store/useDashboardStore";
import { formatPrice } from "@/lib/utils";
import { Product } from "@/types";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

export default function AdminProductsPage() {
  const { products, toggleProductStock, deleteProduct, addProduct } = useDashboardStore();
  const [search, setSearch] = useState("");
  const [addModalOpen, setAddModalOpen] = useState(false);

  // New product form states
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("POEDAGAR");
  const [category, setCategory] = useState("Men's Collection");
  const [currentPrice, setCurrentPrice] = useState(890);
  const [originalPrice, setOriginalPrice] = useState(1750);
  const [discountPercentage, setDiscountPercentage] = useState(49);
  const [color, setColor] = useState("Silver Black");
  const [description, setDescription] = useState("Luxury stainless steel watch with high precision quartz movement.");

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    addProduct({
      name,
      brand,
      category,
      image: "/images/products/poedagar-866-blue-golden.webp",
      currentPrice: Number(currentPrice),
      originalPrice: Number(originalPrice),
      discountPercentage: Number(discountPercentage),
      color,
      inStock: true,
      description,
      features: ["Waterproof", "Quartz Movement", "Mineral Crystal"],
    });

    setAddModalOpen(false);
    // Reset
    setName("");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
            Watch Catalog & Inventory
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage product pricing, stock availability, and catalog listings.
          </p>
        </div>

        <Button
          onClick={() => setAddModalOpen(true)}
          className="flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Watch</span>
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search watches by model or brand..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#542A0C]"
          />
        </div>

        <div className="text-xs text-gray-500 font-medium">
          Showing <strong>{filteredProducts.length}</strong> watches in store
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-stone-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-b border-gray-100 text-gray-500 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-4">Watch Item</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price (BDT)</th>
                <th className="p-4">Discount</th>
                <th className="p-4">Stock Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {filteredProducts.map((prod) => (
                <tr key={prod.id} className="hover:bg-stone-50/50">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 bg-stone-50 rounded-lg overflow-hidden border border-gray-100 shrink-0">
                        <Image
                          src={prod.image}
                          alt={prod.name}
                          fill
                          className="object-cover mix-blend-multiply"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-gray-900 truncate max-w-xs">{prod.name}</div>
                        <span className="text-[10px] text-amber-900 font-semibold">{prod.brand}</span>
                      </div>
                    </div>
                  </td>

                  <td className="p-4 font-medium text-gray-600">{prod.category}</td>

                  <td className="p-4">
                    <div className="font-bold text-[#542A0C]">{formatPrice(prod.currentPrice)}</div>
                    <div className="text-[10px] text-gray-400 line-through">{formatPrice(prod.originalPrice)}</div>
                  </td>

                  <td className="p-4">
                    <span className="bg-red-50 text-red-600 font-bold px-1.5 py-0.5 rounded border border-red-100 text-[10px]">
                      -{prod.discountPercentage}%
                    </span>
                  </td>

                  <td className="p-4">
                    <button
                      onClick={() => toggleProductStock(prod.id)}
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold cursor-pointer transition-all border ${
                        prod.inStock
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                          : "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
                      }`}
                    >
                      {prod.inStock ? "✓ In Stock" : "✗ Out of Stock"}
                    </button>
                  </td>

                  <td className="p-4 text-right">
                    <button
                      onClick={() => {
                        if (confirm("Are you sure you want to delete this product?")) {
                          deleteProduct(prod.id);
                        }
                      }}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      title="Delete Product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      <Modal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        title="Add New Watch to Catalog"
      >
        <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Watch Title/Model Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. POEDAGAR 920 Luxury Chronograph Watch"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-[#542A0C]"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Brand</label>
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2.5 bg-white outline-none focus:ring-2 focus:ring-[#542A0C]"
              >
                <option value="POEDAGAR">POEDAGAR</option>
                <option value="Binbond">Binbond</option>
                <option value="Olevs">Olevs</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2.5 bg-white outline-none focus:ring-2 focus:ring-[#542A0C]"
              >
                <option value="Men's Collection">Men&apos;s Collection</option>
                <option value="Couple Collection">Couple Collection</option>
                <option value="Ladies' Collection">Ladies&apos; Collection</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Sale Price (৳)</label>
              <input
                type="number"
                required
                value={currentPrice}
                onChange={(e) => setCurrentPrice(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-[#542A0C]"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Original (৳)</label>
              <input
                type="number"
                required
                value={originalPrice}
                onChange={(e) => setOriginalPrice(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-[#542A0C]"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">Discount %</label>
              <input
                type="number"
                required
                value={discountPercentage}
                onChange={(e) => setDiscountPercentage(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-[#542A0C]"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Color / Edition</label>
            <input
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              placeholder="e.g. Silver White / Black Golden"
              className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-[#542A0C]"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Description</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-[#542A0C]"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setAddModalOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Save Product
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
