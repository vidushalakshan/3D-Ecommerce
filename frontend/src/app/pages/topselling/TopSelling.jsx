"use client";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useRef, useState, useCallback, memo } from "react";
import { HiSparkles, HiArrowRight, HiCpuChip, HiBolt, HiShieldCheck } from "react-icons/hi2";
import { Button } from "@/components/common/Button";
import { useRouter } from "next/navigation";
import {
  collectionLaptop,
  collectionHeadset,
  collectionCamara,
} from "@/constants/images";

const products = [
  { id: 1, name: "Predator Helios Neo", type: "Gaming Powerhouse", price: 1890, img: collectionLaptop, color: "#2563eb", specs: ["RTX 4080", "32GB RAM", "2TB SSD"] },
  { id: 2, name: "Sony XM5 Premium", type: "Noise Cancellation", price: 750, img: collectionHeadset, color: "#7c3aed", specs: ["30h Battery", "LDAC", "Smart Touch"] },
  { id: 3, name: "EOS R6 Cinema", type: "Mirrorless 4K", price: 2100, img: collectionCamara, color: "#3b82f6", specs: ["20MP Sensor", "8K Video", "Dual Card"] },
  { id: 4, name: "ThinkPad Z13", type: "Business Elite", price: 1550, img: collectionLaptop, color: "#2563eb", specs: ["AMD Ryzen 9", "OLED", "18h Battery"] },
  { id: 5, name: "Bose Ultra Comfort", type: "Audiophile Grade", price: 650, img: collectionHeadset, color: "#7c3aed", specs: ["Spatial Audio", "CustomTune", "24h Pro"] },
];

