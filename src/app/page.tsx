import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/home/HeroSection";
import { CategorySection } from "@/components/home/CategorySection";
import { ProductGrid } from "@/components/home/ProductGrid";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fcfbfa]">
      {/* Sticky Header with Navigation & Search */}
      <Header />

      {/* Main Content Sections */}
      <main className="flex-1 space-y-3 pb-12">
        {/* Hero Carousel & Quick Feature sidebar */}
        <HeroSection />

        {/* Shop by Category bar & Offer Banner */}
        <CategorySection />

        {/* New & Trending Watch Grid */}
        <ProductGrid />
      </main>

      {/* Slide-out Cart & Checkout Drawer */}
      <CartDrawer />

      {/* Footer */}
      <Footer />
    </div>
  );
}
