import React from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Truck,
  RotateCcw,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#241306] text-stone-300 pt-12 pb-8 border-t border-[#3d1d07]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-10 border-b border-stone-800 text-center sm:text-left">
          <div className="flex items-center gap-4 bg-stone-900/40 p-4 rounded-xl border border-stone-800">
            <div className="w-12 h-12 rounded-full bg-[#542A0C] flex items-center justify-center text-amber-300 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">100% Original Watches</h4>
              <p className="text-xs text-stone-400">Directly sourced brand authentic wristwatches.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-stone-900/40 p-4 rounded-xl border border-stone-800">
            <div className="w-12 h-12 rounded-full bg-[#542A0C] flex items-center justify-center text-amber-300 shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">Fast Cash on Delivery</h4>
              <p className="text-xs text-stone-400">Delivery in 24-48h Dhaka, 72h across Bangladesh.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-stone-900/40 p-4 rounded-xl border border-stone-800">
            <div className="w-12 h-12 rounded-full bg-[#542A0C] flex items-center justify-center text-amber-300 shrink-0">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-sm">7-Day Check Warranty</h4>
              <p className="text-xs text-stone-400">Easy replacement guarantee for defects.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-300 font-black">
                WV
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                Watch<span className="text-amber-400">Vault</span>
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Bangladesh&apos;s most trusted destination for curated premium luxury, business, and casual wristwatches.
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <h4 className="text-white font-bold uppercase tracking-wider text-sm">
              Quick Links
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li><Link href="/" className="hover:text-amber-300">Home</Link></li>
              <li><Link href="#trending" className="hover:text-amber-300">New & Trending</Link></li>
              <li><Link href="#categories" className="hover:text-amber-300">Watch Categories</Link></li>
              <li><Link href="#offers" className="hover:text-amber-300">Special Deals</Link></li>
            </ul>
          </div>

          <div className="space-y-3 text-xs">
            <h4 className="text-white font-bold uppercase tracking-wider text-sm">
              Customer Support
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li><Link href="#" className="hover:text-amber-300">Track Your Order</Link></li>
              <li><Link href="#" className="hover:text-amber-300">Warranty Policy</Link></li>
              <li><Link href="#" className="hover:text-amber-300">Shipping & Delivery</Link></li>
              <li><Link href="#" className="hover:text-amber-300">Privacy & Terms</Link></li>
            </ul>
          </div>

          <div className="space-y-3 text-xs">
            <h4 className="text-white font-bold uppercase tracking-wider text-sm">
              Contact Us
            </h4>
            <div className="space-y-2 text-stone-400">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>+880 1800-000000 (10 AM - 10 PM)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>support@watchvault.com.bd</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-stone-800 text-center text-xs text-stone-500">
          <p>© {new Date().getFullYear()} WatchVault Bangladesh. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
