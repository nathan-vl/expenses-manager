"use client";

import { Card } from "@/components/ui/card";
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Bar,
  BarChart,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Transaction } from "@/shared/types/transaction";

export function SpendingTrendsChart({
  transactions,
}: {
  transactions: Transaction[];
}) {
  const dailyData = transactions.reduce((acc, transaction) => {
    const date = transaction.date;
    if (!acc[date]) {
      acc[date] = { date, income: 0, expenses: 0 };
    }
    if (transaction.type === "income") {
      acc[date].income += transaction.amount;
    } else {
      acc[date].expenses += transaction.amount;
    }
    return acc;
  }, {} as Record<string, { date: string; income: number; expenses: number }>);

  const chartData = Object.values(dailyData)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(-30);

  const netFlowData = chartData.map((item) => ({
    ...item,
    net: item.income - item.expenses,
  }));

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold">Spending Trends</h2>
      <p className="text-sm text-muted-foreground mt-1">
        Your financial activity over time
      </p>

      <Tabs defaultValue="overview" className="mt-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="net">Net Flow</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          {chartData.length === 0 ? (
            <div className="flex h-[300px] items-center justify-center text-sm text-muted-foreground">
              No transaction data available yet
            </div>
          ) : (
            <ChartContainer
              config={{
                income: {
                  label: "Income",
                  color: "hsl(var(--chart-1))",
                },
                expenses: {
                  label: "Expenses",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-muted"
                  />
                  <XAxis
                    dataKey="date"
                    tickFormatter={(value) =>
                      new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    }
                    className="text-xs"
                  />
                  <YAxis className="text-xs" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="income"
                    stroke="var(--color-income)"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="expenses"
                    stroke="var(--color-expenses)"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          )}
        </TabsContent>

        <TabsContent value="net" className="mt-6">
          {netFlowData.length === 0 ? (
            <div className="flex h-[300px] items-center justify-center text-sm text-muted-foreground">
              No transaction data available yet
            </div>
          ) : (
            <ChartContainer
              config={{
                net: {
                  label: "Net Flow",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={netFlowData}
                  margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-muted"
                  />
                  <XAxis
                    dataKey="date"
                    tickFormatter={(value) =>
                      new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    }
                    className="text-xs"
                  />
                  <YAxis className="text-xs" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar
                    dataKey="net"
                    fill="var(--color-net)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          )}
        </TabsContent>
      </Tabs>
    </Card>
  );
}
