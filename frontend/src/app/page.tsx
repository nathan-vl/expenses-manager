"use client";

import { AddTransactionDialog } from "@/components/add-transaction-dialog";
import { BalanceOverview } from "@/components/balance-overview";
import { CategoryBreakdown } from "@/components/category-breakdown";
import { Navbar } from "@/components/navbar";
import { RecentTransactions } from "@/components/recent-transactions";
import { SpendingTrendsChart } from "@/components/spending-trends-chart";
import { useTransactionStore } from "@/lib/store";

export default function Home() {
  const transactions = useTransactionStore((state) => state.transactions);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <BalanceOverview transactions={transactions} />
            <SpendingTrendsChart transactions={transactions} />
            <RecentTransactions />
          </div>

          <div className="space-y-6">
            <CategoryBreakdown />
          </div>
        </div>
      </div>

      <AddTransactionDialog />
    </div>
  );
}
