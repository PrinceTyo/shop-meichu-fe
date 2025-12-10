import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { LayoutProvider } from "@/context/layout-provider";
import { ProfileDropdown } from "@/components/dropdown/profile-dropdown";
import { ThemeToggle } from "@/components/theme-toggle";
import AdminSidebar from "@/components/sidebar/admin-sidebar";

export default function AdminLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <LayoutProvider>
      <SidebarProvider>
        <div className="relative flex min-h-screen w-full font-outfit">
          <AdminSidebar />
          <SidebarInset className="flex flex-col px-4 py-2">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <SidebarTrigger />
                <h1 className="text-2xl font-bold">Dashboard</h1>
              </div>

              <div className="flex items-center gap-3">
                <ThemeToggle />
                <ProfileDropdown />
              </div>
            </div>
            {children}
          </SidebarInset>
        </div>
      </SidebarProvider>
    </LayoutProvider>
  );
}
