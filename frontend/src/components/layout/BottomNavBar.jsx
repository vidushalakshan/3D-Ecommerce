"use client";
import Searchbar from "../content/Searchbar";
import { navItems } from "../../../public/data/menu";
import { usePathname } from "next/navigation";
import { useClerk, useUser } from "@clerk/nextjs";
import { useCart } from "../../contexts/cardContext";
import { useState } from "react";
import CartDrawer from "../cart/cartDrawer";
import { motion, AnimatePresence } from "framer-motion";
import { LiaHeart } from "react-icons/lia";
import { PiBag } from "react-icons/pi";
import { HiOutlineUser } from "react-icons/hi2";

const BottomNavBar = () => {
  const { openSignIn } = useClerk();
  const { isSignedIn, user } = useUser();
  const { items } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const pathname = usePathname();
  console.log("Current pathname:", pathname);
  return (
    <section className="bg-[#15161D] shadow-md transition-all duration-300 px-4 py-4 opacity-70 hover:opacity-100">
      <div className="flex md:flex-row justify-between items-center md:gap-4 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row flex-wrap items-center gap-4">
          <h1 className="md:text-[35px] max-sm:text-[24px] font-bold text-[#eeeeee]">
            Electro<span style={{ color: "rgba(39, 124, 217, 1)" }}>.</span>
          </h1>
        </div>

        <div className="flex items-center gap-[40px] max-w-7xl mx-auto max-sm:hidden">
          {navItems.map((item) => {
            const normalizePath = (path) =>
              path === "/" ? "/" : path.replace(/\/$/, "");

            const isActive =
              normalizePath(pathname) === normalizePath(item.href);

            return (
              <motion.a
                key={item.label}
                href={item.href}
                whileHover="hover"
                initial="initial"
                animate={isActive ? "active" : "initial"}
                variants={{
                  initial: {},
                  hover: {},
                  active: {},
                }}
                className={`group relative h-[24px] overflow-hidden text-white font-medium text-[15px] ${
                  isActive ? "text-#277CD9" : "hover:text-[#277CD9]"
                }`}
              >
                {/* Slide-up text effect */}
                <span className="whitespace-nowrap block transition-all duration-300 group-hover:-translate-y-full">
                  {item.label}
                </span>
                <span className="absolute left-0 top-full block transition-all duration-300 group-hover:top-0">
                  {item.label}
                </span>

                {/* Animated underline */}
                <motion.span
                  variants={{
                    initial: { x: "-100%" },
                    hover: { x: "0%" },
                    active: { x: "0%" },
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute left-0 -bottom-[6px] w-full h-[8px] bg-[#277CD9]"
                />
              </motion.a>
            );
          })}
          <div className="flex flex-col max-md:hidden max-lg:hidden md:hidden xl:block sm:flex-row flex-wrap items-center gap-4">
            <Searchbar />
          </div>
        </div>

        <div className="flex items-center gap-5">
          {/* Wishlist */}
          <button className="hover:text-blue-400 transition border-1 rounded-full border-gray-600 p-3">
            <LiaHeart size={20} />
          </button>

          {/* Cart with Badge */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative hover:text-blue-400 transition border-1 rounded-full border-gray-600 p-3"
          >
            <PiBag size={20} />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* User Profile */}
          <button
            onClick={() => {
              if (!isSignedIn) {
                openSignIn();
              } else {
                alert(`Welcome back, ${user?.firstName || "User"}!`);
              }
            }}
            className="hover:text-blue-400 transition border-1 rounded-full border-gray-600 p-3"
          >
            <HiOutlineUser size={20} />
          </button>
        </div>
      </div>
      {/* Animated Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 z-40"
              onClick={() => setIsCartOpen(false)}
            />

            {/* Drawer - Slide from Right */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-[#1a1a1a] text-white z-50 overflow-y-auto shadow-2xl"
            >
              <CartDrawer onClose={() => setIsCartOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};

export default BottomNavBar;