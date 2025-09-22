"use client";
import { useState } from "react";
import { Button } from "@/components/common/Button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { FiEdit2, FiTrash2, FiDollarSign, FiTag, FiInfo } from "react-icons/fi";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";

// ✅ Example products data
const initialProducts = [
  {
    id: 1,
    name: "iPhone 15",
    category: "Smartphones",
    type: "Electronics",
    price: 1200,
    oldPrice: 1400,
    isHot: true,
    image: "https://via.placeholder.com/80",
    description: "Latest iPhone model with advanced features.",
  },
  {
    id: 2,
    name: "Nike Air Max",
    category: "Shoes",
    type: "Fashion",
    price: 200,
    oldPrice: 250,
    isHot: false,
    image: "https://via.placeholder.com/80",
    description: "Comfortable running shoes with premium design.",
  },
];

const ProductsTable = ({ products, onEdit, onDelete }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl shadow-md">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Product
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Category / Type
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Hot?
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {products && products.length > 0 ? (
            products.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                {/* Product Info */}
                <td className="px-6 py-4 whitespace-nowrap flex items-center space-x-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 rounded-md object-cover"
                  />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {product.name}
                    </div>
                  </div>
                </td>

                {/* Category / Type */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <FiTag className="mr-1.5" />
                    {product.category} / {product.type}
                  </div>
                </td>

                {/* Price */}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  <div className="flex flex-col">
                    <span className="flex items-center">
                      <FiDollarSign className="mr-1.5" />
                      {formatCurrency(product.price)}
                    </span>
                    {product.oldPrice && (
                      <span className="line-through text-gray-400 text-xs">
                        {formatCurrency(product.oldPrice)}
                      </span>
                    )}
                  </div>
                </td>

                {/* Hot */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {product.isHot ? "🔥 Yes" : "No"}
                </td>

                {/* Description */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate">
                  <div className="flex items-center">
                    <FiInfo className="mr-1.5" />
                    {product.description}
                  </div>
                </td>

                {/* Actions */}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => onEdit(product)}
                      className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300"
                      title="Edit"
                    >
                      <FiEdit2 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => onDelete(product.id)}
                      className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                      title="Delete"
                    >
                      <FiTrash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="6"
                className="px-6 py-8 text-center text-gray-500 dark:text-gray-400"
              >
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

// ✅ Main DashboardProduct Component
const DashboardProduct = () => {
  const [products, setProducts] = useState(initialProducts);

  const handleEdit = (product) => {
    console.log("Edit product:", product);
  };

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const form = e.target;
    const newProduct = {
      id: Date.now(),
      name: form.name.value,
      category: form.category.value,
      type: form.type.value,
      price: Number(form.price.value),
      oldPrice: Number(form.oldPrice.value),
      isHot: form.isHot.value.toLowerCase() === "true",
      image: "https://via.placeholder.com/80",
      description: form.description.value,
    };
    setProducts([...products, newProduct]);
    form.reset();
  };

  return (
    <div className="flex flex-col p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      {/* ✅ Add Product Modal */}
      <Dialog className="relative">
        <DialogTrigger asChild >
          <Button
            variant="bgBlack"
            size="medium"
            className="mr-5 mb-5 w-fit hover:cursor-pointer"
          >
            + Add Product
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="mb-4">
              <Label>Product Name</Label>
              <Input name="name" type="text" placeholder="Product Name" required />
            </div>
            <div className="mb-4">
              <Label>Product Category</Label>
              <Input name="category" type="text" placeholder="Product Category" required />
            </div>
            <div className="mb-4">
              <Label>Product Type</Label>
              <Input name="type" type="text" placeholder="Product Type" required />
            </div>
            <div className="mb-4">
              <Label>Product Price</Label>
              <Input name="price" type="number" placeholder="Product Price" required />
            </div>
            <div className="mb-4">
              <Label>Product Old Price</Label>
              <Input name="oldPrice" type="number" placeholder="Product Old Price" />
            </div>
            <div className="mb-4">
              <Label>Product isHot</Label>
              <Input name="isHot" type="text" placeholder="true/false" />
            </div>
            <div className="mb-4 col-span-2">
              <Label>Product Description</Label>
              <Input name="description" type="text" placeholder="Product Description" />
            </div>
            <div className="col-span-2 flex justify-end">
              <Button variant="bgBlack" size="medium" type="submit" className="hover:cursor-pointer">
                Save Product
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* ✅ Products Table */}
      <ProductsTable products={products} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default DashboardProduct;
