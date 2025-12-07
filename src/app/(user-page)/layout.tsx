import MainLayout from "@/components/layout/main-layout";

export default async function UserPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}
