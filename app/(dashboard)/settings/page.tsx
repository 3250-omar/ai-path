"use client";

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
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { signOut } from "@/app/(auth)/actions";
import { useUser, useActiveLearningPath } from "@/app/hooks/useQueries";
import { useDeleteActivePath } from "@/app/hooks/useMutations";

export default function SettingsPage() {
  const router = useRouter();

  const { data: user, isLoading: userLoading } = useUser();
  const { data: learningPath, isLoading: pathLoading } =
    useActiveLearningPath();
  const deletePath = useDeleteActivePath();

  const handleSignOut = async () => {
    await signOut();
  };

  const handleDeletePath = async () => {
    try {
      await deletePath.mutateAsync();
      message.success("Learning path deleted successfully");
      router.push("/onboarding");
    } catch (err) {
      console.error("Delete error:", err);
      message.error("Failed to delete learning path");
    }
  };

  if (userLoading || pathLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6!">
      <h1 className="text-2xl font-bold text-foreground mb-6">Settings</h1>

      {/* Profile Section */}
      <Card
        title={
          <span className="font-semibold text-foreground">
            <UserOutlined className="mr-2 text-foreground" /> Profile
          </span>
        }
        className="bg-card! rounded-xl! border-border!"
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
          <span className="font-semibold text-foreground">
            <BookOutlined className="mr-2 text-foreground" /> Learning Path
          </span>
        }
        className="bg-card! rounded-xl! border-border!"
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
                okButtonProps={{ danger: true, loading: deletePath.isPending }}
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
          <span className="font-semibold text-foreground">
            <SettingOutlined className="mr-2 text-foreground" /> Preferences
          </span>
        }
        className="bg-card! rounded-xl! border-border! "
      >
        <List>
          {/* <List.Item
            actions={[<Switch key="theme" defaultChecked={false} disabled />]}
          >
            <List.Item.Meta
              title="Dark Mode"
              description="Use the toggle in the top header to switch themes"
            />
          </List.Item> */}
          <List.Item
            actions={[<Switch key="notifications" defaultChecked />]}
            className="dark:text-white!"
          >
            <List.Item.Meta
              title="Email Notifications"
              description="Receive updates about your progress"
            />
          </List.Item>
        </List>
      </Card>

      <div className="flex justify-center mt-8">
        <Button
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
