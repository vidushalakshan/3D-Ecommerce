"use client";
import { Button } from "@/components/common/Button";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { HiBolt, HiCpuChip, HiSparkles } from "react-icons/hi2";

const Home = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoSrc = "/video/background.mp4"; 
  const router = useRouter();
  const containerRef = useRef(null);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const handleClick = () => {
    router.push("/allCategories");
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section ref={containerRef} className="relative flex items-center justify-center min-h-screen bg-[#020202] overflow-hidden">
      <motion.div style={{ y: y1 }} className="absolute inset-0 z-0">
        <video
          className={`w-full h-full object-cover transition-opacity duration-[2000ms] ${
            isVideoLoaded ? "opacity-30" : "opacity-0"
          }`}
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          onCanPlayThrough={() => setIsVideoLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020202] via-transparent to-[#020202]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#020202] via-transparent to-[#020202]" />
      </motion.div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden hidden lg:block">
        <motion.div 
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[25%] left-[10%] p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-xl text-blue-400"><HiCpuChip size={24}/></div>
            <div>
              <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Processor</p>
              <p className="text-sm font-bold text-white">X-Core Quantum</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 20, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[30%] right-[12%] p-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/20 rounded-xl text-purple-400"><HiBolt size={24}/></div>
            <div>
              <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Efficiency</p>
              <p className="text-sm font-bold text-white">99.9% Ultrafast</p>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        style={{ y: y2, opacity }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-7xl px-8 flex flex-col items-center text-center"
      >
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-2xl mb-8">
          <HiSparkles className="text-blue-400 animate-pulse" />
          <span className="text-[11px] font-black text-blue-400 uppercase tracking-[0.3em]">The Future of Interaction</span>
        </motion.div>

        <motion.h1 
          variants={itemVariants}
          className="text-6xl md:text-8xl lg:text-[10rem] font-black text-white leading-[0.85] tracking-[-0.05em] mb-8 select-none"
        >
          DIGITAL<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-blue-400 to-blue-700">LIFESTYLE</span>
        </motion.h1>

        <motion.p 
          variants={itemVariants}
          className="text-gray-500 text-lg md:text-2xl max-w-2xl mx-auto font-medium leading-relaxed tracking-tight mb-12"
        >
          Discover cutting-edge technology designed to amplify your human potential and redefine your daily experience.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-6">
          <Button 
            onClick={handleClick}
            variant="secondary"
            size="xl"
            icon={HiArrowRight}
            className="shadow-[0_0_40px_rgba(255,255,255,0.1)]"
          >
            Explore Now
          </Button>
          
          <Button 
            variant="outline"
            size="xl"
          >
            View Story
          </Button>
        </motion.div>
      </motion.div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[50vh] bg-gradient-to-t from-blue-600/10 to-transparent blur-[120px] pointer-events-none" />
    </section>
  );
};

const HiArrowRight = ({ className }) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

export default Home;