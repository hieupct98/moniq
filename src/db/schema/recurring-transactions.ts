import {
  bigint,
  boolean,
  index,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

import { categories } from "./categories";
import { recurringFrequencyEnum, transactionTypeEnum } from "./enums";
import { profiles } from "./profiles";

export const recurringTransactions = pgTable("recurring_transactions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => profiles.id, { onDelete: "cascade" })
    .notNull(),
  categoryId: uuid("category_id")
    .references(() => categories.id, { onDelete: "restrict" })
    .notNull(),
  type: transactionTypeEnum("type").notNull(),
  note: text("note"),
  label: text("label"),
  amount: bigint("amount", { mode: "number" }).notNull(),
  frequency: recurringFrequencyEnum("frequency").notNull(),
  startAt: timestamp("start_at", { withTimezone: true }).notNull(),
  endAt: timestamp("end_at", { withTimezone: true }),
  nextRunAt: timestamp("next_run_at", { withTimezone: true }),
  stoppedAt: timestamp("stopped_at", { withTimezone: true }),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
}, table => [
  index("recurring_transactions_user_next_run_idx").on(
    table.userId,
    table.nextRunAt
  ),
  index("recurring_transactions_category_idx").on(table.categoryId),
]);
