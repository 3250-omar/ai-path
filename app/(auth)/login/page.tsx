"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Input, Checkbox, Divider, Form, message } from "antd";
import {
  MailOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  GoogleOutlined,
} from "@ant-design/icons";
import { signIn, signInWithGoogle } from "../actions";

export default function LoginPage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("email", values.email);
      formData.append("password", values.password);

      const result = await signIn(formData);

      if (result?.error) {
        message.error(result.error);
      }
    } catch {
      message.error("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      const result = await signInWithGoogle();
      if (result?.error) {
        message.error(result.error);
      }
    } catch {
      message.error("Failed to sign in with Google");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground mb-2">Login</h1>
      <p className="text-muted-foreground mb-8">
        Enter your credentials to access your account
      </p>

      <Form form={form} layout="vertical" onFinish={onFinish} size="large">
        {/* Email */}
        <Form.Item
          name="email"
          label={<span className="font-medium">Email</span>}
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input
            prefix={<MailOutlined className="text-muted-foreground" />}
            placeholder="omar@example.com"
            className="rounded-lg! bg-input-background!"
          />
        </Form.Item>

        {/* Password */}
        <Form.Item
          name="password"
          label={<span className="font-medium">Password</span>}
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input.Password
            prefix={<LockOutlined className="text-muted-foreground" />}
            placeholder="••••••••"
            className="rounded-lg! bg-input-background!"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>

        {/* Remember & Forgot */}
        <div className="flex items-center justify-between mb-6">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Link
            href="/forgot-password"
            className="text-primary hover:underline text-sm font-medium"
          >
            Forgot password?
          </Link>
        </div>

        {/* Submit Button */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
            className="h-12! rounded-lg! font-medium! bg-primary!"
          >
            Login
          </Button>
        </Form.Item>
      </Form>

      {/* Divider */}
      <Divider className="text-muted-foreground!">Or continue with</Divider>

      {/* Google OAuth */}
      <Button
        block
        size="large"
        icon={<GoogleOutlined />}
        onClick={handleGoogleSignIn}
        loading={googleLoading}
        className="h-12! rounded-lg! font-medium! border-border!"
      >
        <span className="text-primary">Login with Google</span>
      </Button>

      {/* Signup Link */}
      <p className="text-center mt-8 text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="text-primary font-medium hover:underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
