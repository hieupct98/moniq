import AppShell from "@/components/AppShell";
import TransactionList from "@/components/TransactionList";

export default function TransactionsPage() {
  return (
    <AppShell active="Transactions">
      <TransactionList />
    </AppShell>
  );
}
