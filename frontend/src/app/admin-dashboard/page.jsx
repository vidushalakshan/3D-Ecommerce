import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { isSuperAdmin } from "@/lib/clerk";

export default async function AdminDashboard() {
  const user = await currentUser();
  if (!user || !isSuperAdmin(user.primaryEmailAddress?.emailAddress)) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-black text-white p-10">
      <h1 className="text-6xl font-bold">SUPER ADMIN</h1>
      <p className="text-2xl mt-4">Welcome, {user.firstName}!</p>
      <p className="mt-8">Only YOU can see this.</p>
    </div>
  );
}