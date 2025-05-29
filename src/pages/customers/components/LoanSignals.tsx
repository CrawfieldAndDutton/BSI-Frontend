
import { Signal } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface LoanSignal {
  type: string;
  description: string;
  severity: "critical" | "warning" | "info";
  date: string;
}

const signals: LoanSignal[] = [
  {
    type: "Late Payment",
    description: "Missed payment detected in last 30 days",
    severity: "critical",
    date: "2024-04-15"
  },
  {
    type: "Credit Score Change",
    description: "Credit score decreased by 25 points",
    severity: "warning",
    date: "2024-04-10"
  },
  {
    type: "New Credit Line",
    description: "New credit card account opened",
    severity: "info",
    date: "2024-04-05"
  }
];

export function LoanSignals() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <div className="flex items-center space-x-2">
          <Signal className="w-5 h-5 text-navy-800" />
          <h3 className="font-medium text-lg">Loan Signals</h3>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mt-4">
          {signals.map((signal) => (
            <div
              key={signal.type}
              className="p-4 rounded-lg border bg-white"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-medium text-navy-800">{signal.type}</p>
                  <p className="text-sm text-gray-600">{signal.description}</p>
                </div>
                <span className={`text-sm px-2 py-1 rounded ${
                  signal.severity === "critical" 
                    ? "bg-red-100 text-red-700"
                    : signal.severity === "warning"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-blue-100 text-blue-700"
                }`}>
                  {signal.severity.charAt(0).toUpperCase() + signal.severity.slice(1)}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                {new Date(signal.date).toLocaleDateString("en-IN")}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
