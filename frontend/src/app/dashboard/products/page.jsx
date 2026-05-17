"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox"; 
import { FiEdit2, FiTrash2, FiDollarSign, FiTag, FiInfo, FiPlus } from "react-icons/fi";
import { HiSparkles, HiTag, HiCube, HiTrash, HiPencilSquare } from "react-icons/hi2";
import { motion, AnimatePresence } from "framer-motion";
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
    <div className="overflow-y-auto bg-black/40 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] h-[550px] shadow-2xl no-scrollbar relative p-6">
      <table className="min-w-full divide-y divide-white/5 text-left">
        <thead>
          <tr className="border-b border-white/10">
            <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
              Product Stage
            </th>
            <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
              Telemetry / Category
            </th>
            <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
              Hardware Price
            </th>
            <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
              Hot Node?
            </th>
            <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
              Payload Description
            </th>
            <th className="px-6 py-4 text-right text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
              Execution Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-white/5 bg-transparent">
          {products.length > 0 ? (
            products.map((product, index) => (
              <tr
                key={product._id || `product-${index}`}
                className="hover:bg-white/5 transition-all duration-300 group"
              >
                {/* Product Name & Avatar */}
                <td className="px-6 py-4 whitespace-nowrap flex items-center space-x-4">
                  <div className="relative w-12 h-12 rounded-2xl overflow-hidden border border-white/10 group-hover:border-blue-500/50 transition-all">
                    <img
                      src={product.image || "https://via.placeholder.com/80"}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div>
                    <div className="text-sm font-black text-white italic tracking-tighter uppercase">
                      {product.name}
                    </div>
                    <span className="text-[8px] font-mono text-gray-500 tracking-widest block uppercase">
                      MODEL: {product.model || "GENERIC"}
                    </span>
                  </div>
                </td>

                {/* Category / Type */}
                <td className="px-6 py-4 text-xs text-gray-300">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/5 border border-white/5">
                    <HiTag className="text-blue-400" size={12} />
                    <span className="font-bold tracking-wide uppercase text-[9px]">
                      {product.category} / {product.type}
                    </span>
                  </div>
                </td>

                {/* Price */}
                <td className="px-6 py-4 text-xs font-black text-white">
                  <div className="flex flex-col">
                    <span className="flex items-center text-sm font-black text-white tracking-tight">
                      <FiDollarSign className="text-green-400 mr-0.5" />
                      {formatCurrency(product.price)}
                    </span>
                    {product.oldPrice && (
                      <span className="line-through text-gray-500 text-[10px] ml-4">
                        {formatCurrency(product.oldPrice)}
                      </span>
                    )}
                  </div>
                </td>

                {/* Hot? */}
                <td className="px-6 py-4 text-xs">
                  {product.isHot ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[8px] font-black text-orange-400 uppercase bg-orange-500/10 border border-orange-500/20 rounded-full animate-pulse">
                      <HiSparkles size={8} />
                      HOT NODE
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[8px] font-bold text-gray-500 uppercase bg-white/5 border border-white/5 rounded-full">
                      STANDARD
                    </span>
                  )}
                </td>

                {/* Description */}
                <td className="px-6 py-4 text-[10px] text-gray-400 max-w-xs truncate font-medium">
                  {product.description}
                </td>

                {/* Actions */}
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => onEdit(product)}
                      className="p-2 rounded-xl bg-blue-500/10 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/20 transition-all cursor-pointer"
                      title="Edit Product"
                    >
                      <HiPencilSquare size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(product._id)}
                      className="p-2 rounded-xl bg-red-500/10 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/20 transition-all cursor-pointer"
                      title="Delete Product"
                    >
                      <HiTrash size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="6"
                className="px-6 py-12 text-center text-xs font-bold text-gray-500 uppercase tracking-widest"
              >
                No active products detected inside system buffer.
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
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

      const formData = new FormData();
      formData.append("name", name);
      formData.append("model", model);
      formData.append("category", category);
      formData.append("type", type);
      formData.append("price", priceValue.toString());
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

      const method = editingProduct ? "PUT" : "POST";
      const url = editingProduct ? `${API_BASE_URL}/${editingProduct._id}` : API_BASE_URL;

      const res = await fetch(url, {
        method,
        body: formData,
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
      setIsDialogOpen(false);
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

  if (loading) return <p className="p-6 text-white text-xs font-black uppercase tracking-widest">Loading 3D Core Database...</p>;

  return (
    <div className="flex flex-col p-6 space-y-6 text-white max-w-7xl mx-auto">
      {/* Page Title & Add Button */}
      <header className="flex justify-between items-center border-b border-white/5 pb-4">
        <div>
          <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest block mb-1">3D Tech Vault</span>
          <h1 className="text-3xl font-black italic tracking-tighter uppercase">INVENTORY DATABASE</h1>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) setEditingProduct(null);
        }}>
          <DialogTrigger asChild>
            <button 
              onClick={() => setIsDialogOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-xs font-black uppercase tracking-wider text-white shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] transition-all cursor-pointer border border-blue-400/20"
            >
              <FiPlus size={14} />
              <span>Register Hardware</span>
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl bg-[#0c0c0c] border border-white/10 text-white rounded-[2.5rem] p-8 shadow-2xl" aria-describedby="dialog-description">
            <DialogHeader className="border-b border-white/5 pb-4">
              <DialogTitle className="text-xl font-black italic uppercase text-white tracking-tight">
                {editingProduct ? "⚡ Augment Hardware Data" : "➕ Register New Hardware"}
              </DialogTitle>
              <DialogDescription id="dialog-description" className="text-[10px] text-gray-500 font-bold uppercase tracking-wide">
                Modify existing system node metrics or catalog new item payloads inside the central database.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleAddOrUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6 font-medium">
              <div className="space-y-1.5">
                <Label className="text-[10px] font-black uppercase tracking-wider text-gray-400">Product Name</Label>
                <Input name="name" type="text" required defaultValue={editingProduct?.name || ""} className="bg-white/5 border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:border-blue-500 transition-all" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-black uppercase tracking-wider text-gray-400">Model Name</Label>
                <Input name="model" type="text" required defaultValue={editingProduct?.model || ""} className="bg-white/5 border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:border-blue-500 transition-all" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-black uppercase tracking-wider text-gray-400">Category Tag</Label>
                <Input name="category" type="text" required defaultValue={editingProduct?.category || ""} className="bg-white/5 border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:border-blue-500 transition-all" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-black uppercase tracking-wider text-gray-400">Type Category</Label>
                <Input name="type" type="text" required defaultValue={editingProduct?.type || ""} className="bg-white/5 border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:border-blue-500 transition-all" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-black uppercase tracking-wider text-gray-400">Active Price (USD)</Label>
                <Input
                  name="price"
                  type="number"
                  step="0.01"
                  min="0.01"
                  max="999999.99"
                  required
                  defaultValue={editingProduct?.price || ""}
                  onKeyDown={(e) => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()}
                  className="bg-white/5 border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:border-blue-500 transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-black uppercase tracking-wider text-gray-400">Old Original Price (optional)</Label>
                <Input
                  name="oldPrice"
                  type="number"
                  step="0.01"
                  min="0.01"
                  max="999999.99"
                  defaultValue={editingProduct?.oldPrice || ""}
                  onKeyDown={(e) => ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()}
                  className="bg-white/5 border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:border-blue-500 transition-all"
                />
              </div>
              <div className="flex items-center space-x-3 pt-3">
                <Checkbox name="isHot" defaultChecked={editingProduct?.isHot} className="border-white/20 data-[state=checked]:bg-blue-500 rounded-md" />
                <Label htmlFor="isHot" className="text-xs font-black uppercase tracking-wider text-gray-300">Set Hot Telemetry Tag?</Label>
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-black uppercase tracking-wider text-gray-400">Hardware Image Payload {editingProduct ? "(optional)" : ""}</Label>
                <Input name="image" type="file" accept="image/*" required={!editingProduct} className="bg-white/5 border-white/10 rounded-xl px-4 py-1.5 text-xs text-white file:bg-white/5 file:border-0 file:text-white file:text-xs file:font-bold file:px-2 file:py-1 file:rounded-lg file:mr-2 cursor-pointer focus:border-blue-500" />
              </div>
              <div className="col-span-2 space-y-1.5">
                <Label className="text-[10px] font-black uppercase tracking-wider text-gray-400">Payload Description</Label>
                <Input name="description" type="text" required defaultValue={editingProduct?.description || ""} className="bg-white/5 border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:border-blue-500 transition-all" />
              </div>
              <div className="col-span-2 flex justify-end gap-3 border-t border-white/5 pt-4">
                {editingProduct && (
                  <button 
                    type="button" 
                    onClick={() => {
                      setEditingProduct(null);
                      setIsDialogOpen(false);
                    }}
                    className="px-5 py-2.5 rounded-xl border border-white/10 text-xs font-bold text-gray-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
                  >
                    Abort Changes
                  </button>
                )}
                <button 
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-black uppercase tracking-wider text-white shadow-lg transition-all cursor-pointer"
                >
                  {editingProduct ? "Apply Overwrite" : "Save Node"}
                </button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </header>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-2xl text-xs font-bold tracking-wide">
          ⚠️ WARNING: {error}
        </div>
      )}

      {/* Main Table view */}
      <ProductsTable 
        products={products} 
        onEdit={(prod) => {
          setEditingProduct(prod);
          setIsDialogOpen(true);
        }} 
        onDelete={handleDelete} 
      />
    </div>
  );
};

export default DashboardProduct;