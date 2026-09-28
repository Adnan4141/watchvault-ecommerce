import { Product } from "./index";

export type OrderStatus = "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";

export interface DashboardOrder {
  id: string;
  orderNumber: string;
  date: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  city: "Dhaka" | "Outside";
  items: {
    product: Product;
    quantity: number;
    price: number;
  }[];
  subtotal: number;
  deliveryFee: number;
  totalAmount: number;
  status: OrderStatus;
  paymentMethod: "Cash on Delivery";
  trackingCode: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: "Dhaka" | "Outside";
  joinedDate: string;
  avatar?: string;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
  status: "Unread" | "Replied" | "Closed";
}
