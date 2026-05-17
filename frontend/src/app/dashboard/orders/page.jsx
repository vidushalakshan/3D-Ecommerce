"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FiEdit2, FiTrash2, FiPackage, FiUser, FiCalendar, FiPlus } from "react-icons/fi";
import { HiSparkles, HiTrash, HiPencilSquare } from "react-icons/hi2";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";

const OrdersTable = ({ orders, onEdit, onDelete }) => {
  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20";
      case "processing":
        return "bg-blue-500/10 text-blue-400 border border-blue-500/20";
      case "shipped":
        return "bg-purple-500/10 text-purple-400 border border-purple-500/20";
      case "delivered":
        return "bg-green-500/10 text-green-400 border border-green-500/20 animate-pulse";
      case "cancelled":
        return "bg-red-500/10 text-red-400 border border-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-400 border border-gray-500/20";
    }
  };

  return (
    <div className="overflow-y-auto bg-black/40 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] h-[550px] shadow-2xl no-scrollbar relative p-6">
      <table className="min-w-full divide-y divide-white/5 text-left">
        <thead>
          <tr className="border-b border-white/10">
            <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
              Order ID / Buffer
            </th>
            <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
              Client / Account
            </th>
            <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
              Hardware Payload
            </th>
            <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
              Total Net Asset
            </th>
            <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
              Sync Status
            </th>
            <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
              Timestamp Date
            </th>
            <th className="px-6 py-4 text-right text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-white/5 bg-transparent">
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <tr
                key={order._id || `order-${index}`}
                className="hover:bg-white/5 transition-all duration-300 group"
              >
                {/* Order ID */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <FiPackage className="text-blue-400" size={14} />
                    <span className="text-xs font-black tracking-tight text-white font-mono uppercase">
                      #{order.orderNumber || order._id?.slice(-6)}
                    </span>
                  </div>
                </td>

                {/* Customer */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-xs font-bold text-blue-400 uppercase">
                      {order.customerName?.slice(0, 2) || "CL"}
                    </div>
                    <div>
                      <div className="text-xs font-black text-white leading-none uppercase">
                        {order.customerName}
                      </div>
                      <span className="text-[8px] font-bold text-gray-500 block tracking-wider mt-1 uppercase">
                        {order.customerEmail}
                      </span>
                    </div>
                  </div>
                </td>

                {/* Products */}
                <td className="px-6 py-4 text-xs text-gray-300">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/5 border border-white/5 font-bold uppercase text-[9px] tracking-wide">
                    {order.products?.length || 0} hardware node(s)
                  </span>
                </td>

                {/* Total */}
                <td className="px-6 py-4 text-xs font-black text-white tracking-tight">
                  {formatCurrency(order.total)}
                </td>

                {/* Status */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 text-[8px] font-black uppercase rounded-full ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>

                {/* Date */}
                <td className="px-6 py-4 text-xs text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <FiCalendar className="text-gray-500" size={12} />
                    <span className="font-bold tracking-wide uppercase text-[9px]">
                      {formatDate(order.createdAt || new Date())}
                    </span>
                  </div>
                </td>

                {/* Actions */}
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => onEdit(order)}
                      className="p-2 rounded-xl bg-blue-500/10 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/20 transition-all cursor-pointer"
                      title="Edit Order"
                    >
                      <HiPencilSquare size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(order._id)}
                      className="p-2 rounded-xl bg-red-500/10 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/20 transition-all cursor-pointer"
                      title="Delete Order"
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
                colSpan="7"
                className="px-6 py-12 text-center text-xs font-bold text-gray-500 uppercase tracking-widest"
              >
                No active orders inside transaction buffer.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const dummyOrders = [
  {
    _id: "1",
    orderNumber: "ORD001",
    customerName: "John Doe",
    customerEmail: "john.doe@example.com",
    products: ["Product 1", "Product 2"],
    total: 150,
    status: "pending",
    createdAt: "2024-01-15T10:30:00Z"
  },
  {
    _id: "2",
    orderNumber: "ORD002",
    customerName: "Jane Smith",
    customerEmail: "jane.smith@example.com",
    products: ["Product 3"],
    total: 299,
    status: "processing",
    createdAt: "2024-01-16T14:20:00Z"
  },
  {
    _id: "3",
    orderNumber: "ORD003",
    customerName: "Mike Johnson",
    customerEmail: "mike.j@example.com",
    products: ["Product 1", "Product 4", "Product 5"],
    total: 450,
    status: "shipped",
    createdAt: "2024-01-17T09:15:00Z"
  },
  {
    _id: "4",
    orderNumber: "ORD004",
    customerName: "Sarah Williams",
    customerEmail: "sarah.w@example.com",
    products: ["Product 2", "Product 3"],
    total: 320,
    status: "delivered",
    createdAt: "2024-01-18T16:45:00Z"
  },
  {
    _id: "5",
    orderNumber: "ORD005",
    customerName: "David Brown",
    customerEmail: "david.brown@example.com",
    products: ["Product 6"],
    total: 199,
    status: "cancelled",
    createdAt: "2024-01-19T11:30:00Z"
  },
  {
    _id: "6",
    orderNumber: "ORD006",
    customerName: "Emily Davis",
    customerEmail: "emily.d@example.com",
    products: ["Product 1", "Product 2", "Product 3"],
    total: 599,
    status: "pending",
    createdAt: "2024-01-20T08:00:00Z"
  },
];

const Page = () => {
  const [orders, setOrders] = useState(dummyOrders);
  const [editingOrder, setEditingOrder] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const API_BASE_URL = "/api/orders";

  useEffect(() => {
    // API load hooks (kept inactive for standard setup)
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

      const customerName = form.customerName.value.trim();
      const customerEmail = form.customerEmail.value.trim();
      const total = parseFloat(form.total.value);
      const status = form.status.value;

      if (!customerName || !customerEmail || !status) {
        setError("All fields are required");
        return;
      }

      if (isNaN(total) || !isFinite(total) || total <= 0) {
        setError("Please enter a valid total amount");
        return;
      }

      const orderData = {
        _id: editingOrder?._id || `${Date.now()}`,
        orderNumber: editingOrder?.orderNumber || `ORD${String(orders.length + 1).padStart(3, '0')}`,
        customerName,
        customerEmail,
        total,
        status,
        products: editingOrder?.products || [],
        createdAt: editingOrder?.createdAt || new Date().toISOString()
      };

      setOrders((prev) =>
        editingOrder
          ? prev.map((o) => (o._id === editingOrder._id ? orderData : o))
          : [...prev, orderData]
      );

      setEditingOrder(null);
      setIsDialogOpen(false);
      form.reset();
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to save order");
    }
  };

  const handleDelete = async (id) => {
    if (!id) return;
    try {
      setOrders((prev) => prev.filter((o) => o._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="p-6 text-white text-xs font-black uppercase tracking-widest">Loading core transaction records...</div>;
  }

  return (
    <div className="flex flex-col p-6 space-y-6 text-white max-w-7xl mx-auto">
      {/* Title Header */}
      <header className="flex justify-between items-center border-b border-white/5 pb-4">
        <div>
          <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest block mb-1">Transaction Buffers</span>
          <h1 className="text-3xl font-black italic tracking-tighter uppercase">ORDER DECK LEDGER</h1>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) setEditingOrder(null);
        }}>
          <DialogTrigger asChild>
            <button 
              onClick={() => setIsDialogOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-xs font-black uppercase tracking-wider text-white shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] transition-all cursor-pointer border border-blue-400/20"
            >
              <FiPlus size={14} />
              <span>Log Order Transaction</span>
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl bg-[#0c0c0c] border border-white/10 text-white rounded-[2.5rem] p-8 shadow-2xl" aria-describedby="dialog-description">
            <DialogHeader className="border-b border-white/5 pb-4">
              <DialogTitle className="text-xl font-black italic uppercase text-white tracking-tight">
                {editingOrder ? "⚡ Overwrite Order Telemetry" : "➕ Register New Transaction"}
              </DialogTitle>
              <DialogDescription id="dialog-description" className="text-[10px] text-gray-500 font-bold uppercase tracking-wide">
                Modify transaction parameters, billing addresses, or fulfillment states inside the ledger database.
              </DialogDescription>
            </DialogHeader>

            <form
              onSubmit={handleAddOrUpdate}
              className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6 font-medium"
            >
              <div className="space-y-1.5">
                <Label className="text-[10px] font-black uppercase tracking-wider text-gray-400">Customer Name</Label>
                <Input
                  name="customerName"
                  type="text"
                  required
                  defaultValue={editingOrder?.customerName || ""}
                  className="bg-white/5 border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:border-blue-500 transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-black uppercase tracking-wider text-gray-400">Customer Email</Label>
                <Input
                  name="customerEmail"
                  type="email"
                  required
                  defaultValue={editingOrder?.customerEmail || ""}
                  className="bg-white/5 border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:border-blue-500 transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-black uppercase tracking-wider text-gray-400">Total Asset Amount</Label>
                <Input
                  name="total"
                  type="number"
                  step="0.01"
                  min="0.01"
                  max="999999.99"
                  required
                  defaultValue={editingOrder?.total || ""}
                  onKeyDown={(e) =>
                    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                  }
                  className="bg-white/5 border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:border-blue-500 transition-all"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-black uppercase tracking-wider text-gray-400">Fulfillment Status</Label>
                <select
                  name="status"
                  required
                  defaultValue={editingOrder?.status || "pending"}
                  className="flex h-10 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 transition-all uppercase font-bold"
                >
                  <option value="pending" className="bg-[#0c0c0c] text-white">Pending</option>
                  <option value="processing" className="bg-[#0c0c0c] text-white">Processing</option>
                  <option value="shipped" className="bg-[#0c0c0c] text-white">Shipped</option>
                  <option value="delivered" className="bg-[#0c0c0c] text-white">Delivered</option>
                  <option value="cancelled" className="bg-[#0c0c0c] text-white">Cancelled</option>
                </select>
              </div>
              <div className="col-span-2 flex justify-end gap-3 border-t border-white/5 pt-4">
                {editingOrder && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingOrder(null);
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
                  {editingOrder ? "Overwrite Transaction" : "Save Transaction"}
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
      <OrdersTable
        orders={orders}
        onEdit={(order) => {
          setEditingOrder(order);
          setIsDialogOpen(true);
        }}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Page;