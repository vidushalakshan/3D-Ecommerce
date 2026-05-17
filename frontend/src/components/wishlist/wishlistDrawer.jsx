"use client";

import { useWishlist } from "../../contexts/wishlistContext";
import { useCart } from "../../contexts/cardContext";
import { FiTrash2, FiX, FiShoppingCart, FiHeart } from "react-icons/fi";
import { Button } from "../common/Button";
import { motion, AnimatePresence } from "framer-motion";

export default function WishlistDrawer({ onClose }) {
  const { wishlistItems, toggleWishlist } = useWishlist();
  const { addItem } = useCart();

  const handleAddToCart = (product) => {
    addItem(product);
  };

  return (
    <div className="flex flex-col h-full text-white">
      <header className="flex items-center justify-between p-6 border-b border-white/10 bg-black/50 backdrop-blur-xl sticky top-0 z-20">
        <div>
          <h2 className="text-2xl font-black text-white italic tracking-tighter">YOUR WISHLIST.</h2>
          <p className="text-[10px] text-red-400 font-bold uppercase tracking-widest mt-1">
            {wishlistItems.length} {wishlistItems.length === 1 ? 'Item' : 'Items'} Saved
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all duration-300 cursor-pointer"
          aria-label="Close wishlist"
        >
          <FiX size={20} />
        </button>
      </header>

      <section className="flex-1 overflow-y-auto px-5 pt-4 pb-20">
        <AnimatePresence>
          {wishlistItems.length === 0 ? (
            <EmptyState key="empty" />
          ) : (
            <ItemsList
              key="items"
              items={wishlistItems}
              onRemove={toggleWishlist}
              onAddToCart={handleAddToCart}
            />
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}

const EmptyState = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="flex flex-col items-center justify-center py-20 text-center"
  >
    <div className="w-32 h-32 mb-4 bg-gray-800 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.2)] border border-red-500/10">
      <FiHeart size={48} className="text-red-500/60" />
    </div>
    <h3 className="text-lg font-semibold text-white mb-2">
      Your wishlist is empty
    </h3>
    <p className="text-sm text-gray-400 max-w-xs">
      Save your favorite 3D products here to review or buy them later.
    </p>
  </motion.div>
);

const ItemsList = ({ items, onRemove, onAddToCart }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="space-y-4"
  >
    {items.map((item) => (
      <WishlistRow key={item._id} item={item} onRemove={onRemove} onAddToCart={onAddToCart} />
    ))}
  </motion.div>
);

const WishlistRow = ({ item, onRemove, onAddToCart }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    className="flex items-center gap-4 bg-[#141414] border border-white/5 rounded-xl p-4 shadow-sm"
  >
    <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-white/5 border border-white/5 flex items-center justify-center">
      <img
        src={item.image || "/uploads/default.jpg"}
        alt={item.name}
        className="w-full h-full object-contain p-2"
      />
    </div>

    <div className="flex-1 min-w-0">
      <h4 className="font-bold text-white leading-tight text-base truncate">{item.name}</h4>
      <p className="text-[9px] text-blue-400 font-black uppercase tracking-widest mt-1">
        {item.type || "3D Asset"}
      </p>
      <p className="text-lg font-black text-white mt-1">
        ${item.price}
      </p>
    </div>

    <div className="flex items-center gap-2">
      <button
        onClick={() => onAddToCart(item)}
        className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white transition-all duration-300 border border-blue-500/20 cursor-pointer"
        aria-label="Add to cart"
      >
        <FiShoppingCart size={16} />
      </button>
      
      <button
        onClick={() => onRemove(item)}
        className="p-2.5 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 border border-red-500/20 cursor-pointer"
        aria-label="Remove item"
      >
        <FiTrash2 size={16} />
      </button>
    </div>
  </motion.div>
);
