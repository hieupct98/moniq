import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

/**
 * This is a reference to Supabase's built-in auth.users table
 * Used for foreign key relationships
 * You don't manage this table directly — Supabase handles it
 */
export const authUsers = pgTable(
  "users",
  {
    id: uuid("id").primaryKey(),
    email: text("email").notNull().unique(),
    createdAt: timestamp("created_at", { withTimezone: true }),
  },
  table => ({
    // Note: This table is in the 'auth' schema in Supabase
    // Configure the schema in drizzle.config.ts
  })
);
