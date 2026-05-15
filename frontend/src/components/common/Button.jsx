"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useState, useRef, useCallback } from "react";

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
  const [isHovered, setIsHovered] = useState(false);
  const btnRef = useRef(null);
  
  // Magnetic effect values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = useCallback((e) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    x.set(distanceX * 0.1);
    y.set(distanceY * 0.1);
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  }, [x, y]);

  const baseStyles = "relative inline-flex items-center justify-center gap-2 font-black tracking-tight transition-colors duration-300 disabled:opacity-50 overflow-hidden group select-none";
  
  const variants = {
    primary: "bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:bg-blue-500",
    secondary: "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:bg-gray-100",
    outline: "bg-transparent border-2 border-white/20 text-white hover:bg-white/10 hover:border-white/40",
    glass: "bg-white/5 backdrop-blur-xl border border-white/10 text-white hover:bg-white/10",
    danger: "bg-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.2)] hover:bg-red-500",
    ghost: "bg-transparent text-gray-400 hover:text-white hover:bg-white/5",
    bgBlack: "bg-black text-white border border-white/10 hover:bg-white/5"
  };

  const sizes = {
    sm: "px-4 py-2 text-[10px] uppercase tracking-widest rounded-xl",
    md: "px-6 py-3 text-xs uppercase tracking-widest rounded-2xl",
    lg: "px-8 py-4 text-sm uppercase tracking-widest rounded-2xl",
    xl: "px-10 py-5 text-base uppercase tracking-[0.2em] rounded-[2rem]",
    icon: "w-10 h-10 p-0 rounded-xl"
  };

  return (
    <motion.button
      ref={btnRef}
      onClick={onClick}
      disabled={loading}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`
        ${baseStyles} 
        ${variants[variant]} 
        ${sizes[size]} 
        ${fullWidth ? "w-full" : ""} 
        ${className}
      `}
      style={{
        x: mouseXSpring,
        y: mouseYSpring,
      }}
      whileHover={{ 
        scale: 1.02,
        y: -2,
        boxShadow: variant === 'primary' ? '0 10px 40px -10px rgba(37,99,235,0.5)' : '0 10px 40px -10px rgba(255,255,255,0.1)'
      }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 15 }}
      {...props}
    >
      {/* Animated Gradient Background on Hover */}
      <motion.div 
        className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
        animate={{ 
          translateX: isHovered ? ["100%", "-100%"] : "-100%" 
        }}
        transition={{ 
          duration: 1.5, 
          repeat: Infinity, 
          ease: "linear" 
        }}
      />
      
      {/* Border Light effect */}
      <div className="absolute inset-0 rounded-inherit border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

      <div className={`relative z-10 flex items-center justify-center ${Icon && typeof children === "string" ? "gap-2.5" : ""}`}>
        {loading ? (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : Icon ? (
          <motion.div
            animate={{ 
              x: isHovered ? [0, 2, 0] : 0,
              scale: isHovered ? 1.1 : 1
            }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center"
          >
            <Icon size={size === "sm" || size === "icon" ? 16 : 20} className="shrink-0" />
          </motion.div>
        ) : null}
        
        {typeof children === "string" ? (
          <span className="whitespace-nowrap font-black italic">{children}</span>
        ) : (
          children
        )}
      </div>

    </motion.button>
  );
};
