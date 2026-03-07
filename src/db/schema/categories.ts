import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

import { transactionTypeEnum } from "./enums";
import { profiles } from "./profiles";

/**
 * Categories - income/expense categories
 * System defaults have user_id = null
 * Users can create custom categories
 */
export const categories = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => profiles.id, { onDelete: "cascade" })
    .notNull(),
  name: text("name").notNull(),
  icon: text("icon").notNull(), // emoji or icon name e.g. "🍜" or "food"
  color: text("color").notNull(), // hex e.g. "#FF5733"
  type: transactionTypeEnum("type").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
