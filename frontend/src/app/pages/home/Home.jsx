"use client";
import { Button } from "@/components/common/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";

const Home = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoSrc = "/video/background.mp4"; // Adjust the path as necessary
  
  const router = useRouter();

  const handleClick = () => {
    router.push("/allCategories"); // Navigate to the All Categories page
    // window.scrollTo(0, 0); // Scroll to the top of the page
  }

  return (
    <section className="relative flex items-center justify-center min-h-[90vh] bg-[#0a0a0a] overflow-hidden">
      {/* Fullscreen Background Video */}
      <video
        className={`absolute top-0 left-0 w-full h-full object-cover z-0 transition-opacity duration-1000 ${
          isVideoLoaded ? "opacity-40" : "opacity-0"
        }`}
        src={videoSrc}
        autoPlay
        loop
        muted
        onCanPlayThrough={() => setIsVideoLoaded(true)}
      />

      {/* Decorative Gradients */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/60 via-transparent to-black/80 z-0" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full z-0" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full z-0" />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl px-6 py-24 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8 max-w-4xl"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-4">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Next Generation Tech</span>
          </div>

          <h2 className="text-5xl md:text-7xl lg:text-8xl text-white font-extrabold leading-[1.1] tracking-tighter">
            Elevate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Digital</span> Lifestyle
          </h2>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Experience the future of electronics with our curated collection of high-performance devices, designed for the modern explorer.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-8">
            <button 
              onClick={handleClick} 
              className="group relative px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-xl shadow-blue-600/20 hover:bg-blue-500 transition-all active:scale-95 flex items-center gap-2 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              <span>Explore Collection</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            
            <button className="px-8 py-4 bg-white/5 text-white font-bold rounded-2xl border border-white/10 hover:bg-white/10 transition-all backdrop-blur-md">
              Watch Demo
            </button>
          </div>
        </motion.div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent z-10" />
    </section>
  );
};

export default Home;