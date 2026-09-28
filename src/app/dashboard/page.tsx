"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Package,
  Heart,
  MapPin,
  User,
  ShoppingBag,
  Clock,
  CheckCircle2,
  Truck,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useDashboardStore } from "@/store/useDashboardStore";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/lib/utils";
import { DashboardOrder, OrderStatus } from "@/types/dashboard";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

export default function UserDashboardPage() {
  const { user, orders, wishlist, toggleWishlist, updateUserProfile } = useDashboardStore();
  const { addItem, setIsOpen: setCartOpen } = useCartStore();

  const [activeTab, setActiveTab] = useState<"orders" | "wishlist" | "address" | "profile">("orders");
  const [selectedOrder, setSelectedOrder] = useState<DashboardOrder | null>(null);

  // Profile form state
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [address, setAddress] = useState(user.address);
  const [city, setCity] = useState(user.city);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({ name, phone, address, city });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const totalSpent = orders
    .filter((o) => o.status !== "Cancelled")
    .reduce((acc, curr) => acc + curr.totalAmount, 0);

  const pendingOrders = orders.filter((o) => o.status === "Processing" || o.status === "Shipped").length;

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case "Pending":
        return <span className="bg-amber-50 text-amber-700 border border-amber-200 px-2.5 py-0.5 rounded-full text-xs font-semibold">Pending</span>;
      case "Processing":
        return <span className="bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1"><Clock className="w-3 h-3" /> Processing</span>;
      case "Shipped":
        return <span className="bg-purple-50 text-purple-700 border border-purple-200 px-2.5 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1"><Truck className="w-3 h-3" /> In Transit</span>;
      case "Delivered":
        return <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Delivered</span>;
      case "Cancelled":
        return <span className="bg-red-50 text-red-700 border border-red-200 px-2.5 py-0.5 rounded-full text-xs font-semibold">Cancelled</span>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F9F7F5]">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* User Welcome Banner */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-stone-200/80 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-[#542A0C] text-amber-200 flex items-center justify-center font-bold text-2xl shadow-inner border border-amber-900">
              {user.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{user.name}</h1>
                <span className="bg-amber-100 text-[#542A0C] text-[11px] font-bold px-2 py-0.5 rounded-full">
                  Verified Member
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                {user.email} • {user.phone} • Member since {user.joinedDate}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-900/20 text-[#542A0C] hover:bg-amber-50 text-xs font-bold transition-all"
            >
              <span>Switch to Admin Panel</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-xl border border-stone-200/80 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-[#542A0C] flex items-center justify-center shrink-0">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-gray-500 font-medium">Total Orders</div>
              <div className="text-xl font-bold text-gray-900">{orders.length}</div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-stone-200/80 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-gray-500 font-medium">Active Deliveries</div>
              <div className="text-xl font-bold text-gray-900">{pendingOrders}</div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-stone-200/80 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-gray-500 font-medium">Wishlist Items</div>
              <div className="text-xl font-bold text-gray-900">{wishlist.length}</div>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-stone-200/80 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-gray-500 font-medium">Total Spent</div>
              <div className="text-xl font-bold text-[#542A0C]">{formatPrice(totalSpent)}</div>
            </div>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex border-b border-stone-200 mb-6 gap-2 sm:gap-6 overflow-x-auto scrollbar-hide">
          <button
            onClick={() => setActiveTab("orders")}
            className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "orders"
                ? "border-[#542A0C] text-[#542A0C]"
                : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            My Orders ({orders.length})
          </button>

          <button
            onClick={() => setActiveTab("wishlist")}
            className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "wishlist"
                ? "border-[#542A0C] text-[#542A0C]"
                : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            Saved Wishlist ({wishlist.length})
          </button>

          <button
            onClick={() => setActiveTab("address")}
            className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "address"
                ? "border-[#542A0C] text-[#542A0C]"
                : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            Shipping Address
          </button>

          <button
            onClick={() => setActiveTab("profile")}
            className={`pb-3 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "profile"
                ? "border-[#542A0C] text-[#542A0C]"
                : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            Profile Settings
          </button>
        </div>

        {/* Tab 1: Orders */}
        {activeTab === "orders" && (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-xl p-5 border border-stone-200/80 shadow-xs hover:border-[#542A0C]/30 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-gray-900">{order.orderNumber}</span>
                      <span className="text-xs text-gray-400">• {order.date}</span>
                    </div>
                    <span className="text-[11px] text-gray-500">Tracking: {order.trackingCode}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusBadge(order.status)}
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="text-xs font-bold text-[#542A0C] hover:underline flex items-center gap-0.5 cursor-pointer"
                    >
                      View Details <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="py-4 space-y-3">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <div className="relative w-14 h-14 bg-stone-50 rounded-lg overflow-hidden border border-gray-100 shrink-0">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover mix-blend-multiply"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold text-gray-900 truncate">
                          {item.product.name}
                        </h4>
                        <div className="text-[11px] text-gray-500">
                          Qty: {item.quantity} × {formatPrice(item.price)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="text-gray-500 font-medium">Payment: Cash on Delivery</span>
                  <div className="text-right">
                    <span className="text-gray-500 mr-2">Total Amount:</span>
                    <span className="font-bold text-base text-[#542A0C]">
                      {formatPrice(order.totalAmount)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Wishlist */}
        {activeTab === "wishlist" && (
          <div>
            {wishlist.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-xl border border-dashed border-gray-200">
                <Heart className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                <h3 className="text-sm font-bold text-gray-700">Your wishlist is empty</h3>
                <p className="text-xs text-gray-400 mt-1">
                  Save your dream luxury watches to purchase them later.
                </p>
                <Link href="/" className="inline-block mt-4 text-xs font-bold text-[#542A0C] hover:underline">
                  Browse Watch Catalog →
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {wishlist.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl p-4 border border-stone-200/80 shadow-xs flex gap-4 items-center"
                  >
                    <div className="relative w-20 h-20 bg-stone-50 rounded-lg overflow-hidden border border-gray-100 shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover mix-blend-multiply"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] uppercase font-bold text-[#542A0C]">{item.brand}</span>
                      <h4 className="text-xs font-semibold text-gray-900 truncate">{item.name}</h4>
                      <div className="text-sm font-bold text-[#542A0C] mt-1">
                        {formatPrice(item.currentPrice)}
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          size="sm"
                          onClick={() => {
                            addItem(item, 1);
                            setCartOpen(true);
                          }}
                          className="text-[11px] h-7 px-2.5"
                        >
                          Add to Cart
                        </Button>
                        <button
                          onClick={() => toggleWishlist(item)}
                          className="text-[11px] text-gray-400 hover:text-red-600 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Shipping Address */}
        {activeTab === "address" && (
          <div className="bg-white rounded-xl p-6 border border-stone-200/80 shadow-xs max-w-xl">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-[#542A0C]" />
              <h3 className="text-base font-bold text-gray-900">Default Delivery Address</h3>
            </div>
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 text-xs space-y-2">
              <div className="font-bold text-gray-800 text-sm">{user.name}</div>
              <div className="text-gray-600">{user.address}</div>
              <div className="text-gray-600">Region: {user.city === "Dhaka" ? "Inside Dhaka (৳60 shipping)" : "Outside Dhaka (৳120 shipping)"}</div>
              <div className="text-gray-600">Phone: {user.phone}</div>
            </div>
            <p className="text-xs text-gray-400 mt-4">
              Need to change your address? You can update it in the <strong>Profile Settings</strong> tab.
            </p>
          </div>
        )}

        {/* Tab 4: Profile Settings */}
        {activeTab === "profile" && (
          <div className="bg-white rounded-xl p-6 border border-stone-200/80 shadow-xs max-w-xl">
            <h3 className="text-base font-bold text-gray-900 mb-4">Edit Profile & Shipping Information</h3>
            {savedSuccess && (
              <div className="mb-4 p-3 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-lg border border-emerald-200">
                ✓ Profile successfully updated!
              </div>
            )}
            <form onSubmit={handleProfileSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-[#542A0C]"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Mobile Phone Number</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-[#542A0C]"
                />
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Delivery City/Region</label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value as "Dhaka" | "Outside")}
                  className="w-full border border-gray-300 rounded-lg p-2.5 bg-white outline-none focus:ring-2 focus:ring-[#542A0C]"
                >
                  <option value="Dhaka">Inside Dhaka</option>
                  <option value="Outside">Outside Dhaka</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Detailed Street Address</label>
                <textarea
                  rows={3}
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-[#542A0C]"
                />
              </div>

              <Button type="submit" className="w-full">
                Save Profile Changes
              </Button>
            </form>
          </div>
        )}
      </main>

      {/* Order Details Modal */}
      <Modal
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        title={selectedOrder ? `Order Details (${selectedOrder.orderNumber})` : ""}
      >
        {selectedOrder && (
          <div className="space-y-4 text-xs">
            {/* Delivery Progress Bar */}
            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
              <div className="text-[11px] font-bold text-gray-600 uppercase mb-3">Order Status Track</div>
              <div className="flex items-center justify-between text-[11px] text-gray-600 font-semibold relative">
                <div className="flex flex-col items-center z-10">
                  <div className="w-7 h-7 rounded-full bg-[#542A0C] text-white flex items-center justify-center font-bold">1</div>
                  <span className="mt-1">Placed</span>
                </div>
                <div className="flex flex-col items-center z-10">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold ${
                    selectedOrder.status !== "Pending" ? "bg-[#542A0C] text-white" : "bg-gray-200 text-gray-600"
                  }`}>2</div>
                  <span className="mt-1">Confirmed</span>
                </div>
                <div className="flex flex-col items-center z-10">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold ${
                    selectedOrder.status === "Shipped" || selectedOrder.status === "Delivered" ? "bg-[#542A0C] text-white" : "bg-gray-200 text-gray-600"
                  }`}>3</div>
                  <span className="mt-1">In Transit</span>
                </div>
                <div className="flex flex-col items-center z-10">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold ${
                    selectedOrder.status === "Delivered" ? "bg-emerald-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}>4</div>
                  <span className="mt-1">Delivered</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="font-bold text-gray-800">Items Ordered:</div>
              {selectedOrder.items.map((it, i) => (
                <div key={i} className="flex justify-between items-center py-1.5 border-b border-gray-100">
                  <span className="text-gray-700">{it.product.name} (×{it.quantity})</span>
                  <span className="font-bold text-gray-900">{formatPrice(it.price * it.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-1 pt-2">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal:</span>
                <span>{formatPrice(selectedOrder.subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Shipping:</span>
                <span>৳{selectedOrder.deliveryFee}</span>
              </div>
              <div className="flex justify-between font-bold text-gray-900 text-sm pt-2 border-t border-gray-200">
                <span>Grand Total:</span>
                <span className="text-[#542A0C]">{formatPrice(selectedOrder.totalAmount)}</span>
              </div>
            </div>

            <div className="bg-stone-50 p-3 rounded-lg border border-stone-200">
              <div className="font-bold text-gray-700 mb-0.5">Shipping Destination:</div>
              <div className="text-gray-600">{selectedOrder.customerName}, {selectedOrder.customerAddress}, {selectedOrder.city}</div>
              <div className="text-gray-600">Phone: {selectedOrder.customerPhone}</div>
            </div>

            <Button onClick={() => setSelectedOrder(null)} className="w-full">
              Close
            </Button>
          </div>
        )}
      </Modal>

      <Footer />
    </div>
  );
}
