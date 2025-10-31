"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export const Button = ({
  variant = "primary",
  size = "medium",
  children,
  className = "",
  onClick,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const baseStyles =
    "relative overflow-hidden rounded-full font-medium leading-none flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 transition-colors duration-50";

  const sizeStyles = {
    lowSmall:"px-4 py-3 text-sm",
    small:
      // "px-[17px] px-[10px] py-[10px] py-[14px] text-[10px] text-[16px]",
      "px-4.5 py-3.5 text-[10px] text-[16px]",
    medium: "px-3 py-3 px-6 sm:py-3 text-[16px] sm:text-base h-[48px]",
    large: "px-8 py-4 lg:text-lg h-[56px] max-sm:text-[13px]",
  };

  const variantStyles = {
    primary: "bg-[#2189ff] text-white hover:text-black",
    secondary: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
    bgBlack: "bg-[#67027d] text-white hover:text-white",
  };

  const hoverBgAnimation =
    variant === "primary"
      ? "before:absolute before:top-0 before:left-0 before:h-full before:w-0 hover:before:w-full before:rounded-full before:bg-[#F1F1F1] before:z-0 before:transition-all before:duration-500 before:ease-in-out before:shadow-[0_4px_12px_rgba(33,137,255,0.3)]"
      : variant === "bgBlack"
      ? "before:absolute before:top-0 before:left-0 before:h-full before:w-0 hover:before:w-full before:rounded-full before:bg-[#a142f5] before:z-0 before:transition-all before:duration-500 before:ease-in-out before:shadow-[0_4px_12px_rgba(33,137,255,0.4)]"
      : "";

  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${hoverBgAnimation} ${className}`}
      {...props}
    >
      <div className="relative z-10 overflow-hidden flex items-center justify-center h-full w-full">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={isHovered ? "hovered" : "default"}
            initial={{ y: isHovered ? 10 : -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: isHovered ? -10 : 10, opacity: 0 }}
            transition={{ duration: 0.1, ease: "easeInOut" }}
            className="flex items-center gap-1 whitespace-nowrap"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </button>
  );
};
