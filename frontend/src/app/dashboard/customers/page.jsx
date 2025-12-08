"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FiTrash2, FiMail, FiUser, FiPhone, FiMapPin } from "react-icons/fi";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";

// Dummy customer data
const dummyCustomers = [
  {
    _id: "1",
    name: "Nimal",
    email: "nimal@gmail.com",
    phone: "+94 475854754",
    address: "123 Main St colombo, SriLanka 10001"
  },
  {
    _id: "2",
    name: "Kamal",
    email: "kamal@gmail.com",
    phone: "+94 475854235",
    address: "456 Galle Rd, Colombo, SriLanka "
  },
  {
    _id: "3",
    name: "Vidusha",
    email: "vidusha@gmail.com",
    phone: "+94 4234352343",
    address: "789 Kandy St, Kandy"
  },
];

// CustomersTable Component
const CustomersTable = ({ customers, onDelete }) => {
  return (
    <div className="overflow-y-scroll bg-white dark:bg-gray-800 rounded-xl h-[500px] shadow-md">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Customer
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Contact
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Address
            </th>
            <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {customers && customers.length > 0 ? (
            customers.map((customer) => (
              <tr
                key={customer._id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                {/* Customer Name */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900">
                      <FiUser className="text-indigo-600 dark:text-indigo-300" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {customer.name}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Contact Info */}
                <td className="px-6 py-4">
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <FiMail className="mr-2" />
                      {customer.email}
                    </div>
                    {customer.phone && (
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <FiPhone className="mr-2" />
                        {customer.phone}
                      </div>
                    )}
                  </div>
                </td>

                {/* Address */}
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 max-w-xs">
                  <div className="flex items-start">
                    <FiMapPin className="mr-2 mt-0.5 flex-shrink-0" />
                    <span className="line-clamp-2">{customer.address}</span>
                  </div>
                </td>

                {/* Actions */}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => onDelete(customer._id)}
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
                colSpan="4"
                className="px-6 py-8 text-center text-gray-500 dark:text-gray-400"
              >
                No customers found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

// Main Page Component
const Page = () => {
  const [customers, setCustomers] = useState(dummyCustomers);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const API_BASE_URL = "/api/customers";

  useEffect(() => {
    // Comment out API fetch for now, using dummy data
    /*
    const fetchCustomers = async () => {
      try {
        const res = await fetch(API_BASE_URL);
        if (!res.ok) throw new Error("Failed to fetch customers");
        const data = await res.json();
        setCustomers(data);
      } catch (err) {
        setError("Failed to load customers");
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
    */
  }, []);

  const handleAddCustomer = (e) => {
    e.preventDefault();
    const form = e.target;

    try {
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const phone = form.phone.value.trim();
      const address = form.address.value.trim();

      if (!name || !email) {
        setError("Name and email are required");
        return;
      }

      const newCustomer = {
        _id: Date.now().toString(),
        name,
        email,
        phone,
        address
      };

      setCustomers([...customers, newCustomer]);
      setIsDialogOpen(false);
      form.reset();
      setError(null);

      /* Uncomment when API is ready:
      const res = await fetch(API_BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCustomer),
      });

      const responseData = await res.json();
      if (!res.ok) {
        throw new Error(responseData.error || "Failed to add customer");
      }
      const saved = responseData.customer || responseData;
      setCustomers([...customers, saved]);
      */
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to add customer");
    }
  };

  const handleDelete = (id) => {
    if (!id) return;
    try {
      // For dummy data, just update state directly (no API call)
      setCustomers(customers.filter((c) => c._id !== id));

      /* Uncomment when API is ready:
      const res = await fetch(`${API_BASE_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      setCustomers(customers.filter((c) => c._id !== id));
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
      <h1 className="text-2xl font-bold mb-4">Customers</h1>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {/* Add Customer Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg" aria-describedby="dialog-description">
          <DialogHeader>
            <DialogTitle>Add New Customer</DialogTitle>
            <DialogDescription id="dialog-description">
              Fill in the customer details below.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={handleAddCustomer}
            className="grid grid-cols-1 gap-6 mt-4"
          >
            <div>
              <Label>Customer Name</Label>
              <Input name="name" type="text" placeholder="John Doe" required />
            </div>
            <div>
              <Label>Email</Label>
              <Input name="email" type="email" placeholder="john@example.com" required />
            </div>
            <div>
              <Label>Phone (optional)</Label>
              <Input name="phone" type="tel" placeholder="+1 (555) 123-4567" />
            </div>
            <div>
              <Label>Address (optional)</Label>
              <Input name="address" type="text" placeholder="123 Main St, City, State ZIP" />
            </div>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                type="button"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button variant="bgBlack" type="submit">
                Save Customer
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Customers Table */}
      <CustomersTable customers={customers} onDelete={handleDelete} />
    </div>
  );
};

export default Page;