import { Suspense } from "react";
import DashboardContent from "./_components/DashboardContent";

export default async function DashboardPage() {
  return (
    <Suspense fallback={<div>Loading dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
