"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth, DEMO_ADMIN_USERNAME, DEMO_ADMIN_PASSWORD } from "@/lib/admin/auth-context";
import { Button } from "@/components/ui/button";
import { LockIcon } from "@/components/ui/icons";

export function LoginForm() {
  const router = useRouter();
  const { login } = useAdminAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const ok = await login(username, password);
    setSubmitting(false);
    if (ok) {
      router.push("/admin/overview");
    } else {
      setError("Incorrect demo credentials. Use the details shown below.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-medium uppercase tracking-wide text-muted">Username</span>
        <input
          type="text"
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="h-11 rounded-md border border-border-strong bg-surface px-3 text-sm text-foreground focus-visible:outline-2 focus-visible:outline-gold"
          required
        />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="text-xs font-medium uppercase tracking-wide text-muted">Password</span>
        <input
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="h-11 rounded-md border border-border-strong bg-surface px-3 text-sm text-foreground focus-visible:outline-2 focus-visible:outline-gold"
          required
        />
      </label>

      {error && (
        <p role="alert" className="text-sm text-danger">
          {error}
        </p>
      )}

      <Button type="submit" size="lg" disabled={submitting}>
        {submitting ? "Signing in…" : "Sign in"}
      </Button>

      <div className="flex items-start gap-2.5 rounded-md border border-border-strong bg-surface-raised px-3.5 py-3 text-xs text-muted">
        <LockIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" />
        <p>
          Demo credentials — <span className="text-muted-strong">{DEMO_ADMIN_USERNAME}</span> /{" "}
          <span className="text-muted-strong">{DEMO_ADMIN_PASSWORD}</span>. This gate is for
          the audition only and is not a secure login.
        </p>
      </div>
    </form>
  );
}
