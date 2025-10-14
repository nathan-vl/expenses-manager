import { Card } from "@/shared/ui/card";
import { ArrowDownCircle, ArrowUpCircle, Wallet } from "lucide-react";
import { Transaction } from "@/shared/types/transaction";
import { JSX } from "react";

function ValueCard({
  icon,
  title,
  text,
  iconBgColor,
  textColor,
}: {
  icon: JSX.Element;
  title: string;
  text: string;
  iconBgColor: string;
  textColor?: string;
}) {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-4">
        <div className={`rounded-full p-3 ${iconBgColor}`}>{icon}</div>
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p
            className={`mt-1 text-2xl font-semibold tracking-tight ${textColor}`}
          >
            {text}
          </p>
        </div>
      </div>
    </Card>
  );
}

export function BalanceOverview({
  transactions,
}: {
  transactions: Transaction[];
}) {
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const formatter = Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const balance = totalIncome - totalExpenses;

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <ValueCard
        icon={<Wallet className="h-6 w-6 text-primary" />}
        title="Balance"
        text={formatter.format(balance)}
        iconBgColor="bg-primary/10"
      />

      <ValueCard
        icon={<ArrowUpCircle className="h-6 w-6 text-chart-1" />}
        title="Income"
        text={formatter.format(totalIncome)}
        iconBgColor="bg-primary/10"
        textColor="text-chart-1"
      />

      <ValueCard
        icon={<ArrowDownCircle className="h-6 w-6 text-chart-2" />}
        title="Expenses"
        text={formatter.format(totalExpenses)}
        iconBgColor="bg-chart-2/10"
        textColor="text-chart-2"
      />
    </div>
  );
}
