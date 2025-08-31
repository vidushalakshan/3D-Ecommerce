"use client";
import Image from "next/image";
import images from "@/constants/images";
import { motion } from "framer-motion";

const products = [
  {
    id: 1,
    category: "Laptop",
    name: "Acer Predator",
    type: "Gaming Laptop",
    price: 980,
    oldPrice: 1100,
    image: images.collectionLaptop,
  },
  {
    id: 2,
    category: "Headset",
    name: "Sony WH-1000XM5",
    type: "Wireless Headset",
    price: 850,
    oldPrice: 1000,
    image: images.collectionCamara,
  },
  {
    id: 3,
    category: "Phone",
    name: "Samsung Galaxy S24",
    type: "Flagship Phone",
    price: 1050,
    oldPrice: 1200,
    image: images.collectionHeadset,
  },
  {
    id: 4,
    category: "Camera",
    name: "Canon EOS R6",
    type: "DSLR Camera",
    price: 1150,
    oldPrice: 1300,
    image: images.collectionLaptop,
  },
  {
    id: 5,
    category: "Watch",
    name: "Apple Watch Ultra",
    type: "Rugged Watch",
    price: 980,
    oldPrice: 1100,
    image: images.collectionLaptop,
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
        <del className="text-gray-400 text-[13px] relative ">
          ${product.oldPrice}
        </del>
      </div>
    </div>
  </div>
);

const Column = ({ products, delay }) => {
  const itemHeight = 150 + 16; // Card height + gap
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

  return (
    <section className="max-w-7xl mx-auto px-25 py-20  text-gray-900 relative">
      <h1 className="text-3xl font-bold  mb-4">
        Our Best Selection
      </h1>
      <p className=" text-gray-500 mb-10">
        Top picks from our customers — updated weekly.
      </p>

      <div className="flex justify-center gap-94 text-sm font-medium uppercase text-gray-500 mb-8">
        <h2 className="relative text-blue-600 font-bold after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-full after:h-[2px] after:bg-blue-600">
          We Recommend
        </h2>
        <h2 className="relative text-blue-600 font-bold after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-full after:h-[2px] after:bg-blue-600">
          Best Deals
        </h2>
        <h2 className="relative text-blue-600 font-bold after:content-[''] after:absolute after:bottom-[-6px] after:left-0 after:w-full after:h-[2px] after:bg-blue-600">
          Most Popular
        </h2>
      </div>

      <div className="flex justify-center gap-30 overflow-hidden h-[500px]">
        <Column products={column1} delay={0} />
        <Column products={column2} delay={6} />
        <Column products={column3} delay={12} />
      </div>
    </section>
  );
};

export default TopSelling;
