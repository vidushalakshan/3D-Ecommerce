"use client";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { isAdminEmail } from "@/lib/clerk";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineShieldCheck, HiOutlineMail, HiOutlineLockClosed, HiArrowRight } from "react-icons/hi";

import { Button } from "@/components/common/Button";

export default function AdminLoginForm() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (!isLoaded) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // 1. Attempt Sign In
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        const userEmail = result.identifier;

        // 2. Authorization Check
        if (isAdminEmail(userEmail)) {
          await setActive({ session: result.createdSessionId });
          router.push("/admin-dashboard");
        } else {
          setError("Access Denied: Unauthorised administrator.");
          // We don't setActive here to prevent logging in a non-admin to an admin session
        }
      }
    } catch (err) {
      console.error(err);
      setError(err.errors?.[0]?.message || "Admin verification failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAdminLogin = async () => {
    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/admin-dashboard"
      });
    } catch (err) {
      setError("Admin social login failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] px-6 relative overflow-hidden">
      {/* Red Alert Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-900/10 blur-[150px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="bg-black/40 backdrop-blur-3xl border border-red-900/30 p-10 rounded-[2.5rem] shadow-[0_0_50px_rgba(220,38,38,0.05)]">
          <div className="text-center mb-10">
            <div className="inline-flex p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 mb-6">
              <HiOutlineShieldCheck size={40} />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight mb-2 uppercase">Admin Portal</h1>
            <p className="text-gray-500 text-sm font-medium">Authorised Personnel Only</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-600 group-focus-within:text-red-500 transition-colors">
                  <HiOutlineMail size={20} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Admin Email"
                  className="w-full bg-white/5 border border-white/10 text-white pl-12 pr-4 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all placeholder:text-gray-700"
                  required
                />
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-600 group-focus-within:text-red-500 transition-colors">
                  <HiOutlineLockClosed size={20} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Secret Key"
                  className="w-full bg-white/5 border border-white/10 text-white pl-12 pr-4 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all placeholder:text-gray-700"
                  required
                />
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-400 text-xs font-bold uppercase tracking-widest"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <Button
              type="submit"
              loading={loading}
              variant="danger"
              fullWidth
              icon={HiArrowRight}
            >
              Access Dashboard
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#080808] px-4 text-gray-700 font-bold tracking-widest">Secure SSO</span>
            </div>
          </div>

          <Button
            onClick={handleGoogleAdminLogin}
            variant="glass"
            fullWidth
            className="gap-3"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="currentColor" d="M12 23c2.97 0 5.46-1.01 7.28-2.73l-3.57-2.77c-.98.66-2.23 1.05-3.71 1.05-2.86 0-5.29-1.93-6.16-4.53H2.11v2.83C3.93 20.58 7.63 23 12 23z" />
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.11C1.42 8.92 1 10.92 1 13s.42 4.08 2.11 5.93l3.73-2.84z" />
              <path fill="currentColor" d="M12 6.75c1.62 0 3.08.56 4.23 1.65l3.17-3.17C17.46 3.01 14.97 2 12 2 7.63 2 3.93 4.42 2.11 7.07l3.73 2.84C6.71 8.29 9.14 6.75 12 6.75z" />
            </svg>
            Google Admin
          </Button>
        </div>
      </motion.div>
    </div>
  );
}