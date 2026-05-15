import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

import { transactions } from "@/db/schema";

export type Transaction = InferSelectModel<typeof transactions>;
export type CreateTransactionDto = Pick<
  InferInsertModel<typeof transactions>,
  "userId" | "categoryId" | "occurredAt" | "type" | "note" | "label" | "amount"
>;
