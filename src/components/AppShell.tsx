import { ChevronDown, Wallet } from "lucide-react";
import Link from "next/link";

const navItems = [
  { label: "Transactions", href: "/transactions" },
  { label: "Overview", href: "/overview" },
  { label: "Budgets", href: "/budgets" },
  { label: "Recurring", href: "/recurring" },
  { label: "Wallet Settings", href: "/settings" },
];

export default function AppShell({
  active,
  children,
}: {
  active: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-700">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 md:px-6 lg:h-[68px] lg:flex-row lg:items-center lg:justify-between lg:py-0">
          <div className="flex items-center gap-3">
            <div className="grid size-11 shrink-0 place-items-center rounded-full bg-emerald-500 text-white shadow-sm shadow-emerald-500/25">
              <Wallet aria-hidden="true" size={23} strokeWidth={2.4} />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Wallet
              </p>
              <h1 className="flex items-center gap-2 text-lg font-bold text-slate-700">
                Ví tiền mặt
                <ChevronDown
                  aria-hidden="true"
                  className="text-slate-300"
                  size={18}
                />
              </h1>
            </div>
          </div>

          <nav className="flex gap-2 overflow-x-auto lg:h-full lg:items-stretch lg:gap-7">
            {navItems.map(item => (
              <Link
                className={`flex shrink-0 items-center border-b-2 px-2 py-2 text-sm font-semibold transition lg:px-0 ${
                  item.label === active
                    ? "border-emerald-500 text-emerald-500"
                    : "border-transparent text-slate-400 hover:text-slate-600"
                }`}
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-full bg-slate-200 text-sm font-bold text-slate-500">
              HT
            </span>
            <span className="text-sm font-bold text-slate-700">Hieu Tran</span>
            <ChevronDown
              aria-hidden="true"
              className="text-slate-300"
              size={18}
            />
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6 lg:py-14">
        {children}
      </main>
    </div>
  );
}
