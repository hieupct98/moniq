import {
  bigint,
  index,
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
  occurredAt: timestamp("occurred_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  type: transactionTypeEnum("type").notNull(),
  note: text("note"),
  label: text("label"),
  amount: bigint("amount", { mode: "number" }).notNull(), // Absolute integer VND, no decimals
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
}, table => [
  index("transactions_user_occurred_at_idx").on(table.userId, table.occurredAt),
  index("transactions_category_idx").on(table.categoryId),
]);
