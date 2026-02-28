import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import api from "@/lib/axios";
import type {
  CreateTransactionDto,
  Transaction,
} from "@/types/transaction.type";

// ─── Cache Keys ───────────────────────────────────────────────────────────────

export const transactionKeys = {
  all: ["transactions"] as const,
  byId: (id: string) => ["transactions", id] as const,
};

// ─── Fetchers (plain axios, no RQ) ────────────────────────────────────────────

const fetchTransactions = (): Promise<Transaction[]> =>
  api.get("/transactions").then(r => r.data);

const fetchTransactionById = (id: string): Promise<Transaction> =>
  api.get(`/transactions/${id}`).then(r => r.data);

const createTransaction = (data: CreateTransactionDto): Promise<Transaction> =>
  api.post("/transactions", data).then(r => r.data);

// ─── Hooks ────────────────────────────────────────────────────────────────────

export function useTransactions() {
  return useQuery({
    queryKey: transactionKeys.all,
    queryFn: fetchTransactions,
  });
}

export function useTransaction(id: string) {
  return useQuery({
    queryKey: transactionKeys.byId(id),
    queryFn: () => fetchTransactionById(id),
    enabled: !!id,
  });
}

export function useCreateTransaction() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      // Refetch transactions list after creating a new one
      queryClient.invalidateQueries({ queryKey: transactionKeys.all });
    },
  });
}
