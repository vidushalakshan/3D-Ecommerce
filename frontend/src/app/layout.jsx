import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { CartProvider } from "../contexts/cardContext";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "My E-commerce Site",
  description: "Best online store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ClerkProvider>
          <CartProvider>
            <ThemeProvider attribute="class" disableTransitionOnChange>
              {children}
            </ThemeProvider>
          </CartProvider>
        </ClerkProvider>

        {/* Fixed Tidio script */}
        <Script
          id="tidio-chat"
          strategy="afterInteractive"
          src="https://code.tidio.co/rk4qsic4el6iktppctyqjpdhofjcndtm.js"
        />
      </body>
    </html>
  );
}