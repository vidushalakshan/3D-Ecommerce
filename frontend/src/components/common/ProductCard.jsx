// components/ProductCard.jsx
"use client";
import Image from "next/image";
import { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { FiShoppingCart, FiMessageCircle } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { Button } from "./Button";
import { useCart } from "../../contexts/cardContext";   // IMPORT

const ProductCard = ({ product }) => {
  const [hovered, setHovered] = useState(false);
  const router = useRouter();
  const { addItem } = useCart();                     // DESTRUCTURE

  const handleClick = () => {
    router.push(`/productDetails/${product._id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();          // prevent card click
    addItem(product);             // NOW WORKS
  };

  return (
    <div
      className="relative flex-shrink-0 flex flex-col items-center border border-black p-4 w-[300px] rounded-lg shadow-lg text-center mx-3 bg-white hover:shadow-2xl hover:border-blue-600 transition-all duration-300 group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
        <span className="bg-blue-600 text-white text-[10px] font-semibold py-1 px-2 rounded-full">
          NEW
        </span>
        {product.isHot && (
          <span className="bg-white text-black text-[10px] font-semibold py-1 px-2 rounded-full border border-black">
            HOT
          </span>
        )}
      </div>

      {/* Icons */}
      <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
        <span className="p-1 rounded-full border border-black bg-white">
          <CiHeart size={20} />
        </span>
        <span
          className="bg-white p-1 rounded-full border border-black cursor-pointer"
          onClick={handleClick}
        >
          <IoEyeOutline size={20} />
        </span>
      </div>

      {/* Image + Hover Button */}
      <div className="relative w-full h-[180px] mb-4 overflow-hidden rounded">
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