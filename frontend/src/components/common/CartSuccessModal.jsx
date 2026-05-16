"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useCart } from "@/contexts/cardContext";
import { HiCheck, HiOutlineShoppingBag, HiArrowRight } from "react-icons/hi2";
import { useRouter } from "next/navigation";

export default function CartSuccessModal() {
  const { showModal, setShowModal, recentlyAdded } = useCart();
  const router = useRouter();

  if (!recentlyAdded) return null;

  return (
    <AnimatePresence>
      {showModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-[3.5rem] overflow-hidden shadow-[0_0_100px_rgba(37,99,235,0.2)]"
          >
            {/* Success Glow */}
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-600/20 blur-[80px] rounded-full" />
            
            <div className="relative p-10 text-center space-y-8">
              {/* Animated Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 12, delay: 0.2 }}
                className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(37,99,235,0.5)] border-4 border-white/20"
              >
                <HiCheck className="text-white text-4xl" />
              </motion.div>

              <div className="space-y-2">
                <h2 className="text-3xl font-black italic tracking-tighter">ITEM SECURED<span className="text-blue-500">.</span></h2>
                <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em]">Successfully added to your cargo</p>
              </div>

              {/* Product Preview Stage */}
              <div className="relative aspect-video w-full bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center p-8 group">
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative w-full h-full">
                  <Image 
                    src={recentlyAdded.image} 
                    alt={recentlyAdded.name} 
                    fill 
                    className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
                  />
                </div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                   <p className="text-xs font-bold italic text-white/80">{recentlyAdded.name}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                >
                  <HiOutlineShoppingBag size={16} /> Continue
                </button>
                <button
                  onClick={() => {
                    setShowModal(false);
                    router.push("/checkout");
                  }}
                  className="flex-1 px-8 py-4 bg-blue-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 transition-all shadow-[0_10px_30px_rgba(37,99,235,0.3)] flex items-center justify-center gap-2"
                >
                  Checkout <HiArrowRight size={16} />
                </button>
              </div>
            </div>
            
            {/* Bottom Accent */}
            <div className="h-1.5 w-full bg-blue-600/20">
               <motion.div 
                 initial={{ width: "0%" }}
                 animate={{ width: "100%" }}
                 transition={{ duration: 4 }}
                 onAnimationComplete={() => setShowModal(false)}
                 className="h-full bg-blue-600"
               />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
