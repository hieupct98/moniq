# MoniQ AI Context

This file is the source of truth for AI coding agents working on MoniQ. Keep it updated when architecture, product scope, or conventions change.

## Product

MoniQ is a personal money management app for one user. It is inspired by Spendee, but optimized for the owner's own workflow and Vietnamese Dong only.

Primary goals:

- Track daily income and expenses.
- Use separate pages for transactions, overview, recurring rules, budgets, and wallet settings.
- Store money as whole VND amounts only. VND has no decimal cents in this app.
- Deploy as a fullstack Next.js app on Vercel.
- Use Supabase for free Postgres database and auth.
- Later support PWA on iPhone, then possibly a Tauri desktop app.
- Later add stock and crypto portfolio tracking as separate investment modules.

Explicit non-goals for the current spending module:

- Do not add cashback, refund, rewards, percentage, or card benefit fields to the core transaction model.
- Do not support multiple currencies until the owner asks for it.
- Do not mix investment deposits/withdrawals, holdings, trades, or prices into the spending transactions table.

## Tech Stack

- Framework: Next.js 16 App Router
- Language: TypeScript
- UI: React 19, Tailwind CSS 4, and lucide-react icons
- Client data fetching: TanStack React Query
- API layer: Next route handlers in `src/app/api`
- Business logic: services in `src/services`
- Database ORM: Drizzle ORM
- Database/auth provider: Supabase
- Postgres driver: `postgres`
- Deployment target: Vercel
- Package manager: Yarn v1

## Current Data Flow

The intended data path is:

```text
UI component
  -> React Query hook in src/lib/queries
    -> Next route handler in src/app/api
      -> service in src/services
        -> Drizzle query in src/db
          -> Supabase Postgres
```

The transaction service still uses mock data while auth/current-user handling is being built. Preserve the API/service boundary when replacing mocks with Drizzle.

## Domain Model

Current spending tables:

- `profiles`: one profile per Supabase auth user.
- `categories`: visual spending categories. `user_id = null` means a system default category.
- `tags`: optional user labels used for filtering and export.
- `transactions`: core money records.
- `recurringTransactions`: rules that generate future transactions.

Category fields:

- `id`: UUID
- `userId`: owner profile UUID, nullable for system defaults
- `name`: display name
- `icon`: library icon key, rendered with white glyphs on colored circular backgrounds
- `color`: hex color

Transaction fields:

- `id`: UUID
- `userId`: owner profile UUID
- `categoryId`: category UUID
- `occurredAt`: selected date and time, defaulting to current time
- `type`: `income` or `expense`; this controls display sign and balance direction
- `note`: optional extra note
- `label`: optional tag such as `Khác`, `Baby`, or `Lương`
- `amount`: absolute whole VND integer stored as `bigint`; never store formatting or decimals
- `createdAt`: insertion timestamp

Recurring transaction fields:

- `id`: UUID
- `userId`: owner profile UUID
- `categoryId`: category UUID
- `type`: `income` or `expense`
- `note`: optional extra note copied into generated transactions
- `label`: optional tag copied into generated transactions
- `amount`: absolute whole VND integer stored as `bigint`
- `frequency`: `daily`, `weekly`, `monthly`, or `yearly`
- `startAt`: first valid generation datetime
- `endAt`: optional planned end datetime
- `nextRunAt`: next scheduled generation datetime
- `stoppedAt`: set when the user stops the rule before `endAt`
- `isActive`: false when paused/stopped

Recurring transaction rules:

- Recurring rules should not directly replace normal transactions; they generate normal transactions.
- The UI must allow creating, editing, and stopping a recurring rule before its configured end date.
- Stop actions should preserve history by setting `stoppedAt`/`isActive`, not deleting generated transactions.
- Generated transactions should keep absolute integer `amount` and inherit `type`, category, note, and label.

Future `Ví đầu tư` module:

- Treat investment tracking as a different wallet type, not the same format as `Ví tiền mặt`.
- Initial investment cash-flow fields should be: investment type (`stock`, `crypto`, `fund_certificate`, etc.), signed amount in/out, and datetime.
- Portfolio holdings, current value, market price APIs, manual valuations, and analysis belong in separate investment tables/modules later.

Money rules:

- Store VND as integer amounts, never floating point.
- Show VND with Vietnamese grouping, for example `1.217.720 đ`.
- Store the transaction direction in `type`, not in formatted amount strings.
- Derive human-facing signs from `type`, for example `+15.000.000 đ` for income and `-820.460 đ` for expense.
- UI and Excel/CSV exports should format VND for humans while preserving integer storage.
- UI can display "VND" in high-level summary cards, but compact lists should prefer `đ`.

## UI Direction

The visual direction is Spendee-like but not a clone:

- Quiet app shell with top wallet selector, tabs, and user area shared across pages.
- Keep major workflows on separate pages, not one long all-in-one dashboard.
- `/transactions`: transaction entry, filters, period summaries, and grouped transaction list.
- `/overview`: period reporting, balances, charts, income/expense breakdowns.
- `/recurring`: recurring transaction rule management.
- `/settings`: wallet category and tag settings.
- `/budgets`: budget planning placeholder until that module is implemented.
- Desktop should feel like a financial dashboard.
- Tablet should keep the same structure with wrapped controls.
- Mobile should stack controls and transaction rows without text overlap.
- Use clear red for expenses and green for income/positive changes.
- Do not include cashback/refund/percentage UI in MoniQ transactions.

## Project Structure

Important paths:

- `src/app/page.tsx`: redirects to `/transactions`.
- `src/app/transactions/page.tsx`: transaction page.
- `src/app/overview/page.tsx`: reporting page.
- `src/app/recurring/page.tsx`: recurring rule management page.
- `src/app/settings/page.tsx`: category/tag settings page.
- `src/components/AppShell.tsx`: shared wallet header and navigation.
- `src/components/TransactionList.tsx`: current dashboard/transaction view.
- `src/components/OverviewDashboard.tsx`: overview/reporting page content.
- `src/components/RecurringRulesPage.tsx`: recurring rules page content.
- `src/components/WalletSettingsPage.tsx`: wallet settings page content.
- `src/lib/formatters.ts`: VND and date formatting helpers.
- `src/lib/queries/transaction.query.ts`: React Query hooks.
- `src/app/api/transactions`: transaction API route handlers.
- `src/services/transaction.service.ts`: transaction business logic; currently mock-backed.
- `src/db/schema`: Drizzle schema definitions.
- `SETUP.md`: human-readable architecture notes.

## Commands

Use these before finishing meaningful changes:

```bash
yarn lint
yarn build
```

Database commands:

```bash
yarn db:generate
yarn db:push
yarn db:studio
```

## Implementation Rules

- Prefer existing project patterns over introducing new frameworks.
- Keep data fetching through API routes and services. Do not import `db` into client components.
- Derive public transaction types from Drizzle schema where practical.
- Keep mock IDs and mock data temporary; remove them when auth and seeded categories are implemented.
- When adding investment support later, create separate investment cash-flow, asset, holding, trade, valuation, and price tables.
- Keep docs updated when product scope, schema, or data flow changes.
