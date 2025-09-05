import DashboardNav from "@/components/layout/dashboard/DashboardNav";
import DashboardSlideBar from "@/components/layout/dashboard/DashboardSlideBar";
import React, { Children } from "react";

const AdmonDashboard = ({Children}) => {
  return (
    <div className="flex">
        <DashboardSlideBar />
      <main className="w-full"> 
        <DashboardNav />
        <div className="p-4">
            {Children}
        </div>
      </main>
    </div>
  );
};

export default AdmonDashboard;
