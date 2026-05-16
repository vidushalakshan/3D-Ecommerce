'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '@/components/common/ProductCard';
import * as images from '../../constants/images';
import BottomNavBar from '@/components/layout/BottomNavBar';
import { HiSparkles, HiOutlineCube, HiOutlineDevicePhoneMobile, HiOutlineCpuChip } from 'react-icons/hi2';

const products = [
  {
    id: 1,
    _id: "1",
    category: 'Laptop',
    name: 'Acer Predator',
    type: 'Gaming Laptop',
    model: 'G930',
    price: 2018.0,
    oldPrice: 2500.0,
    isHot: true,
    image: images.collectionLaptop,
  },
  {
    id: 2,
    _id: "2",
    category: 'Headphone',
    name: 'Sony WH-1000XM5',
    type: 'Wireless Headset',
    model: 'XM5',
    price: 418.0,
    oldPrice: 500.0,
    isHot: true,
    image: images.collectionHeadset,
  },
  {
    id: 3,
    _id: "3",
    category: 'Smartphone',
    name: 'Samsung Galaxy S24',
    type: 'Flagship Phone',
    model: 'S24',
    price: 1199.0,
    oldPrice: 1299.0,
    isHot: true,
    image: images.watchImg,
  },
  {
    id: 4,
    _id: "4",
    category: 'Camera',
    name: 'Canon EOS R6',
    type: 'DSLR Camera',
    model: 'R6',
    price: 2499.0,
    oldPrice: 2800.0,
    isHot: false,
    image: images.collectionCamara,
  },
  {
    id: 5,
    _id: "5",
    category: 'Smartwatch',
    name: 'Apple Watch Ultra',
    type: 'Rugged Watch',
    model: 'Ultra 2',
    price: 799.0,
    oldPrice: 899.0,
    isHot: true,
    image: images.collectionHeadset,
  },
];

const categories = [
  { id: 'all', label: 'All Collection', icon: HiSparkles },
  { id: 'laptops', label: 'Laptops', icon: HiOutlineCube },
  { id: 'accessories', label: 'Accessories', icon: HiOutlineCpuChip },
  { id: 'phones', label: 'Smartphones', icon: HiOutlineDevicePhoneMobile },
];

export default function ProductsCollection() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter((product) => {
        if (selectedCategory === 'laptops') return product.category === 'Laptop';
        if (selectedCategory === 'accessories') return ['Headphone', 'Smartwatch'].includes(product.category);
        if (selectedCategory === 'phones') return product.category === 'Smartphone';
        return true;
      });

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30 overflow-x-hidden">
      <BottomNavBar />
      
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/5 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full"
          >
            <HiSparkles className="text-blue-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400">Inventory Catalog</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black tracking-tighter italic leading-none"
          >
            COLLECTIONS<span className="text-blue-600 text-5xl md:text-7xl">.</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-xl text-gray-500 text-sm font-medium tracking-wide uppercase px-4"
          >
            Explore our curated selection of high-performance tech and immersive visualization hardware.
          </motion.p>
        </div>

        {/* Category Navigation */}
        <nav className="mb-20">
          <motion.ul 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <li key={cat.id}>
                  <button
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`relative flex items-center gap-2.5 px-7 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all duration-500 group overflow-hidden border ${
                      isActive 
                        ? 'bg-blue-600 border-blue-400 text-white shadow-[0_10px_40px_rgba(37,99,235,0.3)] scale-105' 
                        : 'bg-white/5 border-white/10 text-gray-500 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon size={16} className={isActive ? 'text-white' : 'text-gray-600 group-hover:text-blue-400 transition-colors'} />
                    {cat.label}
                    {isActive && (
                      <motion.div 
                        layoutId="activeGlow"
                        className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-transparent opacity-50"
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        </nav>

        {/* Product Grid */}
        <motion.section 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.section>
        
        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="py-40 text-center">
            <p className="text-gray-600 font-black uppercase tracking-[0.5em] text-xs">No entries found in this sector.</p>
          </div>
        )}
      </main>
    </div>
  );
}