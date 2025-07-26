"use client";
import Image from "next/image";
import images from "@/constants/images";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const products = [
  {
    id: 1,
    category: "Laptop",
    name: "Gaming Laptop",
    price: 980,
    oldPrice: 1100,
    image: images.collectionLaptop,
  },
  {
    id: 2,
    category: "Camera",
    name: "DSLR Camera",
    price: 850,
    oldPrice: 1000,
    image: images.collectionCamara,
  },
  {
    id: 3,
    category: "Laptop",
    name: "Business Laptop",
    price: 1050,
    oldPrice: 1200,
    image: images.collectionHeadset,
  },
  {
    id: 4,
    category: "Laptop",
    name: "Ultrabook",
    price: 1150,
    oldPrice: 1300,
    image: images.collectionLaptop,
  },
  {
    id: 5,
    category: "Laptop",
    name: "Gaming Beast",
    price: 980,
    oldPrice: 1100,
    image: images.collectionLaptop,
  },
];

const ProductCard = ({ product }) => (
  <div className="flex-shrink-0 relative flex flex-col items-center border-2 border-gray-400 p-4 w-[280px] rounded-lg shadow-lg text-center mx-2 hover:border-2 hover:border-red-800">
    <div className="flex justify-center items-center h-[200px]">
      <Image
        src={product.image}
        alt={product.name}
        className="w-[200px] h-auto object-contain"
      />
    </div>
    <span className="text-[14px] text-gray-500 mt-4 uppercase h-[20px] flex items-center">
      {product.category}
    </span>
    <h2 className="text-gray-950 text-[18px] font-bold mt-2 h-[40px] flex items-center justify-center">
      {product.name}
    </h2>
    <div className="flex items-center gap-2 mt-2 text-lg h-[30px]">
      <span className="font-semibold text-[25px] text-red-500">
        ${product.price}
      </span>
      <del className="text-gray-500 text-[13px] relative top-0.5">
        ${product.oldPrice}
      </del>
    </div>
    <hr className="w-full my-2" />
    <div className="flex gap-2 mt-2 h-[50px]">
      <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300">
        Add to Cart
      </button>
      <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition duration-300">
        View Details
      </button>
    </div>
    <span className="text-white text-[10px] bg-red-600 py-2 px-3 rounded absolute right-4">
      NEW
    </span>
  </div>
);

const NewProduct = () => {
  const [x, setX] = useState(0);
  const cardWidth = 300; // card + margin
  const totalWidth = products.length * cardWidth;
  const intervalRef = useRef(null);

  // Auto-scroll
  const startAutoScroll = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setX((prev) => {
        let next = prev - 1; // Slower smooth movement
        if (Math.abs(next) >= totalWidth) {
          return 0; // reset when first list moves out
        }
        return next;
      });
    }, 16); // ~60fps
  };

  const stopAutoScroll = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, []);

  // Manual Controls
  const moveLeft = () => {
    stopAutoScroll();
    setX((prev) => prev + cardWidth);
  };

  const moveRight = () => {
    stopAutoScroll();
    setX((prev) => prev - cardWidth);
  };

  return (
    <section className="max-w-7xl mx-auto text-gray-950 overflow-hidden relative px-4">
      <h1 className="text-gray-950 text-2xl font-bold pt-20">NEW PRODUCTS</h1>
      <div
        className="relative pt-10"
        onMouseEnter={stopAutoScroll}
        onMouseLeave={startAutoScroll}
      >
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
      <div className="absolute bottom-0 right-13 opacity-90 "> 
        <button
          onClick={moveLeft}
          className="transform -translate-y-1/2 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100 hover:cursor-pointer mr-2"
        >
          <MdKeyboardArrowLeft className="w-6 h-6  text-gray-600" />
        </button>
        <button
          onClick={moveRight}
          className="absolute transform -translate-y-1/2 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100 hover:cursor-pointer"
        >
          <MdKeyboardArrowRight className="w-6 h-6 text-gray-600" />
        </button>
      </div>
    </section>
  );
};

export default NewProduct;
