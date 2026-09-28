"use client";

import React, { useState } from "react";
import {
  MessageSquare,
  Search,
  CheckCircle2,
  Trash2,
  Clock,
  Eye,
  Mail,
  Phone,
  Calendar,
} from "lucide-react";
import { useDashboardStore } from "@/store/useDashboardStore";
import { ContactInquiry } from "@/types/dashboard";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

export default function AdminInquiriesPage() {
  const { inquiries, updateInquiryStatus, deleteInquiry } = useDashboardStore();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [selectedInquiry, setSelectedInquiry] = useState<ContactInquiry | null>(null);

  const filtered = inquiries.filter((inq) => {
    const matchesSearch =
      search.trim() === "" ||
      inq.name.toLowerCase().includes(search.toLowerCase()) ||
      inq.email.toLowerCase().includes(search.toLowerCase()) ||
      inq.subject.toLowerCase().includes(search.toLowerCase()) ||
      (inq.phone && inq.phone.includes(search));

    const matchesStatus = statusFilter === "All" || inq.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: ContactInquiry["status"]) => {
    switch (status) {
      case "Unread":
        return <span className="bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full text-[11px] font-bold">● Unread</span>;
      case "Replied":
        return <span className="bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.5 rounded-full text-[11px] font-bold">✓ Replied</span>;
      case "Closed":
        return <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-[11px] font-bold">Closed</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
            Customer Inquiries & Messages
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Review and respond to questions submitted from the public Contact page.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-stone-200/80 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by customer name, email, subject..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#542A0C]"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-hide">
          {["All", "Unread", "Replied", "Closed"].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap cursor-pointer transition-all ${
                statusFilter === st
                  ? "bg-[#542A0C] text-white"
                  : "bg-stone-50 text-gray-600 hover:bg-stone-100"
              }`}
            >
              {st} {st === "Unread" && `(${inquiries.filter((i) => i.status === "Unread").length})`}
            </button>
          ))}
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="bg-white rounded-2xl border border-stone-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-b border-gray-100 text-gray-500 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-4">Sender & Date</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Subject & Snippet</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {filtered.map((inq) => (
                <tr
                  key={inq.id}
                  className={`hover:bg-stone-50/50 ${
                    inq.status === "Unread" ? "bg-amber-50/30 font-medium" : ""
                  }`}
                >
                  <td className="p-4">
                    <div className="font-bold text-gray-900">{inq.name}</div>
                    <div className="text-[11px] text-gray-400">{inq.date}</div>
                  </td>

                  <td className="p-4">
                    <div className="text-gray-900 font-semibold">{inq.email}</div>
                    <div className="text-[11px] text-gray-500">{inq.phone || "No phone"}</div>
                  </td>

                  <td className="p-4 max-w-xs">
                    <div className="font-semibold text-gray-900 truncate">{inq.subject}</div>
                    <div className="text-[11px] text-gray-500 truncate">{inq.message}</div>
                  </td>

                  <td className="p-4">
                    <select
                      value={inq.status}
                      onChange={(e) =>
                        updateInquiryStatus(inq.id, e.target.value as ContactInquiry["status"])
                      }
                      className="text-xs font-semibold px-2 py-1 rounded-lg border border-gray-200 bg-white outline-none cursor-pointer"
                    >
                      <option value="Unread">Unread</option>
                      <option value="Replied">Replied</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </td>

                  <td className="p-4 text-right space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedInquiry(inq);
                        if (inq.status === "Unread") {
                          updateInquiryStatus(inq.id, "Replied");
                        }
                      }}
                      className="text-xs h-8"
                    >
                      <Eye className="w-3.5 h-3.5 mr-1" /> View
                    </Button>

                    <button
                      onClick={() => {
                        if (confirm("Delete this inquiry?")) {
                          deleteInquiry(inq.id);
                        }
                      }}
                      className="p-1.5 text-gray-400 hover:text-red-600 rounded-md"
                      title="Delete"
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

      {/* View Message Modal */}
      <Modal
        isOpen={!!selectedInquiry}
        onClose={() => setSelectedInquiry(null)}
        title={selectedInquiry ? `Inquiry from ${selectedInquiry.name}` : ""}
      >
        {selectedInquiry && (
          <div className="space-y-4 text-xs">
            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-1">
              <div className="flex justify-between">
                <span className="font-bold text-gray-800">Sender:</span>
                <span className="text-gray-900">{selectedInquiry.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-gray-800">Email:</span>
                <a href={`mailto:${selectedInquiry.email}`} className="text-[#542A0C] font-semibold underline">
                  {selectedInquiry.email}
                </a>
              </div>
              {selectedInquiry.phone && (
                <div className="flex justify-between">
                  <span className="font-bold text-gray-800">Phone:</span>
                  <a href={`tel:${selectedInquiry.phone}`} className="text-[#542A0C] font-semibold">
                    {selectedInquiry.phone}
                  </a>
                </div>
              )}
              <div className="flex justify-between">
                <span className="font-bold text-gray-800">Received Date:</span>
                <span className="text-gray-600">{selectedInquiry.date}</span>
              </div>
            </div>

            <div>
              <div className="font-bold text-gray-800 text-sm mb-1">{selectedInquiry.subject}</div>
              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 text-gray-700 leading-relaxed whitespace-pre-wrap">
                {selectedInquiry.message}
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              <a
                href={`mailto:${selectedInquiry.email}?subject=Re: ${encodeURIComponent(selectedInquiry.subject)}`}
                className="flex-1 bg-[#542A0C] text-white py-2 rounded-lg font-bold text-center hover:bg-[#3d1d07] flex items-center justify-center gap-1.5"
              >
                <Mail className="w-4 h-4" /> Reply via Email
              </a>
              <Button
                variant="outline"
                onClick={() => setSelectedInquiry(null)}
                className="flex-1"
              >
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
