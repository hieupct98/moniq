import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

import { formatSignedVnd, formatVnd } from "@/lib/formatters";
import { getAmountColor, settingsCategories } from "@/lib/mock-ui-data";

const summary = {
  balance: 722245053,
  change: 44086674,
  expenses: -27904326,
  income: 71991000,
};

const incomeBreakdown = [
  { name: "Lương", count: 2, amount: 69092000, color: "#4fba79" },
  { name: "Tiết kiệm/đầu tư", count: 2, amount: 2472000, color: "#7cc84e" },
  { name: "Hoàn tiền", count: 1, amount: 427000, color: "#74c756" },
];

const expenseBreakdown = [
  { name: "Chăm sóc sức khỏe", count: 6, amount: -9380000, color: "#d85f72" },
  { name: "Điện tử", count: 3, amount: -3718000, color: "#6b7280" },
  { name: "Hiếu hỷ", count: 2, amount: -3024326, color: "#ef5a4f" },
  { name: "Thời trang", count: 12, amount: -2129000, color: "#7cc84e" },
  { name: "Đồ gia dụng", count: 7, amount: -1798000, color: "#6f42c1" },
  { name: "Hoá đơn & Phí", count: 2, amount: -1765000, color: "#6fc7b7" },
  { name: "Đồ ăn/uống", count: 14, amount: -1254000, color: "#f8a72e" },
];

const balancePoints = [
  676, 674, 671, 668, 664, 662, 684, 684, 683, 683, 683, 731, 729, 728, 728,
  728, 721, 721, 720, 718,
];

const changeBars = [0.3, 4, 0.5, 5, 0.6, 4, 0.7, 1, 0.8, 20, 0.5, 0.9, 48, 2, 0.6, 0.2, 7, 0.8, 0.4, 3];

export default function OverviewDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-slate-700">
          Overview
        </h1>
        <div className="flex items-center rounded-md bg-white shadow-sm">
          <button className="px-3 py-2.5 text-slate-500">
            <ChevronLeft aria-hidden="true" size={18} />
          </button>
          <span className="border-x border-slate-100 px-4 py-2.5 text-sm font-medium text-slate-700">
            Mar 01, 2026 - Mar 31, 2026
          </span>
          <button className="px-3 py-2.5 text-slate-500">
            <ChevronRight aria-hidden="true" size={18} />
          </button>
        </div>
      </div>

      <section className="rounded-lg bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-700">Filters</h2>
          <button className="text-sm font-medium text-slate-400">
            Reset filters
          </button>
        </div>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-[1fr_1fr_1fr_1.15fr]">
          <FilterBox label="By wallet" value="Ví tiền mặt" />
          <FilterBox label="By category" value="All categories" badge="27" />
          <FilterBox label="By note" value="Filter by keyword" muted />
          <div>
            <p className="mb-1.5 text-xs font-medium text-slate-400">
              By amount
            </p>
            <div className="rounded-md border border-slate-200 px-3 py-2.5">
              <div className="h-1.5 rounded-full bg-slate-200">
                <div className="h-1.5 w-3/4 rounded-full bg-slate-400" />
              </div>
              <div className="mt-2 flex justify-between text-xs text-slate-400">
                <span>{formatVnd(0)}</span>
                <span>{formatVnd(50000000)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard label="Total Balance" value={formatVnd(summary.balance)} />
        <SummaryCard
          label="Total Period Change"
          value={formatSignedVnd(summary.change)}
        />
        <SummaryCard
          label="Total Period Expenses"
          value={formatSignedVnd(summary.expenses)}
        />
        <SummaryCard
          label="Total Period Income"
          value={formatSignedVnd(summary.income)}
        />
      </section>

      <section className="grid gap-5 xl:grid-cols-2">
        <ChartCard title="Account Balance" subtitle="Mar 01-31">
          <LineChart points={balancePoints} />
        </ChartCard>
        <ChartCard title="Changes" subtitle="Mar 01-31">
          <BarChart bars={changeBars} />
        </ChartCard>
      </section>

      <section className="grid gap-5 xl:grid-cols-2">
        <BreakdownCard
          items={incomeBreakdown}
          title="Period Income"
          tone="income"
        />
        <BreakdownCard
          items={expenseBreakdown}
          title="Period Expenses"
          tone="expense"
        />
      </section>
    </div>
  );
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  const numeric = value.startsWith("-") ? -1 : 1;

  return (
    <div className="rounded-lg bg-white p-4 shadow-sm">
      <p className="text-sm font-semibold text-slate-700">{label}</p>
      <p
        className={`mt-2 text-2xl font-medium tracking-normal ${getAmountColor(
          numeric
        )}`}
      >
        {value}
      </p>
    </div>
  );
}

