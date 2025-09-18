import DashboardNav from "@/app/dashboard/DashboardNav";
import DashboardSlideBar from "@/app/dashboard/DashboardSlideBar";
import Homepage from "@/app/dashboard/Homepage";
import { SidebarProvider } from "@/components/ui/sidebar";
import React, { Children } from "react";

const AdmonDashboard = ({ Children }) => {
  return (
    <div className="flex">
      <SidebarProvider>
        <DashboardSlideBar />
        <main className="w-full">
          <DashboardNav />
          <Homepage />
          <div className="p-4">{Children}</div>
        </main>
      </SidebarProvider>
    </div>
  );
};

export default AdmonDashboard;