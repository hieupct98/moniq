import { NextResponse } from "next/server";

import { transactionService } from "@/services/transaction.service";

export async function GET() {
  try {
    const transactions = await transactionService.findAll();
    return NextResponse.json(transactions);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const transaction = await transactionService.create(body);
    return NextResponse.json(transaction, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create transaction" },
      { status: 500 }
    );
  }
}
