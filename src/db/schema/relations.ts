import { relations } from "drizzle-orm";

import { categories } from "./categories";
import { profiles } from "./profiles";
import { recurringTransactions } from "./recurring-transactions";
import { tags } from "./tags";
import { transactions } from "./transactions";

export const profilesRelations = relations(profiles, ({ many }) => ({
  categories: many(categories),
  recurringTransactions: many(recurringTransactions),
  tags: many(tags),
  transactions: many(transactions),
}));

export const categoriesRelations = relations(categories, ({ one, many }) => ({
  user: one(profiles, {
    fields: [categories.userId],
    references: [profiles.id],
  }),
  recurringTransactions: many(recurringTransactions),
  transactions: many(transactions),
}));

export const tagsRelations = relations(tags, ({ one }) => ({
  user: one(profiles, {
    fields: [tags.userId],
    references: [profiles.id],
  }),
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

export const recurringTransactionsRelations = relations(
  recurringTransactions,
  ({ one }) => ({
    user: one(profiles, {
      fields: [recurringTransactions.userId],
      references: [profiles.id],
    }),
    category: one(categories, {
      fields: [recurringTransactions.categoryId],
      references: [categories.id],
    }),
  })
);
