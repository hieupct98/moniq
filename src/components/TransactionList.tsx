"use client";

import {
  useTransactions,
  useCreateTransaction,
} from "@/lib/queries/transaction.query";

export default function TransactionList() {
  const { data: transactions, isLoading, isError } = useTransactions();
  const { mutate: createTransaction, isPending } = useCreateTransaction();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Failed to load transactions.</p>;

  return (
    <div>
      <h1>Transactions</h1>

      <ul>
        {transactions?.map(t => (
          <li key={t.id}>
            {t.date} — {t.title} ({t.type}): ${t.amount}
          </li>
        ))}
      </ul>

      <button
        disabled={isPending}
        onClick={() =>
          createTransaction({
            title: "Coffee",
            amount: 5,
            type: "expense",
            category: "Food",
            date: "2024-03-10",
          })
        }
      >
        {isPending ? "Adding..." : "Add Transaction"}
      </button>
    </div>
  );
}
