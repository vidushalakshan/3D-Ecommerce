// components/layout/TopNavBar.jsx
"use client";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { useClerk, useUser } from "@clerk/nextjs";
import { useCart } from "../../contexts/cardContext";
import { useState } from "react";
import CartDrawer from "../cart/cartDrawer";
import { motion, AnimatePresence } from "framer-motion";
import { LiaHeart } from "react-icons/lia";
import { PiBag } from "react-icons/pi";
import { HiOutlineUser } from "react-icons/hi2";

const TopNavBar = () => {
  const { openSignIn } = useClerk();
  const { isSignedIn, user } = useUser();
  const { items } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <section className="bg-[#1E1F29] shadow-md text-white px-3 py-3 text-sm ">
        <div className="flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4 max-w-7xl mx-auto">
          {/* Left Side: Contact Info */}
          <div className="flex flex-col sm:flex-row flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <BsFillTelephoneFill color="#277CD9" size={11} />
              <span className="text-[13px]">+94-111324353</span>
            </div>
            <div className="flex items-center gap-2">
              <MdEmail color="#277CD9" size={13} />
              <span className="text-[13px]">infoelctro@gmail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <IoLocationSharp color="#277CD9" size={13} />
              <span className="text-[13px]">No 15 Galle Road, Colombo</span>
            </div>
          </div>

          {/* Right Side: Icons */}
          <div className="flex items-center gap-5">
            {/* Wishlist */}
            <button className="hover:text-blue-400 transition">
              <LiaHeart size={20} />
            </button>

            {/* Cart with Badge */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative hover:text-blue-400 transition"
            >
              <PiBag  size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-1.5 -right-1 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium">
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
              className="hover:text-blue-400 transition"
            >
              <HiOutlineUser size={20} />
            </button>
          </div>
        </div>
      </section>

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
    </>
  );
};

export default TopNavBar;