"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FiEdit2, FiTrash2, FiPackage, FiUser, FiCalendar } from "react-icons/fi";
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
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="overflow-y-scroll bg-white dark:bg-gray-800 rounded-xl h-[500px] shadow-md">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Order ID
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Customer
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Products
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>

        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <tr
                key={order._id || `order-${index}`}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <FiPackage className="mr-2 text-gray-400" />
                    <span className="font-medium text-gray-900 dark:text-white">
                      #{order.orderNumber || order._id?.slice(-6)}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <FiUser className="mr-2 text-gray-400" />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {order.customerName}
                      </div>
                      <div className="text-sm text-gray-500">{order.customerEmail}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {order.products?.length || 0} item(s)
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                  {formatCurrency(order.total)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <FiCalendar className="mr-2 text-gray-400" />
                    {formatDate(order.createdAt || new Date())}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => onEdit(order)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <FiEdit2 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => onDelete(order._id)}
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
                colSpan="7"
                className="px-6 py-8 text-center text-gray-500 dark:text-gray-400"
              >
                No orders found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

// Dummy data for orders
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
    // Comment out API fetch for now, using dummy data
    /*
    const fetchOrders = async () => {
      try {
        const res = await fetch(API_BASE_URL);
        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        setError("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
    */
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

      // For dummy data, just update state directly (no API call)
      setOrders((prev) =>
        editingOrder
          ? prev.map((o) => (o._id === editingOrder._id ? orderData : o))
          : [...prev, orderData]
      );

      /* Uncomment when API is ready:
      const method = editingOrder ? "PUT" : "POST";
      const url = editingOrder
        ? `${API_BASE_URL}/${editingOrder._id}`
        : API_BASE_URL;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const responseData = await res.json();
      if (!res.ok) {
        throw new Error(responseData.error || "Failed to save order");
      }
      const saved = responseData.order || responseData;

      setOrders((prev) =>
        editingOrder
          ? prev.map((o) => (o._id === editingOrder._id ? saved : o))
          : [...prev, saved]
      );
      */

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
      // For dummy data, just update state directly (no API call)
      setOrders((prev) => prev.filter((o) => o._id !== id));
      
      /* Uncomment when API is ready:
      const res = await fetch(`${API_BASE_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setOrders((prev) => prev.filter((o) => o._id !== id));
      */
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="flex flex-col p-6">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl" aria-describedby="dialog-description">
          <DialogHeader>
            <DialogTitle>
              {editingOrder ? "Edit Order" : "Add Order"}
            </DialogTitle>
            <DialogDescription id="dialog-description">
              Fill in the order details below.
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={handleAddOrUpdate}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4"
          >
            <div>
              <Label>Customer Name</Label>
              <Input
                name="customerName"
                type="text"
                required
                defaultValue={editingOrder?.customerName || ""}
              />
            </div>
            <div>
              <Label>Customer Email</Label>
              <Input
                name="customerEmail"
                type="email"
                required
                defaultValue={editingOrder?.customerEmail || ""}
              />
            </div>
            <div>
              <Label>Total Amount</Label>
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
              />
            </div>
            <div>
              <Label>Status</Label>
              <select
                name="status"
                required
                defaultValue={editingOrder?.status || "pending"}
                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div className="col-span-2 flex justify-end gap-3">
              {editingOrder && (
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => {
                    setEditingOrder(null);
                    setIsDialogOpen(false);
                  }}
                >
                  Cancel
                </Button>
              )}
              <Button variant="bgBlack" type="submit">
                {editingOrder ? "Update" : "Save"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

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