import {
  ArrowRightLeft,
  BriefcaseMedical,
  CarTaxiFront,
  CircleHelp,
  Laptop,
  ShoppingBag,
  Utensils,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const mockUserId = "550e8400-e29b-41d4-a716-446655440000";
export const foodCategoryId = "550e8400-e29b-41d4-a716-446655440003";
export const walletBalance = 727475293;

export const categoryMeta: Record<
  string,
  { name: string; color: string; icon: LucideIcon }
> = {
  "550e8400-e29b-41d4-a716-446655440003": {
    name: "Di chuyển",
    color: "#38bdf8",
    icon: CarTaxiFront,
  },
  "550e8400-e29b-41d4-a716-446655440004": {
    name: "Mua sắm",
    color: "#22c55e",
    icon: ShoppingBag,
  },
};

export const fallbackCategory = {
  name: "Khác",
  color: "#94a3b8",
  icon: CircleHelp,
};

export const recurringTransactions = [
  {
    id: "rent",
    categoryId: "550e8400-e29b-41d4-a716-446655440004",
    type: "expense" as const,
    note: "Rent",
    label: "Nhà",
    amount: 6000000,
    frequency: "monthly",
    startAt: new Date("2026-01-01T08:00:00.000+07:00"),
    endAt: null,
    nextRunAt: new Date("2026-06-01T08:00:00.000+07:00"),
    stoppedAt: null,
  },
  {
    id: "salary",
    categoryId: "550e8400-e29b-41d4-a716-446655440003",
    type: "income" as const,
    note: "Salary",
    label: "Lương",
    amount: 28050000,
    frequency: "monthly",
    startAt: new Date("2026-01-25T09:00:00.000+07:00"),
    endAt: new Date("2026-12-25T09:00:00.000+07:00"),
    nextRunAt: new Date("2026-05-25T09:00:00.000+07:00"),
    stoppedAt: null,
  },
];

export const settingsCategories = [
  {
    name: "Di chuyển",
    color: "#38bdf8",
    icon: CarTaxiFront,
    transactions: 12,
  },
  {
    name: "Mua sắm",
    color: "#22c55e",
    icon: ShoppingBag,
    transactions: 8,
  },
  {
    name: "Ăn uống",
    color: "#f59e0b",
    icon: Utensils,
    transactions: 16,
  },
  {
    name: "Chăm sóc sức khỏe",
    color: "#e11d48",
    icon: BriefcaseMedical,
    transactions: 3,
  },
  {
    name: "Điện tử",
    color: "#6b7280",
    icon: Laptop,
    transactions: 2,
  },
  {
    name: "Chuyển khoản",
    color: "#ef4444",
    icon: ArrowRightLeft,
    transactions: 5,
  },
];

export const settingsTags = [
  { name: "Khác", color: "#94a3b8" },
  { name: "Baby", color: "#38bdf8" },
  { name: "Lương", color: "#10b981" },
  { name: "Nhà", color: "#f59e0b" },
];

export function getAmountColor(amount: number) {
  if (amount > 0) return "text-emerald-600";
  if (amount < 0) return "text-red-500";
  return "text-slate-500";
}

export function getSignedAmount(
  type: "income" | "expense",
  amount: number
) {
  return type === "income" ? amount : -amount;
}

export function formatFrequency(frequency: string) {
  const labels: Record<string, string> = {
    daily: "Daily",
    weekly: "Weekly",
    monthly: "Monthly",
    yearly: "Yearly",
  };

  return labels[frequency] ?? frequency;
}
