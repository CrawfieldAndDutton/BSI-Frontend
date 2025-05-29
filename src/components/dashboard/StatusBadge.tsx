
import { getStatusColor } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const statusColor = getStatusColor(status);
  
  return (
    <span
      className={cn(
        "px-2.5 py-1 text-xs font-medium rounded-full",
        statusColor,
        className
      )}
    >
      {status}
    </span>
  );
}
