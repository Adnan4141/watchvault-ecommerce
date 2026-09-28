export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  image: string;
  currentPrice: number;
  originalPrice: number;
  discountPercentage: number;
  color?: string;
  model?: string;
  inStock: boolean;
  description: string;
  features?: string[];
}

export interface Category {
  id: string;
  name: string;
  image: string;
  itemCount: number;
  slug: string;
}

export interface HeroBanner {
  id: string;
  title: string;
  subtitle: string;
  desktopImage: string;
  mobileImage: string;
  link: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
