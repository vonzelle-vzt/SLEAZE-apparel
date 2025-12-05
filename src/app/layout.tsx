import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";

const bebas = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SLEAZE | Urban Streetwear & Extreme Sports Apparel",
  description: "Modern, urban, extreme-sports inspired clothing brand. Shop the latest drops in streetwear fashion.",
  keywords: ["streetwear", "urban fashion", "extreme sports", "clothing", "apparel"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bebas.variable} ${inter.variable} antialiased min-h-screen flex flex-col`}>
        <CartProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