const InteractiveProductCard = memo(({ product, index, activeIndex }) => {
  const isActive = index === activeIndex;
  const router = useRouter();
  
  return (
    <motion.div
      animate={{
        scale: isActive ? 1 : 0.75,
        opacity: isActive ? 1 : 0.15,
        z: isActive ? 150 : -200,
        rotateY: (index - activeIndex) * -35,
        x: (index - activeIndex) * 320,
        filter: isActive ? "blur(0px)" : "blur(4px)",
      }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      onClick={() => isActive && router.push(`/productDetails/${product.id}`)}
      className={`absolute w-[340px] md:w-[480px] h-[550px] bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3.5rem] flex flex-col items-center justify-between p-12 text-center shadow-[0_50px_100px_rgba(0,0,0,0.5)] overflow-hidden ${isActive ? "cursor-pointer" : "cursor-default"}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
      
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-10 blur-[100px] pointer-events-none"
        style={{ backgroundColor: product.color }}
      />

      <div className="relative z-20 w-full flex flex-col items-center gap-2" style={{ transform: "translateZ(30px)" }}>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-blue-400">
          <HiSparkles size={12} />
          <span className="text-[9px] font-black uppercase tracking-[0.3em]">{product.type}</span>
        </div>
        <h3 className="text-3xl md:text-4xl font-black text-white italic tracking-tighter uppercase leading-none">
          {product.name}
        </h3>
      </div>

      <div className="relative w-full h-56 flex items-center justify-center" style={{ transform: "translateZ(80px)" }}>
        <motion.div
          animate={{ y: isActive ? [0, -15, 0] : 0, rotate: isActive ? [0, 2, 0] : 0 }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10 w-full h-full"
        >
          <Image
            src={product.img}
            alt={product.name}
            fill
            className="object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.8)]"
          />
        </motion.div>

        <AnimatePresence>
          {isActive && (
            <>
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="absolute -left-4 top-0 p-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-xl text-[8px] text-white font-bold flex items-center gap-1">
                <HiCpuChip className="text-blue-500" /> {product.specs[0]}
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="absolute -right-4 bottom-0 p-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-xl text-[8px] text-white font-bold flex items-center gap-1">
                <HiBolt className="text-purple-500" /> {product.specs[1]}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      <div className="relative z-20 w-full space-y-6" style={{ transform: "translateZ(40px)" }}>
        <div className="flex flex-col items-center gap-1">
          <span className="text-3xl font-black text-white italic">${product.price}</span>
          <div className="flex items-center gap-1 text-green-500 text-[9px] font-black uppercase tracking-widest">
            <HiShieldCheck size={14} /> 1 Year Warranty Included
          </div>
        </div>

        <div className="flex justify-center h-14">
          <AnimatePresence mode="wait">
            {isActive ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 10 }}
                key="active-btn"
              >
                <Button variant="primary" size="lg" icon={HiArrowRight} className="shadow-[0_15px_40px_rgba(37,99,235,0.4)]">
                  ADD TO CART
                </Button>
              </motion.div>
            ) : (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                key="inactive-label"
                onClick={(e) => { e.stopPropagation(); router.push(`/productDetails/${product.id}`); }}
                className="text-[10px] text-white/20 font-black uppercase tracking-[0.4em] hover:text-white/40 transition-colors"
              >
                View Details
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
});

const TopSelling = () => {
  const [active, setActive] = useState(2);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  React.useEffect(() => {
    if (!isAutoPlay) return;
    const timer = setInterval(() => {
      setActive(prev => (prev + 1) % products.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlay]);

  return (
    <section 
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
      className="relative min-h-screen bg-[#020202] py-24 overflow-hidden flex flex-col items-center justify-center border-y border-white/5"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-8 relative z-10 w-full text-center mb-16">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-3xl text-blue-400">
            <HiCpuChip className="animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Hardware Innovation</span>
          </div>
          <h2 className="text-6xl md:text-8xl lg:text-[10rem] font-black text-white tracking-tighter italic leading-none uppercase drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            TOP <span className="text-blue-500">SELECTION</span>
          </h2>
          <div className="flex items-center justify-center gap-4 text-gray-500 font-bold uppercase text-[10px] tracking-[0.2em]">
            <span className="w-12 h-px bg-white/10" />
            Performance Tested
            <span className="w-12 h-px bg-white/10" />
          </div>
        </motion.div>
      </div>

      <div 
        className="relative w-full h-[650px] flex items-center justify-center perspective-[2500px]"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <AnimatePresence>
            {products.map((product, index) => (
              <InteractiveProductCard 
                key={product.id} 
                product={product} 
                index={index} 
                activeIndex={active}
              />
            ))}
          </AnimatePresence>
        </div>

        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between z-50 pointer-events-none px-4 lg:px-24">
          <Button 
            variant="glass" 
            size="icon" 
            onClick={() => setActive(prev => (prev === 0 ? products.length - 1 : prev - 1))}
            className="pointer-events-auto !w-14 !h-14 !rounded-2xl shadow-2xl group"
            icon={() => <HiArrowRight className="rotate-180 group-hover:-translate-x-1 transition-transform" size={24} />}
          />
          <Button 
            variant="glass" 
            size="icon" 
            onClick={() => setActive(prev => (prev + 1) % products.length)}
            className="pointer-events-auto !w-14 !h-14 !rounded-2xl shadow-2xl group"
            icon={() => <HiArrowRight className="group-hover:translate-x-1 transition-transform" size={24} />}
          />
        </div>
      </div>

      <div className="flex gap-4 mt-12 relative z-50 items-center">
        {products.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="group relative flex flex-col items-center"
          >
            <div className={`h-1 rounded-full transition-all duration-700 ${
              active === i ? "w-16 bg-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.8)]" : "w-6 bg-white/10 group-hover:bg-white/30"
            }`} />
            <span className={`absolute -bottom-4 text-[8px] font-black transition-all ${active === i ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>0{i+1}</span>
          </button>
        ))}
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[140%] h-[35vh] bg-gradient-to-t from-blue-600/10 to-transparent blur-[120px] pointer-events-none rounded-[100%] opacity-50" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        <motion.div animate={{ y: [0, -100, 0], opacity: [0, 0.5, 0] }} transition={{ duration: 8, repeat: Infinity }} className="absolute top-1/4 left-1/4 w-1 h-1 bg-blue-400 rounded-full" />
        <motion.div animate={{ y: [0, -150, 0], opacity: [0, 0.4, 0] }} transition={{ duration: 12, repeat: Infinity, delay: 2 }} className="absolute top-1/3 right-1/4 w-1 h-1 bg-purple-400 rounded-full" />
      </div>
    </section>
  );
};

export default TopSelling;