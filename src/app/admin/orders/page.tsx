"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Truck,
  XCircle,
  Eye,
  SlidersHorizontal,
} from "lucide-react";
import { useDashboardStore } from "@/store/useDashboardStore";
import { formatPrice } from "@/lib/utils";
import { DashboardOrder, OrderStatus } from "@/types/dashboard";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus } = useDashboardStore();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [selectedOrder, setSelectedOrder] = useState<DashboardOrder | null>(null);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      search.trim() === "" ||
      order.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      order.customerName.toLowerCase().includes(search.toLowerCase()) ||
      order.customerPhone.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === "All" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const statuses: OrderStatus[] = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
            Orders Management
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Track and change fulfillment stages for Bangladesh Cash on Delivery orders.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by order ID, name, phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#542A0C]"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-hide">
          <button
            onClick={() => setStatusFilter("All")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
              statusFilter === "All"
                ? "bg-[#542A0C] text-white"
                : "bg-stone-50 text-gray-600 hover:bg-stone-100"
            }`}
          >
            All Orders ({orders.length})
          </button>
          {statuses.map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
                statusFilter === st
                  ? "bg-[#542A0C] text-white"
                  : "bg-stone-50 text-gray-600 hover:bg-stone-100"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-stone-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-b border-gray-100 text-gray-500 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-4">Order ID & Date</th>
                <th className="p-4">Customer Details</th>
                <th className="p-4">Items Summary</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Change Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-stone-50/50">
                  <td className="p-4">
                    <div className="font-bold text-gray-900">{order.orderNumber}</div>
                    <div className="text-[11px] text-gray-400">{order.date}</div>
                  </td>

                  <td className="p-4">
                    <div className="font-semibold text-gray-900">{order.customerName}</div>
                    <div className="text-[11px] text-gray-500">{order.customerPhone}</div>
                    <div className="text-[10px] text-gray-400 truncate max-w-xs">{order.customerAddress}</div>
                  </td>

                  <td className="p-4">
                    <div className="font-medium text-gray-900">
                      {order.items.length} item(s)
                    </div>
                    <div className="text-[10px] text-gray-500">
                      {order.items[0]?.product.name.slice(0, 24)}...
                    </div>
                  </td>

                  <td className="p-4 font-bold text-[#542A0C]">
                    {formatPrice(order.totalAmount)}
                  </td>

                  <td className="p-4">
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                      className={`text-xs font-semibold px-2.5 py-1 rounded-lg border outline-none cursor-pointer ${
                        order.status === "Delivered"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : order.status === "Shipped"
                          ? "bg-purple-50 text-purple-700 border-purple-200"
                          : order.status === "Processing"
                          ? "bg-blue-50 text-blue-700 border-blue-200"
                          : order.status === "Cancelled"
                          ? "bg-red-50 text-red-700 border-red-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                      }`}
                    >
                      {statuses.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td className="p-4 text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedOrder(order)}
                      className="text-xs h-8"
                    >
                      <Eye className="w-3.5 h-3.5 mr-1" /> View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      <Modal
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        title={selectedOrder ? `Order: ${selectedOrder.orderNumber}` : ""}
      >
        {selectedOrder && (
          <div className="space-y-4 text-xs">
            <div className="bg-stone-50 p-3 rounded-lg border border-stone-200">
              <div className="font-bold text-gray-800">Customer Info:</div>
              <div>{selectedOrder.customerName} ({selectedOrder.customerPhone})</div>
              <div>Address: {selectedOrder.customerAddress}</div>
              <div>Region: {selectedOrder.city}</div>
            </div>

            <div className="space-y-2">
              <div className="font-bold text-gray-800">Order Items:</div>
              {selectedOrder.items.map((it, i) => (
                <div key={i} className="flex justify-between items-center py-1 border-b border-gray-100">
                  <span>{it.product.name} × {it.quantity}</span>
                  <span className="font-bold">{formatPrice(it.price * it.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-gray-200 flex justify-between font-bold text-sm">
              <span>Total Payable:</span>
              <span className="text-[#542A0C]">{formatPrice(selectedOrder.totalAmount)}</span>
            </div>

            <div className="pt-2">
              <Button onClick={() => setSelectedOrder(null)} className="w-full">
                Done
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
