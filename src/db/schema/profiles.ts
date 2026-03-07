import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { authUsers } from "./auth-users";

/**
 * Profiles - extends Supabase's auth.users
 * Every user who signs up gets a profile record
 */
export const profiles = pgTable("profiles", {
  id: uuid("id")
    .primaryKey()
    .references(() => authUsers.id),
  displayName: text("display_name"),
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
