import { Suspense } from "react";
import DashboardContent from "./_components/DashboardContent";
import { getUser } from "../../(auth)/actions";

export default async function DashboardPage() {
  const user = await getUser();

  return (
    <Suspense fallback={<div>Loading dashboard...</div>}>
      <DashboardContent user={user} />
    </Suspense>
  );
}
