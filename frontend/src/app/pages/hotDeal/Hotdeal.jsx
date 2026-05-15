"use client";
import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "@/components/common/Button";
import { HiFire, HiArrowRight } from "react-icons/hi2";

const CountdownItem = ({ value, label }) => (
  <motion.div 
    whileHover={{ scale: 1.05 }}
    className="flex flex-col justify-center items-center bg-white/5 backdrop-blur-xl border border-white/10 text-white rounded-3xl w-20 h-24 md:w-24 md:h-28 shadow-2xl relative overflow-hidden group"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <span className="text-3xl md:text-4xl font-black italic tracking-tighter z-10">{value}</span>
    <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-blue-400 mt-1 z-10">{label}</span>
  </motion.div>
);

const FloatingVideo = ({ src, className, rotateReverse = false }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
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

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: rotateReverse ? rotateY : rotateX,
        rotateY: rotateReverse ? rotateX : rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`relative group ${className}`}
    >
      <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-[80px] group-hover:blur-[100px] transition-all duration-700 opacity-50" />
      <motion.video
        autoPlay
        loop
        muted
        playsInline
        src={src}
        className="relative z-10 w-full aspect-square object-cover rounded-full border-2 border-white/10 shadow-2xl group-hover:border-blue-500/50 transition-colors duration-500"
        style={{ transform: "translateZ(50px)" }}
      />
      
      <motion.div 
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full blur-xl opacity-40 z-20"
      />
    </motion.div>
  );
};

const Hotdeal = () => {
  const initialTime = 2 * 24 * 3600 + 12 * 3600 + 30 * 60 + 45;
  const [timeLeft, setTimeLeft] = useState(initialTime);

  const videoLeft = "/video/left.mp4";
  const videoRight = "/video/right.mp4";

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : initialTime));
    }, 1000);
    return () => clearInterval(interval);
  }, [initialTime]);

  const days = String(Math.floor(timeLeft / (24 * 3600))).padStart(2, "0");
  const hours = String(Math.floor((timeLeft % (24 * 3600)) / 3600)).padStart(2, "0");
  const mins = String(Math.floor((timeLeft % 3600) / 60)).padStart(2, "0");
  const secs = String(timeLeft % 60).padStart(2, "0");

  return (
    <section className="relative w-full bg-[#030303] py-24 md:py-32 px-8 overflow-hidden border-y border-white/5">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.05)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50 contrast-150 pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8">
          <div className="w-full lg:w-1/3 flex justify-center">
            <FloatingVideo 
              src={videoRight} 
              className="w-64 md:w-80 lg:w-[450px]" 
            />
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/3 flex flex-col items-center text-center gap-12"
          >
            <div className="space-y-4">
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 mb-4"
              >
                <HiFire size={16} />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Extreme Offer</span>
              </motion.div>
              
              <h2 className="text-5xl md:text-7xl font-black text-white leading-none tracking-tighter italic drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
                HOT DEAL<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-blue-400 to-blue-700 filter drop-shadow-[0_5px_15px_rgba(37,99,235,0.4)]">OF THE WEEK</span>
              </h2>
              <p className="text-gray-400 font-medium tracking-tight text-lg max-w-sm mx-auto mt-6">
                Elevate your setup with premium 3D assets. Up to <span className="text-white font-black underline decoration-blue-500 decoration-2 underline-offset-4">50% OFF</span> on selected models.
              </p>
            </div>

            <div className="flex gap-3 md:gap-4">
              <CountdownItem value={days} label="Days" />
              <CountdownItem value={hours} label="Hours" />
              <CountdownItem value={mins} label="Mins" />
              <CountdownItem value={secs} label="Secs" />
            </div>

            <div className="flex flex-col items-center gap-6">
              <Button 
                variant="primary" 
                size="xl"   
                icon={HiArrowRight}
                className="shadow-[0_0_50px_rgba(37,99,235,0.3)] min-w-[240px]"
              >
                SHOP COLLECTION
              </Button>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">
                * Offer ends in exactly {days} days
              </p>
            </div>
          </motion.div>

          <div className="w-full lg:w-1/3 flex justify-center">
            <FloatingVideo 
              src={videoLeft} 
              className="w-64 md:w-80 lg:w-[450px]" 
              rotateReverse={true}
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
};

export default Hotdeal;