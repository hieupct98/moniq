import AppShell from "@/components/AppShell";

export default function BudgetsPage() {
  return (
    <AppShell active="Budgets">
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-bold tracking-tight text-slate-700">
          Budgets
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Budget planning will live here after the transaction and category
          flows are connected to Supabase.
        </p>
      </div>
    </AppShell>
  );
}
