"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Input, Checkbox, Divider, Form, message } from "antd";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  GoogleOutlined,
} from "@ant-design/icons";
import { signUp, signInWithGoogle } from "../actions";

export default function SignupPage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const onFinish = async (values: {
    fullName: string;
    email: string;
    password: string;
  }) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("fullName", values.fullName);
      formData.append("email", values.email);
      formData.append("password", values.password);

      const result = await signUp(formData);
      message.success(result.message);
    } catch {
      message.error("Failed to create account");
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
      <h1 className="text-2xl font-bold text-foreground mb-2">
        Create Account
      </h1>
      <p className="text-muted-foreground mb-8">
        Start your personalized learning journey today
      </p>

      <Form form={form} layout="vertical" onFinish={onFinish} size="large">
        {/* Full Name */}
        <Form.Item
          name="fullName"
          label={<span className="font-medium">Full Name</span>}
          rules={[{ required: true, message: "Please enter your full name" }]}
        >
          <Input
            prefix={<UserOutlined className="text-muted-foreground" />}
            placeholder="Omar Ahmed"
            className="rounded-lg! bg-input-background!"
          />
        </Form.Item>

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
          rules={[
            { required: true, message: "Please enter your password" },
            { min: 8, message: "Password must be at least 8 characters" },
          ]}
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

        {/* Terms Checkbox */}
        <Form.Item
          name="terms"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject("You must accept the terms"),
            },
          ]}
        >
          <Checkbox>
            I agree to the{" "}
            <Link href="/terms" className="text-primary hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
          </Checkbox>
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
            className="h-12! rounded-lg! font-medium! bg-primary!"
          >
            Create Account
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
        <span className="text-primary">Sign up with Google</span>
      </Button>

      {/* Login Link */}
      <p className="text-center mt-8 text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-primary font-medium hover:underline"
        >
          Login
        </Link>
      </p>
    </div>
  );
}
