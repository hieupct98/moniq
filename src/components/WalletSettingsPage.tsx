import { Pencil, Settings2, Tag } from "lucide-react";

import { settingsCategories, settingsTags } from "@/lib/mock-ui-data";

export default function WalletSettingsPage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-700">
          Wallet settings
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Manage categories, icon keys, colors, and optional tags.
        </p>
      </div>

      <section className="grid gap-5 xl:grid-cols-[1.35fr_0.65fr]">
        <div className="overflow-hidden rounded-lg bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4 sm:px-5">
            <div>
              <h2 className="text-base font-semibold text-slate-700">
                Categories
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Set category name, library icon, and background color.
              </p>
            </div>
            <button className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-200 px-3 text-sm font-semibold text-slate-600 transition hover:border-emerald-200 hover:text-emerald-600">
              <Settings2 aria-hidden="true" size={17} />
              Manage
            </button>
          </div>

          <div className="grid gap-0 divide-y divide-slate-100 md:grid-cols-2 md:divide-x md:divide-y-0">
            {settingsCategories.map(category => {
              const CategoryIcon = category.icon;

              return (
                <div
                  className="flex items-center justify-between gap-3 px-4 py-3 sm:px-5"
                  key={category.name}
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
                        {category.name}
                      </p>
                      <p className="mt-1 text-xs font-medium text-slate-400">
                        {category.transactions} transactions
                      </p>
                    </div>
                  </div>
                  <button className="grid size-9 place-items-center rounded-md text-slate-300 transition hover:bg-slate-100 hover:text-slate-500">
                    <Pencil aria-hidden="true" size={16} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="overflow-hidden rounded-lg bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4 sm:px-5">
            <div>
              <h2 className="text-base font-semibold text-slate-700">Tags</h2>
              <p className="mt-1 text-sm text-slate-400">
                Optional labels for filtering and export.
              </p>
            </div>
            <button className="grid size-10 place-items-center rounded-md border border-slate-200 text-slate-500 transition hover:border-emerald-200 hover:text-emerald-600">
              <Tag aria-hidden="true" size={17} />
            </button>
          </div>

          <div className="flex flex-wrap gap-2 p-4 sm:p-5">
            {settingsTags.map(tag => (
              <span
                className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-600"
                key={tag.name}
              >
                <span
                  className="size-2.5 rounded-full"
                  style={{ backgroundColor: tag.color }}
                />
                {tag.name}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
