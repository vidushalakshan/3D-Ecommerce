// components/ProductCard.jsx
"use client";
import Image from "next/image";
import { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { FiShoppingCart, FiMessageCircle } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { Button } from "./Button";

const ProductCard = ({ product }) => {
  const [hovered, setHovered] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    router.push(`/productDetails/${product._id}`);
    // window.scrollTo(0, 0);
  };

  return (
    <div
      className="relative flex-shrink-0 flex flex-col items-center border border-black p-4 w-[300px] rounded-lg shadow-lg text-center mx-3 bg-white hover:shadow-2xl hover:border-blue-600 transition-all duration-300 group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* NEW / HOT Badges */}
      <div className="absolute top-3 left-3 flex flex-col gap-2 items-start z-10">
        <span className="bg-blue-600 text-white text-[10px] font-semibold py-1 px-2 rounded-full">
          NEW
        </span>
        {product.isHot && (
          <span className="bg-white text-black text-[10px] font-semibold py-1 px-2 rounded-full border border-black">
            🔥 HOT
          </span>
        )}
      </div>

      {/* Wishlist & View Icons */}
      <div className="absolute top-3 right-3 flex flex-col gap-2 items-end z-10 hover:cursor-pointer">
        <span className=" p-1 rounded-full border border-black">
          <CiHeart color="black" size={20} />
        </span>
        <span className="bg-white p-1 rounded-full border border-black">
          <IoEyeOutline color="black" size={20} onClick={handleClick} />
        </span>
      </div>

      {/* Product Image */}
      <div className="relative flex justify-center items-center h-[180px] mb-4 w-full">
        <Image
          src={product.image || "/uploads/default.jpg"}
          alt={product.name}
          width={180}
          height={180}
          className="object-contain p-3 bg-white rounded-md"
        />
        {/* Hover Add to Cart Button */}
        <div
          className={`absolute inset-0 flex-col items-center justify-center gap-2 transition-opacity duration-300 ${
            hovered ? "flex" : "hidden"
          }`}
        >
          <Button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-white hover:text-black border border-white hover:border-black transition-all duration-200">
            <div className="flex items-center gap-2">
              <FiShoppingCart size={18} />
              Add to Cart
            </div>
          </Button>
        </div>
      </div>

      {/* Product Info */}
      <div className="flex justify-between w-full px-2 text-sm text-black ">
        <span className="text-blue-600 font-semibold">{product.name}</span>
        <span className="text-black">Model {product.model}</span>
      </div>

      <hr className="w-full border-t border-gray-300 my-3" />

      <div className="uppercase font-bold text-sm tracking-wider mb-1 text-black">
        {product.type}
      </div>
      <div className="text-lg font-semibold text-black">
        ${product.price}
        <del className="ml-1 text-[15px] text-gray-600">
          ${product.oldPrice}
        </del>
      </div>

      <hr className="w-full border-t border-gray-300 my-3" />

      {/* Bottom Actions */}
      <div className="flex justify-center gap-6 text-sm">
        <button className="flex items-center gap-1 text-black hover:underline">
          <FiShoppingCart />
          Buy Now
        </button>
        <button className="flex items-center gap-1 text-blue-600 hover:underline">
          <FiMessageCircle />
          Ask Question
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
