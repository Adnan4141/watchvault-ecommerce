"use client";

import React from "react";
import Link from "next/link";
import {
  DollarSign,
  ShoppingBag,
  Package,
  TrendingUp,
  Clock,
  ArrowRight,
  ShieldCheck,
  Truck,
  CheckCircle2,
} from "lucide-react";
import { useDashboardStore } from "@/store/useDashboardStore";
import { formatPrice } from "@/lib/utils";
import { OrderStatus } from "@/types/dashboard";

export default function AdminOverviewPage() {
  const { orders, products } = useDashboardStore();

  const totalRevenue = orders
    .filter((o) => o.status !== "Cancelled")
    .reduce((acc, curr) => acc + curr.totalAmount, 0);

  const pendingOrders = orders.filter((o) => o.status === "Pending" || o.status === "Processing").length;
  const inStockCount = products.filter((p) => p.inStock).length;

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case "Pending":
        return <span className="bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full text-xs font-semibold">Pending</span>;
      case "Processing":
        return <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-xs font-semibold">Processing</span>;
      case "Shipped":
        return <span className="bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full text-xs font-semibold">In Transit</span>;
      case "Delivered":
        return <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full text-xs font-semibold">Delivered</span>;
      case "Cancelled":
        return <span className="bg-red-50 text-red-700 px-2 py-0.5 rounded-full text-xs font-semibold">Cancelled</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
          Admin Dashboard Overview
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Real-time summary of sales, orders, and watch inventories in Bangladesh.
        </p>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500">Total Sales (BDT)</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              ৳
            </div>
          </div>
          <div className="text-2xl font-black text-[#542A0C] mt-2">
            {formatPrice(totalRevenue)}
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +18.4% from last week
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500">Total Orders</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-gray-900 mt-2">
            {orders.length}
          </div>
          <div className="text-[11px] text-gray-400 font-medium mt-1">
            All customer bookings
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500">Orders to Fulfill</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-amber-700 mt-2">
            {pendingOrders}
          </div>
          <div className="text-[11px] text-amber-600 font-semibold mt-1">
            Requires delivery dispatch
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500">Active Watches</span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-gray-900 mt-2">
            {inStockCount} <span className="text-xs text-gray-400 font-normal">/ {products.length}</span>
          </div>
          <div className="text-[11px] text-purple-600 font-semibold mt-1">
            Available in catalog
          </div>
        </div>
      </div>

      {/* Recent Orders Overview */}
      <div className="bg-white rounded-2xl border border-stone-200/80 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-gray-900">Recent Customer Orders</h3>
            <p className="text-[11px] text-gray-500">Live order streams requiring processing or delivery</p>
          </div>
          <Link
            href="/admin/orders"
            className="text-xs font-bold text-[#542A0C] hover:underline flex items-center gap-1"
          >
            <span>Manage All Orders</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-b border-gray-100 text-gray-500 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-4">Order ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Delivery Region</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Payment</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id} className="hover:bg-stone-50/50">
                  <td className="p-4 font-bold text-gray-900">{order.orderNumber}</td>
                  <td className="p-4">
                    <div className="font-semibold text-gray-900">{order.customerName}</div>
                    <div className="text-[11px] text-gray-400">{order.customerPhone}</div>
                  </td>
                  <td className="p-4">{order.city === "Dhaka" ? "Inside Dhaka" : "Outside Dhaka"}</td>
                  <td className="p-4 font-bold text-[#542A0C]">{formatPrice(order.totalAmount)}</td>
                  <td className="p-4">{order.paymentMethod}</td>
                  <td className="p-4">{getStatusBadge(order.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
