"use client";

import { Input, Badge, Button } from "antd";
import { SearchOutlined, BellOutlined } from "@ant-design/icons";

export default function DashboardHeader() {
  return (
    <header className="h-16 bg-white border-b border-border flex items-center justify-between px-6 sticky top-0 z-10 w-full">
      <Input
        prefix={<SearchOutlined className="text-muted-foreground" />}
        placeholder="Search lessons, roadmaps..."
        className="w-64! rounded-lg! bg-slate-50!"
        size="middle"
      />

      <div className="flex items-center gap-4">
        <Badge count={0}>
          <Button
            type="text"
            icon={<BellOutlined className="text-xl text-muted-foreground" />}
            className="flex items-center justify-center"
          />
        </Badge>
      </div>
    </header>
  );
}
