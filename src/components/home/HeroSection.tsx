"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Truck,
  Headset,
  Store,
  Download,
} from "lucide-react";
import { heroBanners } from "@/data/products";

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroBanners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? heroBanners.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroBanners.length);
  };

  const features = [
    { icon: ShieldCheck, title: "100% Original", desc: "Authentic Products" },
    { icon: Truck, title: "Fast Delivery", desc: "Across Bangladesh" },
    { icon: Headset, title: "24/7 Support", desc: "Dedicated Assistance" },
    { icon: Store, title: "Store", desc: "Authorized Outlets" },
    { icon: Download, title: "Download App", desc: "Exclusive Offers" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 h-auto">
        {/* Left 9-col: Hero Carousel */}
        <div className="lg:col-span-9 h-full rounded-xl overflow-hidden relative z-0">
          <div className="relative w-full aspect-[2/1] md:aspect-[3.2/1] overflow-hidden rounded-xl bg-gray-50 group border border-gray-100 shadow-xs touch-pan-y">
            <div
              className="flex h-full transition-transform duration-700 ease-in-out will-change-transform"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {heroBanners.map((banner, index) => (
                <div key={banner.id} className="relative min-w-full h-full">
                  <div className="hidden md:block w-full h-full relative">
                    <Image
                      src={banner.desktopImage}
                      alt={banner.title}
                      fill
                      priority={index === 0}
                      className="object-cover"
                      sizes="(min-width: 1024px) 75vw, 100vw"
                    />
                  </div>
                  <div className="block md:hidden w-full h-full relative">
                    <Image
                      src={banner.mobileImage}
                      alt={banner.title}
                      fill
                      priority={index === 0}
                      className="object-cover"
                      sizes="100vw"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                </div>
              ))}
            </div>

            <button
              onClick={prevSlide}
              aria-label="Previous Slide"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white text-gray-800 rounded-full items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-md z-10 hidden sm:flex cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next Slide"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 hover:bg-white text-gray-800 rounded-full items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-md z-10 hidden sm:flex cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {heroBanners.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 shadow-xs cursor-pointer ${
                    currentSlide === idx
                      ? "w-5 bg-[#542A0C]"
                      : "w-1.5 bg-white/80 hover:bg-white"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right 3-col: Feature Highlights */}
        <div className="lg:col-span-3 flex flex-col h-full">
          <div className="bg-white rounded-xl shadow-[0_2px_15px_rgba(0,0,0,0.03)] border border-gray-100 h-full overflow-hidden flex flex-col p-2 sm:p-2.5">
            <div className="grid grid-cols-4 gap-1 sm:gap-2 lg:hidden">
              {features.slice(0, 4).map((f, i) => {
                const Icon = f.icon;
                return (
                  <div
                    key={i}
                    className="animated-feature-bg border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)] flex flex-col items-center gap-1 sm:gap-1.5 group cursor-pointer text-center w-full p-1 sm:p-1.5 rounded-xl transition-all active:scale-95"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#fcf9f7] flex items-center justify-center shrink-0 shadow-xs border border-stone-100 group-hover:bg-[#542A0C] transition-colors">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#542A0C] group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col items-center w-full">
                      <h4 className="font-medium text-[9px] xs:text-[10px] sm:text-xs text-gray-800 leading-tight group-hover:text-[#542A0C] transition-colors truncate w-full">
                        {f.title}
                      </h4>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="hidden lg:flex flex-col gap-1.5 flex-grow justify-center">
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <div
                    key={i}
                    className="animated-feature-bg border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)] group flex items-center gap-2.5 cursor-pointer w-full py-2 px-3 rounded-lg transition-all active:scale-95 hover:border-[#542A0C]/20"
                  >
                    <div className="w-8 h-8 rounded-full bg-stone-50 flex items-center justify-center shrink-0 shadow-xs border border-gray-100 group-hover:bg-[#542A0C] transition-colors duration-300">
                      <Icon className="w-4 h-4 text-[#542A0C] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col items-start w-full">
                      <h4 className="font-medium text-xs text-gray-800 leading-tight group-hover:text-[#542A0C] transition-colors whitespace-nowrap">
                        {f.title}
                      </h4>
                      <span className="text-[10px] text-gray-400 group-hover:text-gray-600">
                        {f.desc}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
