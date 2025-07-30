"use client";
import React, { useEffect, useState } from "react";
import TopNavBar from "./TopNavBar";
import BottomNavBar from "./BottomNavBar";
import { motion } from "framer-motion";

const NavBar = () => {
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setVisible(prevScrollY > currentScrollY || currentScrollY < 10);
      setPrevScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollY]);

  return (
    <motion.div
      className="fixed top-0 z-50 w-full"
      initial={{ y: 0 }}
      animate={{ y: visible ? 0 : -150 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <TopNavBar />
      <BottomNavBar />
    </motion.div>
  );
};

export default NavBar;
