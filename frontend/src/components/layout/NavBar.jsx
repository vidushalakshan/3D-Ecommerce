"use client";
import React, { useEffect, useState } from "react";
import TopNavBar from "./TopNavBar";
import BottomNavBar from "./BottomNavBar";
import { motion } from "framer-motion";

const NavBar = () => {
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [visible, setVisible] = useState(true);


  return (
    <motion.div
      className="fixed top-0 z-50 w-full"
      initial={{ y: 0 }}
      animate={{ y: visible ? 0 : -150 }}
    >
      <BottomNavBar />
    </motion.div>
  );
};

export default NavBar;
