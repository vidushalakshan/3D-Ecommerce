"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox"; 
import { FiEdit2, FiTrash2, FiDollarSign, FiTag, FiInfo } from "react-icons/fi";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";

const ProductsTable = ({ products, onEdit, onDelete }) => {
  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <div className="overflow-y-scroll bg-white dark:bg-gray-800 rounded-xl h-[500px] shadow-md">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Product
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category / Type
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Hot?
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700 ">
          {products.length > 0 ? (
            products.map((product, index) => (
              <tr
                key={product._id || `product-${index}`}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap flex items-center space-x-3">
                  <img
                    src={product.image || "https://via.placeholder.com/80"}
                    alt={product.name}
                    className="w-12 h-12 rounded-md object-cover"
                  />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {product.name}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <FiTag className="mr-1.5" />
                    {product.category} / {product.type}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
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
                <td className="px-6 py-4 text-sm text-gray-500">
                  {product.isHot ? "Yes" : "No"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                  <div className="flex items-center">
                    <FiInfo className="mr-1.5" />
                    {product.description}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => onEdit(product)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <FiEdit2 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => onDelete(product._id)}
                      className="text-red-600 hover:text-red-900"
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

  const API_BASE_URL = "/api/products";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(API_BASE_URL);
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;

    try {
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      setError(null);

      if (!form.price.value) {
        setError("Price is required and must be a positive number");
        return;
      }

      const name = form.name.value.trim();
      const model = form.model.value.trim();
      const category = form.category.value.trim();
      const type = form.type.value.trim();
      const description = form.description.value.trim();

      if (!name || !model || !category || !type || !description) {
        setError("All required text fields must be filled");
        return;
      }

      const priceValue = parseFloat(form.price.value);
      if (isNaN(priceValue) || !isFinite(priceValue) || priceValue <= 0) {
        setError("Please enter a valid price");
        return;
      }

      let oldPriceValue = null;
      if (form.oldPrice.value) {
        const temp = parseFloat(form.oldPrice.value);
        if (!isNaN(temp) && isFinite(temp) && temp > 0) {
          oldPriceValue = temp;
        }
      }

      // Build FormData for multipart
      const formData = new FormData();
      formData.append("name", name);
      formData.append("model", model);
      formData.append("category", category);
      formData.append("type", type);
      formData.append("price", priceValue.toString()); // Send as string; backend converts
      if (oldPriceValue) formData.append("oldPrice", oldPriceValue.toString());
      formData.append("isHot", form.isHot.checked ? "true" : "false");
      formData.append("description", description);

      const file = form.image.files[0];
      if (file) {
        formData.append("image", file);
      } else if (!editingProduct) {
        setError("Please upload an image for new products");
        return;
      }
      // For edit: If no file and editing, backend will use default or need separate logic (add later)

      console.log('Sending form data...'); // Debug: Can't log FormData contents easily

      const method = editingProduct ? "PUT" : "POST"; // Note: Backend needs PUT handler for edit
      const url = editingProduct ? `${API_BASE_URL}/${editingProduct._id}` : API_BASE_URL;

      const res = await fetch(url, {
        method,
        body: formData, // No Content-Type; browser sets multipart boundary
      });

      const responseData = await res.json();
      if (!res.ok) {
        throw new Error(responseData.error || "Failed to save product");
      }
      const saved = responseData.product || responseData;

      setProducts((prev) =>
        editingProduct
          ? prev.map((p) => (p._id === editingProduct._id ? saved : p))
          : [...prev, saved]
      );

      setEditingProduct(null);
      form.reset();
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to save product");
    }
  };

  const handleDelete = async (id) => {
    if (!id) return;
    try {
      const res = await fetch(`${API_BASE_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="flex flex-col p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="bgBlack" size="medium" className="mb-5">
            + Add Product
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl" aria-describedby="dialog-description">
          <DialogHeader>
            <DialogTitle>{editingProduct ? "Edit Product" : "Add Product"}</DialogTitle>
            <DialogDescription id="dialog-description">
              Fill in the details. For edits, image upload is optional.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleAddOrUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <Label>Product Name</Label>
              <Input name="name" type="text" required defaultValue={editingProduct?.name || ""} />
            </div>
            <div>
              <Label>Model</Label>
              <Input name="model" type="text" required defaultValue={editingProduct?.model || ""} />
            </div>
            <div>
              <Label>Category</Label>
              <Input name="category" type="text" required defaultValue={editingProduct?.category || ""} />
            </div>
            <div>
              <Label>Type</Label>
              <Input name="type" type="text" required defaultValue={editingProduct?.type || ""} />
            </div>
            <div>
              <Label>Price</Label>
              <Input
                name="price"
                type="number"
                step="0.01"
                min="0.01"
                max="999999.99"
                required
                defaultValue={editingProduct?.price || ""}
                onKeyDown={(e) => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()}
              />
            </div>
            <div>
              <Label>Old Price (optional)</Label>
              <Input
                name="oldPrice"
                type="number"
                step="0.01"
                min="0.01"
                max="999999.99"
                defaultValue={editingProduct?.oldPrice || ""}
                onKeyDown={(e) => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox name="isHot" defaultChecked={editingProduct?.isHot} />
              <Label htmlFor="isHot">Is Hot?</Label>
            </div>
            <div>
              <Label>Image {editingProduct ? "(optional)" : ""}</Label>
              <Input name="image" type="file" accept="image/*" required={!editingProduct} />
            </div>
            <div className="col-span-2">
              <Label>Description</Label>
              <Input name="description" type="text" required defaultValue={editingProduct?.description || ""} />
            </div>
            <div className="col-span-2 flex justify-end gap-3">
              {editingProduct && (
                <Button variant="outline" type="button" onClick={() => setEditingProduct(null)}>
                  Cancel
                </Button>
              )}
              <Button variant="bgBlack" type="submit">
                {editingProduct ? "Update" : "Save"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <ProductsTable products={products} onEdit={setEditingProduct} onDelete={handleDelete} />
    </div>
  );
};

export default DashboardProduct;