# MoniQ AI Context

This file is the source of truth for AI coding agents working on MoniQ. Keep it updated when architecture, product scope, or conventions change.

## Product

MoniQ is a personal money management app for one user. It is inspired by Spendee, but optimized for the owner's own workflow and Vietnamese Dong only.

Primary goals:

- Track daily income and expenses.
- Show a clear wallet-style transaction view for desktop, tablet, and mobile.
- Store money as whole VND amounts only. VND has no decimal cents in this app.
- Deploy as a fullstack Next.js app on Vercel.
- Use Supabase for free Postgres database and auth.
- Later support PWA on iPhone, then possibly a Tauri desktop app.
- Later add stock and crypto portfolio tracking as separate investment modules.

Explicit non-goals for the current spending module:

- Do not add cashback, refund, rewards, percentage, or card benefit fields to the core transaction model.
- Do not support multiple currencies until the owner asks for it.
- Do not mix investment holdings/trades into the spending transactions table.

## Tech Stack

- Framework: Next.js 16 App Router
- Language: TypeScript
- UI: React 19 and Tailwind CSS 4
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
- `categories`: income/expense categories. `user_id = null` means a system default category.
- `transactions`: core money records.

Transaction fields:

- `id`: UUID
- `userId`: owner profile UUID
- `categoryId`: category UUID
- `description`: main display text, equivalent to the "Chi tiêu" column in the user's spreadsheet examples
- `amount`: whole VND integer stored as `bigint`
- `type`: `income` or `expense`
- `date`: selected day in `YYYY-MM-DD`
- `note`: optional extra note
- `createdAt`: insertion timestamp

Money rules:

- Store VND as integer amounts, never floating point.
- Show VND with Vietnamese grouping, for example `1.217.720 đ`.
- Use explicit signs in summaries, for example `+15.000.000 đ` and `-820.460 đ`.
- UI can display "VND" in high-level summary cards, but compact lists should prefer `đ`.

## UI Direction

The visual direction is Spendee-like but not a clone:

- Quiet app shell with top wallet selector, tabs, user area, filters, summary cards, and grouped transaction list.
- Desktop should feel like a financial dashboard.
- Tablet should keep the same structure with wrapped controls.
- Mobile should stack controls and transaction rows without text overlap.
- Use clear red for expenses and green for income/positive changes.
- Do not include cashback/refund/percentage UI in MoniQ transactions.

## Project Structure

Important paths:

- `src/app/page.tsx`: main app shell.
- `src/components/TransactionList.tsx`: current dashboard/transaction view.
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
- When adding investment support later, create separate asset/holding/trade/price tables.
- Keep docs updated when product scope, schema, or data flow changes.
