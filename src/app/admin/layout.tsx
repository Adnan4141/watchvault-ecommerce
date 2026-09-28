"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  MessageSquare,
  Store,
  ArrowLeft,
  Menu,
  ExternalLink,
  Flame,
} from "lucide-react";
import { useDashboardStore } from "@/store/useDashboardStore";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { orders, inquiries } = useDashboardStore();

  const pendingCount = orders.filter((o) => o.status === "Processing" || o.status === "Pending").length;
  const unreadInquiries = inquiries.filter((i) => i.status === "Unread").length;

  const navItems = [
    {
      name: "Overview",
      href: "/admin",
      icon: LayoutDashboard,
      badge: null,
    },
    {
      name: "Orders Management",
      href: "/admin/orders",
      icon: ShoppingBag,
      badge: pendingCount > 0 ? pendingCount : null,
    },
    {
      name: "Products / Inventory",
      href: "/admin/products",
      icon: Package,
      badge: null,
    },
    {
      name: "Combo Packs",
      href: "/admin/combos",
      icon: Flame,
      badge: null,
    },
    {
      name: "Customer Inquiries",
      href: "/admin/inquiries",
      icon: MessageSquare,
      badge: unreadInquiries > 0 ? unreadInquiries : null,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F6F4] flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#542A0C] text-white shrink-0 border-r border-[#3d1d07] shadow-xl">
        {/* Brand Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-400 text-[#542A0C] flex items-center justify-center font-black text-sm">
              WV
            </div>
            <div>
              <div className="font-black text-base tracking-tight leading-none text-white">
                Watch<span className="text-amber-300">Vault</span>
              </div>
              <span className="text-[9px] uppercase tracking-wider text-amber-200/70 font-bold">
                Admin Console
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-white/15 text-white shadow-inner font-bold"
                    : "text-amber-100/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-amber-300" />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className="bg-amber-400 text-stone-950 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Back to Live Store footer link */}
        <div className="p-4 border-t border-white/10 space-y-2">
          <Link
            href="/"
            className="flex items-center justify-between p-2 rounded-lg bg-white/5 hover:bg-white/10 text-amber-200 text-xs transition-colors"
          >
            <div className="flex items-center gap-2">
              <Store className="w-4 h-4" />
              <span>View Live Store</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <Link
            href="/dashboard"
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/5 text-amber-200/80 text-xs transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Customer Dashboard</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-white border-b border-stone-200/80 sticky top-0 z-30 px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="text-sm font-bold text-gray-800 hidden sm:block">
              WatchVault Administration
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 rounded-lg text-xs font-semibold text-gray-700 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Contact Page</span>
            </Link>

            <Link
              href="/"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 rounded-lg text-xs font-semibold text-gray-700 transition-colors"
            >
              <Store className="w-3.5 h-3.5" />
              <span>Live Website</span>
            </Link>

            <div className="w-8 h-8 rounded-full bg-[#542A0C] text-white flex items-center justify-center font-bold text-xs">
              AD
            </div>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#542A0C] text-white p-4 space-y-2 border-b border-white/10">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-2 rounded-lg text-xs text-white/90 hover:bg-white/10"
              >
                <span>{item.name}</span>
                {item.badge && (
                  <span className="bg-amber-400 text-stone-900 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
            <div className="pt-2 border-t border-white/10 flex gap-2">
              <Link
                href="/"
                className="flex-1 text-center py-2 bg-white/10 rounded-lg text-xs text-amber-200"
              >
                Live Store
              </Link>
              <Link
                href="/dashboard"
                className="flex-1 text-center py-2 bg-amber-400 text-stone-950 font-bold rounded-lg text-xs"
              >
                User Portal
              </Link>
            </div>
          </div>
        )}

        {/* Nested Page Content with max-w-full */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-full w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
