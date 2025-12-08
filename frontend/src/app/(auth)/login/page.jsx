// src/app/(auth)/login/page.jsx
import LoginForm from "@/components/auth/LoginForm";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { isSuperAdmin } from "@/lib/clerk";

export default async function LoginPage() {
  const user = await currentUser();

  if (user) {
    if (isSuperAdmin(user.primaryEmailAddress?.emailAddress)) {
      redirect("/admin-dashboard");
    } else {
      redirect("/"); // ← Normal users go home
    }
  }

  return <LoginForm />;
}