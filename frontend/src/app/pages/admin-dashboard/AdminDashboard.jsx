import DashboardNav from "@/components/layout/dashboard/DashboardNav";
import DashboardSlideBar from "@/components/layout/dashboard/DashboardSlideBar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React, { Children } from "react";

const AdmonDashboard = ({ Children }) => {
  return (
    <div className="flex">
      <SidebarProvider>
        <DashboardSlideBar />
        <main className="w-full">
          <DashboardNav />
          <div className="p-4">{Children}</div>
        </main>
      </SidebarProvider>
    </div>
  );
};

export default AdmonDashboard;
