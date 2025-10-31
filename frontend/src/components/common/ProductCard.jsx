// components/ProductCard.jsx
"use client";
import Image from "next/image";
import { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { FiShoppingCart } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { Button } from "./Button";
import { useCart } from "../../contexts/cardContext";

const ProductCard = ({ product }) => {
  const [hovered, setHovered] = useState(false);
  const router = useRouter();
  const { addItem } = useCart();

  const handleClick = () => {
    router.push(`/productDetails/${product._id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addItem(product);
  };

  return (
    <div
      className="relative flex-shrink-0 flex flex-col items-center border border-gray-300 p-4 w-[300px] rounded-xl shadow-md text-center mx-3 bg-white hover:shadow-xl hover:border-blue-500 transition-all duration-300 cursor-pointer group overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
        {/* NEW Badge */}
        <span className="bg-gradient-to-r from-blue-500 to-blue-700 text-white text-[10px] font-bold py-1 px-2 rounded-full shadow-sm border border-blue-800 flex items-center gap-1 uppercase tracking-wider">
          <span className="w-3 h-3 drop-shadow">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </span>
          New
        </span>

        {/* HOT Badge */}
        {product.isHot && (
          <span className="bg-gradient-to-r from-orange-500 to-red-600 text-white text-[10px] font-bold py-1 pl-1.5 pr-2 rounded-full shadow-sm border border-red-700 flex items-center gap-1 animate-pulse">
            <span className="w-3 h-3 animate-bounce">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 23c-1.43 0-2.67-.79-3.32-1.95a4.05 4.05 0 0 1 3.32-6.35 4.05 4.05 0 0 1 3.32 6.35A3.66 3.66 0 0 1 12 23z" />
                <path d="M15.52 14.5a3.5 3.5 0 0 1-3.52-3.5c0-2.02 1.66-3.67 3.73-3.5 1.24.1 2.27 1.13 2.27 2.38 0 1.32-1.07 2.62-2.48 2.62z" />
                <path d="M8.48 14.5a3.5 3.5 0 0 0 3.52-3.5c0-2.02-1.66-3.67-3.73-3.5C7.03 7.6 6 8.63 6 9.88c0 1.32 1.07 2.62 2.48 2.62z" />
              </svg>
            </span>
            Hot
          </span>
        )}
      </div>

      {/* Action Icons */}
      <div className="absolute top-3 right-3 flex flex-col gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          className="p-2 rounded-full bg-white border border-gray-300 shadow-sm hover:border-gray-500 hover:shadow-md transition-all"
          onClick={(e) => {
            e.stopPropagation();
            // Add to wishlist logic
          }}
          aria-label="Add to wishlist"
        >
          <CiHeart size={18} />
        </button>
      </div>

      {/* Image with Zoom */}
      <div className="relative w-[180px] h-[180px] mb-4 overflow-hidden rounded-lg">
        <Image
          src={product.image || "/uploads/default.jpg"}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 300px"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          priority={false}
        />
      </div>

      {/* Product Info */}
      <div className="w-full px-2 text-sm text-gray-800 z-10 space-y-1">
        <div className="flex justify-between items-start mb-1 h-[50px]">
          <h3 className="text-blue-600 font-semibold text-left line-clamp-2 leading-tight">
            {product.name}
          </h3>
          <span className="text-xs text-gray-500">Model {product.model}</span>
        </div>

        <hr className="border-gray-200" />

        <p className="uppercase font-bold text-xs tracking-widest text-gray-700 h-[50px]">
          {product.type}
        </p>

        <div className="flex items-center justify-center gap-2 text-lg font-bold">
          <span className="text-green-600">${product.price}</span>
          {product.oldPrice && (
            <del className="text-sm text-gray-400">${product.oldPrice}</del>
          )}
        </div>

        <hr className="border-gray-200 my-2" />

        {/* Buttons */}
        <div className="flex justify-center items-center gap-3 text-xs">
          <Button
            onClick={handleAddToCart}
            size="lowSmall"
            className="bg-blue-600 text-white px-4 py-1.5 rounded-full hover:bg-white hover:text-blue-600 border border-blue-600 transition-all flex items-center gap-1.5 font-medium"
          >
            <FiShoppingCart size={14} />
            Add
          </Button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart(e);
              router.push("/checkout");
            }}
            className="flex items-center gap-1.5 text-blue-600 hover:text-blue-800 hover:cursor-pointer font-medium transition-colors"
          >
            <FiShoppingCart size={14} />
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;