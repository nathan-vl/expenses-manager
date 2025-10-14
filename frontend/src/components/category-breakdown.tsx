"use client"

import { Card } from "@/shared/ui/card"
import { useTransactionStore } from "@/lib/store"
import { Pie, PieChart, Cell, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/shared/ui/chart"

export function CategoryBreakdown() {
  const transactions = useTransactionStore((state) => state.transactions)

  const expenses = transactions.filter((t) => t.type === "expense")
  const totalExpenses = expenses.reduce((sum, t) => sum + t.amount, 0)

  const categoryTotals = expenses.reduce(
    (acc, transaction) => {
      acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount
      return acc
    },
    {} as Record<string, number>,
  )

  const categories = Object.entries(categoryTotals)
    .map(([category, amount]) => ({
      category,
      amount,
      percentage: totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0,
    }))
    .sort((a, b) => b.amount - a.amount)

  const categoryColors: Record<string, string> = {
    Food: "hsl(var(--chart-1))",
    Transport: "hsl(var(--chart-2))",
    Entertainment: "hsl(var(--chart-3))",
    Shopping: "hsl(var(--chart-4))",
    Bills: "hsl(var(--chart-5))",
    Other: "hsl(var(--muted-foreground))",
  }

  const pieData = categories.map((cat) => ({
    name: cat.category,
    value: cat.amount,
  }))

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold">Expenses by Category</h2>

      {categories.length > 0 && (
        <div className="mt-6">
          <ChartContainer
            config={Object.fromEntries(
              Object.entries(categoryColors).map(([key, color]) => [key.toLowerCase(), { label: key, color }]),
            )}
            className="h-[200px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={categoryColors[entry.name] || "hsl(var(--muted-foreground))"} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      )}

      <div className="mt-6 space-y-4">
        {categories.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground py-8">No expenses recorded yet.</p>
        ) : (
          categories.map(({ category, amount, percentage }) => (
            <div key={category} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{category}</span>
                <span className="text-muted-foreground">
                  ${amount.toFixed(2)} ({percentage.toFixed(0)}%)
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: categoryColors[category] || "hsl(var(--muted-foreground))",
                  }}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  )
}
