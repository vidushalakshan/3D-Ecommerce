"use client";
import { useState, useEffect } from "react";
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
            products.map((product, index) => (
              <tr
                key={product.id || `product-${index}`} // Fallback key to ensure uniqueness
                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap flex items-center space-x-3">
                  <img
                    src={product.image || "https://via.placeholder.com/80"}
                    alt={product.name || "Product"}
                    className="w-12 h-12 rounded-md object-cover"
                  />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {product.name || "Unnamed Product"}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <FiTag className="mr-1.5" />
                    {product.category || "N/A"} / {product.type || "N/A"}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  <div className="flex flex-col">
                    <span className="flex items-center">
                      <FiDollarSign className="mr-1.5" />
                      {formatCurrency(product.price || 0)}
                    </span>
                    {product.oldPrice && (
                      <span className="line-through text-gray-400 text-xs">
                        {formatCurrency(product.oldPrice)}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {product.isHot ? "🔥 Yes" : "No"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 max-w-xs truncate">
                  <div className="flex items-center">
                    <FiInfo className="mr-1.5" />
                    {product.description || "No description"}
                  </div>
                </td>
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

const DashboardProduct = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Base URL for your backend API (replace with your actual backend URL)
  const API_BASE_URL = "http://localhost:3000/api/products";

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(API_BASE_URL, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data);
        setError(null);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    setEditingProduct(product);
    setError(null);
  };

  const handleDelete = async (id) => {
    if (!id) {
      setError("Cannot delete product: Invalid ID");
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to delete product");
      setProducts(products.filter((p) => p.id !== id));
      setError(null);
    } catch (error) {
      console.error("Error deleting product:", error);
      setError("Failed to delete product. Please try again.");
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const form = e.target;
    const newProduct = {
      name: form.name.value,
      category: form.category.value,
      type: form.type.value,
      price: Number(form.price.value),
      oldPrice: form.oldPrice.value ? Number(form.oldPrice.value) : null,
      isHot: form.isHot.value.toLowerCase() === "true",
      image: form.image.value || "https://via.placeholder.com/80",
      description: form.description.value,
    };
    try {
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });
      if (!response.ok) throw new Error("Failed to add product");
      const savedProduct = await response.json();
      setProducts([...products, savedProduct]);
      form.reset();
      setError(null);
    } catch (error) {
      console.error("Error adding product:", error);
      setError("Failed to add product. Please try again.");
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedProduct = {
      name: form.name.value,
      category: form.category.value,
      type: form.type.value,
      price: Number(form.price.value),
      oldPrice: form.oldPrice.value ? Number(form.oldPrice.value) : null,
      isHot: form.isHot.value.toLowerCase() === "true",
      image: form.image.value || "https://via.placeholder.com/80",
      description: form.description.value,
    };
    try {
      const response = await fetch(`${API_BASE_URL}/${editingProduct.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });
      if (!response.ok) throw new Error("Failed to update product");
      const savedProduct = await response.json();
      setProducts(products.map((p) => (p.id === editingProduct.id ? savedProduct : p)));
      setEditingProduct(null);
      form.reset();
      setError(null);
    } catch (error) {
      console.error("Error updating product:", error);
      setError("Failed to update product. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col p-6">
        <h1 className="text-2xl font-bold mb-4">Products</h1>
        <p className="text-gray-500 dark:text-gray-400">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      <Dialog className="relative">
        <DialogTrigger asChild>
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
            <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="mb-4">
              <Label>Product Name</Label>
              <Input
                name="name"
                type="text"
                placeholder="Product Name"
                defaultValue={editingProduct?.name || ""}
                required
              />
            </div>
            <div className="mb-4">
              <Label>Product Category</Label>
              <Input
                name="category"
                type="text"
                placeholder="Product Category"
                defaultValue={editingProduct?.category || ""}
                required
              />
            </div>
            <div className="mb-4">
              <Label>Product Type</Label>
              <Input
                name="type"
                type="text"
                placeholder="Product Type"
                defaultValue={editingProduct?.type || ""}
                required
              />
            </div>
            <div className="mb-4">
              <Label>Product Price</Label>
              <Input
                name="price"
                type="number"
                placeholder="Product Price"
                defaultValue={editingProduct?.price || ""}
                required
              />
            </div>
            <div className="mb-4">
              <Label>Product Old Price</Label>
              <Input
                name="oldPrice"
                type="number"
                placeholder="Product Old Price"
                defaultValue={editingProduct?.oldPrice || ""}
              />
            </div>
            <div className="mb-4">
              <Label>Product isHot</Label>
              <Input
                name="isHot"
                type="text"
                placeholder="true/false"
                defaultValue={editingProduct?.isHot?.toString() || ""}
              />
            </div>
            <div className="mb-4">
              <Label>Product Image URL</Label>
              <Input
                name="image"
                type="text"
                placeholder="Image URL"
                defaultValue={editingProduct?.image || ""}
              />
            </div>
            <div className="mb-4 col-span-2">
              <Label>Product Description</Label>
              <Input
                name="description"
                type="text"
                placeholder="Product Description"
                defaultValue={editingProduct?.description || ""}
              />
            </div>
            <div className="col-span-2 flex justify-end space-x-4">
              {editingProduct && (
                <Button
                  variant="outline"
                  size="medium"
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="hover:cursor-pointer"
                >
                  Cancel
                </Button>
              )}
              <Button
                variant="bgBlack"
                size="medium"
                type="submit"
                className="hover:cursor-pointer"
              >
                {editingProduct ? "Update Product" : "Save Product"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <ProductsTable products={products} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default DashboardProduct;