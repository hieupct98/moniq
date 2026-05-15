# Project Architecture Guide

Next.js 16 · TypeScript · Tailwind · Drizzle ORM · Supabase · Vercel

---

## Stack

| Layer | Tool |
|---|---|
| UI | Next.js 16 App Router, Tailwind |
| Data fetching (FE) | React Query + Axios |
| API | Next.js API routes (`app/api/`) |
| Business logic | Service layer (`services/`) |
| ORM | Drizzle ORM |
| Database + Auth | Supabase (Postgres + Auth) |
| Deployment | Vercel |

---

## Folder Structure

```
src/
├── app/
│   ├── transactions/        ← transaction list and creation
│   ├── overview/            ← reporting and charts
│   ├── recurring/           ← recurring transaction rules
│   ├── budgets/             ← budget module placeholder
│   ├── settings/            ← category and tag settings
│   ├── api/                 ← Next.js API route handlers
│   ├── layout.tsx
│   ├── page.tsx             ← redirects to /transactions
│   └── providers.tsx        ← React Query provider
│
├── components/
│   ├── AppShell.tsx         ← shared wallet header and navigation
│   ├── ui/                  ← reusable UI primitives
│   └── [feature]/           ← feature components
│
├── db/
│   ├── schema/              ← Drizzle table + enum definitions
│   │   └── index.ts         ← re-exports all schema
│   └── index.ts             ← drizzle client instance
│
├── lib/
│   ├── queries/             ← React Query hooks (FE only)
│   ├── supabase/
│   │   ├── client.ts        ← browser auth client
│   │   └── server.ts        ← server auth client
│   └── utils.ts             ← cn(), formatVND(), helpers
│
├── services/                ← server-side business logic
├── types/                   ← types inferred from Drizzle schema
│
drizzle.config.ts
```

---

## Data Flow

```
UI component
  → lib/queries/       (React Query hook calls API via axios)
    → app/api/         (Next.js route handler)
      → services/      (business logic, validation)
        → db/          (Drizzle query to Supabase Postgres)
```

---

## Layer Rules

- **`lib/queries/`** — FE only. React Query hooks that call `app/api/` routes. Never imports from `services/` or `db/`.
- **`services/`** — Server only. Called by API routes only. Handles business logic.
- **`db/`** — Server only. Never imported on the client side.
- **`lib/supabase/`** — Auth only (`signIn`, `signOut`, `getSession`). Data fetching always goes through the API → service → db flow.
- **`types/`** — Always derived from Drizzle schema using `InferSelectModel` / `InferInsertModel`. Never write duplicate manual types.

---

## DB Schema

```
auth.users (Supabase built-in)
  ↓
profiles        id, display_name, avatar_url
  ↓
categories      id, user_id (null = system default), name, icon, color
  ↓
transactions    id, user_id, category_id, occurred_at, type, note, label, amount (integer VND)
recurring_transactions
                id, user_id, category_id, type, note, label, amount, frequency, start_at, end_at, next_run_at, stopped_at, is_active
tags            id, user_id (null = system default), name, color
```

- `amount` is an absolute integer `bigint` — VND has no decimals, never use float for money
- `type` is `income` or `expense` — use it to derive signs for UI, balances, and Excel/CSV exports
- `occurred_at` is a timestamp — default to current time, but allow the user to choose a specific date and time
- `user_id` on categories is nullable — system defaults have `null`, custom ones reference the user
- Cashback/refund fields are intentionally not part of MoniQ's transaction model
- Recurring transactions are rules with start/end datetimes and can be stopped early with `stopped_at`
- Categories and tags need settings UI for editing names, colors, and category icons
- `Ví đầu tư` should be a separate future module with investment type, signed amount in/out, and datetime
