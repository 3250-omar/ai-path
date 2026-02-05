"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar } from "antd";
import {
  HomeOutlined,
  NodeIndexOutlined,
  BookOutlined,
  FormOutlined,
  LineChartOutlined,
  MessageOutlined,
  SettingOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import PathAILogo from "../../_components/PathAILogo";
import { signOut } from "../../(auth)/actions";
import { User } from "@supabase/supabase-js";

interface DashboardSidebarProps {
  user: User | null;
}

const menuItems = [
  { icon: <HomeOutlined />, label: "Dashboard", href: "/dashboard" },
  { icon: <NodeIndexOutlined />, label: "Roadmap", href: "/roadmap" },
  { icon: <BookOutlined />, label: "Lessons", href: "/lessons" },
  { icon: <FormOutlined />, label: "Quizzes", href: "/quizzes" },
  { icon: <LineChartOutlined />, label: "Progress", href: "/progress" },
  { icon: <MessageOutlined />, label: "AI Chat", href: "/ai-chat" },
  { icon: <SettingOutlined />, label: "Settings", href: "/settings" },
];

export default function DashboardSidebar({ user }: DashboardSidebarProps) {
  const pathname = usePathname();

  const handleSignOut = async () => {
    await signOut();
  };

  const displayName =
    user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User";
  const displayEmail = user?.email || "";
  const initial = displayName[0]?.toUpperCase() || "U";

  return (
    <aside className="w-[220px] bg-sidebar text-sidebar-foreground flex flex-col fixed h-screen z-20">
      {/* Logo */}
      <div className="p-5 border-b border-sidebar-border">
        <Link href="/dashboard">
          <PathAILogo size={32} textClassName="text-lg font-bold text-white" />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-5 py-3 mx-3 rounded-lg transition-colors text-sm font-medium ${
                isActive
                  ? "bg-primary text-white"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-white"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-sidebar-accent transition-colors">
          <Avatar
            size={36}
            style={{
              background: "linear-gradient(135deg, #4f46e5 0%, #2563eb 100%)",
            }}
            icon={<UserOutlined />}
          >
            {initial}
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {displayName}
            </p>
            <p className="text-xs text-sidebar-foreground/60 truncate">
              {displayEmail}
            </p>
          </div>
          <button
            onClick={handleSignOut}
            className="text-sidebar-foreground/60 hover:text-white transition-colors cursor-pointer border-none bg-transparent p-1"
            title="Sign out"
          >
            <LogoutOutlined />
          </button>
        </div>
      </div>
    </aside>
  );
}
