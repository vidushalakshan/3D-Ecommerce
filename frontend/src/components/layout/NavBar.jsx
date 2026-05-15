"use client";
import React, { useEffect, useState } from "react";
import BottomNavBar from "./BottomNavBar";
import { motion } from "framer-motion";

const NavBar = () => {
  const [visible, setVisible] = useState(true);
  const [prevScrollY, setPrevScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      if (currentY > prevScrollY && currentY > 80) {
        setVisible(false); 
      } else {
        setVisible(true);
      }

      setPrevScrollY(currentY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-full z-50"
      initial={{ y: 0 }}
      animate={{ y: visible ? 0 : -150 }}
      transition={{ duration: 0.35 }}
    >
      <BottomNavBar />
    </motion.div>
  );
};

export default NavBar;
