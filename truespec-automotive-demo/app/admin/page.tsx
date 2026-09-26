"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAdminAuth } from "@/lib/admin/auth-context";
import { LoginForm } from "@/components/admin/login-form";
import { DemoModeBanner } from "@/components/admin/demo-mode-banner";
import { Logo } from "@/components/public/logo";

export default function AdminLoginPage() {
  const router = useRouter();
  const { isAuthenticated } = useAdminAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/admin/overview");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="flex min-h-screen flex-col">
      <DemoModeBanner />
      <div className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex flex-col items-center gap-3 text-center">
            <Link href="/">
              <Logo priority />
            </Link>
            <div>
              <h1 className="font-display text-xl uppercase tracking-wide text-foreground">
                Admin sign in
              </h1>
              <p className="mt-1 text-sm text-muted">Product demonstration only</p>
            </div>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
