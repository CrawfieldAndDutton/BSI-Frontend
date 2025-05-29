
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-IN").format(num);
}

export function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`;
}

export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function shortenName(name: string): string {
  const parts = name.split(" ");
  if (parts.length >= 2) {
    return `${parts[0]} ${parts[parts.length - 1].charAt(0)}.`;
  }
  return name;
}

export function getInitials(name: string): string {
  const parts = name.split(" ");
  if (parts.length >= 2) {
    return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`;
  }
  return parts[0].charAt(0);
}

export function classifyStatus(status: string): "positive" | "negative" | "neutral" {
  const lowercaseStatus = status.toLowerCase();
  
  if (["completed", "approved", "active", "paid", "success", "verified", "good"].some(s => lowercaseStatus.includes(s))) {
    return "positive";
  }
  
  if (["rejected", "overdue", "failed", "error", "declined", "poor"].some(s => lowercaseStatus.includes(s))) {
    return "negative";
  }
  
  return "neutral";
}

export function getStatusColor(status: string) {
  const classification = classifyStatus(status);
  
  const colors = {
    positive: "text-green-600 bg-green-50",
    negative: "text-red-600 bg-red-50",
    neutral: "text-blue-600 bg-blue-50",
  };
  
  return colors[classification];
}
