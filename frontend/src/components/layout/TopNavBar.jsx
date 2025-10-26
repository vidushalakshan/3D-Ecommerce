// components/layout/TopNavBar.jsx
"use client";
import { BsFillTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { CiHeart, CiShoppingCart, CiUser } from "react-icons/ci";
import { useClerk, useUser } from "@clerk/nextjs";
import { useCart } from "../../contexts/cardContext";
import { useState } from "react";
import CartDrawer from "../cart/cartDrawer";

const TopNavBar = () => {
  const { openSignIn } = useClerk();
  const { isSignedIn, user } = useUser();
  const { items } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <section className="bg-[#1E1F29] shadow-md text-white px-3 py-3 text-sm">
        <div className="flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4 max-w-7xl mx-auto">
          {/* Left Side: Contact Info */}
          <div className="flex flex-col sm:flex-row flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <BsFillTelephoneFill color="#277CD9" size={11} />
              <span className="text-[13px]">+94-111324353</span>
            </div>
            <div className="flex items-center gap-2">
              <MdEmail color="#277CD9" size={!isSignedIn ? 13 : 13} />
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
            <button className="hover:text-pink-400 transition">
              <CiHeart size={26} />
            </button>

            {/* Cart with Badge */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative hover:text-pink-400 transition"
            >
              <CiShoppingCart size={26} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
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
                  // Optional: open profile dropdown or navigate
                  alert(`Welcome back, ${user?.firstName || "User"}!`);
                }
              }}
              className="hover:text-pink-400 transition"
            >
              <CiUser size={25} />
            </button>
          </div>
        </div>
      </section>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default TopNavBar;