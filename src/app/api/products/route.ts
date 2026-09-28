import { NextResponse } from "next/server";
import { products, categories, heroBanners } from "@/data/products";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const brand = searchParams.get("brand");
  const query = searchParams.get("q");

  let filtered = [...products];

  if (category && category !== "All") {
    filtered = filtered.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (brand && brand !== "All") {
    filtered = filtered.filter(
      (p) => p.brand.toLowerCase() === brand.toLowerCase()
    );
  }

  if (query) {
    const q = query.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        (p.color && p.color.toLowerCase().includes(q))
    );
  }

  return NextResponse.json({
    banners: heroBanners,
    categories,
    products: filtered,
    total: filtered.length,
  });
}
