"use client";
import Searchbar from "../content/Searchbar";
import { navItems } from "../../../public/data/menu";
import { usePathname } from "next/navigation";
import { useClerk, useUser, SignOutButton } from "@clerk/nextjs";
import { useCart } from "../../contexts/cardContext";
import { useState } from "react";
import CartDrawer from "../cart/cartDrawer";
import { motion, AnimatePresence } from "framer-motion";
import { LiaHeart } from "react-icons/lia";
import { PiBag } from "react-icons/pi";
import { HiOutlineUser, HiOutlineArrowRightOnRectangle } from "react-icons/hi2";

const BottomNavBar = () => {
  const { openSignIn, signOut } = useClerk();
  const { isSignedIn, user } = useUser();
  const { items } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const pathname = usePathname();

  return (
    <section className="bg-black/80 backdrop-blur-xl border-b border-white/10 sticky top-0 transition-all duration-300 px-6 py-3 z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto gap-8">
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <h1 className="text-3xl font-extrabold text-white tracking-tighter italic">
            ELECTRO<span className="text-blue-500 text-5xl leading-none">.</span>
          </h1>
        </motion.div>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-10">
          {navItems.map((item, index) => {
            const normalizePath = (path) => path === "/" ? "/" : path.replace(/\/$/, "");
            const isActive = normalizePath(pathname) === normalizePath(item.href);

            return (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative py-2 text-sm font-semibold tracking-wide transition-colors ${
                  isActive ? "text-blue-500" : "text-gray-300 hover:text-white"
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-500 rounded-full"
                  />
                )}
              </motion.a>
            );
          })}
        </nav>

        {/* Search & Actions */}
        <div className="flex items-center gap-4 flex-1 justify-end">
          <div className="hidden xl:block w-full max-w-xs">
            <Searchbar />
          </div>

          <div className="flex items-center gap-3">
            {/* Wishlist */}
            <button className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all">
              <LiaHeart size={22} />
            </button>

            {/* Cart */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
            >
              <PiBag size={22} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-black">
                  {cartItemCount}
                </span>
              )}
            </button>

            <div className="h-8 w-px bg-white/10 mx-1 hidden sm:block"></div>

            {/* User Profile / Login */}
            {isSignedIn ? (
              <div className="flex items-center gap-3 pl-2">
                <div className="flex flex-col items-end hidden sm:flex">
                  <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Premium Member</span>
                  <span className="text-sm text-white font-medium">{user?.firstName || "Member"}</span>
                </div>
                
                <SignOutButton>
                  <button className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-white hover:text-red-400 hover:bg-red-500/10 transition-all group">
                    <HiOutlineArrowRightOnRectangle size={22} className="group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </SignOutButton>
              </div>
            ) : (
              <button
                onClick={() => openSignIn()}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black font-bold text-sm hover:bg-gray-200 transition-all active:scale-95"
              >
                <HiOutlineUser size={18} />
                <span>Login</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
              onClick={() => setIsCartOpen(false)}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 z-[101] shadow-2xl"
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
