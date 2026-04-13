import { DashboardNav } from "@/components/dashboard/dashboard-nav";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <DashboardNav />
      <main className="md:ml-64 pt-14 md:pt-0 pb-20 md:pb-0">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}
