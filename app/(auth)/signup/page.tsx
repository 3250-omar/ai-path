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
    } catch (error) {
      console.error("Error creating account:", error);
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
          label={
            <span className="font-medium text-foreground/80">Full Name</span>
          }
          rules={[{ required: true, message: "Please enter your full name" }]}
        >
          <Input
            prefix={<UserOutlined className="text-muted-foreground/60" />}
            placeholder="Omar Ahmed"
            className="rounded-lg! bg-background/50! dark:bg-muted/30! border-border! hover:border-primary! focus:border-primary! transition-all!"
          />
        </Form.Item>

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
            className="rounded-lg! bg-background/50! dark:bg-muted/30! border-border! hover:border-primary! focus:border-primary! transition-all!"
          />
        </Form.Item>

        {/* Password */}
        <Form.Item
          name="password"
          label={
            <span className="font-medium text-foreground/80">Password</span>
          }
          rules={[
            { required: true, message: "Please enter your password" },
            { min: 8, message: "Password must be at least 8 characters" },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="text-muted-foreground/60" />}
            placeholder="••••••••"
            className="rounded-lg! bg-background/50! dark:bg-muted/30! border-border! hover:border-primary! focus:border-primary! transition-all!"
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
          <Checkbox className="dark:text-foreground/70!">
            I agree to the{" "}
            <Link
              href="/terms"
              className="text-primary hover:text-primary/80 transition-colors"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="text-primary hover:text-primary/80 transition-colors"
            >
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
            className="h-12! rounded-lg! font-medium! bg-primary! hover:bg-primary/90! border-0! transition-all!"
          >
            Create Account
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
        <span className="text-foreground">Sign up with Google</span>
      </Button>

      {/* Login Link */}
      <p className="text-center mt-8 text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-primary font-medium hover:text-primary/80 transition-colors"
        >
          Login
        </Link>
      </p>
    </div>
  );
}
