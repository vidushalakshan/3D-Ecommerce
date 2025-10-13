"use client";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import ProductCard from "@/components/common/ProductCard";

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

  // ✅ Always call hooks first (never conditionally)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data);
        setError(null);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => setHydrated(true), []);

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
    if (products.length > 0) {
      startAutoScroll();
      return () => stopAutoScroll();
    }
  }, [products.length]);

  const moveLeft = () => {
    stopAutoScroll();
    setX((prev) => prev + cardWidth);
  };

  const moveRight = () => {
    stopAutoScroll();
    setX((prev) => prev - cardWidth);
  };

  // ✅ Now safe to conditionally render after hooks
  if (!hydrated) {
    return (
      <section className="max-w-7xl mx-auto py-10 text-center">
        <p className="text-gray-600">Loading...</p>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto py-10 text-center">
        <p className="text-gray-600">Loading products...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="max-w-7xl mx-auto py-10 text-center">
        <p className="text-red-500">{error}</p>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="max-w-7xl mx-auto py-10 text-center">
        <p className="text-gray-600">No new products available.</p>
      </section>
    );
  }

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
            <ProductCard
              key={`${product.id || index}-${index}`}
              product={product}
            />
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
