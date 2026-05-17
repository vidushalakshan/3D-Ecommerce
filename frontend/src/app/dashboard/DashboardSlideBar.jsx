"use client";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Box, ShoppingCart, Users, Settings, Cpu } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useEffect } from "react";

const items = [
  { title: "Dashboard Home", url: "/dashboard", icon: Home },
  { title: "Products Stage", url: "/dashboard/products", icon: Box },
  { title: "Orders Buffer", url: "/dashboard/orders", icon: ShoppingCart },
  { title: "Client Database", url: "/dashboard/customers", icon: Users },
];

// Isolated Telemetry Component to prevent parent sidebar from re-rendering
const SystemLoadTelemetry = () => {
  const [load, setLoad] = useState(24.5);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoad(Number((20 + Math.random() * 15).toFixed(1)));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-1">
      <div className="flex justify-between text-[7px] font-black uppercase text-gray-500 tracking-wider">
        <span>CYBER SYNC STATUS</span>
        <span className="text-blue-400 font-bold">{load}% LOAD</span>
      </div>
      <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
        <div 
          className="h-full bg-blue-500 transition-all duration-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" 
          style={{ width: `${load}%` }}
        />
      </div>
    </div>
  );
};

export default function DashboardSlideBar() {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <Sidebar 
      collapsible="icon" 
      className="border-r border-white/10 bg-[#050505] text-white transition-all duration-300"
    >
      {/* Header with Glowing Telemetry Logo */}
      <SidebarHeader className="p-6 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center border border-white/20 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
            <Cpu size={20} className="text-white animate-pulse" />
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-black italic tracking-tighter text-white uppercase leading-none">3D TECH CORE</span>
            <span className="text-[8px] font-black tracking-widest text-blue-400 uppercase mt-0.5">Control Grid</span>
          </div>
        </div>
      </SidebarHeader>

      {/* Main Navigation Menu */}
      <SidebarContent className="px-4 py-6">
        <SidebarGroup>
          <SidebarGroupLabel className="text-[9px] font-black uppercase tracking-[0.25em] text-gray-500 mb-3 px-3">
            Main Grid Links
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {items.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      className={`relative w-full rounded-2xl px-4 py-3 h-11 flex items-center gap-3 transition-all duration-300 border ${
                        isActive 
                          ? "bg-blue-600/10 border-blue-500/30 text-white shadow-[0_0_15px_rgba(59,130,246,0.15)] font-bold" 
                          : "bg-transparent border-transparent text-gray-400 hover:text-white hover:bg-white/5 hover:border-white/5"
                      }`}
                    >
                      <Link href={item.url} className="flex items-center w-full gap-3">
                        {/* Active Indicator Line */}
                        {isActive && (
                          <span className="absolute left-0 top-1/4 w-1 h-1/2 bg-blue-500 rounded-full" />
                        )}
                        <item.icon size={18} className={isActive ? "text-blue-400" : "text-gray-400"} />
                        <span className="text-xs uppercase tracking-wider group-data-[collapsible=icon]:hidden">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Operator Session & Telemetry Footer */}
      <SidebarFooter className="p-4 border-t border-white/5 group-data-[collapsible=icon]:p-2">
        <div className="bg-white/5 border border-white/5 rounded-2xl p-3 flex flex-col gap-3 group-data-[collapsible=icon]:hidden">
          {/* User Details */}
          <div className="flex items-center gap-3">
            <Avatar className="w-9 h-9 border border-white/10 shadow-[0_0_10px_rgba(255,255,255,0.05)]">
              <AvatarImage src={user?.imageUrl || "https://github.com/shadcn.png"} />
              <AvatarFallback className="bg-blue-600 text-white font-bold">
                {user?.firstName?.slice(0, 2).toUpperCase() || "OP"}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-black tracking-tight text-white truncate leading-none uppercase">
                {user?.fullName || "Operator"}
              </span>
              <span className="text-[7px] font-black tracking-widest text-green-400 uppercase mt-1 inline-flex items-center gap-1">
                <span className="w-1 h-1 bg-green-500 rounded-full animate-ping" />
                LVL 3 OPERATOR
              </span>
            </div>
          </div>

          {/* Telemetry Heat Load */}
          <SystemLoadTelemetry />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}