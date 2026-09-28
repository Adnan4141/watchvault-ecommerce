# WatchVault — Luxury & Everyday Wristwatch E-Commerce

<div align="center">
  <img src="https://watchvaults.vercel.app/icon.svg" width="96" height="96" alt="WatchVault Logo" />
  <h3>Timeless Precision, Delivered Across Bangladesh</h3>
  <p>An enterprise-grade, high-performance full-stack e-commerce application designed for watch commerce with Cash on Delivery, real-time inventory management, order tracking, and an administration console.</p>

  <p>
    <a href="https://watchvaults.vercel.app"><strong>Explore Live Website »</strong></a>
    <br />
    <a href="https://watchvaults.vercel.app/admin">Admin Panel</a>
    ·
    <a href="https://watchvaults.vercel.app/dashboard">Customer Dashboard</a>
    ·
    <a href="https://watchvaults.vercel.app/contact">Support Hub</a>
  </p>
</div>

---

## 🌐 Live Production Links

| Environment | URL | Status |
| :--- | :--- | :--- |
| **Production Store** | [https://watchvaults.vercel.app](https://watchvaults.vercel.app) | ![Production](https://img.shields.io/badge/Vercel-Live-success?style=flat-square&logo=vercel) |
| **Admin Console** | [https://watchvaults.vercel.app/admin](https://watchvaults.vercel.app/admin) | Active (Full-Width) |
| **Customer Portal** | [https://watchvaults.vercel.app/dashboard](https://watchvaults.vercel.app/dashboard) | Active |
| **Contact Support** | [https://watchvaults.vercel.app/contact](https://watchvaults.vercel.app/contact) | Active |

---

## 🛠️ Modern Tech Stack Architecture

- **Core Framework**: [Next.js 16](https://nextjs.org/) (App Router, Server & Client Components, Turbopack Engine)
- **Language**: [TypeScript](https://www.typescriptlang.org/) with strict type safety
- **Styling & UI**: [Tailwind CSS v4](https://tailwindcss.com/), Radix-inspired Shadcn UI principles, Lucide Icons
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) with persistent local storage middleware
- **Asset Strategy**: High-density local static assets served directly from `/public/images/` with Next.js image optimization
- **Hosting & Edge**: [Vercel](https://vercel.com/) with instant global edge CDN distribution

---

## 🌟 Comprehensive Feature Tour

### 1. 🛍️ Customer Storefront Experience
- **Interactive Hero Carousel**: Auto-sliding luxury banners with slide transitions, responsive aspect ratios for mobile and desktop, and dot/arrow navigation.
- **Brand Story & Features Sidebar**: Highlighted trust factors (100% Original, Fast Delivery, 24/7 Support, Store Outlets, Mobile App).
- **Categorized Shopping Strips**:
  - Couple Collection
  - Men's Collection
  - Ladies' Collection
  - Instant client-side filtering without page reloads.
- **5-Column Responsive Product Grid**:
  - Image hover zoom effects with multi-faceted diamond cut details.
  - Calculated discount tags (`-45%`, `-50%`) with strike-through original prices in Bangladeshi Taka (৳).
  - Quick View details modal.
  - 1-click Add to Cart with live button status confirmation.
- **Slide-out Shopping Cart & Quick Checkout**:
  - Persistent cart state across browser sessions.
  - Real-time quantity increment/decrement and subtotal calculations.
  - Automatic shipping computation (Inside Dhaka ৳60 / Outside Dhaka ৳120).
  - Cash on Delivery order placement form.
- **Slide-out Notification Drawer**:
  - Bell icon in navbar opens a slide-over panel displaying flash sale announcements, order status updates, and new arrivals.

### 2. 👤 Customer Account Dashboard (`/dashboard`)
- **Customer Overview**: User greeting, member status, joined date, email, and contact info (Adnan Hossain).
- **Metric Cards**: Total Orders, In-Transit Shipments, Wishlist Count, Total Amount Spent.
- **4-Stage Visual Delivery Tracker**:
  - Step-by-step progress tracking: `1. Placed` ➔ `2. Confirmed` ➔ `3. In Transit` ➔ `4. Delivered`.
  - Detailed modal view displaying ordered items, subtotal, and destination address.
- **Wishlist Management**: One-click transfer from saved wishlist to active cart.
- **Address Book & Profile Editor**: Update shipping details and contact information.

### 3. 🛡️ Store Administration Console (`/admin`)
- **Fluid Layout**: Designed with `max-w-full w-full mx-auto` for high data density on wide screens.
- **Analytics & Revenue Overview (`/admin`)**:
  - Total Revenue (BDT) with weekly percentage growth indicators.
  - Total orders placed vs. orders requiring dispatch.
  - In-stock inventory count.
  - Live orders stream table.
- **Order Fulfillment Center (`/admin/orders`)**:
  - Real-time status update dropdown (`Pending`, `Processing`, `Shipped`, `Delivered`, `Cancelled`).
  - Search by order number (`WV-XXXXXX`), customer name, or phone.
  - Status filters (`All`, `Pending`, `Processing`, `Shipped`, etc.).
- **Product Catalog & Stock Control (`/admin/products`)**:
  - Instant stock toggle (`✓ In Stock` ↔ `✗ Out of Stock`).
  - Add New Product modal form (name, brand, category, sale price, original price, discount %, and features).
  - Product deletion with instant inventory sync.
- **Customer Inquiries Registry (`/admin/inquiries`)**:
  - Receive and manage submissions from the public Contact page.
  - Unread message count badges in the admin sidebar.
  - 1-click `mailto:` reply generator and status workflow (`Unread` ➔ `Replied` ➔ `Closed`).

### 4. 📞 Support & Inquiries Hub (`/contact`)
- 24/7 dedicated support desk with direct hotline: **+880 1883-671140**.
- Direct message inquiry form integrated with the store administrator panel.
- Store address: House 12, Road 5, Dhanmondi, Dhaka 1205, Bangladesh.

---

## 📂 Project Directory Structure

```plaintext
watchvault/
├── public/
│   ├── icon.svg                      # Custom vector luxury watch favicon
│   └── images/
│       ├── banners/                  # Hero and promotional banner assets
│       ├── categories/               # Category circular icons
│       └── products/                 # Product photography (Binbond, POEDAGAR, Olevs)
├── src/
│   ├── app/
│   │   ├── admin/                    # Admin Dashboard routes
│   │   │   ├── inquiries/page.tsx    # Customer inquiry messages
│   │   │   ├── orders/page.tsx       # Order fulfillment and status changer
│   │   │   ├── products/page.tsx     # Inventory manager & add watch modal
│   │   │   ├── layout.tsx            # Admin sidebar & full-width layout
│   │   │   └── page.tsx              # Analytics & revenue overview
│   │   ├── api/
│   │   │   ├── orders/route.ts       # Order placement API
│   │   │   └── products/route.ts     # Product search and filtering API
│   │   ├── contact/page.tsx          # Public contact & support page
│   │   ├── dashboard/page.tsx        # Customer order tracking & profile
│   │   ├── login/page.tsx            # Customer login portal
│   │   ├── register/page.tsx         # Customer registration portal
│   │   ├── globals.css               # Theme tokens and animations
│   │   ├── layout.tsx                # SEO metadata and root layout
│   │   └── page.tsx                  # Main Storefront
│   ├── components/
│   │   ├── auth/AuthCard.tsx         # 2-column animated login/register form
│   │   ├── home/                     # Storefront sections (Hero, Categories, Grid)
│   │   ├── layout/                   # Header, Footer, CartDrawer, NotificationDrawer
│   │   └── ui/                       # Shadcn-style primitives (Button, Modal, Badge)
│   ├── data/products.ts              # Catalog seed data with local image mappings
│   ├── lib/utils.ts                  # ClassName merger & currency formatters
│   ├── store/
│   │   ├── useCartStore.ts           # Cart state with local storage persistence
│   │   └── useDashboardStore.ts      # Unified dashboard state (orders, inventory, inquiries)
│   └── types/                        # TypeScript definitions
└── README.md
```

---

## ⚡ Getting Started Locally

```bash
# Clone the repository
git clone https://github.com/Adnan4141/watchvault-ecommerce.git
cd watchvault-ecommerce

# Install packages
npm install

# Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🚢 Deployment Workflow

This project is deployed to **Vercel** via the Vercel CLI / GitHub integration:

```bash
# Deploy to production
vercel --prod
```

Target Domain: [https://watchvaults.vercel.app](https://watchvaults.vercel.app)

---

## 📞 Contact Information
- **Customer Care Hotline**: +880 1883-671140 (10:00 AM – 10:00 PM)
- **Email**: support@watchvault.com.bd
- **Headquarters**: House 12, Road 5, Dhanmondi, Dhaka 1205, Bangladesh

© 2026 WatchVault Bangladesh. All rights reserved.
