"use client";
import Searchbar from "../content/Searchbar";
import { navItems } from "../../../public/data/menu";
import { usePathname } from "next/navigation";
import { useClerk, useUser } from "@clerk/nextjs";
import { useCart } from "../../contexts/cardContext";
import { isAdminEmail } from "../../lib/clerk";
import { useWishlist } from "../../contexts/wishlistContext";
import { useState } from "react";
import CartDrawer from "../cart/cartDrawer";
import WishlistDrawer from "../wishlist/wishlistDrawer";
import { motion, AnimatePresence } from "framer-motion";
import { LiaHeart } from "react-icons/lia";
import { PiBag } from "react-icons/pi";
import { HiOutlineUser, HiOutlineArrowRightOnRectangle } from "react-icons/hi2";

import { useEffect } from "react";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";

import { Button } from "../common/Button";

const BottomNavBar = () => {
  const { openSignIn, signOut } = useClerk();
  const { isSignedIn, user } = useUser();
  const { items } = useCart();
  const { wishlistItems } = useWishlist();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = isSignedIn ? wishlistItems.length : 0;
  const pathname = usePathname();
  const isAdmin = user && isAdminEmail(user.primaryEmailAddress?.emailAddress);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isProfileOpen) return;
    const handleOutsideClick = (event) => {
      const profileContainer = document.getElementById("profile-menu-container");
      if (profileContainer && !profileContainer.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isProfileOpen]);

  useEffect(() => {
    if (isCartOpen || isWishlistOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen, isWishlistOpen]);

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
              <span className="text-2xl font-black text-white tracking-tighter italic group-hover:text-blue-500 transition-colors uppercase">
                3D TECH STORE
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

            <div className="flex justify-center items-center gap-3">
              {/* Wishlist */}
              <Button 
                onClick={() => {
                  if (isSignedIn) {
                    setIsWishlistOpen(true);
                  } else {
                    openSignIn();
                  }
                }}
                variant="glass" 
                size="icon" 
                className="hidden sm:flex relative"
                icon={LiaHeart}
              >
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-[9px] font-black text-white rounded-full w-4.5 h-4.5 flex items-center justify-center border-2 border-black z-20 shadow-[0_0_15px_rgba(220,38,38,0.5)]">
                    {wishlistCount}
                  </span>
                )}
              </Button>

              {/* Cart */}
              <Button
                onClick={() => setIsCartOpen(true)}
                variant="secondary"
                size="icon"
                className="relative"
                icon={PiBag}
              >
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-[9px] font-black text-white rounded-full w-4.5 h-4.5 flex items-center justify-center border-2 border-black z-20 shadow-[0_0_15px_rgba(37,99,235,0.5)]">
                    {cartItemCount}
                  </span>
                )}
              </Button>

              <div className="w-px h-6 bg-white/10 mx-1 hidden sm:block" />

              {/* Auth Hub */}
              <div className="flex items-center gap-3">
                {isSignedIn ? (
                  <div id="profile-menu-container" className="relative flex items-center gap-3">
                    <div className="hidden sm:flex flex-col items-end">
                       <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest">Operator</span>
                       <span className="text-[10px] font-bold text-white uppercase truncate max-w-[100px]">
                         {user.firstName || user.primaryEmailAddress?.emailAddress?.split('@')[0] || "Tech User"}
                       </span>
                    </div>
                    
                    <button 
                      onClick={() => setIsProfileOpen(!isProfileOpen)}
                      className="relative w-10 h-10 rounded-xl overflow-hidden border border-blue-500/50 shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:scale-105 transition-transform cursor-pointer flex items-center justify-center group"
                    >
                      {imageError || !user.imageUrl ? (
                        <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white text-sm uppercase">
                          {(user.firstName?.[0] || user.primaryEmailAddress?.emailAddress?.[0] || "U").toUpperCase()}
                        </div>
                      ) : (
                        <img 
                          src={user.imageUrl} 
                          alt="Profile" 
                          className="w-full h-full object-cover"
                          onError={() => setImageError(true)}
                        />
                      )}
                      <div className="absolute inset-0 bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>

                    <AnimatePresence>
                      {isProfileOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 top-full mt-3 w-64 bg-black/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 shadow-[0_10px_50px_rgba(0,0,0,0.8)] z-[200] flex flex-col gap-4 pointer-events-auto"
                        >
                          {/* User Info */}
                          <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                            <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-blue-500/30 flex items-center justify-center">
                              {imageError || !user.imageUrl ? (
                                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white text-base uppercase">
                                  {(user.firstName?.[0] || user.primaryEmailAddress?.emailAddress?.[0] || "U").toUpperCase()}
                                </div>
                              ) : (
                                <img 
                                  src={user.imageUrl} 
                                  alt="Profile" 
                                  className="w-full h-full object-cover"
                                  onError={() => setImageError(true)}
                                />
                              )}
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className="text-xs font-bold text-white truncate">
                                {user.fullName || user.firstName || user.primaryEmailAddress?.emailAddress?.split('@')[0]}
                              </span>
                              <span className="text-[10px] text-gray-400 truncate">
                                {user.primaryEmailAddress?.emailAddress}
                              </span>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex flex-col gap-1">
                            {isAdmin && (
                              <a 
                                href="/dashboard"
                                onClick={() => setIsProfileOpen(false)}
                                className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all"
                              >
                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                                Admin Dashboard
                              </a>
                            )}
                            
                            <button
                              onClick={() => {
                                setIsProfileOpen(false);
                                signOut();
                              }}
                              className="flex items-center justify-between w-full px-3 py-2.5 rounded-xl text-xs font-bold text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20 cursor-pointer"
                            >
                              <span>Log Out</span>
                              <HiOutlineArrowRightOnRectangle size={16} />
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
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

      {/* Wishlist Drawer */}
      <AnimatePresence>
        {isWishlistOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[200] pointer-events-auto"
              onClick={() => setIsWishlistOpen(false)}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-black/40 backdrop-blur-3xl border-l border-white/10 z-[201] shadow-2xl pointer-events-auto"
            >
              <WishlistDrawer onClose={() => setIsWishlistOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default BottomNavBar;
