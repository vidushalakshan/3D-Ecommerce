"use client";
import Searchbar from "../content/Searchbar";
import { motion } from "framer-motion";
import { navItems } from "../../../public/data/menu";
import { usePathname } from "next/navigation";

const BottomNavBar = () => {
  const pathname = usePathname();
  return (
    <section className="bg-[#15161D] shadow-md transition-all duration-300 px-4 py-4">
      <div className="flex flex-col md:flex-row justify-between items-center md:gap-4 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row flex-wrap items-center gap-4">
          <h1 className="text-[35px] font-bold text-[#eeeeee]">
            Electro<span style={{ color: "rgba(39, 124, 217, 1)" }}>.</span>
          </h1>
        </div>
        <div className="flex items-center gap-[40px] max-w-7xl mx-auto">
          {navItems.map((item) => {
            const normalizePath = (path) =>
              path === "/" ? "/" : path.replace(/\/$/, "");

            const isActive =
              normalizePath(pathname) === normalizePath(item.href);

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
                className={`group relative h-[24px] overflow-hidden text-white font-medium text-[15px] ${
                  isActive ? "text-#277CD9" : "hover:text-[#277CD9]"
                }`}
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
                  className="absolute left-0 -bottom-[6px] w-full h-[8px] bg-[#277CD9]"
                />
              </motion.a>
            );
          })}
        </div>
        <div className="flex flex-col sm:flex-row flex-wrap items-center gap-4">
          <Searchbar />
        </div>
      </div>
    </section>
  );
};

export default BottomNavBar;
