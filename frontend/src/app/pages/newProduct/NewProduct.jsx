"use client";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import ProductCard from "@/components/common/ProductCard";

import SkeletonCard from "@/components/common/SkeletonCard";

const NewProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [x, setX] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  const cardWidth = 320;
  const intervalRef = useRef(null);

  const API_BASE_URL = "/api/products";
  const totalWidth = products.length * cardWidth;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_BASE_URL);
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data);
        setError(null);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Database connection issue. Showing featured products instead.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => setHydrated(true), []);

  const startAutoScroll = () => {
    if (intervalRef.current || products.length < 4) return;
    intervalRef.current = setInterval(() => {
      setX((prev) => {
        const next = prev - 0.5;
        return Math.abs(next) >= totalWidth ? 0 : next;
      });
    }, 16);
  };

  const stopAutoScroll = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    if (products.length > 0) {
      startAutoScroll();
      return () => stopAutoScroll();
    }
  }, [products.length]);

  const moveLeft = () => {
    stopAutoScroll();
    setX((prev) => Math.min(prev + cardWidth, 0));
  };

  const moveRight = () => {
    stopAutoScroll();
    setX((prev) => Math.max(prev - cardWidth, -totalWidth + cardWidth));
  };

  if (!hydrated) return null;

  return (
    <section className="max-w-7xl mx-auto py-16 px-6 overflow-hidden relative">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">New Arrivals</h2>
          <div className="h-1 w-20 bg-blue-600 mt-2 rounded-full"></div>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={moveLeft}
            className="bg-white shadow-md border border-gray-100 rounded-full p-3 hover:bg-gray-50 transition-all active:scale-95"
            aria-label="Previous"
          >
            <MdKeyboardArrowLeft className="w-6 h-6 text-gray-800" />
          </button>
          <button
            onClick={moveRight}
            className="bg-white shadow-md border border-gray-100 rounded-full p-3 hover:bg-gray-50 transition-all active:scale-95"
            aria-label="Next"
          >
            <MdKeyboardArrowRight className="w-6 h-6 text-gray-800" />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex gap-4">
          {[1, 2, 3, 4].map((i) => <SkeletonCard key={i} />)}
        </div>
      ) : error ? (
        <div className="bg-blue-50 border border-blue-100 p-8 rounded-2xl text-center">
          <p className="text-blue-800 font-medium mb-2">{error}</p>
          <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar">
            {products.map((product, index) => (
              <ProductCard key={product._id || index} product={product} />
            ))}
          </div>
        </div>
      ) : products.length === 0 ? (
        <div className="bg-gray-50 p-12 rounded-2xl text-center border-2 border-dashed border-gray-200">
          <p className="text-gray-500 text-lg">Our warehouse is getting a restock. Check back soon!</p>
        </div>
      ) : (
        <div onMouseEnter={stopAutoScroll} onMouseLeave={startAutoScroll} className="cursor-grab active:cursor-grabbing">
          <motion.div
            className="flex flex-nowrap"
            style={{ x }}
            transition={{ ease: "linear", duration: 0 }}
          >
            {[...products, ...products].map((product, index) => (
              <ProductCard
                key={`${product._id || index}-${index}`}
                product={product}
              />
            ))}
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default NewProduct;