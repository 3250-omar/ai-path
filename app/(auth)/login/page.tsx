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
  useState(() => {
    form.setFieldsValue({
      email: "admin002@gmail.com",
      password: "000000000",
    });
  });
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
          label={<span className="font-medium text-foreground/80">Email</span>}
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input
            prefix={<MailOutlined className="text-muted-foreground/60" />}
            placeholder="omar@example.com"
            className="rounded-lg! bg-background/50! dark:bg-white! border-border! hover:border-primary! focus:border-primary! transition-all! dark:text-foreground"
          />
        </Form.Item>

        {/* Password */}
        <Form.Item
          name="password"
          label={
            <span className="font-medium text-foreground/80">Password</span>
          }
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input.Password
            prefix={<LockOutlined className="text-muted-foreground/60" />}
            placeholder="••••••••"
            className="rounded-lg! bg-background/50! dark:bg-white! border-border! hover:border-primary! focus:border-primary! transition-all! dark:text-foreground"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>

        {/* Remember & Forgot */}
        <div className="flex items-center justify-between mb-6">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox className="dark:text-foreground/70!">
              Remember me
            </Checkbox>
          </Form.Item>
          <Link
            href="/forgot-password"
            className="text-primary hover:text-primary/80 transition-colors text-sm font-medium"
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
            className="h-12! rounded-lg! font-medium! bg-primary! hover:bg-primary/90! border-0! transition-all!"
          >
            Login
          </Button>
        </Form.Item>
      </Form>

      {/* Divider */}
      <Divider className="text-muted-foreground/40! border-border!">
        Or continue with
      </Divider>

      {/* Google OAuth */}
      <Button
        block
        size="large"
        icon={<GoogleOutlined className="text-primary" />}
        onClick={handleGoogleSignIn}
        loading={googleLoading}
        className="h-12! rounded-lg! font-medium! border-border! bg-background! hover:bg-muted! dark:bg-muted/20! transition-all!"
      >
        <span className="text-foreground">Login with Google</span>
      </Button>

      {/* Signup Link */}
      <p className="text-center mt-8 text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="text-primary font-medium hover:text-primary/80 transition-colors"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
