"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import BottomNavBar from "@/components/layout/BottomNavBar";
import { Button } from "@/components/common/Button";
import Product3DViewer from "@/components/common/Product3DViewer";
import { motion, AnimatePresence } from "framer-motion";
import { 
  HiOutlineShieldCheck, 
  HiOutlineTruck, 
  HiOutlineArrowLeft, 
  HiOutlineShoppingBag, 
  HiSparkles,
  HiOutlineCube,
  HiOutlinePhoto
} from "react-icons/hi2";
import Link from "next/link";
import { useCart } from "@/contexts/cardContext";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState("3d"); // "3d" or "2d"
  const [mounted, setMounted] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    setMounted(true);
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
        <div className="flex flex-col items-center gap-6">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full shadow-[0_0_30px_rgba(37,99,235,0.3)]"
          />
          <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em] animate-pulse">Initializing Interface</p>
        </div>
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

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30">
      <BottomNavBar />

      <main className="relative pt-32 pb-24 overflow-hidden">
        {/* Immersive Background Effects */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-12 flex justify-between items-center"
          >
            <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors group">
              <HiOutlineArrowLeft className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-xs font-black uppercase tracking-widest">Back to Catalog</span>
            </Link>

            <div className="flex bg-white/5 backdrop-blur-xl border border-white/10 p-1.5 rounded-2xl">
              <button 
                onClick={() => setViewMode("3d")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                  viewMode === "3d" ? "bg-blue-600 text-white shadow-lg" : "text-gray-500 hover:text-white"
                }`}
              >
                <HiOutlineCube size={14} /> 3D View
              </button>
              <button 
                onClick={() => setViewMode("2d")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                  viewMode === "2d" ? "bg-blue-600 text-white shadow-lg" : "text-gray-500 hover:text-white"
                }`}
              >
                <HiOutlinePhoto size={14} /> 2D Image
              </button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            {/* Media Section */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="sticky top-32"
            >
              <div className="relative aspect-square w-full">
                <AnimatePresence mode="wait">
                  {viewMode === "3d" ? (
                    <motion.div
                      key="3d-viewer"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full h-full"
                    >
                      <Product3DViewer modelUrl={product.model3D} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="2d-image"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="relative w-full h-full rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-3xl overflow-hidden flex items-center justify-center p-12"
                    >
                      <Image
                        src={product.image || "/uploads/default.jpg"}
                        alt={product.name}
                        fill
                        className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                        priority
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
                
                <div className="absolute top-8 left-8 flex gap-4 pointer-events-none">
                  <div className="px-4 py-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl flex items-center gap-2">
                    <HiSparkles className="text-blue-400" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Premium Build</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Info Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-12"
            >
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <span className="px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
                    {product.type}
                  </span>
                  <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest">
                    Model: {product.model}
                  </span>
                </div>
                <h1 className="text-6xl md:text-7xl font-black tracking-tighter italic leading-none">
                  {product.name}
                </h1>
                <p className="text-gray-400 text-xl font-medium leading-relaxed max-w-xl">
                  {product.description || "Uncompromising performance meets futuristic design. Engineered for those who demand the absolute best in modern technology."}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-8">
                <div className="p-8 rounded-[3rem] bg-gradient-to-br from-white/[0.08] to-transparent border border-white/10 backdrop-blur-md flex flex-col gap-1 min-w-[240px]">
                  <div className="flex items-baseline gap-3">
                    <span className="text-5xl font-black text-white italic">${product.price}</span>
                    {product.oldPrice && (
                      <span className="text-xl text-gray-600 line-through italic">${product.oldPrice}</span>
                    )}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-500 mt-2 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    In Stock • Free Global Shipping
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/5 hover:border-white/10 transition-colors flex items-center gap-6 group">
                  <div className="p-4 rounded-2xl bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500">
                    <HiOutlineShieldCheck size={28} />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest">2-Year Warranty</p>
                    <p className="text-[10px] text-gray-500 font-medium">Full hardware protection</p>
                  </div>
                </div>
                <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/5 hover:border-white/10 transition-colors flex items-center gap-6 group">
                  <div className="p-4 rounded-2xl bg-purple-500/10 text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-all duration-500">
                    <HiOutlineTruck size={28} />
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest">Express Delivery</p>
                    <p className="text-[10px] text-gray-500 font-medium">Ships within 24-48 hours</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 pt-10">
                <Button 
                  size="xl" 
                  fullWidth 
                  variant="primary"
                  icon={HiOutlineShoppingBag}
                  onClick={() => addItem(product)}
                  className="shadow-[0_20px_50px_rgba(37,99,235,0.3)] !rounded-[2rem]"
                >
                  ADD TO CART
                </Button>
                <Button 
                  size="xl" 
                  fullWidth 
                  variant="outline"
                  className="!rounded-[2rem]"
                >
                  CONFIGURATOR
                </Button>
              </div>

              {/* Technical Specifications Section */}
              <div className="pt-12 border-t border-white/5">
                 <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 mb-8">Technical Specifications</h3>
                 <div className="grid grid-cols-2 gap-y-8">
                    <div>
                       <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-1">Architecture</p>
                       <p className="text-white font-bold italic">Quantum V2.0</p>
                    </div>
                    <div>
                       <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-1">Materials</p>
                       <p className="text-white font-bold italic">Titanium Alloy</p>
                    </div>
                    <div>
                       <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-1">Durability</p>
                       <p className="text-white font-bold italic">IP68 Rated</p>
                    </div>
                    <div>
                       <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-1">Performance</p>
                       <p className="text-white font-bold italic">Max Overclock</p>
                    </div>
                 </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetails;