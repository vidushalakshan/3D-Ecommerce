"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import ProductCard from "@/components/common/ProductCard";
import images from "@/constants/images"; 

const products = [
  {
    id: 1,
    category: "Laptop",
    name: "Acer Predator",
    type: "Gaming Laptop",
    model: "G930",
    price: 2018.0,
    oldPrice: 2500.0,
    isHot: false,
    image: images.collectionLaptop,
  },
  {
    id: 2,
    category: "Headphone",
    name: "Sony WH-1000XM5",
    type: "Wireless Headset",
    model: "XM5",
    price: 418.0,
    oldPrice: 500.0,
    isHot: true,
    image: images.collectionHeadset,
  },
  {
    id: 3,
    category: "Smartphone",
    name: "Samsung Galaxy S24",
    type: "Flagship Phone",
    model: "S24",
    price: 1199.0,
    oldPrice: 1299.0,
    isHot: true,
    image: images.collectionLaptop,
  },
  {
    id: 4,
    category: "Camera",
    name: "Canon EOS R6",
    type: "DSLR Camera",
    model: "R6",
    price: 2499.0,
    oldPrice: 2800.0,
    isHot: false,
    image: images.collectionCamara,
  },
  {
    id: 5,
    category: "Smartwatch",
    name: "Apple Watch Ultra",
    type: "Rugged Watch",
    model: "Ultra 2",
    price: 799.0,
    oldPrice: 899.0,
    isHot: true,
    image: images.collectionLaptop,
  },
];

const NewProduct = () => {
  const [x, setX] = useState(0);
  const cardWidth = 320;
  const totalWidth = products.length * cardWidth;
  const intervalRef = useRef(null);

  const startAutoScroll = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setX((prev) => {
        const next = prev - 1;
        return Math.abs(next) >= totalWidth ? 0 : next;
      });
    }, 16);
  };

  const stopAutoScroll = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, []);

  const moveLeft = () => {
    stopAutoScroll();
    setX((prev) => prev + cardWidth);
  };

  const moveRight = () => {
    stopAutoScroll();
    setX((prev) => prev - cardWidth);
  };

  return (
    <section className="max-w-7xl mx-auto py-10 overflow-hidden relative">
      <h1 className="text-2xl font-bold text-black pb-8">NEW PRODUCTS</h1>

      <div onMouseEnter={stopAutoScroll} onMouseLeave={startAutoScroll}>
        <motion.div
          className="flex flex-nowrap"
          style={{ x }}
          transition={{ ease: "linear", duration: 0 }}
        >
          {[...products, ...products].map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </motion.div>
      </div>

      <div className="absolute top-15 right-0 transform -translate-y-1/2 z-10 flex gap-2">
        <button
          onClick={moveLeft}
          className="bg-white shadow-lg rounded-full p-2 hover:bg-gray-100"
        >
          <MdKeyboardArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <button
          onClick={moveRight}
          className="bg-white shadow-lg rounded-full p-2 hover:bg-gray-100"
        >
          <MdKeyboardArrowRight className="w-6 h-6 text-gray-600" />
        </button>
      </div>
    </section>
  );
};

export default NewProduct;