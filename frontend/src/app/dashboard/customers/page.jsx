"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/common/Button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { FiEdit2, FiTrash2, FiMail, FiUser } from "react-icons/fi";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";

// ✅ UsersTable Component
const UsersTable = ({ users, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl shadow-md">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {users && users.length > 0 ? (
            users.map((user) => (
              <tr
                key={user._id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                {/* Name */}
                <td className="px-6 py-4 whitespace-nowrap flex items-center space-x-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-600">
                    <FiUser className="text-gray-600 dark:text-gray-300" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {user.name}
                    </div>
                  </div>
                </td>

                {/* Email */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <FiMail className="mr-1.5" />
                    {user.email}
                  </div>
                </td>

                {/* Actions */}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => onEdit(user)}
                      className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300"
                      title="Edit"
                    >
                      <FiEdit2 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => onDelete(user._id)}
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
                colSpan="3"
                className="px-6 py-8 text-center text-gray-500 dark:text-gray-400"
              >
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

// ✅ Main DashboardUser Component
const DashboardUser = () => {
  const [users, setUsers] = useState([]);

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/auth/register");
        const data = await res.json();
        setUsers(Array.isArray(data.users) ? data.users : []);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    console.log("Edit user:", user);
  };

  const handleDelete = (id) => {
    setUsers(users.filter((u) => u._id !== id));
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    const form = e.target;
    const newUser = {
      _id: Date.now().toString(),
      name: form.name.value,
      email: form.email.value,
    };
    setUsers([...users, newUser]);
    form.reset();
  };

  return (
    <div className="flex flex-col p-6">
      <h1 className="text-2xl font-bold mb-4">Users</h1>

      {/* ✅ Add User Modal */}
      <Dialog className="relative">
        <DialogTrigger asChild>
          <Button
            variant="bgBlack"
            size="medium"
            className="mr-5 mb-5 w-fit hover:cursor-pointer"
          >
            + Add User
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={handleAddUser}
            className="grid grid-cols-1 gap-6 mt-4"
          >
            <div className="mb-4">
              <Label>User Name</Label>
              <Input name="name" type="text" placeholder="User Name" required />
            </div>
            <div className="mb-4">
              <Label>Email</Label>
              <Input name="email" type="email" placeholder="Email" required />
            </div>
            <div className="col-span-2 flex justify-end">
              <Button
                variant="bgBlack"
                size="medium"
                type="submit"
                className="hover:cursor-pointer"
              >
                Save User
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* ✅ Users Table */}
      <UsersTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default DashboardUser;
