"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const rawUser = localStorage.getItem("user");

    try {
      const user = rawUser ? JSON.parse(rawUser) : null;
      if (!token || user?.role !== "ADMIN") {
        router.replace("/login");
        return;
      }
      setAllowed(true);
    } catch {
      router.replace("/login");
    }
  }, [router]);

  if (!allowed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAFAFA] text-sm text-neutral-500">
        Checking admin access...
      </div>
    );
  }

  return <>{children}</>;
}
