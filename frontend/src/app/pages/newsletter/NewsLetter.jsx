"use client";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import React, { useState, useRef, useCallback } from "react";
import { 
  FaFacebookF, 
  FaTwitter, 
  FaLinkedinIn, 
  FaInstagram, 
} from "react-icons/fa";
import { HiSparkles, HiEnvelope, HiEnvelopeOpen, HiRocketLaunch } from "react-icons/hi2";
import { Button } from "@/components/common/Button";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const containerRef = useRef(null);
  
  // Advanced 3D Parallax
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 100, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 100, damping: 20 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);
  const translateX = useTransform(mouseXSpring, [-0.5, 0.5], ["-20px", "20px"]);
  const translateY = useTransform(mouseYSpring, [-0.5, 0.5], ["-20px", "20px"]);

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
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
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative py-32 bg-[#020202] overflow-hidden border-t border-white/5 perspective-[2000px]"
    >
      {/* 3D Background Atmosphere */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.08)_0%,transparent_70%)]" />
        
        {/* Orbiting 3D Elements (Simulated) */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/[0.03] rounded-full pointer-events-none"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/[0.02] rounded-full pointer-events-none"
        />
      </div>

      <motion.div 
        style={{ rotateX, rotateY, x: translateX, y: translateY, transformStyle: "preserve-3d" }}
        className="max-w-5xl mx-auto px-8 relative z-10"
      >
        {/* Main Glass Stage */}
        <div className="relative bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[4rem] p-12 lg:p-20 shadow-[0_50px_100px_rgba(0,0,0,0.5)] overflow-hidden">
           {/* Inner Glow */}
           <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full" />
           <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple-600/20 blur-[100px] rounded-full" />

           <div className="flex flex-col lg:flex-row items-center gap-16 relative z-10">
              
              {/* Left: 3D Icon Stage */}
              <div className="relative w-48 h-48 lg:w-64 lg:h-64 flex items-center justify-center" style={{ transform: "translateZ(100px)" }}>
                 <motion.div
                   animate={{ 
                     y: [0, -20, 0],
                     rotateZ: [0, 5, 0]
                   }}
                   transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                   className="relative"
                 >
                    <div className="absolute inset-0 bg-blue-500 blur-3xl opacity-20 scale-150" />
                    <div className="relative bg-gradient-to-br from-white/10 to-transparent p-10 rounded-[2.5rem] border border-white/20 shadow-2xl">
                       <HiEnvelopeOpen className="text-8xl text-white drop-shadow-[0_0_20px_rgba(37,99,235,0.5)]" />
                    </div>
                    
                    {/* Floating Accent Icons */}
                    <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 3, repeat: Infinity }} className="absolute -top-6 -right-6 p-3 bg-blue-600 rounded-2xl shadow-xl">
                       <HiRocketLaunch className="text-white text-xl" />
                    </motion.div>
                 </motion.div>
              </div>

              {/* Right: Content Area */}
              <div className="flex-1 space-y-8 text-center lg:text-left" style={{ transform: "translateZ(50px)" }}>
                 <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400">
                      <HiSparkles size={14} />
                      <span className="text-[10px] font-black uppercase tracking-[0.3em]">Holographic Updates</span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black text-white leading-[0.85] tracking-tighter italic uppercase">
                      JOIN THE<br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-700">INFRASTRUCTURE</span>
                    </h2>
                    <p className="text-gray-500 text-lg font-medium max-w-md">
                      Sync your digital lifestyle with our weekly high-performance asset drops and architecture insights.
                    </p>
                 </div>

                 <div className="relative max-w-md mx-auto lg:mx-0 group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[2.2rem] opacity-20 group-hover:opacity-40 blur transition duration-500" />
                    <div className="relative flex flex-col sm:flex-row gap-4 p-2.5 bg-[#0a0a0a] rounded-[2rem] border border-white/10">
                       <input 
                         type="email" 
                         placeholder="SYNC YOUR EMAIL..."
                         value={email}
                         onChange={(e) => setEmail(e.target.value)}
                         className="flex-1 bg-transparent px-6 py-4 text-white font-black italic tracking-tight placeholder:text-gray-800 focus:outline-none"
                       />
                       <Button 
                         variant="primary" 
                         size="lg" 
                         className="!rounded-2xl !px-10 shadow-[0_10px_30px_rgba(37,99,235,0.3)]"
                       >
                         CONNECT
                       </Button>
                    </div>
                 </div>

                 <div className="flex flex-col sm:flex-row items-center gap-8 pt-4">
                    <div className="flex gap-4">
                       {[FaFacebookF, FaTwitter, FaLinkedinIn].map((Icon, i) => (
                         <motion.button
                           key={i}
                           whileHover={{ y: -5, scale: 1.2, color: "#3b82f6" }}
                           className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 hover:border-blue-500/50 transition-all"
                         >
                           <Icon />
                         </motion.button>
                       ))}
                    </div>
                    <p className="text-[9px] text-gray-600 font-black uppercase tracking-[0.3em]">
                      * ENCRYPTED DATA TRANSFER. NO SPAM POLICY.
                    </p>
                 </div>
              </div>

           </div>
        </div>
      </motion.div>

      {/* Decorative Stage Floor */}
      <div className="absolute bottom-0 left-0 w-full h-[20vh] bg-gradient-to-t from-blue-600/5 to-transparent blur-[100px] pointer-events-none" />
    </section>
  );
};

export default NewsLetter;
