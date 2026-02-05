"use client";

import { Card } from "antd";
import {
  UserOutlined,
  BookOutlined,
  LockOutlined,
  RightOutlined,
} from "@ant-design/icons";

// Settings sections
const settingsSections = [
  {
    icon: <UserOutlined />,
    title: "Account Settings",
    description: "Manage your account preferences and profile information.",
    href: "/settings/account",
  },
  {
    icon: <BookOutlined />,
    title: "Learning Preferences",
    description: "Customize your learning experience and notifications.",
    href: "/settings/preferences",
  },
  {
    icon: <LockOutlined />,
    title: "Privacy & Security",
    description: "Control your data and security settings.",
    href: "/settings/privacy",
  },
];

export default function SettingsPage() {
  return (
    <div className="max-w-2xl">
      {/* Header */}
      <h1 className="text-2xl font-bold text-foreground mb-6">Settings</h1>

      {/* Settings Sections */}
      <div className="space-y-4">
        {settingsSections.map((section, index) => (
          <Card
            key={index}
            className="!rounded-xl !border-border hover:!shadow-md transition-shadow cursor-pointer"
            styles={{ body: { padding: 24 } }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-foreground text-lg">
                  {section.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    {section.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {section.description}
                  </p>
                </div>
              </div>
              <RightOutlined className="text-muted-foreground" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
