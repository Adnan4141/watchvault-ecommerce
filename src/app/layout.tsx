import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "WatchVault | Best Online Watch Shop in Bangladesh",
    template: "%s | WatchVault BD",
  },
  description:
    "Buy 100% original Binbond, POEDAGAR, Olevs luxury, business, and couple wristwatches at best prices in Bangladesh. Enjoy nationwide fast Cash on Delivery & 7-day warranty.",
  keywords: [
    "watch shop bd",
    "watches in bangladesh",
    "men watch bd",
    "couple watch",
    "poedagar watch",
    "binbond watch",
    "olevs watch",
    "luxury watches",
    "cash on delivery watch shop",
  ],
  authors: [{ name: "WatchVault BD" }],
  creator: "WatchVault",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
  },
  openGraph: {
    title: "WatchVault | Premium & Luxury Watches in Bangladesh",
    description:
      "Exclusive collection of original watches with fast Cash on Delivery across Bangladesh.",
    url: "https://watchvault.com.bd",
    siteName: "WatchVault",
    locale: "bn_BD",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="bn"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
