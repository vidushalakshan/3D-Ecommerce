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

import { useEffect } from "react";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";

import { Button } from "../common/Button";

const BottomNavBar = () => {
  const { openSignIn } = useClerk();
  const { isSignedIn, user } = useUser();
  const { items } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-[100] transition-all duration-500 pointer-events-none">
      <div className={`w-full transition-all duration-500 ${isScrolled ? "py-2" : "py-6"}`}>
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`mx-auto max-w-6xl w-[95%] lg:w-full flex justify-between items-center transition-all duration-500 pointer-events-auto border ${
            isScrolled 
              ? "bg-black/90 backdrop-blur-2xl border-white/20 rounded-[2rem] px-8 py-3 shadow-2xl" 
              : "bg-black/40 backdrop-blur-md border-white/10 rounded-[2.5rem] px-10 py-5 shadow-lg"
          }`}
        >
          {/*Logo */}
          <div className="flex-1 flex justify-start">
            <motion.a 
              href="/" 
              className="group flex items-center gap-1.5"
              whileHover={{ scale: 1.02 }}
            >
              <span className="text-2xl font-black text-white tracking-tighter italic group-hover:text-blue-500 transition-colors">
                ELECTRO
              </span>
              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 animate-pulse" />
            </motion.a>
          </div>

          {/*Navigation Desktop Only*/}
          <nav className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`relative text-[13px] font-bold uppercase tracking-[0.15em] transition-all duration-300 hover:text-white ${
                    isActive ? "text-blue-500" : "text-gray-400"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div 
                      layoutId="navUnderline"
                      className="absolute -bottom-1.5 left-0 w-full h-[2px] bg-blue-500 rounded-full"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/*Right*/}
          <div className="flex-1 flex justify-end items-center ml-3 gap-4">
            <div className="hidden xl:block w-48">
              <Searchbar />
            </div>

            <div className="flex justify-center items-center gap-2">
              {/* Wishlist */}
              <Button 
                variant="glass" 
                size="icon" 
                className="hidden sm:flex"
                icon={LiaHeart}
              />

              {/* Cart */}
              <Button
                onClick={() => setIsCartOpen(true)}
                variant="secondary"
                size="icon"
                className="relative"
                icon={PiBag}
              >
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-[10px] font-black text-white rounded-full w-5 h-5 flex items-center justify-center border-2 border-black z-20">
                    {cartItemCount}
                  </span>
                )}
              </Button>

              <div className="w-px h-6 bg-white/10 mx-1 hidden sm:block" />

              {/* Auth Mobile Menu */}
              <div className="flex items-center gap-2">
                {isSignedIn ? (
                  <SignOutButton>
                    <Button variant="glass" size="icon" icon={HiOutlineArrowRightOnRectangle} />
                  </SignOutButton>
                ) : (
                  <Button
                    onClick={() => openSignIn()}
                    variant="glass"
                    size="icon"
                    icon={HiOutlineUser}
                  />
                )}
                
                <Button 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  variant="primary"
                  size="icon"
                  className="lg:hidden"
                  icon={isMobileMenuOpen ? HiOutlineX : HiOutlineMenuAlt3}
                />
              </div>
            </div>
          </div>
        </motion.nav>
      </div>

      {/*Mobile Drawer Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[110] pointer-events-auto"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-[80%] max-w-sm bg-black border-l border-white/10 p-12 z-[120] pointer-events-auto flex flex-col gap-12"
            >
               <div className="flex justify-between items-center">
                  <span className="text-2xl font-black text-white tracking-tighter italic">MENU.</span>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="text-white opacity-50 hover:opacity-100 transition-opacity">
                    <HiOutlineX size={24} />
                  </button>
               </div>

               <div className="flex flex-col gap-8">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="text-4xl font-bold text-white hover:text-blue-500 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </motion.a>
                  ))}
               </div>

               <div className="mt-auto">
                 <Searchbar />
               </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[200] pointer-events-auto"
              onClick={() => setIsCartOpen(false)}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-black/40 backdrop-blur-3xl border-l border-white/10 z-[201] shadow-2xl pointer-events-auto"
            >
              <CartDrawer onClose={() => setIsCartOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default BottomNavBar;
