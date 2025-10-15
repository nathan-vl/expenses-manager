import { JSX } from "react";
import { Card } from "./ui/card";

export default function ValueCard({
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
