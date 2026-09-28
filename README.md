# WatchVault (watchvaults.vercel.app)

> **WatchVault** is a full-stack luxury & casual e-commerce platform built for high-performance wristwatch commerce in Bangladesh, offering seamless Cash on Delivery, instant order tracking, a dedicated user portal, and a store management admin dashboard.

🌐 **Live URL**: [https://watchvaults.vercel.app](https://watchvaults.vercel.app)  
📦 **Tech Stack**: Next.js 16 (App Router, Turbopack), TypeScript, Tailwind CSS v4, Zustand, Lucide Icons, Shadcn-style Architecture.

---

## 🌟 Key Highlights & Feature Matrix

### 1. 🛍️ Customer Storefront
- **Pixel-Perfect Hero Carousel**: High-resolution banners with auto-play, manual indicator navigation, and touch swipe gestures.
- **Shop by Category Strip**:
  - Men's Collection
  - Couple Collection
  - Ladies' Collection
  - Live category filters that update product view without full-page reload.
- **Product Showcase & Card Architecture**:
  - Responsive 5-column product grid (`mix-blend-multiply` zoom effect on hover).
  - Price calculation with discount badges (`-45%`, `-50%`) and strike-through original pricing in Bangladeshi Taka (৳).
  - Quick-view popup modal with detailed watch specifications.
- **Slide-out Shopping Cart & Quick Checkout**:
  - Persistent cart state using `zustand` local storage middleware.
  - Interactive quantity counters, item removal, and auto-computed delivery rates (Inside Dhaka ৳60 / Outside Dhaka ৳120).
  - 1-click Cash on Delivery order placement form.
- **Slide-out Notification Drawer**:
  - Live notification drawer accessible directly from the navbar bell icon.
  - Displays flash sale alerts, shipment updates, and corporate discount notices.

### 2. 👤 User Dashboard (`/dashboard`)
- **Customer Overview**: User profile details, verified membership badge, and joined date.
- **Metric Cards**: Total orders placed, active deliveries in transit, wishlist count, total spent (৳).
- **Orders & Live 4-Step Tracking**:
  - Visual timeline: `1. Placed` ➔ `2. Confirmed` ➔ `3. In Transit` ➔ `4. Delivered`.
  - Detailed invoice view with product thumbnails and destination address.
- **Wishlist Manager**: Save favorite watches and add directly to cart with one click.
- **Address Book & Profile Settings**: Instant profile update with real-time state synchronization.

### 3. 🛡️ Store Administration Console (`/admin`)
- **Full-Width Dashboard Layout**: Optimized with `max-w-full w-full mx-auto` for dense information density.
- **Overview & Sales Analytics (`/admin`)**:
  - Total revenue (BDT) with weekly growth trend.
  - Pending orders to fulfill counter.
  - Active watch count vs. total catalog.
  - Live recent orders table.
- **Orders Management (`/admin/orders`)**:
  - Live filter by status (`All`, `Pending`, `Processing`, `Shipped`, `Delivered`, `Cancelled`).
  - Search by Order ID, customer name, or phone number.
  - Real-time status update dropdown to transition orders across fulfillment stages.
- **Watch Catalog & Inventory Management (`/admin/products`)**:
  - Add new watch model with custom brand, category, sale price, and discount percentage.
  - Instant stock availability toggle (`In Stock` ↔ `Out of Stock`).
  - Delete watch from store.
- **Customer Inquiries Management (`/admin/inquiries`)**:
  - View direct inquiries submitted from the public Contact page.
  - Unread notification badges on admin sidebar.
  - 1-click `mailto:` reply generator and status workflow (`Unread` ➔ `Replied` ➔ `Closed`).

### 4. 📞 Public Contact & Support (`/contact`)
- 24/7 dedicated support hub with direct hotline: **+880 1883-671140**.
- Direct contact inquiry form integrated with admin dashboard registry.
- Store location and customer guarantees (100% Genuine, 7-Day Checking Warranty).

---

## 🚀 Advanced Architectural Features

- **Local Static Asset Architecture**: All images, banners, and category icons are served locally from `/public/images/` for maximum performance, offline resilience, and CDN caching.
- **Zero-Latency State Flow**: Real-time cross-component reactivity powered by Zustand with persistent local storage.
- **SEO & Social Graph Optimization**:
  - Dynamic OpenGraph and Twitter card metadata.
  - Custom vector luxury watch favicon (`icon.svg`) matching high-DPI displays.
- **RESTful API Route Handlers**:
  - `GET /api/products`: Filterable by brand, category, and text query.
  - `POST /api/orders`: Order placement API with automated order ID generation (`WV-XXXXXX`).

---

## 🛠️ Local Development & Setup

### Prerequisites
- Node.js `v18.18+` or `v20+` / `v24+`
- npm `v9+` or `v10+`

### Installation
```bash
# Clone the repository
git clone https://github.com/Adnan4141/watchvault-ecommerce.git
cd watchvault-ecommerce

# Install dependencies
npm install

# Start local development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build Verification
```bash
# Production optimized build with Turbopack
npm run build

# Start production server
npm run start
```

---

## 🚢 Deployment to Vercel

WatchVault is built with zero external runtime dependencies and is fully configured for automated deployment to Vercel:

1. **Push to GitHub**:
   ```bash
   git push origin main
   ```
2. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com) and import the repository.
   - Configure Domain: `watchvaults.vercel.app` (or custom domain).
   - Build Command: `npm run build`
   - Output Directory: `.next`
3. Click **Deploy**.

---

## 📞 Contact & Inquiries
- **Hotline**: +880 1883-671140
- **Email**: support@watchvault.com.bd
- **Headquarters**: House 12, Road 5, Dhanmondi, Dhaka 1205, Bangladesh

© 2026 WatchVault Bangladesh. All rights reserved.
