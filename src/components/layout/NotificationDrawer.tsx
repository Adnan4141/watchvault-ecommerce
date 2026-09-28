"use client";

import React from "react";
import Link from "next/link";
import { X, Bell, Sparkles, Tag, Truck, CheckCircle2, Clock } from "lucide-react";

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationDrawer({ isOpen, onClose }: NotificationDrawerProps) {
  if (!isOpen) return null;

  const notifications = [
    {
      id: "notif-1",
      icon: Sparkles,
      iconBg: "bg-amber-100 text-[#542A0C]",
      title: "Eid Special Flash Sale Live! 🎉",
      message: "Up to 50% discount on POEDAGAR 866 and Binbond 2521 luxury diamond glass series.",
      time: "10 mins ago",
      unread: true,
      link: "/",
    },
    {
      id: "notif-2",
      icon: Truck,
      iconBg: "bg-blue-100 text-blue-700",
      title: "Order WV-892104 In Transit",
      message: "Your wristwatch order is out for courier dispatch via Fast Express Delivery in Dhaka.",
      time: "2 hours ago",
      unread: true,
      link: "/dashboard",
    },
    {
      id: "notif-3",
      icon: Tag,
      iconBg: "bg-emerald-100 text-emerald-700",
      title: "New Couple Collection Added",
      message: "Check out the newly arrived Olevs 9931 Royal Blue matching couple wristwatch edition.",
      time: "1 day ago",
      unread: false,
      link: "/",
    },
    {
      id: "notif-4",
      icon: CheckCircle2,
      iconBg: "bg-purple-100 text-purple-700",
      title: "Cash on Delivery Guarantee",
      message: "Inspect your watch upon delivery before payment. 7-day hassle-free replacement warranty.",
      time: "2 days ago",
      unread: false,
      link: "/contact",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-sm bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-stone-50/70">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-[#542A0C]">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm">Notifications</h3>
                <span className="text-[10px] text-gray-500">2 unread notifications</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-1 rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
            {notifications.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.id}
                  href={item.link}
                  onClick={onClose}
                  className={`p-4 flex gap-3 hover:bg-stone-50 transition-colors block ${
                    item.unread ? "bg-amber-50/25" : ""
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${item.iconBg}`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <h4 className="text-xs font-bold text-gray-900 truncate">
                        {item.title}
                      </h4>
                      {item.unread && (
                        <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                      )}
                    </div>
                    <p className="text-[11px] text-gray-600 leading-relaxed line-clamp-2">
                      {item.message}
                    </p>
                    <div className="flex items-center gap-1 text-[10px] text-gray-400 mt-1">
                      <Clock className="w-3 h-3" />
                      <span>{item.time}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-gray-100 bg-stone-50 text-center">
            <Link
              href="/dashboard"
              onClick={onClose}
              className="text-xs font-bold text-[#542A0C] hover:underline"
            >
              View Order Tracking in Dashboard →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
