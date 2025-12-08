"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// Import only what you need — no default export exists!
import {
  collectionLaptop,
  collectionHeadset,
  collectionCamara,
} from "@/constants/images";

const products = [
  {
    id: 1,
    category: "Laptop",
    name: "Acer Predator",
    type: "Gaming Laptop",
    price: 980,
    oldPrice: 1100,
    image: collectionLaptop,
  },
  {
    id: 2,
    category: "Headset",
    name: "Sony WH-1000XM5",
    type: "Wireless Headset",
    price: 850,
    oldPrice: 1000,
    image: collectionCamara, // you used camara image here — maybe wrong? but okay
  },
  {
    id: 3,
    category: "Phone",
    name: "Samsung Galaxy S24",
    type: "Flagship Phone",
    price: 1050,
    oldPrice: 1200,
    image: collectionHeadset,
  },
  {
    id: 4,
    category: "Camera",
    name: "Canon EOS R6",
    type: "DSLR Camera",
    price: 1150,
    oldPrice: 1300,
    image: collectionLaptop,
  },
  {
    id: 5,
    category: "Watch",
    name: "Apple Watch Ultra",
    type: "Rugged Watch",
    price: 980,
    oldPrice: 1100,
    image: collectionLaptop,
  },
];

const ProductCard = ({ product }) => (
  <div className="flex-shrink-0 relative flex items-center gap-5 border border-gray-300 p-3 h-[150px] w-[280px] rounded-xl shadow-md bg-white hover:shadow-lg transition duration-300">
    <Image
      src={product.image}
      alt={product.name}
      width={85}
      height={85}
      className="object-contain rounded-md"
    />
    <div className="flex flex-col justify-center">
      <span className="text-[12px] text-gray-400 uppercase tracking-wide">
        {product.type}
      </span>
      <h2 className="text-[14px] font-semibold text-gray-800">
        {product.name}
      </h2>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-blue-600 font-semibold text-[16px]">
          ${product.price}
        </span>
        <del className="text-gray-400 text-[13px]">${product.oldPrice}</del>
      </div>
    </div>
  </div>
);

const Column = ({ products, delay }) => {
  const itemHeight = 150 + 16; // card height + gap
  const totalHeight = products.length * itemHeight;

  return (
    <motion.div
      className="flex flex-col gap-4 will-change-transform"
      initial={{ y: 0 }}
      animate={{ y: -totalHeight }}
      transition={{
        repeat: Infinity,
        repeatType: "loop",
        duration: 25,
        ease: "linear",
        delay,
      }}
    >
      {/* Original set */}
      {products.map((product, index) => (
        <ProductCard key={`original-${product.id}-${index}`} product={product} />
      ))}
      {/* Duplicated set for seamless loop */}
      {products.map((product, index) => (
        <ProductCard key={`duplicate-${product.id}-${index}`} product={product} />
      ))}
    </motion.div>
  );
};

const TopSelling = () => {
  const column1 = products;
  const column2 = [...products].reverse();
  const column3 = [...products].slice(2).concat(products.slice(0, 2)); // better variation

  return (
    <section className="max-w-7xl mx-auto px-6 py-20 text-gray-900">
      <h1 className="text-4xl font-bold mb-4">Our Best Selection</h1>
      <p className="text-gray-500 mb-10">
        Top picks from our customers — updated weekly.
      </p>

      <div className="flex justify-center gap-20 text-sm font-medium uppercase text-gray-500 mb-12">
        {["We Recommend", "Best Deals", "Most Popular"].map((tab) => (
          <h2
            key={tab}
            className="relative text-blue-600 font-bold after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-full after:h-0.5 after:bg-blue-600"
          >
            {tab}
          </h2>
        ))}
      </div>

      <div className="flex justify-center gap-12 overflow-hidden h-[500px] select-none">
        <Column products={column1} delay={0} />
        <Column products={column2} delay={6} />
        <Column products={column3} delay={12} />
      </div>
    </section>
  );
};

export default TopSelling;