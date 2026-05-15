import { PauseCircle, Repeat2 } from "lucide-react";

import { formatDateTimeVi, formatSignedVnd } from "@/lib/formatters";
import {
  categoryMeta,
  fallbackCategory,
  formatFrequency,
  getAmountColor,
  getSignedAmount,
  recurringTransactions,
} from "@/lib/mock-ui-data";

export default function RecurringRulesPage() {
  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-700">
            Recurring transactions
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Manage automatic records with start dates, optional end dates, and
            early stops.
          </p>
        </div>
        <button className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-emerald-500 px-4 text-sm font-semibold text-white shadow-sm shadow-emerald-500/20 transition hover:bg-emerald-600">
          <Repeat2 aria-hidden="true" size={17} />
          New recurring rule
        </button>
      </div>

      <section className="overflow-hidden rounded-lg bg-white shadow-sm">
        <div className="divide-y divide-slate-100">
          {recurringTransactions.map(rule => {
            const category = categoryMeta[rule.categoryId] ?? fallbackCategory;
            const CategoryIcon = category.icon;
            const signedAmount = getSignedAmount(rule.type, rule.amount);

            return (
              <article
                className="grid gap-4 px-4 py-4 md:grid-cols-[1.2fr_1fr_auto] md:items-center sm:px-5"
                key={rule.id}
              >
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
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-700">
                      {rule.note}
                    </p>
                    <p className="mt-1 text-xs font-medium text-slate-400">
                      {category.name} · {rule.label} ·{" "}
                      {formatFrequency(rule.frequency)}
                    </p>
                  </div>
                </div>

                <div className="grid gap-2 text-xs text-slate-500 sm:grid-cols-3">
                  <RuleDate label="Start" value={rule.startAt} />
                  <RuleDate label="End" value={rule.endAt} />
                  <RuleDate label="Next" value={rule.nextRunAt} />
                </div>

                <div className="flex items-center justify-between gap-3 md:justify-end">
                  <p
                    className={`text-sm font-bold ${getAmountColor(
                      signedAmount
                    )}`}
                  >
                    {formatSignedVnd(signedAmount)}
                  </p>
                  <button className="inline-flex h-9 items-center gap-2 rounded-md bg-slate-100 px-3 text-sm font-semibold text-slate-500 transition hover:bg-red-50 hover:text-red-500">
                    <PauseCircle aria-hidden="true" size={16} />
                    Stop
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function RuleDate({ label, value }: { label: string; value: Date | null }) {
  return (
    <div>
      <p className="font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p className="mt-1 font-medium text-slate-600">
        {value ? formatDateTimeVi(value) : "No end"}
      </p>
    </div>
  );
}
