// app/dashboard/layout.jsx
import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSlideBar from "./DashboardSlideBar";
import DashboardNav from "./DashboardNav";

export default function DashboardLayout({ children }) {
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