function FilterBox({
  label,
  value,
  badge,
  muted = false,
}: {
  label: string;
  value: string;
  badge?: string;
  muted?: boolean;
}) {
  return (
    <div>
      <p className="mb-1.5 text-xs font-medium text-slate-400">{label}</p>
      <div className="flex h-11 items-center gap-3 rounded-md border border-slate-200 px-3 text-sm">
        {badge ? (
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-slate-400 text-xs font-bold text-white">
            {badge}
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

function ChartCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-base font-semibold text-slate-700">{title}</h2>
          <p className="mt-1 text-sm text-slate-300">{subtitle}</p>
        </div>
        <div className="hidden overflow-hidden rounded-md border border-slate-200 sm:flex">
          {["Days", "Weeks", "Months"].map((label, index) => (
            <button
              className={`px-4 py-2 text-sm font-semibold ${
                index === 0 ? "text-emerald-500" : "text-slate-400"
              }`}
              key={label}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-6">{children}</div>
    </div>
  );
}

function LineChart({ points }: { points: number[] }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const coords = points.map((point, index) => {
    const x = (index / (points.length - 1)) * 100;
    const y = 100 - ((point - min) / (max - min)) * 72 - 12;
    return `${x},${y}`;
  });

  return (
    <svg className="h-64 w-full overflow-visible" viewBox="0 0 100 100">
      {[18, 38, 58, 78, 98].map(y => (
        <line
          key={y}
          stroke="#e2e8f0"
          strokeWidth="0.4"
          x1="0"
          x2="100"
          y1={y}
          y2={y}
        />
      ))}
      <polygon
        fill="rgba(16,185,129,0.12)"
        points={`${coords.join(" ")} 100,100 0,100`}
      />
      <polyline
        fill="none"
        points={coords.join(" ")}
        stroke="#10b981"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.2"
      />
      {coords.map(point => {
        const [x, y] = point.split(",");
        return (
          <circle
            cx={x}
            cy={y}
            fill="white"
            key={point}
            r="1.6"
            stroke="#10b981"
            strokeWidth="0.8"
          />
        );
      })}
    </svg>
  );
}

function BarChart({ bars }: { bars: number[] }) {
  return (
    <div className="flex h-64 items-end gap-2 border-b border-slate-200 px-3">
      {bars.map((bar, index) => (
        <div
          className={`w-full rounded-t-sm ${
            index === 9 || index === 12 ? "bg-emerald-500" : "bg-red-400"
          }`}
          key={`${bar}-${index}`}
          style={{ height: `${Math.max(bar, 1)}%` }}
        />
      ))}
    </div>
  );
}

function BreakdownCard({
  title,
  items,
  tone,
}: {
  title: string;
  items: Array<{ name: string; count: number; amount: number; color: string }>;
  tone: "income" | "expense";
}) {
  return (
    <div className="rounded-lg bg-white p-5 shadow-sm">
      <h2 className="text-base font-semibold text-slate-700">{title}</h2>
      <p className="mt-1 text-sm text-slate-300">Mar 01-31</p>

      <div className="mx-auto my-10 grid size-48 place-items-center rounded-full border-[28px] border-emerald-500/80" />

      <div className="space-y-4">
        {items.map((item, index) => {
          const category = settingsCategories[index % settingsCategories.length];
          const Icon = category.icon;

          return (
            <div className="grid grid-cols-[1fr_auto] items-center gap-4" key={item.name}>
              <div className="flex min-w-0 items-center gap-3">
                <span
                  className="grid size-9 shrink-0 place-items-center rounded-full text-white"
                  style={{ backgroundColor: item.color }}
                >
                  <Icon aria-hidden="true" size={18} strokeWidth={2.4} />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-slate-700">
                    {item.name}
                  </p>
                  <p className="text-xs text-slate-400">
                    {item.count} transactions
                  </p>
                </div>
              </div>
              <p
                className={`text-right text-sm font-bold ${
                  tone === "income" ? "text-emerald-600" : "text-red-500"
                }`}
              >
                {formatSignedVnd(item.amount)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
