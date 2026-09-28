import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DashboardOrder, OrderStatus, UserProfile } from "@/types/dashboard";
import { Product } from "@/types";
import { products as initialProducts } from "@/data/products";

interface DashboardStore {
  user: UserProfile;
  orders: DashboardOrder[];
  products: Product[];
  wishlist: Product[];
  
  // User Actions
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;

  // Admin Actions
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  addProduct: (product: Omit<Product, "id">) => void;
  toggleProductStock: (productId: string) => void;
  deleteProduct: (productId: string) => void;
}

const mockOrders: DashboardOrder[] = [
  {
    id: "ord-1",
    orderNumber: "WV-892104",
    date: "2026-09-27",
    customerName: "Adnan Rahman",
    customerPhone: "01712-345678",
    customerAddress: "House 12, Road 5, Dhanmondi",
    city: "Dhaka",
    items: [
      {
        product: initialProducts[0],
        quantity: 1,
        price: initialProducts[0].currentPrice,
      },
    ],
    subtotal: 850,
    deliveryFee: 60,
    totalAmount: 910,
    status: "Processing",
    paymentMethod: "Cash on Delivery",
    trackingCode: "TRK-WV-44912",
  },
  {
    id: "ord-2",
    orderNumber: "WV-887412",
    date: "2026-09-24",
    customerName: "Mahmud Hasan",
    customerPhone: "01823-456789",
    customerAddress: "GEC Circle, Nasirabad",
    city: "Outside",
    items: [
      {
        product: initialProducts[1],
        quantity: 1,
        price: initialProducts[1].currentPrice,
      },
    ],
    subtotal: 1100,
    deliveryFee: 120,
    totalAmount: 1220,
    status: "Shipped",
    paymentMethod: "Cash on Delivery",
    trackingCode: "TRK-WV-43890",
  },
  {
    id: "ord-3",
    orderNumber: "WV-865190",
    date: "2026-09-18",
    customerName: "Adnan Rahman",
    customerPhone: "01712-345678",
    customerAddress: "House 12, Road 5, Dhanmondi",
    city: "Dhaka",
    items: [
      {
        product: initialProducts[2],
        quantity: 2,
        price: initialProducts[2].currentPrice,
      },
    ],
    subtotal: 1740,
    deliveryFee: 60,
    totalAmount: 1800,
    status: "Delivered",
    paymentMethod: "Cash on Delivery",
    trackingCode: "TRK-WV-39104",
  },
];

export const useDashboardStore = create<DashboardStore>()(
  persist(
    (set, get) => ({
      user: {
        name: "Adnan Rahman",
        email: "adnan@example.com",
        phone: "01712-345678",
        address: "House 12, Road 5, Dhanmondi",
        city: "Dhaka",
        joinedDate: "September 2026",
      },
      orders: mockOrders,
      products: initialProducts,
      wishlist: [initialProducts[0], initialProducts[2]],

      updateUserProfile: (profile) => {
        set((state) => ({ user: { ...state.user, ...profile } }));
      },

      toggleWishlist: (product) => {
        set((state) => {
          const exists = state.wishlist.some((p) => p.id === product.id);
          if (exists) {
            return { wishlist: state.wishlist.filter((p) => p.id !== product.id) };
          }
          return { wishlist: [...state.wishlist, product] };
        });
      },

      isInWishlist: (productId) => {
        return get().wishlist.some((p) => p.id === productId);
      },

      updateOrderStatus: (orderId, status) => {
        set((state) => ({
          orders: state.orders.map((o) =>
            o.id === orderId ? { ...o, status } : o
          ),
        }));
      },

      addProduct: (newProdData) => {
        const id = `watch-${Date.now()}`;
        const newProduct: Product = { ...newProdData, id };
        set((state) => ({ products: [newProduct, ...state.products] }));
      },

      toggleProductStock: (productId) => {
        set((state) => ({
          products: state.products.map((p) =>
            p.id === productId ? { ...p, inStock: !p.inStock } : p
          ),
        }));
      },

      deleteProduct: (productId) => {
        set((state) => ({
          products: state.products.filter((p) => p.id !== productId),
        }));
      },
    }),
    {
      name: "watchvault-dashboard-storage",
    }
  )
);
