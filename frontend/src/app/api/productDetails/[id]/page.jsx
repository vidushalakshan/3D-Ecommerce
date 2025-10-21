"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import NavBar from "@/components/layout/NavBar";
import { Button } from "@/components/common/Button";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch product");
        }

        setProduct(data);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false); // ✅ stop loading after fetch (success or error)
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-600">
        Loading product details...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="text-center py-20 text-red-500">
        {error || "Product not found"}
      </div>
    );
  }

  return (
    <div>
      <NavBar />

      <section className="max-w-6xl mx-auto py-10 px-4 grid grid-cols-1 md:grid-cols-2 gap-10 mt-30 ">
        {/* Product Image */}
        <div className="flex justify-center items-center">
          <Image
            src={product.image || "/uploads/default.jpg"}
            alt={product.name}
            width={400}
            height={400}
            className="rounded-xl shadow-lg object-contain"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-center text-black">
          <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>

          <div className="mb-3 text-lg">
            <span className="font-semibold">Model:</span> {product.model}
          </div>

          <div className="mb-3 text-lg">
            <span className="font-semibold">Category:</span> {product.type}
          </div>

          <div className="text-2xl font-bold mb-5 text-blue-600">
            ${product.price}{" "}
            <del className="text-gray-500 text-lg ml-2">
              ${product.oldPrice}
            </del>
          </div>

          <div className="flex gap-4 mt-5">
            <Button>Add to Cart</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetails;
