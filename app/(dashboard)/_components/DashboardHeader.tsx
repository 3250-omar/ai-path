"use client";

import { Input, Badge, Button, Dropdown } from "antd";
import {
  SearchOutlined,
  BellOutlined,
  MoonOutlined,
  SunOutlined,
  DesktopOutlined,
} from "@ant-design/icons";
import { useTheme } from "../../_components/ThemeProvider";

export default function DashboardHeader() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const themeMenuItems = [
    {
      key: "light",
      icon: <SunOutlined />,
      label: "Light",
      onClick: () => setTheme("light"),
    },
    {
      key: "dark",
      icon: <MoonOutlined />,
      label: "Dark",
      onClick: () => setTheme("dark"),
    },
    {
      key: "system",
      icon: <DesktopOutlined />,
      label: "System",
      onClick: () => setTheme("system"),
    },
  ];

  const getThemeIcon = () => {
    if (resolvedTheme === "dark") return <MoonOutlined />;
    return <SunOutlined />;
  };

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 sticky top-0 z-10 w-full">
      <Input
        prefix={<SearchOutlined className="text-muted-foreground" />}
        placeholder="Search lessons, roadmaps..."
        className="w-64! rounded-lg! bg-muted! border-border! dark:bg-white!"
        size="middle"
      />

      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <Dropdown
          menu={{ items: themeMenuItems, selectedKeys: [theme] }}
          placement="bottomRight"
          trigger={["click"]}
        >
          <Button
            type="text"
            icon={getThemeIcon()}
            className="flex items-center justify-center text-muted-foreground dark:text-white!"
            title="Toggle theme"
          />
        </Dropdown>

        <Badge count={0}>
          <Button
            type="text"
            icon={
              <BellOutlined className="text-xl text-muted-foreground dark:text-white!" />
            }
            className="flex items-center justify-center"
          />
        </Badge>
      </div>
    </header>
  );
}
