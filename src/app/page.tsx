import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/home/HeroSection";
import { CategorySection } from "@/components/home/CategorySection";
import { ProductGrid } from "@/components/home/ProductGrid";
import { ComboSection } from "@/components/home/ComboSection";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fcfbfa]">
      <Header />
      <main className="flex-1 space-y-4 pb-12">
        {/* Hero Banner Carousel & Trust Badges */}
        <HeroSection />

        {/* Category Navigation Strip */}
        <CategorySection />

        {/* WatchVault Exclusive Combo & Gift Packs Section */}
        <ComboSection />

        {/* New & Trending Watch Grid */}
        <ProductGrid />
      </main>
      <CartDrawer />
      <Footer />
    </div>
  );
}
