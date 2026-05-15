"use client";
import React, { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineUser, HiArrowRight } from "react-icons/hi2";
import { Button } from "../common/Button";

const RegisterForm = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoaded) return;
    try {
      await signUp.create({
        emailAddress: email,
        password,
        firstName,
        lastName,
      });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err) {
      setError(err.errors[0].longMessage);
    }
  };

  const onPressVerify = async (e) => {
    e.preventDefault();
    if (!isLoaded) return;
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({ code });
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push("/");
      }
    } catch (err) {
      setError(err.errors[0].longMessage);
    }
  };

  return (
    <div className="min-h-screen bg-[#020202] flex items-center justify-center p-6">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl relative z-10"
      >
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-[2.5rem] shadow-2xl">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-extrabold text-white tracking-tighter mb-2 italic">
              JOIN 3D TECH STORE<span className="text-blue-500">.</span>
            </h1>
            <p className="text-gray-400 font-medium">Create your premium account.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-sm font-bold text-center">
              {error}
            </div>
          )}

          {!pendingVerification ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest ml-4">First Name</label>
                  <div className="relative">
                    <HiOutlineUser className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type="text"
                      placeholder="John"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white focus:outline-none focus:border-blue-500 transition-colors font-medium"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest ml-4">Last Name</label>
                  <div className="relative">
                    <HiOutlineUser className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Doe"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white focus:outline-none focus:border-blue-500 transition-colors font-medium"
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest ml-4">Email Address</label>
                <div className="relative">
                  <HiOutlineMail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="email"
                    placeholder="name@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white focus:outline-none focus:border-blue-500 transition-colors font-medium"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest ml-4">Password</label>
                <div className="relative">
                  <HiOutlineLockClosed className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-white focus:outline-none focus:border-blue-500 transition-colors font-medium"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <Button type="submit" variant="primary" size="xl" className="w-full mt-4" icon={HiArrowRight}>
                SIGN UP
              </Button>
            </form>
          ) : (
            <form onSubmit={onPressVerify} className="space-y-6">
              <div className="space-y-2 text-center mb-8">
                <p className="text-gray-400 font-medium">We've sent a code to {email}</p>
              </div>
              <input
                type="text"
                placeholder="Enter verification code"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white text-center text-2xl font-bold tracking-[0.5em] focus:outline-none focus:border-blue-500 transition-colors"
                onChange={(e) => setCode(e.target.value)}
              />
              <Button type="submit" variant="primary" size="xl" className="w-full" icon={HiArrowRight}>
                VERIFY ACCOUNT
              </Button>
            </form>
          )}

          <div className="mt-8 pt-8 border-t border-white/10 text-center">
            <p className="text-gray-500 font-medium">
              Already have an account?{" "}
              <a href="/sign-in" className="text-blue-500 hover:text-blue-400 font-bold ml-1">
                Sign In
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterForm;
