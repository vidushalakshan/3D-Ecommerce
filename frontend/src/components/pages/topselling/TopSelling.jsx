"use client";
import Image from "next/image";
import images from "@/constants/images";
import { motion } from "framer-motion";

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
  <div className="flex-shrink-0 relative flex items-center border-2 border-gray-300 p-3 h-[100px] w-[220px] rounded-lg shadow-lg text-center hover:border-red-500 bg-white">
    <Image
      src={product.image}
      alt={product.name}
      className="w-[80px] h-[60px] object-contain mb-2"
    />
    <div className="flex flex-col items-center">
      <span className="text-[11px] text-gray-500 uppercase">
        {product.category}
      </span>
      <h2 className="text-gray-950 text-[12px] font-bold mt-1">
        {product.name}
      </h2>
      <div className="flex items-center gap-1 mt-1 text-lg">
        <span className="font-semibold text-[14px] text-red-500">
          ${product.price}
        </span>
        <del className="text-gray-500 text-[11px]">${product.oldPrice}</del>
      </div>
    </div>
  </div>
);

const Column = ({ products, delay }) => {
  // Calculate the total height of all products plus gaps
  const itemHeight = 100; // h-[100px]
  const gapSize = 16; // gap-4 = 1rem = 16px
  const totalHeight = (products.length * (itemHeight + gapSize)) - gapSize;
  
  return (
    <motion.div
      className="flex flex-col gap-4 will-change-transform"
      initial={{ y: 0 }}
      animate={{ y: -totalHeight }}
      transition={{
        repeat: Infinity,
        repeatType: "loop",
        duration: 20, // Increased duration for smoother effect
        ease: "linear",
        delay,
      }}
    >
      {/* Render original and duplicate */}
      {products.map((product, index) => (
        <ProductCard key={`original-${index}`} product={product} />
      ))}
      {products.map((product, index) => (
        <ProductCard key={`duplicate-${index}`} product={product} />
      ))}
    </motion.div>
  );
};

const TopSelling = () => {
  const column1 = products;
  const column2 = [...products].reverse();
  const column3 = [...products];
  const column4 = [...products].reverse();

  return (
    <section className="max-w-7xl mx-auto text-gray-950 relative">
      <h1 className="text-gray-950 text-2xl font-bold pt-15">TOP SELLING</h1>
      <div className="flex justify-around mt-10 gap-32 h-[500px] overflow-hidden">
        <Column products={column1} delay={0} />
        <Column products={column2} delay={5} />
        <Column products={column3} delay={10} />
        <Column products={column4} delay={15} />
      </div>
    </section>
  );
};

export default TopSelling;