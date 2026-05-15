"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export const Button = ({
  variant = "primary",
  size = "md",
  children,
  className = "",
  onClick,
  icon: Icon,
  loading = false,
  fullWidth = false,
  ...props
}) => {
  const baseStyles = "relative inline-flex items-center justify-center gap-2 font-bold transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:active:scale-100 overflow-hidden";
  
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-600/20 hover:cursor-pointer",
    secondary: "bg-white text-black hover:bg-gray-200 shadow-xl shadow-white/5 cursor-pointer",
    outline: "bg-transparent border-2 border-white/20 text-white hover:bg-white/5 hover:border-white/40 cursor-pointer",
    glass: "bg-white/5 backdrop-blur-xl border border-white/10 text-white hover:bg-white/10 cursor-pointer",
    danger: "bg-red-600 text-white hover:bg-red-500 shadow-lg shadow-red-600/20 cursor-pointer",
    ghost: "bg-transparent text-gray-400 hover:text-white hover:bg-white/5 cursor-pointer"
  };

  const sizes = {
    sm: "px-4 py-2 text-xs rounded-xl",
    md: "px-6 py-3 text-sm rounded-2xl",
    lg: "px-8 py-4 text-base rounded-2xl",
    xl: "px-10 py-5 text-lg rounded-[2rem]"
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={loading}
      className={`
        ${baseStyles} 
        ${variants[variant]} 
        ${sizes[size]} 
        ${fullWidth ? "w-full" : ""} 
        ${className}
      `}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {/* Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:animate-[shine_1.5s_infinite] transition-transform pointer-events-none" />
      
      <div className={`relative z-10 flex items-center justify-center ${Icon && typeof children === "string" ? "gap-2" : ""}`}>
        {loading ? (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : Icon ? (
          <Icon size={size === "sm" ? 16 : 20} className="shrink-0" />
        ) : null}
        
        {typeof children === "string" ? (
          <span className="whitespace-nowrap">{children}</span>
        ) : (
          children
        )}
      </div>
      
      <style jsx>{`
        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </motion.button>
  );
};
