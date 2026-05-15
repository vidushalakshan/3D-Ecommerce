"use client";
import Image from "next/image";
import { useState, useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { HiOutlineShoppingBag, HiOutlineHeart, HiOutlineEye } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import { Button } from "./Button";
import { useCart } from "../../contexts/cardContext";

const ProductCard = ({ product }) => {
  const router = useRouter();
  const { addItem } = useCart();
  const cardRef = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleClick = () => {
    router.push(`/productDetails/${product._id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addItem(product);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
      onClick={handleClick}
      className="group relative w-full aspect-[4/5] bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 transition-all duration-500 hover:border-blue-500/50 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] cursor-pointer overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="absolute top-6 left-6 z-20 flex flex-col gap-2">
        <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-blue-600/20">
          New
        </span>
        {product.isHot && (
          <span className="px-3 py-1 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-red-600/20">
            Hot
          </span>
        )}
      </div>

      <div className="absolute top-6 right-6 z-20 flex flex-col gap-3 translate-x-12 group-hover:translate-x-0 transition-transform duration-500 ease-out">
        <button className="p-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white hover:text-black transition-all">
          <HiOutlineHeart size={20} />
        </button>
        <button className="p-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white hover:text-black transition-all">
          <HiOutlineEye size={20} />
        </button>
      </div>

      <div 
        style={{ transform: "translateZ(40px)", willChange: "transform" }}
        className="relative w-full aspect-square mb-6 flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-blue-500/5 rounded-full blur-[60px] scale-75 group-hover:scale-110 transition-transform duration-700" />
        <Image
          src={product.image || "/uploads/default.jpg"}
          alt={product.name}
          fill
          className="object-contain p-4 transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-2"
        />
      </div>

      <div 
        style={{ transform: "translateZ(20px)", willChange: "transform" }}
        className="space-y-4"
      >
        <div className="space-y-1">
          <p className="text-[10px] text-blue-400 font-black uppercase tracking-[0.2em]">
            {product.type}
          </p>
          <h3 className="text-xl font-bold text-white line-clamp-1 group-hover:text-blue-400 transition-colors">
            {product.name}
          </h3>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
             <span className="text-2xl font-black text-white">
                ${product.price}
             </span>
             {product.oldPrice && (
                <span className="text-xs text-gray-500 line-through">
                   ${product.oldPrice}
                </span>
             )}
          </div>
          
          <Button
            onClick={handleAddToCart}
            variant="primary"
            size="sm"
            className="rounded-2xl !p-3 group-hover:scale-110"
            icon={HiOutlineShoppingBag}
          />
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
    </motion.div>
  );
};

export default ProductCard;