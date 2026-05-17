"use client";
import { Button } from "@/components/common/Button";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { HiBolt, HiCpuChip, HiSparkles, HiArrowRight } from "react-icons/hi2";

const Home = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoSrc = "/video/background.mp4";
  const router = useRouter();
  const containerRef = useRef(null);

  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 500], [0, 150]);
  const scaleParallax = useTransform(scrollY, [0, 500], [1, 1.1]);
  const opacityParallax = useTransform(scrollY, [0, 400], [1, 0]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  const textX = useTransform(springX, [-0.5, 0.5], ["-30px", "30px"]);
  const textY = useTransform(springY, [-0.5, 0.5], ["-20px", "20px"]);
  const rotateX = useTransform(springY, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = useCallback((e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX / innerWidth - 0.5);
    mouseY.set(clientY / innerHeight - 0.5);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative flex items-center justify-center min-h-screen bg-[#020202] overflow-hidden"
    >
      <motion.div
        style={{ y: yParallax, scale: scaleParallax }}
        className="absolute inset-0 z-0"
      >
        <video
          className={`w-full h-full object-cover transition-opacity duration-[2000ms] ${isVideoLoaded ? "opacity-40" : "opacity-0"
            }`}
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          onCanPlayThrough={() => setIsVideoLoaded(true)}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020202_90%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020202] via-transparent to-[#020202]" />
      </motion.div>

      <div className="absolute inset-0 pointer-events-none perspective-[1000px]">
        <motion.div
          style={{ x: textX, y: textY, rotateX, rotateY }}
          className="absolute top-[20%] left-[15%] w-32 h-32 bg-blue-500/10 blur-[60px] rounded-full animate-pulse"
        />
        <motion.div
          style={{ x: useTransform(springX, (v) => v * -50), y: useTransform(springY, (v) => v * -40) }}
          className="absolute bottom-[20%] right-[20%] w-48 h-48 bg-purple-500/10 blur-[80px] rounded-full animate-pulse delay-700"
        />
      </div>

      <motion.div
        style={{ opacity: opacityParallax, perspective: "1500px" }}
        className="relative z-10 w-full max-w-7xl px-8 flex flex-col items-center text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-3xl mb-8 shadow-[0_0_30px_rgba(37,99,235,0.1)]"
        >
          <HiSparkles className="text-blue-400 animate-pulse" />
          <span className="text-[11px] font-black text-blue-400 uppercase tracking-[0.4em]">Next-Gen Digital Stage</span>
        </motion.div>

        <motion.div
          style={{ x: textX, y: textY, rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="relative"
        >
          <h1 className="text-6xl md:text-8xl lg:text-[11rem] font-black text-white leading-[0.8] tracking-tighter mb-8 italic">
            SHAPE YOUR<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-blue-400 to-blue-800 drop-shadow-[0_20px_50px_rgba(37,99,235,0.3)]">
              REALITY
            </span>
          </h1>

          <div className="absolute inset-0 -z-10 blur-[40px] opacity-20 pointer-events-none select-none">
            <h1 className="text-6xl md:text-8xl lg:text-[11rem] font-black text-blue-500 leading-[0.8] tracking-tighter italic">
              SHAPE YOUR<br />REALITY
            </h1>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-gray-400 text-lg md:text-2xl max-w-2xl mx-auto font-medium leading-relaxed tracking-tight mb-12"
        >
          Step into a fully interactive 3D marketplace where cutting-edge hardware meets next-generation design. Explore, customize, and experience premium tech like never before.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <Button
            onClick={() => router.push("/allCategories")}
            variant="primary"
            size="xl"
            icon={HiArrowRight}
            className="shadow-[0_20px_50px_rgba(37,99,235,0.3)] min-w-[240px]"
          >
            ENTER THE STORE
          </Button>

          <Button
            variant="glass"
            size="xl"
            className="min-w-[200px]"
          >
            WATCH DEMO
          </Button>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 w-full h-[30vh] bg-gradient-to-t from-blue-600/10 to-transparent blur-[100px] pointer-events-none" />
      <div className="absolute bottom-12 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
};

export default Home;