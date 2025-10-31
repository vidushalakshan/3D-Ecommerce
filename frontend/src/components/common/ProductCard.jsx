// components/ProductCard.jsx
"use client";
import Image from "next/image";
import { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { FiShoppingCart, FiMessageCircle } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { Button } from "./Button";
import { useCart } from "../../contexts/cardContext"; // IMPORT

const ProductCard = ({ product }) => {
  const [hovered, setHovered] = useState(false);
  const router = useRouter();
  const { addItem } = useCart(); // DESTRUCTURE

  const handleClick = () => {
    router.push(`/productDetails/${product._id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation(); // prevent card click
    addItem(product); // NOW WORKS
  };

  return (
    <div
      className="relative flex-shrink-0 flex flex-col items-center border border-black p-4 w-[300px] rounded-lg shadow-lg text-center mx-3 bg-white hover:shadow-2xl hover:border-blue-600 transition-all duration-300 group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Badges */}
      {/* Badges */}
      <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
        {/* NEW Badge – Clean, Modern, Matching HOT */}
        <span className="bg-gradient-to-r from-blue-500 to-blue-700 text-white text-[10px] font-semibold py-1 px-2 rounded-full shadow-md border border-blue-800 flex items-center gap-1">
          <span className="w-3 h-3">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="drop-shadow-sm"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </span>
          <span>NEW</span>
        </span>

        {/* HOT Badge – Fiery & Animated */}
        {product.isHot && (
          <span className="bg-gradient-to-r from-orange-500 to-red-600 text-white text-[10px] font-semibold py-1 pl-1.5 pr-2 rounded-full shadow-md border border-red-700 flex items-center gap-1 animate-pulse">
            <span className="w-3 h-3 animate-bounce">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 23c-1.43 0-2.67-.79-3.32-1.95a4.05 4.05 0 0 1 3.32-6.35 4.05 4.05 0 0 1 3.32 6.35A3.66 3.66 0 0 1 12 23z" />
                <path d="M15.52 14.5a3.5 3.5 0 0 1-3.52-3.5c0-2.02 1.66-3.67 3.73-3.5 1.24.1 2.27 1.13 2.27 2.38 0 1.32-1.07 2.62-2.48 2.62z" />
                <path d="M8.48 14.5a3.5 3.5 0 0 0 3.52-3.5c0-2.02-1.66-3.67-3.73-3.5C7.03 7.6 6 8.63 6 9.88c0 1.32 1.07 2.62 2.48 2.62z" />
              </svg>
            </span>
            <span>HOT</span>
          </span>
        )}
      </div>

      {/* Icons */}
      <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
        <span className="p-1 rounded-full border border-black bg-white">
          <CiHeart color="black" size={20} />
        </span>
        <span
          className="bg-white p-1 rounded-full border border-black cursor-pointer"
          onClick={handleClick}
        >
          <IoEyeOutline color="black" size={20} />
        </span>
      </div>

      {/* Image + Hover Button */}
      <div className="relative w-[180px] h-[180px] mb-4 overflow-hidden rounded">
        <Image
          src={product.image || "/uploads/default.jpg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <div
          className={`absolute inset-0 flex items-center justify-center bg-black/50 transition-opacity ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <Button
            onClick={handleAddToCart}
            className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-white hover:text-black border border-white hover:border-black transition-all flex items-center gap-2"
          >
            <FiShoppingCart size={18} />
            Add to Cart
          </Button>
        </div>
      </div>

      {/* Info */}
      <div className="w-full px-2 text-sm text-black z-10">
        <div className="flex justify-between mb-1">
          <span className="text-blue-600 font-semibold">{product.name}</span>
          <span>Model {product.model}</span>
        </div>
        <hr className="border-gray-300 my-2" />
        <div className="uppercase font-bold text-sm tracking-wider mb-1">
          {product.type}
        </div>
        <div className="text-lg font-semibold">
          ${product.price}
          {product.oldPrice && (
            <del className="ml-1 text-[15px] text-gray-600">
              ${product.oldPrice}
            </del>
          )}
        </div>
        <hr className="border-gray-300 my-3" />
        <div className="flex justify-center gap-6 text-sm">
          <button className="flex items-center gap-1 hover:underline">
            <FiShoppingCart /> Buy Now
          </button>
          <button className="flex items-center gap-1 text-blue-600 hover:underline">
            <FiMessageCircle /> Ask Question
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
