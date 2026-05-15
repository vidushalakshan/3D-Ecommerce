"use client";
import Image from "next/image";
import { useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { HiOutlineShoppingBag, HiOutlineHeart, HiOutlineEye, HiSparkles } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import { Button } from "./Button";
import { useCart } from "../../contexts/cardContext";

const ProductCard = ({ product }) => {
  const router = useRouter();
  const { addItem } = useCart();
  const cardRef = useRef(null);

  // 3D Tilt Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  // Glare/Reflection Effect
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareOpacity = useTransform(mouseXSpring, [-0.5, 0, 0.5], [0.1, 0, 0.1]);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onClick={() => router.push(`/productDetails/${product._id}`)}
      className="group relative w-full h-full min-h-[550px] flex flex-col bg-gradient-to-br from-white/[0.07] to-transparent backdrop-blur-2xl border border-white/10 rounded-[3rem] p-8 transition-all duration-500 hover:border-blue-500/40 cursor-pointer overflow-hidden shadow-2xl"
    >
      {/* Dynamic Glare Overlay */}
      <motion.div 
        style={{ 
          background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.15) 0%, transparent 60%)`,
          opacity: glareOpacity 
        }}
        className="absolute inset-0 z-10 pointer-events-none"
      />

      {/* Floating Accent Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-600/10 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      {/* Tags Area */}
      <div className="absolute top-8 left-8 z-20 flex flex-col gap-2" style={{ transform: "translateZ(30px)" }}>
        <div className="flex items-center gap-2 px-3 py-1 bg-blue-600/20 backdrop-blur-md border border-blue-500/30 text-blue-400 text-[9px] font-black uppercase tracking-widest rounded-full">
          <HiSparkles size={12} /> New Arrvial
        </div>
        {product.isHot && (
          <div className="px-3 py-1 bg-red-600 text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-red-600/20 w-fit">
            Hot
          </div>
        )}
      </div>

      {/* Image Showcase */}
      <div 
        style={{ transform: "translateZ(60px)", transformStyle: "preserve-3d" }}
        className="relative w-full aspect-square mb-8 flex items-center justify-center"
      >
        {/* Glow behind product */}
        <div className="absolute inset-0 bg-blue-500/5 rounded-full blur-[80px] scale-50 group-hover:scale-100 transition-transform duration-1000" />
        
        <Image
          src={product.image || "/images/laptopgame.png"}
          alt={product.name}
          fill
          className="object-contain p-6 transition-all duration-700 group-hover:scale-110 group-hover:-rotate-3 z-10"
          onError={(e) => {
            e.target.src = "/images/laptopgame.png";
            e.target.className = "object-contain p-12 opacity-20 grayscale z-10";
          }}
        />
      </div>

      {/* Content Area */}
      <div 
        style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }}
        className="flex-1 flex flex-col"
      >
        <div className="space-y-2 mb-6">
          <p className="text-[10px] text-blue-400 font-black uppercase tracking-[0.3em]">
            {product.type}
          </p>
          <h3 className="text-2xl font-black text-white italic leading-tight line-clamp-2 group-hover:text-blue-400 transition-colors">
            {product.name}
          </h3>
        </div>

        <div className="mt-auto flex items-end justify-between gap-4">
          <div className="flex flex-col">
             <span className="text-3xl font-black text-white italic leading-none mb-1">
                ${product.price}
             </span>
             {product.oldPrice && (
                <span className="text-xs text-gray-600 line-through font-bold">
                   ${product.oldPrice}
                </span>
             )}
          </div>
          
          <Button
            onClick={(e) => { e.stopPropagation(); addItem(product); }}
            variant="primary"
            size="sm"
            className="!rounded-2xl !p-3.5 shadow-[0_10px_30px_rgba(37,99,235,0.3)] hover:scale-110 active:scale-95"
            icon={HiOutlineShoppingBag}
          />
        </div>
      </div>

      {/* Cyber Accents */}
      <div className="absolute bottom-4 right-8 h-px w-12 bg-white/5" />
      <div className="absolute top-1/2 -right-4 h-24 w-px bg-gradient-to-b from-transparent via-blue-500/20 to-transparent" />
    </motion.div>
  );
};

export default ProductCard;