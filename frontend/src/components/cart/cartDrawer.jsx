// components/cart/CartDrawer.jsx
"use client";
import Image from "next/image";
import { useCart } from "../../contexts/cardContext";
import { FiTrash2, FiX } from "react-icons/fi";
import { Button } from "@/components/common/Button";

export default function CartDrawer({ isOpen, onClose }) {
  const { items, removeItem, updateQuantity, total } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 z-40" onClick={onClose} />

      {/* Drawer */}
      <aside className="fixed right-0 top-0 h-full w-full max-w-md bg-[#1a1a1a] text-white z-50 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-700">
          <h2 className="text-xl font-bold">Your Cart</h2>
          <button onClick={onClose} className="p-1">
            <FiX size={24} />
          </button>
        </div>

        {/* Items */}
        <div className="p-5 space-y-4">
          {items.length === 0 ? (
            <p className="text-center text-gray-400 py-10">Your cart is empty</p>
          ) : (
            items.map((item) => (
              <CartItemRow
                key={item._id}
                item={item}
                onRemove={removeItem}
                onQtyChange={updateQuantity}
              />
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-700 p-5 space-y-4 bg-[#1e1e1e]">
            <div className="flex justify-between text-lg">
              <span>Total</span>
              <span className="font-bold">€{total.toFixed(2)}</span>
            </div>

            <p className="text-sm text-gray-400">
              Free shipping on orders over €250
            </p>

            <Button
              className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-full font-medium transition"
              onClick={() => alert("Checkout coming soon!")}
            >
              Order now
            </Button>
          </div>
        )}
      </aside>
    </>
  );
}

// Sub-component: One cart row
function CartItemRow({ item, onRemove, onQtyChange }) {
  return (
    <div className="flex items-center gap-4 bg-[#2a2a2a] rounded-lg p-3">
      {/* Image */}
      <div className="relative w-20 h-20 flex-shrink-0 rounded overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm line-clamp-2">{item.name}</h4>
        <p className="text-xs text-gray-400 mt-1">
          Free shipping on orders over €250
        </p>
        <p className="text-lg font-semibold mt-1">
          €{(item.price * item.quantity).toFixed(2)}
        </p>
      </div>

      {/* Quantity */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => onQtyChange(item._id, item.quantity - 1)}
          className="w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center text-lg font-bold"
        >
          -
        </button>
        <span className="w-8 text-center font-medium">{item.quantity}</span>
        <button
          onClick={() => onQtyChange(item._id, item.quantity + 1)}
          className="w-8 h-8 rounded-full bg-pink-500 hover:bg-pink-600 flex items-center justify-center text-lg font-bold"
        >
          +
        </button>
      </div>

      {/* Delete */}
      <button
        onClick={() => onRemove(item._id)}
        className="ml-2 text-gray-400 hover:text-red-400 transition"
      >
        <FiTrash2 size={18} />
      </button>
    </div>
  );
}