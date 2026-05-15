"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { HiArrowRight, HiSparkles } from "react-icons/hi2";
import { Button } from "@/components/common/Button";
import {
  collectionLaptop,
  collectionHeadset,
  collectionCamara,
} from "@/constants/images";

const collections = [
  {
    id: "01",
    title: "LAPTOP",
    subtitle: "COLLECTION",
    img: collectionLaptop,
    color: "#2563eb",
    desc: "Next-gen processing power wrapped in aerospace-grade materials."
  },
  {
    id: "02",
    title: "PREMIUM",
    subtitle: "ACCESSORIES",
    img: collectionHeadset,
    color: "#7c3aed",
    desc: "Immersive audio engineering for the most demanding digital environments."
  },
  {
    id: "03",
    title: "PRO",
    subtitle: "CAMERAS",
    img: collectionCamara,
    color: "#3b82f6",
    desc: "Capture every detail in ultra-high fidelity with advanced 3D sensors."
  }
];

const Collection = () => {
  const [active, setActive] = useState(0);

  return (
    <section className="relative h-screen bg-[#020202] overflow-hidden flex items-center justify-center py-20 px-8">
      {/* Dynamic Background Atmosphere */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0"
        >
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full"
            style={{ 
              background: `radial-gradient(circle at center, ${collections[active].color}15 0%, transparent 70%)` 
            }} 
          />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />
        </motion.div>
      </AnimatePresence>

      {/* Main Showcase Grid */}
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Side: Content */}
        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <HiSparkles size={14} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Exclusive Showcase</span>
            </div>
            
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-7xl md:text-8xl lg:text-9xl font-black text-white leading-[0.8] tracking-tighter italic">
                    {collections[active].title}<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-white/5">
                      {collections[active].subtitle}
                    </span>
                  </h2>
                  <p className="mt-8 text-gray-400 text-lg max-w-md font-medium leading-relaxed">
                    {collections[active].desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Navigation Controls */}
          <div className="flex flex-col gap-6">
            <div className="flex gap-4">
              {collections.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => setActive(index)}
                  className={`relative px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-500 border ${
                    active === index 
                      ? "bg-white text-black border-white shadow-[0_0_30px_rgba(255,255,255,0.2)]" 
                      : "bg-white/5 text-white/40 border-white/10 hover:border-white/20"
                  }`}
                >
                  {item.id} / {item.title}
                </button>
              ))}
            </div>

            <Button 
              variant="primary" 
              size="xl" 
              icon={HiArrowRight}
              className="w-full md:w-[280px] shadow-[0_0_50px_rgba(37,99,235,0.2)]"
            >
              EXPLORE COLLECTION
            </Button>
          </div>
        </div>

        {/* Right Side: 3D Visualization */}
        <div className="relative h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.8, rotateY: 45, x: 100 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0, x: 0 }}
              exit={{ opacity: 0, scale: 1.2, rotateY: -45, x: -100 }}
              transition={{ 
                type: "spring", 
                stiffness: 100, 
                damping: 20,
                duration: 0.8 
              }}
              className="relative w-full h-full flex items-center justify-center"
              style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
            >
              {/* Backglow */}
              <motion.div 
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute w-64 h-64 blur-[100px] rounded-full pointer-events-none"
                style={{ backgroundColor: collections[active].color }}
              />

              {/* Large Background ID */}
              <span className="absolute text-[20rem] font-black text-white/[0.03] select-none pointer-events-none -translate-y-12">
                {collections[active].id}
              </span>

              {/* Main Image */}
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 2, 0]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10 w-[80%] h-[80%] flex items-center justify-center"
              >
                <Image
                  src={collections[active].img}
                  alt={collections[active].title}
                  width={600}
                  height={600}
                  className="w-full h-full object-contain drop-shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
                />
              </motion.div>

              {/* Floating Accents */}
              <div className="absolute inset-0 pointer-events-none">
                 <div className="absolute top-1/4 left-0 w-2 h-2 bg-blue-500 rounded-full animate-ping" />
                 <div className="absolute bottom-1/4 right-0 w-2 h-2 bg-purple-500 rounded-full animate-ping delay-700" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Decorative Stage Floor */}
      <div className="absolute bottom-0 left-0 w-full h-[20vh] bg-gradient-to-t from-white/[0.02] to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
};

export default Collection;