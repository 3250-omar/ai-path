"use client";

import { useRef, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { useUserStore } from "../stores/useUserStore";

interface UserProviderProps {
  user: User | null;
  children: React.ReactNode;
}

export default function UserProvider({ user, children }: UserProviderProps) {
  const setUser = useUserStore((state) => state.setUser);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current) {
      setUser(user);
      initialized.current = true;
    }
  }, [user, setUser]);

  return <>{children}</>;
}
