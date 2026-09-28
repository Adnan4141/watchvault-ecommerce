"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  MessageSquare,
  ShieldCheck,
  Truck,
  RotateCcw,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useDashboardStore } from "@/store/useDashboardStore";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  const { addInquiry } = useDashboardStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    addInquiry({
      name,
      email,
      phone,
      subject: subject || "Customer Inquiry",
      message,
    });

    setSubmitted(true);
    setName("");
    setEmail("");
    setPhone("");
    setSubject("");
    setMessage("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F6]">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Page Banner */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-[#542A0C] text-xs font-bold mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>24/7 Dedicated Support</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight">
            We&apos;re Here to Help
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            Have questions about your watch order, warranty claims, or corporate bulk gifting? Send us a message and our support team will respond promptly.
          </p>
        </div>

        {/* 2-Column Contact Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 5-col: Contact Information & Hub */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#542A0C] text-white rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none" />

              <h3 className="text-xl font-bold mb-2">Customer Care Center</h3>
              <p className="text-white/70 text-xs leading-relaxed mb-6">
                Our support team operates 7 days a week from 10:00 AM to 10:00 PM to help you with watch inquiries, orders, and after-sales support.
              </p>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/15">
                    <Phone className="w-4 h-4 text-amber-300" />
                  </div>
                  <div>
                    <div className="text-amber-200/80 font-medium text-[11px]">Direct Hotline</div>
                    <div className="font-bold text-sm text-white">+880 1883-671140</div>
                    <div className="text-white/50 text-[10px]">10:00 AM – 10:00 PM Everyday</div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/15">
                    <Mail className="w-4 h-4 text-amber-300" />
                  </div>
                  <div>
                    <div className="text-amber-200/80 font-medium text-[11px]">Official Email</div>
                    <div className="font-bold text-sm text-white">support@watchvault.com.bd</div>
                    <div className="text-white/50 text-[10px]">Average response: Under 3 hours</div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/15">
                    <MapPin className="w-4 h-4 text-amber-300" />
                  </div>
                  <div>
                    <div className="text-amber-200/80 font-medium text-[11px]">Corporate Office & Display Center</div>
                    <div className="font-bold text-sm text-white">WatchVault Flagship Outlet</div>
                    <div className="text-white/60 text-[11px]">House 12, Road 5, Dhanmondi, Dhaka 1205</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Guarantees Box */}
            <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-xs space-y-4">
              <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider">
                WatchVault Guarantees
              </h4>

              <div className="grid grid-cols-1 gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <span className="text-gray-700 font-medium">100% Genuine Certified Brand Watches</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Truck className="w-4 h-4" />
                  </div>
                  <span className="text-gray-700 font-medium">Fast Cash on Delivery across 64 Districts</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                    <RotateCcw className="w-4 h-4" />
                  </div>
                  <span className="text-gray-700 font-medium">7-Day Replacement Checking Warranty</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right 7-col: Send Inquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/80 shadow-xs">
            <h3 className="text-lg font-bold text-gray-900 mb-1">Send Us a Direct Inquiry</h3>
            <p className="text-xs text-gray-500 mb-6">
              Fill in your contact information and details. Your submission will instantly appear in our store administrator panel.
            </p>

            {submitted ? (
              <div className="text-center py-10 space-y-3 bg-emerald-50/50 rounded-xl border border-emerald-100 p-6 animate-in zoom-in-95 duration-300">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-base font-bold text-gray-900">
                  Inquiry Sent Successfully!
                </h4>
                <p className="text-xs text-gray-600 max-w-sm mx-auto">
                  Thank you! Your message has been logged in our support registry. An agent will contact you via email or phone shortly.
                </p>
                <div className="pt-2">
                  <Button
                    onClick={() => setSubmitted(false)}
                    variant="outline"
                    size="sm"
                  >
                    Send Another Message
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Shakil Ahmed"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-[#542A0C]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="shakil@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-[#542A0C]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Mobile Phone (Optional)</label>
                    <input
                      type="tel"
                      placeholder="01883671140"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-[#542A0C]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-gray-700 mb-1">Subject</label>
                    <input
                      type="text"
                      placeholder="e.g. Order Tracking or Warranty question"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-[#542A0C]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Your Message / Query *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your inquiry with as much detail as possible..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-[#542A0C]"
                  />
                </div>

                <Button type="submit" className="w-full py-3 font-bold flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry</span>
                </Button>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
