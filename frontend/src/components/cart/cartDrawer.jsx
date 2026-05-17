"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "../../contexts/cardContext";
import { FiTrash2, FiX, FiArrowRight, FiShoppingCart, FiGift } from "react-icons/fi";
import { Button } from "../common/Button";
import { motion, AnimatePresence } from "framer-motion";

export default function CartDrawer({ onClose }) {
  const router = useRouter();
  const { items, removeItem, updateQuantity, total } = useCart();

  const handleCheckout = () => {
    onClose(); 
    router.push("/checkout"); 
  };

  return (
    <div className="flex flex-col h-full text-white bg-[#050505] overflow-hidden">
      <header className="flex items-center justify-between p-6 border-b border-white/10 bg-black/50 backdrop-blur-xl sticky top-0 z-20">
        <div>
          <h2 className="text-2xl font-black text-white italic tracking-tighter">YOUR CART.</h2>
          <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mt-1">
            {items.length} {items.length === 1 ? 'Item' : 'Items'} Selected
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all duration-300"
          aria-label="Close cart"
        >
          <FiX size={20} />
        </button>
      </header>

      <section className="flex-1 overflow-y-auto px-5 pt-4 pb-20">
        <AnimatePresence>
          {items.length === 0 ? (
            <EmptyState key="empty" />
          ) : (
            <ItemsList
              key="items"
              items={items}
              onRemove={removeItem}
              onQty={updateQuantity}
            />
          )}
        </AnimatePresence>
        <EliteRewardsSection />
      </section>

      {/* FOOTER */}
      {items.length > 0 && (
        <footer className="border-t border-white/10 p-6 bg-black/80 backdrop-blur-2xl space-y-4">
          <div className="flex justify-between items-end">
            <span className="text-gray-400 font-medium">Subtotal</span>
            <div className="text-right">
              <span className="block text-[10px] text-blue-400 font-bold uppercase tracking-widest mb-1">Total Amount</span>
              <span className="text-3xl font-black text-white">${total.toFixed(2)}</span>
            </div>
          </div>

          <p className="text-xs text-gray-500 bg-white/5 p-3 rounded-lg border border-white/5">
            ✨ Free shipping on premium orders over <span className="text-white font-bold">$250</span>
          </p>

          <Button
            variant="primary"
            className="w-full !py-4 !rounded-2xl font-bold flex items-center justify-center gap-3 text-lg"
            onClick={handleCheckout}
          >
            PROCEED TO CHECKOUT
            <FiArrowRight size={20} />
          </Button>
        </footer>
      )}
    </div>
  );
}

const EmptyState = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="flex flex-col items-center justify-center py-12 text-center"
  >
    <div className="w-32 h-32 mb-4 bg-gray-800 rounded-full flex items-center justify-center">
      <FiShoppingCart size={48} className="text-gray-600" />
    </div>
    <h3 className="text-lg font-semibold text-white mb-2">
      Your cart is empty
    </h3>
    <p className="text-sm text-gray-400 max-w-xs">
      Add some amazing 3D products and come back to see them here.
    </p>
  </motion.div>
);

const ItemsList = ({ items, onRemove, onQty }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="space-y-4"
  >
    {items.map((item) => (
      <CartRow key={item._id} item={item} onRemove={onRemove} onQty={onQty} />
    ))}
  </motion.div>
);

const CartRow = ({ item, onRemove, onQty }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    className="flex items-center gap-4 bg-[#2a2a2a] rounded-xl p-4 shadow-sm"
  >
    <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
      <Image
        src={item.image || "/uploads/default.jpg"}
        alt={item.name}
        fill
        className="object-cover"
      />
    </div>

    <div className="flex-1 min-w-0">
      <h4 className="font-bold text-white leading-tight text-lg">{item.name}</h4>
      <p className="text-[10px] text-blue-400 font-black uppercase tracking-widest mt-1">
        Premium Unit
      </p>
      <p className="text-xl font-black text-white mt-2">
        ${item.price.toFixed(2)}
      </p>
    </div>

    <div className="flex flex-col items-center gap-2 bg-white/5 p-1 rounded-2xl border border-white/5">
      <button
        onClick={() => onQty(item._id, item.quantity + 1)}
        className="w-8 h-8 rounded-xl hover:bg-white/10 flex items-center justify-center text-white transition-colors"
      >
        +
      </button>
      <span className="w-8 text-center font-bold text-white text-sm">
        {item.quantity}
      </span>
      <button
        onClick={() => onQty(item._id, item.quantity - 1)}
        className="w-8 h-8 rounded-xl hover:bg-white/10 flex items-center justify-center text-white transition-colors"
      >
        -
      </button>
    </div>

    <button
      onClick={() => onRemove(item._id)}
      className="p-2 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300"
      aria-label="Remove item"
    >
      <FiTrash2 size={18} />
    </button>
  </motion.div>
);

const EliteRewardsSection = () => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
    className="mt-10 p-6 bg-gradient-to-br from-blue-950/40 to-purple-950/40 rounded-3xl border border-white/5 relative overflow-hidden"
  >
    {/* Glow decoration */}
    <div className="absolute -top-10 -right-10 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />
    <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />

    <div className="flex items-center gap-3 mb-3 relative z-10">
      <div className="p-2 bg-blue-500/10 rounded-xl border border-blue-500/30">
        <FiGift size={20} className="text-blue-400" />
      </div>
      <div>
        <h3 className="text-sm font-black text-white uppercase tracking-wider leading-none">
          Elite 3D VIP Club
        </h3>
        <span className="text-[8px] font-black text-blue-400 uppercase tracking-widest leading-none mt-1 block">Exclusive Perks Available</span>
      </div>
    </div>
    <p className="text-xs text-gray-400 mb-4 leading-relaxed relative z-10">
      Earn **10% VIP Cashback** on this order! Unlock early access to premium 3D assets, holographic renders, and member-only tech drop discounts.
    </p>
    
    <div className="space-y-3 relative z-10">
      <Button
        className="w-full !py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 text-xs uppercase tracking-wider"
        onClick={() => window.open("/vip-signup", "_blank")}
      >
        Unlock Member Perks
        <FiArrowRight size={14} />
      </Button>

      <div className="flex items-center justify-center gap-2 text-[9px] text-gray-500 font-bold uppercase tracking-widest pt-2">
        <span>🛡️ SSL Encrypted</span>
        <span>•</span>
        <span>⚡ Instant Access</span>
      </div>
    </div>
  </motion.div>
);