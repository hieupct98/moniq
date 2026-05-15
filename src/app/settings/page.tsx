import AppShell from "@/components/AppShell";
import WalletSettingsPage from "@/components/WalletSettingsPage";

export default function SettingsPage() {
  return (
    <AppShell active="Wallet Settings">
      <WalletSettingsPage />
    </AppShell>
  );
}
