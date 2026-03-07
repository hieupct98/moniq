# Database Setup Guide

## 1. Create Supabase Project

- Go to [supabase.com](https://supabase.com)
- Create a new project
- Wait for the database to initialize
- Copy your credentials:
  - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
  - **Anon Key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - **Service Role Key** → `SUPABASE_SERVICE_ROLE_KEY`
  - **Database URL** → `DATABASE_URL`

## 2. Set Environment Variables

Create `.env.local` in your project root:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
DATABASE_URL=postgresql://postgres:password@db.region.supabase.co:5432/postgres
```

## 3. Configure Auth in Supabase Console

1. Go to **Authentication → Providers**
2. Enable **Email** (default)
3. Enable **Google** (optional)
4. Configure redirect URLs in **Redirect URLs**:
   - `http://localhost:3000/**`
   - `https://yourdomain.com/**`

## 4. Generate Initial Migration

Run Drizzle Kit to generate the migration SQL:

```bash
yarn drizzle-kit generate
```

This creates SQL files in `src/db/migrations/`. Review them to ensure they match your schema.

## 5. Apply Migrations

Option A - Using Supabase Console (simplest):

1. Go to Supabase **SQL Editor**
2. Open each migration file (`src/db/migrations/*.sql`)
3. Copy and paste the SQL, then run it

Option B - Using Drizzle Push (requires DATABASE_URL):

```bash
yarn drizzle-kit push
```

## 6. Seed Default Categories (Optional)

Once tables are created, you may want to seed default income/expense categories:

```sql
INSERT INTO categories (id, user_id, name, icon, color, type, created_at)
VALUES
  ('550e8400-e29b-41d4-a716-446655440001', NULL, 'Salary', '💰', '#10B981', 'income', now()),
  ('550e8400-e29b-41d4-a716-446655440002', NULL, 'Bonus', '🎉', '#3B82F6', 'income', now()),
  ('550e8400-e29b-41d4-a716-446655440003', NULL, 'Groceries', '🛒', '#F59E0B', 'expense', now()),
  ('550e8400-e29b-41d4-a716-446655440004', NULL, 'Entertainment', '🍜', '#EC4899', 'expense', now()),
  ('550e8400-e29b-41d4-a716-446655440005', NULL, 'Transport', '🚕', '#8B5CF6', 'expense', now());
```

## 7. Test Connection

Use this simple API route to test the connection:

```typescript
// src/app/api/health/route.ts
import { db } from "@/db/db";
import { profiles } from "@/db/schema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await db.select().from(profiles).limit(1);
    return NextResponse.json({ ok: true, data: result });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: String(error) },
      { status: 500 }
    );
  }
}
```

## 8. Development Workflow

**Generate migrations after schema changes:**

```bash
yarn drizzle-kit generate
```

**Push migrations (be careful in production!):**

```bash
yarn drizzle-kit push
```

**Drop database (dev only):**

```bash
yarn drizzle-kit drop
```

**Studio (visual DB browser):**

```bash
yarn drizzle-kit studio
```

Then open http://local.drizzle.studio

---

## Folder Structure

```
src/db/
├── schema.ts           # Drizzle table definitions
├── db.ts               # Drizzle client instance
└── migrations/         # Auto-generated SQL files
lib/
├── supabase-client.ts  # Client-side Supabase setup
└── supabase-server.ts  # Server-side Supabase setup
drizzle.config.ts      # Drizzle Kit configuration
.env.example           # Environment variable template
```

---

## Useful Links

- [Drizzle Docs](https://orm.drizzle.team)
- [Drizzle + Supabase Guide](https://orm.drizzle.team/docs/get-started/node-postgres/supabase)
- [Supabase Docs](https://supabase.com/docs)
- [Next.js + Supabase Auth](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)
