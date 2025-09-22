import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Suspense } from 'react'; 
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-Comm Store",
  description: "Your one-stop shop for everything.",
};


const NavbarFallback = () => (
  <header className="bg-white shadow-sm">
    <nav className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between h-20">
      <Link href="/" className="flex items-center gap-3 text-3xl font-bold text-primary-blue">
        <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse"></div>
        <span className="hidden sm:inline">E-Comm</span>
      </Link>
      <div className="flex items-center gap-4 text-sm font-semibold">
        <div className="flex items-center gap-2 text-gray-700">
          <ShoppingCart size={20} />
          <span className="hidden sm:inline">Items</span>
        </div>
      </div>
    </nav>
    <div className="border-t h-[65px] lg:h-[57px]"></div>
  </header>
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-blue-50`}>
        <div className="flex flex-col min-h-screen">
        
          <Suspense fallback={<NavbarFallback />}>
            <Navbar />
          </Suspense>
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

