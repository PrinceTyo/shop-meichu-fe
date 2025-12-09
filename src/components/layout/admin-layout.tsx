"use client";

import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { LayoutProvider } from "@/context/layout-provider";
import { ProfileDropdown } from "@/components/dropdown/profile-dropdown";
import AdminSidebar from "@/components/sidebar/admin-sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { usePathname } from "next/navigation";

import type { ReactNode } from "react";
import type { User } from "@/types/strapi/user";

function getPageTitle(pathname: string): string {
  const path = pathname.replace(/^\/admin\/?/, "");

  if (!path || path === "dashboard") {
    return "Dashboard";
  }

  const segment = path.split("/")[0];

  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function AdminLayout({
  user,
  children,
}: {
  user: User;
  children?: ReactNode;
}) {
  const pathname = usePathname();
  const pageTitle = getPageTitle(pathname);

  return (
    <LayoutProvider>
      <SidebarProvider>
        <div
          className="relative flex min-h-screen w-full font-outfit bg-background-admin text-foreground-admin"
          suppressHydrationWarning
        >
          <AdminSidebar user={user} />
          <SidebarInset className="bg-background-admin text-foreground-admin flex flex-col px-4 py-2">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <h1 className="text-2xl font-bold">{pageTitle}</h1>
              </div>

              <div className="flex items-center gap-3">
                <ThemeToggle />
                <ProfileDropdown user={user} />
              </div>
            </div>
            {children}
          </SidebarInset>
        </div>
      </SidebarProvider>
    </LayoutProvider>
  );
}
