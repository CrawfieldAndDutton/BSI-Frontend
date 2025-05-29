
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  trend?: {
    value: number;
    positive: boolean;
  };
  className?: string;
}

export function StatCard({ title, value, icon, trend, className }: StatCardProps) {
  return (
    <div className={cn("stats-card", className)}>
      <div className="flex justify-between items-start mb-2">
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        {icon && <div className="text-navy-500">{icon}</div>}
      </div>
      <div className="flex items-end justify-between">
        <p className="text-2xl font-semibold text-navy-800">{value}</p>
        {trend && (
          <div className={cn("text-xs font-medium flex items-center", {
            "text-green-600": trend.positive,
            "text-red-600": !trend.positive
          })}>
            <span className="mr-1">{trend.positive ? "+" : "-"}{Math.abs(trend.value)}%</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={cn("transform", { "rotate-180": !trend.positive })}
            >
              <path
                d="M7 3.5L10.5 7L9.08 8.42L7.75 7.09V10.5H6.25V7.09L4.92 8.42L3.5 7L7 3.5Z"
                fill="currentColor"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
