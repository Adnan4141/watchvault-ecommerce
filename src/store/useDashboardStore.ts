import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DashboardOrder, OrderStatus, UserProfile, ContactInquiry } from "@/types/dashboard";
import { Product } from "@/types";
import { products as initialProducts } from "@/data/products";

interface DashboardStore {
  user: UserProfile;
  orders: DashboardOrder[];
  products: Product[];
  wishlist: Product[];
  inquiries: ContactInquiry[];
  
  // User Actions
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  addInquiry: (inquiry: Omit<ContactInquiry, "id" | "date" | "status">) => void;

  // Admin Actions
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  addProduct: (product: Omit<Product, "id">) => void;
  toggleProductStock: (productId: string) => void;
  deleteProduct: (productId: string) => void;
  updateInquiryStatus: (inquiryId: string, status: ContactInquiry["status"]) => void;
  deleteInquiry: (inquiryId: string) => void;
}

const mockOrders: DashboardOrder[] = [
  {
    id: "ord-1",
    orderNumber: "WV-892104",
    date: "2026-09-27",
    customerName: "Adnan Hossain",
    customerPhone: "01883671140",
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
    customerName: "Adnan Hossain",
    customerPhone: "01883671140",
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

const mockInquiries: ContactInquiry[] = [
  {
    id: "inq-1",
    name: "Tanvir Ahmed",
    email: "tanvir@example.com",
    phone: "01755-123456",
    subject: "Warranty & Servicing for Binbond 2521",
    message: "I received the Binbond watch yesterday. Does the 1-year warranty cover battery replacements and glass scratches?",
    date: "2026-09-28",
    status: "Unread",
  },
  {
    id: "inq-2",
    name: "Farhana Islam",
    email: "farhana.i@gmail.com",
    phone: "01819-987654",
    subject: "Corporate Bulk Order Inquiry",
    message: "We need 25 units of POEDAGAR 866 watches for corporate gifts. Could you provide a quotation and delivery timeline for Sylhet?",
    date: "2026-09-27",
    status: "Replied",
  },
  {
    id: "inq-3",
    name: "Shakil Khan",
    email: "shakil.k@hotmail.com",
    phone: "01912-334455",
    subject: "Delivery address modification for order WV-892104",
    message: "Please deliver after 4 PM at Dhanmondi. Thank you!",
    date: "2026-09-27",
    status: "Closed",
  },
];

export const useDashboardStore = create<DashboardStore>()(
  persist(
    (set, get) => ({
      user: {
        name: "Adnan Hossain",
        email: "adnan@example.com",
        phone: "01883671140",
        address: "House 12, Road 5, Dhanmondi",
        city: "Dhaka",
        joinedDate: "September 2026",
      },
      orders: mockOrders,
      products: initialProducts,
      wishlist: [initialProducts[0], initialProducts[2]],
      inquiries: mockInquiries,

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

      addInquiry: (inquiryData) => {
        const newInquiry: ContactInquiry = {
          ...inquiryData,
          id: `inq-${Date.now()}`,
          date: new Date().toISOString().split("T")[0],
          status: "Unread",
        };
        set((state) => ({ inquiries: [newInquiry, ...state.inquiries] }));
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

      updateInquiryStatus: (inquiryId, status) => {
        set((state) => ({
          inquiries: state.inquiries.map((inq) =>
            inq.id === inquiryId ? { ...inq, status } : inq
          ),
        }));
      },

      deleteInquiry: (inquiryId) => {
        set((state) => ({
          inquiries: state.inquiries.filter((inq) => inq.id !== inquiryId),
        }));
      },
    }),
    {
      name: "watchvault-dashboard-storage",
    }
  )
);
