"use client";

import { LogOut, Moon, Settings, User, Sun, ArrowLeft, Globe } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useUser, useClerk } from "@clerk/nextjs";

const DashboardNav = () => {
  const { setTheme } = useTheme();
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <nav className="p-4 flex items-center justify-between border-b border-white/5 bg-[#050505]/40 backdrop-blur-xl sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="text-gray-400 hover:text-white transition-all bg-white/5 border border-white/5 rounded-xl p-2.5 h-10 w-10 flex items-center justify-center cursor-pointer" />
        <Link 
          href="/" 
          className="hidden sm:inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white transition-all bg-white/5 border border-white/5 px-4 py-2.5 rounded-xl"
        >
          <ArrowLeft size={12} className="text-blue-400" />
          <span>Return to Storefront</span>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        {/* Theme Controller */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              size="icon"
              className="bg-white/5 border border-white/5 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer h-10 w-10"
            >
              <Sun className="h-[1.1rem] w-[1.1rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-[1.1rem] w-[1.1rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-[#0c0c0c] border border-white/10 text-white rounded-2xl p-1.5 shadow-2xl">
            <DropdownMenuItem onClick={() => setTheme("light")} className="rounded-xl cursor-pointer hover:bg-white/5 text-xs">
              System Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")} className="rounded-xl cursor-pointer hover:bg-white/5 text-xs">
              System Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")} className="rounded-xl cursor-pointer hover:bg-white/5 text-xs">
              Network Auto
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Operator Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <Avatar className="w-10 h-10 border border-white/10 hover:border-blue-500/50 transition-all shadow-[0_0_15px_rgba(255,255,255,0.05)] cursor-pointer">
              <AvatarImage src={user?.imageUrl || "https://github.com/shadcn.png"} />
              <AvatarFallback className="bg-blue-600 text-white font-bold text-xs uppercase">
                {user?.firstName?.slice(0, 2) || "OP"}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            sideOffset={10} 
            align="end"
            className="bg-[#0c0c0c] border border-white/10 text-white rounded-2xl p-2 w-56 shadow-2xl"
          >
            <DropdownMenuLabel className="flex flex-col gap-1 px-2.5 py-2">
              <span className="text-xs font-black tracking-tight text-white leading-none uppercase">{user?.fullName || "Operator"}</span>
              <span className="text-[8px] font-bold text-gray-500 tracking-wider truncate">{user?.primaryEmailAddress?.emailAddress}</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/5 my-1.5" />
            <DropdownMenuItem className="rounded-xl cursor-pointer hover:bg-white/5 text-xs px-2.5 py-2 flex items-center gap-2">
              <User className="h-[1.1rem] w-[1.1rem] text-gray-400" />
              <span>Operator Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-xl cursor-pointer hover:bg-white/5 text-xs px-2.5 py-2 flex items-center gap-2">
              <Settings className="h-[1.1rem] w-[1.1rem] text-gray-400" />
              <span>Grid Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/5 my-1.5" />
            <DropdownMenuItem 
              onClick={() => signOut({ redirectUrl: '/' })}
              className="rounded-xl cursor-pointer bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all text-xs px-2.5 py-2 flex items-center gap-2 font-bold"
            >
              <LogOut className="h-[1.1rem] w-[1.1rem]" />
              <span>Log out Session</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default DashboardNav;
