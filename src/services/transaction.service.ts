import type {
  CreateTransactionDto,
  Transaction,
} from "@/types/transaction.type";

const mockUserId = "550e8400-e29b-41d4-a716-446655440000";
const foodCategoryId = "550e8400-e29b-41d4-a716-446655440003";
const shoppingCategoryId = "550e8400-e29b-41d4-a716-446655440004";

// Simulated DB - replace with Drizzle queries once auth is wired.
const mockTransactions: Transaction[] = [
  {
    id: "650e8400-e29b-41d4-a716-446655440001",
    userId: mockUserId,
    categoryId: shoppingCategoryId,
    occurredAt: new Date("2026-03-08T10:24:00.000+07:00"),
    type: "expense",
    note: "Shopee",
    label: "Khác",
    amount: 1217720,
    createdAt: new Date("2026-03-08T00:00:00.000Z"),
  },
  {
    id: "650e8400-e29b-41d4-a716-446655440002",
    userId: mockUserId,
    categoryId: foodCategoryId,
    occurredAt: new Date("2026-03-09T08:10:00.000+07:00"),
    type: "expense",
    note: "OP XanhSM GSM Ha Noi VN",
    label: "Đi lại",
    amount: 32000,
    createdAt: new Date("2026-03-09T00:00:00.000Z"),
  },
  {
    id: "650e8400-e29b-41d4-a716-446655440003",
    userId: mockUserId,
    categoryId: foodCategoryId,
    occurredAt: new Date("2026-03-14T18:30:00.000+07:00"),
    type: "expense",
    note: "MOCA",
    label: "Khác",
    amount: 214000,
    createdAt: new Date("2026-03-14T00:00:00.000Z"),
  },
  {
    id: "650e8400-e29b-41d4-a716-446655440004",
    userId: mockUserId,
    categoryId: shoppingCategoryId,
    occurredAt: new Date("2026-03-20T21:05:00.000+07:00"),
    type: "expense",
    note: "Shopee",
    label: "Khác",
    amount: 820460,
    createdAt: new Date("2026-03-20T00:00:00.000Z"),
  },
  {
    id: "650e8400-e29b-41d4-a716-446655440005",
    userId: mockUserId,
    categoryId: foodCategoryId,
    occurredAt: new Date("2026-03-25T09:00:00.000+07:00"),
    type: "income",
    note: "Salary",
    label: "Lương",
    amount: 15000000,
    createdAt: new Date("2026-03-25T00:00:00.000Z"),
  },
];

export const transactionService = {
  findAll: async (): Promise<Transaction[]> => {
    // TODO: replace → db.transaction.findMany()
    return mockTransactions;
  },

  findById: async (id: string): Promise<Transaction | null> => {
    // TODO: replace → db.transaction.findUnique({ where: { id } })
    return mockTransactions.find(t => t.id === id) ?? null;
  },

  create: async (data: CreateTransactionDto): Promise<Transaction> => {
    // TODO: replace with Drizzle insert once auth is wired.
    const newTransaction: Transaction = {
      id: crypto.randomUUID(),
      createdAt: new Date(),
      ...data,
      occurredAt: data.occurredAt ?? new Date(),
      note: data.note ?? null,
      label: data.label ?? null,
      amount: Math.abs(data.amount),
    };
    mockTransactions.push(newTransaction);
    return newTransaction;
  },
};
