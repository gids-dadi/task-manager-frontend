// components/AuthGuard.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    // Check for access token in localStorage
    const token = localStorage.getItem("access_token");

    if (!token) {
      // Redirect to login if no token found
      router.push("/login");
    }
  }, [router]);

  // Render children if we reach here (token exists or check is in progress)
  return <>{children}</>;
}
