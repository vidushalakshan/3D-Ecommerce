"use client";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState, useRef, useCallback } from "react";
import { isSuperAdmin } from "@/lib/clerk";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { HiOutlineMail, HiOutlineLockClosed, HiArrowRight, HiSparkles } from "react-icons/hi2";
import { Button } from "@/components/common/Button";

export default function LoginForm() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  if (!isLoaded) return null;

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        if (isSuperAdmin(result.identifier)) {
          router.push("/admin-dashboard");
        } else {
          router.push("/");
        }
      }
    } catch (err) {
      console.error(err);
      setError(err.errors?.[0]?.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/"
      });
    } catch (err) {
      setError("Social login failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] px-6 relative overflow-hidden selection:bg-blue-500/30">
      {/* Immersive Background Stage */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
        
        {/* Tech Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.05]" style={{ 
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <motion.div 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: "1000px" }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-[480px]"
      >
        <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 p-12 rounded-[3.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
          {/* Header */}
          <div className="text-center mb-12 space-y-4">
            <motion.div 
               style={{ transform: "translateZ(30px)" }}
               className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full mb-2"
            >
              <HiSparkles className="text-blue-400 text-xs" />
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-blue-400">Secure Protocol</span>
            </motion.div>
            <h1 
              style={{ transform: "translateZ(50px)" }}
              className="text-4xl md:text-5xl font-black text-white tracking-tighter italic leading-none"
            >
              ACCESS PORTAL<span className="text-blue-600 text-4xl">.</span>
            </h1>
            <p 
               style={{ transform: "translateZ(20px)" }}
               className="text-gray-500 text-[10px] font-bold uppercase tracking-widest"
            >
              Establish a secure connection to your terminal.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6" style={{ transform: "translateZ(40px)" }}>
            <div className="space-y-4">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-500 group-focus-within:text-blue-400 transition-colors">
                  <HiOutlineMail size={18} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="IDENTITY@PROTOCOL.COM"
                  className="w-full bg-white/[0.03] border border-white/5 text-white pl-14 pr-6 py-4.5 rounded-2xl focus:outline-none focus:ring-1 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all placeholder:text-gray-700 text-[11px] font-bold tracking-widest uppercase"
                  required
                />
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-gray-500 group-focus-within:text-blue-400 transition-colors">
                  <HiOutlineLockClosed size={18} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="ACCESS KEY"
                  className="w-full bg-white/[0.03] border border-white/5 text-white pl-14 pr-6 py-4.5 rounded-2xl focus:outline-none focus:ring-1 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all placeholder:text-gray-700 text-[11px] font-bold tracking-widest uppercase"
                  required
                />
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-red-400 text-[10px] font-black uppercase tracking-widest text-center"
                >
                  ERROR: {error}
                </motion.div>
              )}
            </AnimatePresence>

            <Button
              type="submit"
              loading={loading}
              fullWidth
              size="xl"
              icon={HiArrowRight}
              className="!rounded-2xl shadow-[0_20px_40px_rgba(37,99,235,0.2)] hover:shadow-[0_20px_50px_rgba(37,99,235,0.4)]"
            >
              AUTHENTICATE
            </Button>
          </form>

          <div className="relative my-10" style={{ transform: "translateZ(20px)" }}>
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5"></div>
            </div>
            <div className="relative flex justify-center text-[8px] font-black uppercase tracking-[0.5em] text-gray-600">
              <span className="bg-[#0f0f0f] px-4">Secondary Auth</span>
            </div>
          </div>

          <Button
            onClick={handleGoogleLogin}
            variant="glass"
            fullWidth
            size="lg"
            className="!rounded-2xl gap-3 border-white/5 hover:bg-white/5"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="currentColor" d="M12 23c2.97 0 5.46-1.01 7.28-2.73l-3.57-2.77c-.98.66-2.23 1.05-3.71 1.05-2.86 0-5.29-1.93-6.16-4.53H2.11v2.83C3.93 20.58 7.63 23 12 23z" />
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.11C1.42 8.92 1 10.92 1 13s.42 4.08 2.11 5.93l3.73-2.84z" />
              <path fill="currentColor" d="M12 6.75c1.62 0 3.08.56 4.23 1.65l3.17-3.17C17.46 3.01 14.97 2 12 2 7.63 2 3.93 4.42 2.11 7.07l3.73 2.84C6.71 8.29 9.14 6.75 12 6.75z" />
            </svg>
            <span className="text-[10px] font-black uppercase tracking-widest">Connect with Google</span>
          </Button>

          <p className="text-center mt-10 text-[10px] font-bold text-gray-600 uppercase tracking-widest" style={{ transform: "translateZ(20px)" }}>
            New User?{" "}
            <a href="/register" className="text-blue-500 font-black hover:text-blue-400 transition-colors">Create Identity</a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}