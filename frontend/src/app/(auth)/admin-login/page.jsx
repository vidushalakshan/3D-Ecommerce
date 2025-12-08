import AdminLoginForm from "@/components/auth/AdminLoginForm";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function AdminLoginPage() {
  return (
    <>
      <SignedIn>
        {redirect("/admin-dashboard")}
      </SignedIn>
      <SignedOut>
        <AdminLoginForm />
      </SignedOut>
    </>
  );
}