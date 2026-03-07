# Project Architecture Guide

Next.js 16 · TypeScript · Tailwind · Drizzle ORM · Supabase · Vercel

---

## Stack

| Layer | Tool |
|---|---|
| UI | Next.js 16 App Router, Tailwind, shadcn/ui |
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
│   ├── (auth)/              ← login page
│   ├── (dashboard)/         ← main app pages
│   ├── api/                 ← Next.js API route handlers
│   ├── layout.tsx
│   └── providers.tsx        ← React Query provider
│
├── components/
│   ├── ui/                  ← shadcn/ui primitives
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
categories      id, user_id (null = system default), name, icon, color, type
  ↓
transactions    id, user_id, category_id, amount (bigint VND), type, date, note
```

- `amount` is `bigint` — VND has no decimals, never use float for money
- `date` is `date` not `timestamptz` — user picks a day, no time needed
- `user_id` on categories is nullable — system defaults have `null`, custom ones reference the user