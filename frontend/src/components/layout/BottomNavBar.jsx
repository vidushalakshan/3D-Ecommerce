"use client";

import { motion } from "framer-motion";
import { navItems } from "../../../public/data/menu.js";
import { usePathname } from "next/navigation";

const BottomNavBar = () => {
  const pathname = usePathname();

  return (
    <motion.div
      animate={{ y: 0, opacity: 1, transition: { duration: 0.3 } }}
      className="relative left-0 w-full z-50 shadow-sm"
    >
      <nav className="bg-white bg-opacity-90">
        <div className="py-[20px]">
          <div className="flex justify-start gap-[40px] max-w-7xl mx-auto">
            {navItems.map((item) => {
              const isActive =
                pathname.replace(/\/$/, "") === item.href.replace(/\/$/, "");

              return (
                <motion.a
                  key={item.label}
                  href={item.href}
                  whileHover="hover"
                  initial="initial"
                  animate={isActive ? "active" : "initial"}
                  variants={{
                    initial: {},
                    hover: {},
                    active: {},
                  }}
                  className={`group relative h-[24px] overflow-hidden text-[#2a2d34] font-medium text-[15px] 
                    ${isActive ? "text-[#D10024]" : "hover:text-[#D10024]"}`}
                >
                  {/* Slide-up text effect */}
                  <span className="whitespace-nowrap block transition-all duration-300 group-hover:-translate-y-full">
                    {item.label}
                  </span>
                  <span className="absolute left-0 top-full block transition-all duration-300 group-hover:top-0">
                    {item.label}
                  </span>

                  {/* Animated underline */}
                  <motion.span
                    variants={{
                      initial: { x: "-100%" },
                      hover: { x: "0%" },
                      active: { x: "0%" },
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute left-0 -bottom-[6px] w-full h-[8px] bg-[#D10024]"
                  />
                </motion.a>
              );
            })}
          </div>
        </div>
      </nav>
    </motion.div>
  );
};

export default BottomNavBar;
