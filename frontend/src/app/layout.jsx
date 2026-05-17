import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { CartProvider } from "../contexts/cardContext";
import { WishlistProvider } from "../contexts/wishlistContext";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "3D TECH STORE",
  description: "Best online 3D technology store",
};

import CartSuccessModal from "@/components/common/CartSuccessModal";
import MatrixAIChat from "@/components/chat/MatrixAIChat";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ClerkProvider>
          <CartProvider>
            <WishlistProvider>
              <ThemeProvider attribute="class" disableTransitionOnChange>
                <CartSuccessModal />
                <MatrixAIChat />
                {children}
              </ThemeProvider>
            </WishlistProvider>
          </CartProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}