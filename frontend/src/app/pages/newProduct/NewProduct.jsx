"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { HiArrowLeft, HiArrowRight, HiSparkles } from "react-icons/hi2";
import ProductCard from "@/components/common/ProductCard";
import SkeletonCard from "@/components/common/SkeletonCard";

const NewProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hydrated, setHydrated] = useState(false);
  const carouselRef = useRef(null);
  const [isDragActive, setIsDragActive] = useState(false);

  const API_BASE_URL = "/api/products";

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
        setError("Database connectivity in demo mode.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
    setHydrated(true);
  }, []);

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      carouselRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  if (!hydrated) return null;

  return (
    <section className="relative py-24 bg-[#050505] overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <HiSparkles size={14} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Latest Drops</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter italic">
              NEW <span className="text-blue-500">ARRIVALS</span>
            </h2>
            <p className="text-gray-500 max-w-md font-medium">
              Explore the newest additions to our catalog, featuring the latest in high-performance technology.
            </p>
          </motion.div>

          <div className="flex gap-4">
            <button
              onClick={() => scrollCarousel("left")}
              className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-blue-600 hover:border-blue-600 transition-all active:scale-90"
              aria-label="Scroll Left"
            >
              <HiArrowLeft size={24} />
            </button>
            <button
              onClick={() => scrollCarousel("right")}
              className="p-4 rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20 hover:bg-blue-500 transition-all active:scale-90"
              aria-label="Scroll Right"
            >
              <HiArrowRight size={24} />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="relative group">
          {loading ? (
            <div className="flex gap-6 overflow-hidden">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="min-w-[320px]">
                  <SkeletonCard />
                </div>
              ))}
            </div>
          ) : error && products.length === 0 ? (
            <div className="bg-white/5 border border-white/10 p-20 rounded-[3rem] text-center backdrop-blur-3xl">
              <p className="text-gray-400 text-xl font-bold italic tracking-tight">{error}</p>
            </div>
          ) : (
            <motion.div
              ref={carouselRef}
              className="flex gap-8 overflow-x-auto no-scrollbar pb-12 cursor-grab active:cursor-grabbing snap-x snap-mandatory"
              onMouseDown={() => setIsDragActive(true)}
              onMouseUp={() => setIsDragActive(false)}
            >
              <AnimatePresence mode="popLayout">
                {products.map((product, index) => (
                  <motion.div
                    key={product._id || index}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                    className="min-w-[300px] md:min-w-[350px] snap-start"
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Lateral Fades for Depth */}
          <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-[#050505] to-transparent pointer-events-none z-20" />
          <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-[#050505] to-transparent pointer-events-none z-20" />
        </div>
      </div>
    </section>
  );
};

export default NewProduct;