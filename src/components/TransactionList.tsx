"use client";

import { ChevronDown, Plus, Wallet } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import {
  formatDateKey,
  formatDateTimeVi,
  formatDateVi,
  formatSignedVnd,
  formatVnd,
} from "@/lib/formatters";
import {
  categoryMeta,
  fallbackCategory,
  foodCategoryId,
  getAmountColor,
  getSignedAmount,
  mockUserId,
  walletBalance,
} from "@/lib/mock-ui-data";
import {
  useCreateTransaction,
  useTransactions,
} from "@/lib/queries/transaction.query";

export default function TransactionList() {
  const { data: transactions = [], isLoading, isError } = useTransactions();
  const { mutate: createTransaction, isPending } = useCreateTransaction();

  if (isLoading)
    return (
      <div className="rounded-lg bg-white p-6 text-sm text-slate-500 shadow-sm">
        Loading transactions...
      </div>
    );

  if (isError)
    return (
      <div className="rounded-lg bg-white p-6 text-sm text-red-600 shadow-sm">
        Failed to load transactions.
      </div>
    );

  const periodIncome = transactions
    .filter(t => t.type === "income")
    .reduce((total, t) => total + t.amount, 0);
  const periodExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((total, t) => total + t.amount, 0);
  const periodChange = periodIncome - periodExpenses;
  const groupedTransactions = transactions.reduce<
    Record<string, typeof transactions>
  >((groups, transaction) => {
    const dateKey = formatDateKey(transaction.occurredAt);
    groups[dateKey] = groups[dateKey] ?? [];
    groups[dateKey].push(transaction);
    return groups;
  }, {});

  return (
    <div className="space-y-5">
      <section className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <button
          className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-emerald-500 px-4 text-sm font-semibold text-white shadow-sm shadow-emerald-500/20 transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:bg-slate-300"
          disabled={isPending}
          onClick={() =>
            createTransaction({
              userId: mockUserId,
              categoryId: foodCategoryId,
              occurredAt: new Date(),
              type: "expense",
              note: "Coffee",
              label: "Khác",
              amount: 45000,
            })
          }
        >
          <span className="grid size-5 place-items-center rounded-full bg-white text-emerald-500">
            <Plus aria-hidden="true" size={14} strokeWidth={3} />
          </span>
          {isPending ? "Adding..." : "Add transaction"}
        </button>

        <div className="flex flex-wrap items-center gap-3">
          <button className="rounded-md bg-white px-4 py-2.5 text-sm font-medium text-slate-500 shadow-sm">
            Future
          </button>
          <button className="rounded-md bg-white px-4 py-2.5 text-sm font-medium text-slate-500 shadow-sm">
            Import
          </button>
          <div className="flex items-center rounded-md bg-white shadow-sm">
            <button className="px-3 py-2.5 text-slate-500">‹</button>
            <span className="border-x border-slate-100 px-4 py-2.5 text-sm font-medium text-slate-700">
              May 01, 2026 - May 31, 2026
            </span>
            <button className="px-3 py-2.5 text-slate-500">›</button>
          </div>
        </div>
      </section>

      <section className="rounded-lg bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-700">Filters</h2>
          <button className="text-sm font-medium text-slate-400">
            Reset filters
          </button>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-[1fr_1fr_1fr_1.15fr]">
          <FilterBox label="By category" value="All categories" badge="18" />
          <FilterBox icon={Wallet} label="By wallet" value="Ví tiền mặt" />
          <FilterBox label="By note" value="Filter by keyword" muted />
          <div>
            <p className="mb-1.5 text-xs font-medium text-slate-400">
              By amount
            </p>
            <div className="rounded-md border border-slate-200 px-3 py-2.5">
              <div className="h-1.5 rounded-full bg-slate-200">
                <div className="h-1.5 w-2/3 rounded-full bg-slate-400" />
              </div>
              <div className="mt-2 flex justify-between text-xs text-slate-400">
                <span>{formatVnd(0)}</span>
                <span>{formatVnd(20000000)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          label="Current Wallet Balance"
          tone="text-emerald-600"
          value={formatVnd(walletBalance + periodChange)}
        />
        <SummaryCard
          label="Total Period Change"
          tone={getAmountColor(periodChange)}
          value={formatSignedVnd(periodChange)}
        />
        <SummaryCard
          label="Total Period Expenses"
          tone="text-red-500"
          value={formatSignedVnd(-periodExpenses)}
        />
        <SummaryCard
          label="Total Period Income"
          tone="text-emerald-600"
          value={formatSignedVnd(periodIncome)}
        />
      </section>

      <section className="overflow-hidden rounded-lg bg-white shadow-sm">
        <div className="border-b border-slate-100 px-4 py-4 sm:px-5">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-base font-semibold text-slate-700">
              Transactions
            </h2>
            <p className="text-sm font-medium text-slate-400">
              {transactions.length} records
            </p>
          </div>
        </div>

        {Object.entries(groupedTransactions)
          .sort(([a], [b]) => b.localeCompare(a))
          .map(([date, items]) => {
            const dayTotal = items.reduce(
              (total, item) =>
                total + getSignedAmount(item.type, item.amount),
              0
            );
            const sortedItems = [...items].sort(
              (a, b) =>
                new Date(b.occurredAt).getTime() -
                new Date(a.occurredAt).getTime()
            );

            return (
              <div
                className="border-b border-slate-100 last:border-b-0"
                key={date}
              >
                <div className="flex items-center justify-between bg-slate-50 px-4 py-3 sm:px-5">
                  <h3 className="text-sm font-semibold text-slate-700">
                    {formatDateVi(date)}
                  </h3>
                  <span
                    className={`text-sm font-semibold ${getAmountColor(
                      dayTotal
                    )}`}
                  >
                    {formatSignedVnd(dayTotal)}
                  </span>
                </div>

                <div className="divide-y divide-slate-100">
                  {sortedItems.map(transaction => {
                    const category =
                      categoryMeta[transaction.categoryId] ?? fallbackCategory;
                    const CategoryIcon = category.icon;
                    const signedAmount = getSignedAmount(
                      transaction.type,
                      transaction.amount
                    );

                    return (
                      <article
                        className="grid gap-3 px-4 py-3 sm:grid-cols-[auto_150px_1fr_auto] sm:items-center sm:px-5"
                        key={transaction.id}
                      >
                        <div className="hidden size-5 rounded border border-slate-200 sm:block" />
                        <div className="flex min-w-0 items-center gap-3">
                          <span
                            className="grid size-10 shrink-0 place-items-center rounded-full text-white"
                            style={{ backgroundColor: category.color }}
                          >
                            <CategoryIcon
                              aria-hidden="true"
                              size={21}
                              strokeWidth={2.4}
                            />
                          </span>
                          <span className="truncate text-sm font-medium text-slate-700">
                            {category.name}
                          </span>
                        </div>
                        <div className="min-w-0 pl-13 sm:pl-0">
                          <p className="truncate text-sm font-medium text-slate-700">
                            {transaction.note || "No note"}
                          </p>
                          <p className="mt-0.5 text-xs font-medium text-slate-400">
                            {formatDateTimeVi(transaction.occurredAt)}
                          </p>
                          {transaction.label ? (
                            <span className="mt-1 inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500">
                              {transaction.label}
                            </span>
                          ) : null}
                        </div>
                        <p
                          className={`pl-13 text-left text-sm font-bold sm:pl-0 sm:text-right ${getAmountColor(
                            signedAmount
                          )}`}
                        >
                          {formatSignedVnd(signedAmount)}
                        </p>
                      </article>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </section>
    </div>
  );
}

function FilterBox({
  icon: Icon,
  label,
  value,
  badge,
  muted = false,
}: {
  icon?: LucideIcon;
  label: string;
  value: string;
  badge?: string;
  muted?: boolean;
}) {
  return (
    <div>
      <p className="mb-1.5 text-xs font-medium text-slate-400">{label}</p>
      <div className="flex h-11 items-center gap-3 rounded-md border border-slate-200 px-3 text-sm">
        {badge || Icon ? (
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-slate-400 text-xs font-bold text-white">
            {Icon ? (
              <Icon aria-hidden="true" size={17} strokeWidth={2.5} />
            ) : (
              badge
            )}
          </span>
        ) : null}
        <span className={muted ? "text-slate-400" : "text-slate-700"}>
          {value}
        </span>
        <ChevronDown
          aria-hidden="true"
          className="ml-auto text-slate-300"
          size={18}
        />
      </div>
    </div>
  );
}

function SummaryCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: string;
}) {
  return (
    <div className="rounded-lg bg-white p-4 shadow-sm">
      <p className="text-sm font-semibold text-slate-700">{label}</p>
      <p className={`mt-2 text-2xl font-medium tracking-normal ${tone}`}>
        {value}
      </p>
    </div>
  );
}
