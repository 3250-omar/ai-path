"use client";

import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Avatar,
  Divider,
  List,
  Switch,
  message,
  Popconfirm,
  Spin,
  Tag,
} from "antd";
import {
  UserOutlined,
  SettingOutlined,
  DeleteOutlined,
  LogoutOutlined,
  BookOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import type { LearningPath } from "@/types/learning-path";
import { signOut } from "@/app/(auth)/actions";

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [learningPath, setLearningPath] = useState<LearningPath | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch user
      const userRes = await fetch("/api/user");
      const userData = await userRes.json();
      if (userData.user) {
        setUser(userData.user);
      }

      // Fetch active path
      const pathRes = await fetch("/api/learning-path/active");
      const pathData = await pathRes.json();
      if (pathData.success && pathData.path) {
        setLearningPath(pathData.path);
      }
    } catch (error) {
      console.error("Failed to fetch settings data:", error);
      message.error("Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePath = async () => {
    try {
      setDeleting(true);
      const res = await fetch("/api/learning-path/active", {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        message.success("Learning path deleted successfully");
        setLearningPath(null);
        router.refresh(); // Refresh to update sidebar if needed
        // Redirect to onboarding or dashboard
        router.push("/onboarding");
      } else {
        message.error(data.error || "Failed to delete learning path");
      }
    } catch (error) {
      console.error("Delete error:", error);
      message.error("An error occurred");
    } finally {
      setDeleting(false);
    }
  };

  const handleSignOut = async () => {
    // This should ideally call a signout API or Supabase client
    await signOut();
  };
  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-foreground mb-6">Settings</h1>

      {/* Profile Section */}
      <Card
        title={
          <span className="font-semibold">
            <UserOutlined className="mr-2" /> Profile
          </span>
        }
        className="rounded-xl! border-border!"
      >
        <div className="flex items-center gap-4">
          <Avatar
            size={64}
            icon={<UserOutlined />}
            className="bg-primary/10 text-primary"
          />
          <div>
            <h3 className="text-lg font-medium text-foreground">User</h3>
            <p className="text-muted-foreground">
              {user?.email || "No email found"}
            </p>
          </div>
        </div>
      </Card>

      {/* Learning Path Management */}
      <Card
        title={
          <span className="font-semibold">
            <BookOutlined className="mr-2" /> Learning Path
          </span>
        }
        className="rounded-xl! border-border!"
      >
        {learningPath ? (
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-lg">{learningPath.title}</h3>
                <p className="text-muted-foreground">
                  {learningPath.description}
                </p>
                <div className="mt-2 flex gap-2">
                  <Tag color="blue">{learningPath.difficulty}</Tag>
                  <Tag color="green">
                    {learningPath.estimatedDurationHours} hours
                  </Tag>
                </div>
              </div>
            </div>

            <Divider />

            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium text-red-500">Danger Zone</h4>
                <p className="text-sm text-muted-foreground">
                  Deleting your learning path will remove all progress and
                  history. This action cannot be undone.
                </p>
              </div>
              <Popconfirm
                title="Delete Learning Path?"
                description="Are you sure you want to delete your current learning path and progress?"
                onConfirm={handleDeletePath}
                okText="Yes, Delete"
                cancelText="Cancel"
                okButtonProps={{ danger: true, loading: deleting }}
              >
                <Button
                  danger
                  icon={<DeleteOutlined />}
                  className="rounded-lg!"
                >
                  Reset Progress
                </Button>
              </Popconfirm>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">
              No active learning path found.
            </p>
            <Button type="primary" onClick={() => router.push("/onboarding")}>
              Create New Path
            </Button>
          </div>
        )}
      </Card>

      {/* Preferences Section (Placeholder) */}
      <Card
        title={
          <span className="font-semibold">
            <SettingOutlined className="mr-2" /> Preferences
          </span>
        }
        className="rounded-xl! border-border!"
      >
        <List>
          <List.Item actions={[<Switch key="theme" defaultChecked disabled />]}>
            <List.Item.Meta
              title="Dark Mode"
              description="Toggle dark mode theme (Coming soon)"
            />
          </List.Item>
          <List.Item actions={[<Switch key="notifications" defaultChecked />]}>
            <List.Item.Meta
              title="Email Notifications"
              description="Receive updates about your progress"
            />
          </List.Item>
        </List>
      </Card>

      <div className="flex justify-center mt-8">
        <Button
          // disabled
          icon={<LogoutOutlined />}
          className="text-muted-foreground"
          onClick={handleSignOut}
        >
          Sign Out
        </Button>
      </div>
      <p className="text-center text-xs text-muted-foreground mt-2">
        Version 0.1.0
      </p>
    </div>
  );
}
