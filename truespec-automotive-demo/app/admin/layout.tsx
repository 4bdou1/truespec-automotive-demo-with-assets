import type { Metadata } from "next";
import { AdminAuthProvider } from "@/lib/admin/auth-context";
import { AdminDataProvider } from "@/lib/admin/data-context";

export const metadata: Metadata = {
  title: {
    default: "Admin — TrueSpec Automotive",
    template: "%s — TrueSpec Admin",
  },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <AdminDataProvider>
        <div className="min-h-screen bg-background">{children}</div>
      </AdminDataProvider>
    </AdminAuthProvider>
  );
}
