// app/dashboard/layout.jsx
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSlideBar from "./DashboardSlideBar";
import DashboardNav from "./DashboardNav";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { isAdminEmail } from "@/lib/clerk";

export default async function DashboardLayout({ children }) {
  const user = await currentUser();

  if (!user || !isAdminEmail(user?.primaryEmailAddress?.emailAddress)) {
    redirect("/");
  }

  return (
    <div className="flex">
      <SidebarProvider>
        <DashboardSlideBar />
        <main className="w-full">
          <DashboardNav />
          <div className="p-4">{children}</div>
        </main>
      </SidebarProvider>
    </div>
  );
}
