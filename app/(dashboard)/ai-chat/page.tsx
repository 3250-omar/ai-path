"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AIChatPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/dashboard");
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p>Redirecting to dashboard...</p>
    </div>
  );
}
