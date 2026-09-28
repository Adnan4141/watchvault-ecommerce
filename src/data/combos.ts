import { ComboOffer } from "@/types";

export const initialComboOffers: ComboOffer[] = [
  {
    id: "combo-1",
    title: "Executive Gentleman Duo Pack",
    subtitle: "POEDAGAR 866 Business Watch + Stainless Bangle + Box",
    badge: "🔥 Best Value Combo",
    image: "/images/products/combo-executive-duo.jpg",
    includedItems: [
      "POEDAGAR 866 Luxury Square Watch (Gold/Silver)",
      "Polished Titanium Stainless Steel Bangle",
      "Signature WatchVault Wooden Gift Box",
      "1-Year International Warranty Card",
    ],
    currentPrice: 1450,
    originalPrice: 2800,
    discountPercentage: 48,
    savings: 1350,
  },
  {
    id: "combo-2",
    title: "Eternal Royal Couple Set",
    subtitle: "His & Hers Matching Luxury Quartz Watches with Calendar",
    badge: "💑 Wedding Favorite",
    image: "/images/products/combo-royal-couple-box.jpg",
    includedItems: [
      "Olevs 9931 Men's Edition (41mm Royal Blue)",
      "Olevs 9931 Women's Edition (32mm Royal Blue)",
      "Dual Luxury Velvet Cushion Gift Casket",
      "Free Strap Size Adjustment Tool Included",
    ],
    currentPrice: 1950,
    originalPrice: 3800,
    discountPercentage: 49,
    savings: 1850,
  },
  {
    id: "combo-3",
    title: "Vintage Chrono & Leather Pack",
    subtitle: "NAVIFORCE Military Watch + Genuine Leather Strap",
    badge: "⚡ Limited Eid Stock",
    image: "/images/products/combo-vintage-chronograph.jpg",
    includedItems: [
      "NAVIFORCE 9182 Waterproof Military Chrono",
      "Interchangeable Genuine Brown Calfskin Strap",
      "Heavy-duty Tactical Protective Tin Case",
      "Microfiber Watch Cleaning Cloth",
    ],
    currentPrice: 1650,
    originalPrice: 3200,
    discountPercentage: 48,
    savings: 1550,
  },
  {
    id: "combo-4",
    title: "Blackout Stealth Special Pack",
    subtitle: "Binbond 2521 Diamond Cut Watch + Tactical Multi-tool Pen",
    badge: "🖤 All-Black Edition",
    image: "/images/products/combo-blackout-tactical.jpg",
    includedItems: [
      "Binbond 2521 Full Black Prism Cut Wristwatch",
      "Matte Black Tactical Aviation Aluminum Pen",
      "Extra Japanese Maxell Battery Included",
      "Luxury Matte Black Velvet Storage Pouch",
    ],
    currentPrice: 1390,
    originalPrice: 2600,
    discountPercentage: 46,
    savings: 1210,
  },
];

export const comboOffers = initialComboOffers;
