import React from "react";
import DashboardSidebar from "./_components/DashboardSidebar";
import DashboardHeader from "./_components/DashboardHeader";
import AIChatFloat from "../_components/AIChatFloat";
import { getUser } from "../(auth)/actions";
import { redirect } from "next/navigation";
import UserProvider from "../_components/UserProvider";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const user = await getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <UserProvider user={user}>
      <div className="min-h-screen flex bg-slate-50/50">
        {/* Sidebar */}
        <DashboardSidebar />

        {/* Main Content */}
        <div className="flex-1 ml-[220px]">
          {/* Header */}
          <DashboardHeader />

          {/* Page Content */}
          <main className="p-6">{children}</main>
        </div>

        {/* Floating AI Tutor */}
        <AIChatFloat />
      </div>
    </UserProvider>
  );
}
