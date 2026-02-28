import type {
  Transaction,
  CreateTransactionDto,
} from "@/types/transaction.type";

// Simulated DB — replace with Prisma / Drizzle / Supabase client later
const mockTransactions: Transaction[] = [
  {
    id: "1",
    title: "Salary",
    amount: 5000,
    type: "income",
    category: "Work",
    date: "2024-03-01",
  },
  {
    id: "2",
    title: "Netflix",
    amount: 15,
    type: "expense",
    category: "Entertainment",
    date: "2024-03-02",
  },
  {
    id: "3",
    title: "Groceries",
    amount: 120,
    type: "expense",
    category: "Food",
    date: "2024-03-03",
  },
  {
    id: "4",
    title: "Freelance project",
    amount: 800,
    type: "income",
    category: "Work",
    date: "2024-03-05",
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
    // TODO: replace → db.transaction.create({ data })
    const newTransaction: Transaction = {
      id: String(mockTransactions.length + 1),
      ...data,
    };
    mockTransactions.push(newTransaction);
    return newTransaction;
  },
};
