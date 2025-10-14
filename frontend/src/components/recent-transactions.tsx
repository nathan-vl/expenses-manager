"use client";

import { Card } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { useTransactionStore } from "@/lib/store";
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";

export function RecentTransactions() {
  const transactions = useTransactionStore((state) => state.transactions);

  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const groupedByMonth = sortedTransactions.reduce((groups, transaction) => {
    const date = new Date(transaction.date);
    const monthYear = date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });

    if (!groups[monthYear]) {
      groups[monthYear] = [];
    }
    groups[monthYear].push(transaction);
    return groups;
  }, {} as Record<string, typeof sortedTransactions>);

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold">Recent Transactions</h2>

      <div className="mt-6 space-y-6">
        {sortedTransactions.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground py-8">
            No transactions yet. Add your first transaction to get started.
          </p>
        ) : (
          Object.entries(groupedByMonth).map(
            ([monthYear, monthTransactions]) => (
              <div key={monthYear} className="space-y-4">
                <div className="flex items-center gap-3">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    {monthYear}
                  </h3>
                  <div className="h-px flex-1 bg-border" />
                </div>

                <div className="space-y-4">
                  {monthTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`rounded-full p-2 ${
                            transaction.type === "income"
                              ? "bg-chart-1/10"
                              : "bg-chart-2/10"
                          }`}
                        >
                          {transaction.type === "income" ? (
                            <ArrowUpCircle className="h-5 w-5 text-chart-1" />
                          ) : (
                            <ArrowDownCircle className="h-5 w-5 text-chart-2" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">
                            {transaction.description}
                          </p>
                          <div className="mt-1 flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs">
                              {transaction.category}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {new Date(transaction.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      <p
                        className={`text-lg font-semibold ${
                          transaction.type === "income"
                            ? "text-chart-1"
                            : "text-chart-2"
                        }`}
                      >
                        {transaction.type === "income" ? "+" : "-"}$
                        {transaction.amount.toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )
          )
        )}
      </div>
    </Card>
  );
}
