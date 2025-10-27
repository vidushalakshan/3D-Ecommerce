// components/cart/cartDrawer.jsx
"use client";

import Image from "next/image";
import { useCart } from "../../contexts/cardContext";
import { FiTrash2, FiX, FiDownload, FiArrowRight } from "react-icons/fi";
import { Button } from "../common/Button";
import { motion, AnimatePresence } from "framer-motion";

export default function CartDrawer({ onClose }) {
  const { items, removeItem, updateQuantity, total } = useCart();

  return (
    <>
      {/* HEADER */}
      <header className="flex items-center justify-between p-5 border-b border-gray-700 bg-[#1a1a1a] sticky top-0 z-10">
        <h2 className="text-xl font-bold text-white">Your Cart</h2>
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-gray-700 transition"
          aria-label="Close cart"
        >
          <FiX size={24} />
        </button>
      </header>

      {/* BODY */}
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

        {/* DOWNLOAD SECTION */}
        <DownloadSection />
      </section>

      {/* FOOTER */}
      {items.length > 0 && (
        <footer className="border-t border-gray-700 p-5 bg-[#1e1e1e] space-y-4">
          <div className="flex justify-between text-lg">
            <span className="text-gray-300">Total</span>
            <span className="font-bold text-white">€{total.toFixed(2)}</span>
          </div>

          <p className="text-sm text-gray-400">
            Free shipping on orders over €250
          </p>

          <Button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full font-medium flex items-center justify-center gap-2"
            onClick={() => alert("Checkout coming soon!")}
          >
            Order now
            <FiArrowRight size={18} />
          </Button>
        </footer>
      )}
    </>
  );
}

/* EMPTY STATE */
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

/* ITEMS LIST */
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

/* SINGLE ROW */
const CartRow = ({ item, onRemove,onQty }) => (
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
      <h4 className="font-medium text-white line-clamp-2">{item.name}</h4>
      <p className="text-xs text-gray-400 mt-1">
        Free shipping on orders over €250
      </p>
      <p className="text-lg font-semibold text-white mt-1">
        €{(item.price * item.quantity).toFixed(2)}
      </p>
    </div>

    <div className="flex items-center gap-2">
      <button
        onClick={() => onQty(item._id, item.quantity - 1)}
        className="w-9 h-9 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center text-lg font-bold text-white"
        aria-label="Decrease quantity"
      >
        -
      </button>
      <span className="w-9 text-center font-medium text-white">
        {item.quantity}
      </span>
      <button
        onClick={() => onQty(item._id, item.quantity + 1)}
        className="w-9 h-9 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-lg font-bold text-white"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>

    <button
      onClick={() => onRemove(item._id)}
      className="ml-2 text-gray-400 hover:text-red-400 transition"
      aria-label="Remove item"
    >
      <FiTrash2 size={18} />
    </button>
  </motion.div>
);

/* DOWNLOAD SECTION */
const DownloadSection = () => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
    className="mt-10 p-6 bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-2xl border border-gray-700"
  >
    <div className="flex items-center gap-3 mb-3">
      <FiDownload size={22} className="text-blue-400" />
      <h3 className="text-lg font-semibold text-white">
        Download Our 3D Catalogue
      </h3>
    </div>
    <p className="text-sm text-gray-300 mb-4">
      Get the full product list, specs, and high‑resolution renders in one PDF.
    </p>
    <Button
      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-full font-medium flex items-center justify-center gap-2"
      onClick={() => window.open("/catalogue.pdf", "_blank")}
    >
      Download Catalogue
      <FiDownload size={18} />
    </Button>

    <div className="mt-4 text-center">
      <button
        onClick={() => (window.location.href = "/products")}
        className="text-sm text-blue-400 hover:text-blue-300 underline"
      >
        Continue Shopping
      </button>
    </div>
  </motion.div>
);