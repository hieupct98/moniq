import { NextResponse } from "next/server";

import { transactionService } from "@/services/transaction.service";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const transaction = await transactionService.findById(params.id);

    if (!transaction) {
      return NextResponse.json(
        { error: "Transaction not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(transaction);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch transaction" },
      { status: 500 }
    );
  }
}
