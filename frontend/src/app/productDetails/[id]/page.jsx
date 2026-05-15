"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import BottomNavBar from "@/components/layout/BottomNavBar";
import { Button } from "@/components/common/Button";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineShieldCheck, HiOutlineTruck, HiOutlineArrowLeft, HiOutlineShoppingBag, HiSparkles } from "react-icons/hi2";
import Link from "next/link";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch product");
        }

        setProduct(data);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-white p-6">
        <h2 className="text-3xl font-black italic mb-4">SYSTEM ERROR.</h2>
        <p className="text-gray-500 mb-8">{error || "Product identity not found in database."}</p>
        <Link href="/">
           <Button variant="outline" icon={HiOutlineArrowLeft}>Return to Base</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30">
      <BottomNavBar />

      <main className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-12"
          >
            <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors group">
              <HiOutlineArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-xs font-black uppercase tracking-widest">Back to Catalog</span>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-blue-500/10 blur-[100px] rounded-full scale-75 group-hover:scale-100 transition-transform duration-1000" />
              <div className="relative aspect-square rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-3xl overflow-hidden flex items-center justify-center p-12">
                <motion.div
                  whileHover={{ scale: 1.05, rotate: -2 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={product.image || "/uploads/default.jpg"}
                    alt={product.name}
                    fill
                    className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                    priority
                  />
                </motion.div>
                
                <div className="absolute bottom-10 left-10 flex gap-4">
                  <div className="px-4 py-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl flex items-center gap-2">
                    <HiSparkles className="text-blue-400" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Premium Build</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-10"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
                    {product.type}
                  </span>
                  <span className="text-gray-600 text-[10px] font-black uppercase tracking-widest">
                    Model {product.model}
                  </span>
                </div>
                <h1 className="text-5xl md:text-6xl font-black tracking-tighter italic leading-none">
                  {product.name}
                </h1>
                <p className="text-gray-500 text-lg font-medium leading-relaxed max-w-xl">
                  {product.description || "Uncompromising performance meets futuristic design. Engineered for those who demand the absolute best in modern technology."}
                </p>
              </div>

              <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-md inline-flex flex-col gap-1">
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl font-black text-white italic">${product.price}</span>
                  {product.oldPrice && (
                    <span className="text-xl text-gray-600 line-through italic">${product.oldPrice}</span>
                  )}
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-500">Tax Included • Free Shipping</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 rounded-3xl bg-white/5 border border-white/5 flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400">
                    <HiOutlineShieldCheck size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest">2-Year Warranty</p>
                    <p className="text-[10px] text-gray-500 font-medium">Full global coverage</p>
                  </div>
                </div>
                <div className="p-6 rounded-3xl bg-white/5 border border-white/5 flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-400">
                    <HiOutlineTruck size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest">Express Delivery</p>
                    <p className="text-[10px] text-gray-500 font-medium">Ships within 24 hours</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 pt-6">
                <Button 
                  size="xl" 
                  fullWidth 
                  variant="secondary"
                  icon={HiOutlineShoppingBag}
                  className="shadow-2xl shadow-white/5"
                >
                  Acquire Now
                </Button>
                <Button 
                  size="xl" 
                  fullWidth 
                  variant="outline"
                >
                  Configuration
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetails;