import { relations } from "drizzle-orm";

import { categories } from "./categories";
import { profiles } from "./profiles";
import { transactions } from "./transactions";

export const profilesRelations = relations(profiles, ({ many }) => ({
  categories: many(categories),
  transactions: many(transactions),
}));

export const categoriesRelations = relations(categories, ({ one, many }) => ({
  user: one(profiles, {
    fields: [categories.userId],
    references: [profiles.id],
  }),
  transactions: many(transactions),
}));

export const transactionsRelations = relations(transactions, ({ one }) => ({
  user: one(profiles, {
    fields: [transactions.userId],
    references: [profiles.id],
  }),
  category: one(categories, {
    fields: [transactions.categoryId],
    references: [categories.id],
  }),
}));
