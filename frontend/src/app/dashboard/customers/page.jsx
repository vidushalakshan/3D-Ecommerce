"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/common/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FiTrash2, FiMail, FiUser, FiPhone, FiMapPin, FiPlus } from "react-icons/fi";
import { HiSparkles, HiTrash, HiEnvelope, HiPhone, HiMapPin, HiUserPlus } from "react-icons/hi2";
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
    name: "Nimal Silva",
    email: "nimal@gmail.com",
    phone: "+94 475854754",
    address: "123 Main St colombo, SriLanka 10001"
  },
  {
    _id: "2",
    name: "Kamal Perera",
    email: "kamal@gmail.com",
    phone: "+94 475854235",
    address: "456 Galle Rd, Colombo, SriLanka "
  },
  {
    _id: "3",
    name: "Vidusha Lakshan",
    email: "vidusha@gmail.com",
    phone: "+94 4234352343",
    address: "789 Kandy St, Kandy"
  },
];

// CustomersTable Component
const CustomersTable = ({ customers, onDelete }) => {
  return (
    <div className="overflow-y-auto bg-black/40 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] h-[550px] shadow-2xl no-scrollbar relative p-6">
      <table className="min-w-full divide-y divide-white/5 text-left">
        <thead>
          <tr className="border-b border-white/10">
            <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
              Client Operator
            </th>
            <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
              Contact Telemetry
            </th>
            <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
              Physical Location
            </th>
            <th className="px-6 py-4 text-right text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
              Execution Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5 bg-transparent">
          {customers && customers.length > 0 ? (
            customers.map((customer) => (
              <tr
                key={customer._id}
                className="hover:bg-white/5 transition-all duration-300 group"
              >
                {/* Customer Name */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 flex items-center justify-center rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold uppercase text-xs shadow-md">
                      {customer.name?.slice(0, 2) || "CL"}
                    </div>
                    <div>
                      <div className="text-sm font-black text-white italic tracking-tighter uppercase">
                        {customer.name}
                      </div>
                      <span className="text-[7px] font-black tracking-widest text-gray-500 block uppercase mt-0.5">
                        OPERATOR ID: #{customer._id}
                      </span>
                    </div>
                  </div>
                </td>

                {/* Contact Info */}
                <td className="px-6 py-4">
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center text-xs text-gray-300 font-medium">
                      <HiEnvelope className="text-blue-400 mr-2" size={13} />
                      {customer.email}
                    </div>
                    {customer.phone && (
                      <div className="flex items-center text-xs text-gray-400 font-medium">
                        <HiPhone className="text-gray-500 mr-2" size={13} />
                        {customer.phone}
                      </div>
                    )}
                  </div>
                </td>

                {/* Address */}
                <td className="px-6 py-4 text-xs text-gray-400 max-w-xs">
                  <div className="flex items-start">
                    <HiMapPin className="text-gray-500 mr-2 mt-0.5 flex-shrink-0" size={13} />
                    <span className="line-clamp-2">{customer.address}</span>
                  </div>
                </td>

                {/* Actions */}
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => onDelete(customer._id)}
                      className="p-2 rounded-xl bg-red-500/10 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/20 transition-all cursor-pointer"
                      title="Delete Customer"
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
                colSpan="4"
                className="px-6 py-12 text-center text-xs font-bold text-gray-500 uppercase tracking-widest"
              >
                No client database records detected inside system memory.
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
    // API load hooks (kept inactive for standard setup)
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
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to add customer");
    }
  };

  const handleDelete = (id) => {
    if (!id) return;
    try {
      setCustomers(customers.filter((c) => c._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="p-6 text-white text-xs font-black uppercase tracking-widest">Loading core client indexes...</div>;
  }

  return (
    <div className="flex flex-col p-6 space-y-6 text-white max-w-7xl mx-auto">
      {/* Title Header */}
      <header className="flex justify-between items-center border-b border-white/5 pb-4">
        <div>
          <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest block mb-1">Grid Records</span>
          <h1 className="text-3xl font-black italic tracking-tighter uppercase">CLIENT DATABASE LEDGER</h1>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <button 
              onClick={() => setIsDialogOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-xs font-black uppercase tracking-wider text-white shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] transition-all cursor-pointer border border-blue-400/20"
            >
              <HiUserPlus size={14} />
              <span>Register New Client</span>
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-lg bg-[#0c0c0c] border border-white/10 text-white rounded-[2.5rem] p-8 shadow-2xl" aria-describedby="dialog-description">
            <DialogHeader className="border-b border-white/5 pb-4">
              <DialogTitle className="text-xl font-black italic uppercase text-white tracking-tight">Add New Client Account</DialogTitle>
              <DialogDescription id="dialog-description" className="text-[10px] text-gray-500 font-bold uppercase tracking-wide">
                Register new client credentials and contact details inside the secure system vault.
              </DialogDescription>
            </DialogHeader>
            <form
              onSubmit={handleAddCustomer}
              className="grid grid-cols-1 gap-5 mt-6 font-medium"
            >
              <div className="space-y-1.5">
                <Label className="text-[10px] font-black uppercase tracking-wider text-gray-400">Customer Name</Label>
                <Input name="name" type="text" placeholder="John Doe" required className="bg-white/5 border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:border-blue-500 transition-all" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-black uppercase tracking-wider text-gray-400">Email Address</Label>
                <Input name="email" type="email" placeholder="john@example.com" required className="bg-white/5 border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:border-blue-500 transition-all" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-black uppercase tracking-wider text-gray-400">Phone Telemetry (optional)</Label>
                <Input name="phone" type="tel" placeholder="+1 (555) 123-4567" className="bg-white/5 border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:border-blue-500 transition-all" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-black uppercase tracking-wider text-gray-400">Physical Address (optional)</Label>
                <Input name="address" type="text" placeholder="123 Main St, City, State ZIP" className="bg-white/5 border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:border-blue-500 transition-all" />
              </div>
              <div className="flex justify-end gap-3 border-t border-white/5 pt-4">
                <button
                  type="button"
                  onClick={() => setIsDialogOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-white/10 text-xs font-bold text-gray-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
                >
                  Abort
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-black uppercase tracking-wider text-white shadow-lg transition-all cursor-pointer"
                >
                  Register Client
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

      {/* Customers Table */}
      <CustomersTable customers={customers} onDelete={handleDelete} />
    </div>
  );
};

export default Page;