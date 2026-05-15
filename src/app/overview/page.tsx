import AppShell from "@/components/AppShell";
import OverviewDashboard from "@/components/OverviewDashboard";

export default function OverviewPage() {
  return (
    <AppShell active="Overview">
      <OverviewDashboard />
    </AppShell>
  );
}
