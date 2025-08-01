"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { FiShoppingCart, FiMessageCircle } from "react-icons/fi";
import images from "@/constants/images"; // Adjust this path accordingly

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

const ProductCard = ({ product }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative flex-shrink-0 flex flex-col items-center border border-black p-4 w-[300px] rounded-lg shadow-lg text-center mx-3 bg-white hover:shadow-2xl hover:border-blue-600 transition-all duration-300 group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* NEW / HOT Badges */}
      <div className="absolute top-3 left-3 flex flex-col gap-2 items-start z-10">
        <span className="bg-blue-600 text-white text-[10px] font-semibold py-1 px-2 rounded-full">
          NEW
        </span>
        {product.isHot && (
          <span className="bg-white text-black text-[10px] font-semibold py-1 px-2 rounded-full border border-black">
            🔥 HOT
          </span>
        )}
      </div>

      {/* Wishlist & View Icons */}
      <div className="absolute top-3 right-3 flex flex-col gap-2 items-end z-10 hover:cursor-pointer">
        <span className=" p-1 rounded-full border border-black">
          <CiHeart color="black" size={20} />
        </span>
        <span className="bg-white p-1 rounded-full border border-black">
          <IoEyeOutline color="black" size={20} />
        </span>
      </div>

      {/* Product Image */}
      <div className="relative flex justify-center items-center h-[180px] mb-4 w-full">
        <Image
          src={product.image}
          alt={product.name}
          className="w-[180px] h-auto object-contain p-3 bg-white rounded-md"
        />
        {/* Hover Add to Cart Button */}
        <div
          className={`absolute inset-0 flex-col items-center justify-center gap-2 transition-opacity duration-300 ${
            hovered ? "flex" : "hidden"
          }`}
        >
          <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-white hover:text-black border border-white hover:border-black transition-all duration-200">
            <div className="flex items-center gap-2">
              <FiShoppingCart size={18} />
              Add to Cart
            </div>
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="flex justify-between w-full px-2 text-sm text-black ">
        <span className="text-blue-600 font-semibold">{product.name}</span>
        <span className="text-black">Model {product.model}</span>
      </div>

      <hr className="w-full border-t border-gray-300 my-3" />

      <div className="uppercase font-bold text-sm tracking-wider mb-1 text-black">
        {product.type}
      </div>
      <div className="text-lg font-semibold text-black">
        ${product.price}
        <del className="ml-1 text-[15px] text-gray-600">{product.oldPrice}</del>
      </div>

      <hr className="w-full border-t border-gray-300 my-3" />

      {/* Bottom Actions */}
      <div className="flex justify-center gap-6 text-sm">
        <button className="flex items-center gap-1 text-black hover:underline">
          <FiShoppingCart />
          Buy Now
        </button>
        <button className="flex items-center gap-1 text-blue-600 hover:underline">
          <FiMessageCircle />
          Ask Question
        </button>
      </div>
    </div>
  );
};

const NewProduct = () => {
  const [x, setX] = useState(0);
  const cardWidth = 320; // includes margin
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

      {/* Left & Right Controls */}
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
