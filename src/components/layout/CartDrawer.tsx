"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Trash2, Plus, Minus, ShoppingBag, ShieldCheck, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";

export function CartDrawer() {
  const {
    items,
    isOpen,
    setIsOpen,
    updateQuantity,
    removeItem,
    clearCart,
    getTotalPrice,
    getTotalItems,
  } = useCartStore();

  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "Dhaka",
    note: "",
  });

  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();
  const deliveryCharge = formData.city === "Dhaka" ? 60 : 120;
  const grandTotal = totalPrice + (totalItems > 0 ? deliveryCharge : 0);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      alert("Please fill in your Name, Phone Number, and Delivery Address.");
      return;
    }

    setOrderSuccess(true);
    clearCart();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-hidden">
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center justify-between bg-stone-50/50">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#542A0C]" />
                <h3 className="font-bold text-gray-900 text-base">
                  Your Shopping Cart ({totalItems})
                </h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-[#542A0C]">
                    <ShoppingBag className="w-8 h-8 opacity-40" />
                  </div>
                  <h4 className="font-bold text-gray-700">Your cart is empty</h4>
                  <p className="text-xs text-gray-400 max-w-xs">
                    Explore our trending wristwatches and add your favorite watches to the cart.
                  </p>
                  <Button
                    onClick={() => setIsOpen(false)}
                    variant="secondary"
                    size="sm"
                    className="mt-2"
                  >
                    Start Shopping
                  </Button>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex gap-3 bg-stone-50/60 p-3 rounded-xl border border-stone-100 relative group"
                  >
                    <div className="relative w-18 h-18 bg-white rounded-lg overflow-hidden shrink-0 border border-gray-100">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover mix-blend-multiply"
                      />
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs font-semibold text-gray-800 line-clamp-1">
                          {item.product.name}
                        </h4>
                        <span className="text-[11px] text-gray-500">
                          {item.product.color || item.product.category}
                        </span>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm font-bold text-[#542A0C]">
                          {formatPrice(item.product.currentPrice * item.quantity)}
                        </span>

                        <div className="flex items-center border border-gray-200 rounded-md bg-white">
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1)
                            }
                            className="p-1 hover:bg-gray-100 text-gray-600 rounded-l cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-semibold text-gray-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                            className="p-1 hover:bg-gray-100 text-gray-600 rounded-r cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1"
                      title="Remove Item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-4 sm:p-5 border-t border-gray-100 bg-white space-y-3 shadow-lg">
                <div className="space-y-1.5 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-gray-900">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Shipping</span>
                    <span className="font-semibold text-gray-900">
                      ৳{deliveryCharge}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-gray-900 pt-2 border-t border-gray-100">
                    <span>Total Amount</span>
                    <span className="text-[#542A0C] text-base font-extrabold">
                      {formatPrice(grandTotal)}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={() => {
                    setIsOpen(false);
                    setCheckoutModalOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm tracking-wide"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>

                <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>100% Genuine Watch Assurance & Cash on Delivery</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        title="Complete Your Order (Cash on Delivery)"
      >
        {orderSuccess ? (
          <div className="text-center py-6 space-y-3">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
              ✓
            </div>
            <h3 className="text-lg font-bold text-gray-800">
              Order Confirmed Successfully!
            </h3>
            <p className="text-xs text-gray-600">
              Thank you, <strong>{formData.name}</strong>. Your WatchVault order has been placed. Our customer executive will call you shortly on <strong>{formData.phone}</strong> for verification.
            </p>
            <div className="pt-4">
              <Button
                onClick={() => {
                  setOrderSuccess(false);
                  setCheckoutModalOpen(false);
                }}
                className="w-full"
              >
                Back to Shopping
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleCheckoutSubmit} className="space-y-3 text-xs">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Adnan Hossain"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full border border-gray-200 rounded-lg p-2.5 focus:ring-2 focus:ring-[#542A0C] outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Phone Number (Mobile) *
              </label>
              <input
                type="tel"
                required
                placeholder="e.g. 01883671140"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full border border-gray-200 rounded-lg p-2.5 focus:ring-2 focus:ring-[#542A0C] outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Delivery Region
                </label>
                <select
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  className="w-full border border-gray-200 rounded-lg p-2.5 bg-white focus:ring-2 focus:ring-[#542A0C] outline-none"
                >
                  <option value="Dhaka">Inside Dhaka (৳60)</option>
                  <option value="Outside">Outside Dhaka (৳120)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Payment Method
                </label>
                <div className="p-2.5 bg-stone-50 border border-stone-200 rounded-lg font-medium text-stone-700">
                  Cash on Delivery
                </div>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Full Delivery Address *
              </label>
              <textarea
                required
                rows={2}
                placeholder="House, Road, Area, Thana, District"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                className="w-full border border-gray-200 rounded-lg p-2.5 focus:ring-2 focus:ring-[#542A0C] outline-none"
              />
            </div>

            <div className="bg-stone-50 p-3 rounded-lg border border-stone-200 space-y-1">
              <div className="flex justify-between font-bold text-gray-900 text-sm">
                <span>Grand Total to Pay:</span>
                <span className="text-[#542A0C]">{formatPrice(grandTotal)}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCheckoutModalOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1 font-bold">
                Confirm Order
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </>
  );
}
