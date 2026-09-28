"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search,
  User,
  Bell,
  Package,
  ShoppingBag,
  Globe,
  PhoneCall,
  Menu,
  X,
  ShieldAlert,
} from "lucide-react";
import { useCartStore } from "@/store/useCartStore";

export function Header() {
  const { getTotalItems, setIsOpen, searchQuery, setSearchQuery } = useCartStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalItems = getTotalItems();

  return (
    <header className="sticky top-0 z-40 w-full shadow-xs">
      {/* Top micro announcement bar */}
      <div className="bg-[#422006] text-amber-50 text-[11px] sm:text-xs py-1.5 px-4 sm:px-6 lg:px-8 border-b border-[#542A0C]/30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium tracking-wide">Welcome to WatchVault! Exclusive Watches & Fast Cash on Delivery in Bangladesh.</span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-neutral-200">
            <Link href="/admin" className="flex items-center gap-1 text-amber-300 font-semibold hover:text-white transition-colors">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Admin Panel</span>
            </Link>
            <span className="text-stone-500">|</span>
            <button className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer">
              <Globe className="w-3.5 h-3.5" />
              <span>বাংলা</span>
            </button>
            <span className="text-stone-500">|</span>
            <Link href="/dashboard" className="hover:text-white transition-colors">
              Track Order
            </Link>
            <span className="text-stone-500">|</span>
            <Link href="/contact" className="flex items-center gap-1 hover:text-white transition-colors">
              <PhoneCall className="w-3 h-3" />
              <span>Support</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Brand & Search Bar */}
      <div className="bg-[#542A0C] text-white py-3 sm:py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-6">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20 shadow-inner group-hover:bg-white/20 transition-all">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 sm:w-6 sm:h-6 text-amber-200"
              >
                <circle cx="12" cy="12" r="7" />
                <polyline points="12 9 12 12 13.5 13.5" />
                <path d="M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7l.35-3.83A2 2 0 0 1 9.83 1h4.34a2 2 0 0 1 2 1.82l.35 3.83" />
              </svg>
            </div>
            <div className="flex flex-col">
              <div className="text-xl sm:text-2xl font-black tracking-tight leading-none text-white flex items-center gap-1">
                Watch<span className="text-amber-300">Vault</span>
              </div>
              <span className="text-[9px] uppercase tracking-widest text-amber-200/80 font-semibold">
                Original Watches BD
              </span>
            </div>
          </Link>

          {/* Search bar */}
          <div className="flex-1 max-w-2xl mx-1 sm:mx-4">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search in watchvault (e.g. Binbond, POEDAGAR, Olevs, Green, Black...)"
                className="w-full bg-white text-gray-800 placeholder-gray-400 rounded-full py-2 sm:py-2.5 pl-4 sm:pl-5 pr-11 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 shadow-sm"
              />
              <button
                type="button"
                aria-label="Search"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-full bg-[#542A0C] hover:bg-[#3d1d07] text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Dashboard / User Profile Link */}
            <Link
              href="/dashboard"
              className="hidden md:flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/15 px-3 py-1.5 rounded-full text-xs font-medium text-white transition-all cursor-pointer"
            >
              <User className="w-4 h-4 text-amber-200" />
              <span>My Account</span>
            </Link>

            {/* Notification */}
            <button
              aria-label="Notifications"
              className="hidden sm:flex text-white/90 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors relative"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-400 rounded-full" />
            </button>

            {/* Track Orders -> Dashboard */}
            <Link
              href="/dashboard"
              aria-label="Orders"
              className="hidden sm:flex text-white/90 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <Package className="w-5 h-5" />
            </Link>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsOpen(true)}
              aria-label="Shopping Cart"
              className="relative flex items-center gap-2 bg-white/15 hover:bg-white/25 border border-white/25 px-2.5 sm:px-3 py-1.5 rounded-full text-white transition-all cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5 text-amber-300" />
              <span className="hidden sm:inline text-xs font-semibold">Cart</span>
              {totalItems > 0 && (
                <span className="bg-amber-400 text-stone-900 text-[11px] font-bold h-5 min-w-[20px] px-1 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-white hover:bg-white/10 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-3 pb-2 border-t border-white/10 mt-2 space-y-2 text-xs">
            <div className="flex items-center justify-between py-1 px-1">
              <span className="text-amber-200">Customer Support:</span>
              <span className="font-semibold">+880 1800-000000</span>
            </div>
            <div className="flex gap-2 pt-1">
              <Link
                href="/dashboard"
                className="flex-1 py-2 bg-white/10 rounded-lg text-center font-medium block"
              >
                My Account
              </Link>
              <Link
                href="/admin"
                className="flex-1 py-2 bg-amber-400 text-stone-950 font-bold rounded-lg text-center block"
              >
                Admin Panel
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
