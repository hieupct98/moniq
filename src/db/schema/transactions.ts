import {
  bigint,
  date,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { categories } from "./categories";
import { transactionTypeEnum } from "./enums";
import { profiles } from "./profiles";

/**
 * Transactions - core data table
 * Stores all income/expense records
 */
export const transactions = pgTable("transactions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => profiles.id, { onDelete: "cascade" })
    .notNull(),
  categoryId: uuid("category_id")
    .references(() => categories.id, { onDelete: "restrict" })
    .notNull(),
  amount: bigint("amount", { mode: "number" }).notNull(), // stored as VND, no decimals
  type: transactionTypeEnum("type").notNull(),
  date: date("date", { mode: "string" }).notNull(), // YYYY-MM-DD format
  note: text("note"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
