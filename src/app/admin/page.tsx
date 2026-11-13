"use client";

import { AdminThemeToggle } from "@/components/admin/AdminThemeToggle";
import { AdminVideoManager } from "@/components/admin/AdminVideoManager";
import { AdminPhotoManager } from "@/components/admin/AdminPhotoManager";

export default function AdminPage() {
  return (
    <div className="flex flex-col gap-6">
      <AdminThemeToggle />
      <AdminVideoManager />
      <AdminPhotoManager />
    </div>
  );
}
