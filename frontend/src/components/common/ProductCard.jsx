"use client";
import Image from "next/image";
import { useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { HiOutlineShoppingBag, HiOutlineEye, HiSparkles, HiOutlineHeart, HiHeart } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "./Button";
import { useCart } from "../../contexts/cardContext";

const ProductCard = ({ product }) => {
  const router = useRouter();
  const { addItem } = useCart();
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // 3D Tilt Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  // Glare/Reflection Effect
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareOpacity = useTransform(mouseXSpring, [-0.5, 0, 0.5], [0.15, 0, 0.15]);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  }, [x, y]);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  }, [x, y]);

  return (
    <div className="block h-full group perspective-[1000px]">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
        className="relative w-full h-full min-h-[500px] flex flex-col bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-8 transition-all duration-500 hover:border-blue-500/40 shadow-2xl overflow-hidden"
      >
        {/* Dynamic Glare Overlay */}
        <motion.div 
          style={{ 
            background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.2) 0%, transparent 60%)`,
            opacity: glareOpacity 
          }}
          className="absolute inset-0 z-10 pointer-events-none"
        />

        {/* Ambient Background Glow */}
        <div className="absolute -inset-2 bg-gradient-to-br from-blue-600/20 to-purple-600/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        {/* Top Control Bar (Heart & Badges) */}
        <div className="absolute top-8 left-8 right-8 z-30 flex justify-between items-start" style={{ transform: "translateZ(50px)" }}>
          <div className="flex flex-col gap-2">
            {product.isHot && (
              <span className="px-3 py-1 bg-red-600 text-[9px] font-black text-white rounded-full shadow-[0_0_20px_rgba(220,38,38,0.4)] animate-pulse uppercase tracking-widest">
                Hot
              </span>
            )}
            <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-full">
              <HiSparkles className="text-blue-400 text-[10px]" />
              <span className="text-[8px] font-black text-white/60 tracking-widest uppercase">New Arrival</span>
            </div>
          </div>

          {/* 3D Wishlist Heart */}
          <motion.button
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            onClick={(e) => {
              e.preventDefault();
              setIsSaved(!isSaved);
            }}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
              isSaved 
                ? "bg-red-500 text-white shadow-[0_0_30px_rgba(239,68,68,0.5)] border-red-400" 
                : "bg-white/5 border border-white/10 text-gray-500 hover:text-white"
            }`}
          >
            {isSaved ? <HiHeart size={20} /> : <HiOutlineHeart size={20} />}
          </motion.button>
        </div>

        {/* Image Stage */}
        <div 
          style={{ transform: "translateZ(80px)", transformStyle: "preserve-3d" }}
          className="relative aspect-square w-full mb-8 flex items-center justify-center"
        >
          {/* Subtle Stage Shadow */}
          <div className="absolute bottom-4 w-1/2 h-4 bg-black/40 blur-xl rounded-full" />
          
          <Link href={`/productDetails/${product._id || product.id}`} className="relative w-full h-full block">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain p-6 transition-all duration-700 group-hover:scale-110 group-hover:-rotate-3 drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
              priority
            />
          </Link>

          {/* Interaction Indicator */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
              >
                <div className="w-16 h-16 bg-blue-600/90 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(37,99,235,0.6)]">
                  <HiOutlineEye className="text-white text-2xl" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Content Section */}
        <div 
          style={{ transform: "translateZ(40px)" }}
          className="flex-1 flex flex-col gap-4 relative z-20"
        >
          <div className="space-y-1">
            <span className="text-blue-500 text-[9px] font-black uppercase tracking-[0.4em]">
              {product.type}
            </span>
            <Link href={`/productDetails/${product._id || product.id}`}>
              <h3 className="text-2xl font-black text-white italic tracking-tighter leading-tight group-hover:text-blue-400 transition-colors">
                {product.name}
              </h3>
            </Link>
          </div>

          <div className="mt-auto flex items-end justify-between border-t border-white/5 pt-6">
            <div className="flex flex-col">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-white italic leading-none">${product.price}</span>
                {product.oldPrice && (
                  <span className="text-xs text-gray-600 line-through italic">${product.oldPrice}</span>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={(e) => { e.preventDefault(); addItem(product); }}
                variant="primary"
                size="icon"
                className="!rounded-2xl !w-12 !h-12 shadow-[0_10px_30px_rgba(37,99,235,0.4)]"
                icon={HiOutlineShoppingBag}
              />
            </div>
          </div>
        </div>

        {/* Technical Accent Lines */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/5 to-transparent pointer-events-none" />
        <div className="absolute bottom-8 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />
      </motion.div>
    </div>
  );
};

export default ProductCard;