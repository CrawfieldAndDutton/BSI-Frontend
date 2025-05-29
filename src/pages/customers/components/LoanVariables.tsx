
import { Calculator, Variable } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface LoanVariable {
  name: string;
  value: string;
  impact: "high" | "medium" | "low";
}

const variables: LoanVariable[] = [
  { name: "Debt-to-Income Ratio", value: "32%", impact: "high" },
  { name: "Employment Duration", value: "5 years", impact: "medium" },
  { name: "Credit Utilization", value: "45%", impact: "high" },
  { name: "Payment History", value: "Good", impact: "medium" },
];

export function LoanVariables() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <div className="flex items-center space-x-2">
          <Variable className="w-5 h-5 text-navy-800" />
          <h3 className="font-medium text-lg">Loan Variables</h3>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid sm:grid-cols-2 gap-4 mt-4">
          {variables.map((variable) => (
            <div
              key={variable.name}
              className="p-4 rounded-lg border bg-card-gradient"
            >
              <div className="flex justify-between items-start mb-2">
                <p className="font-medium text-navy-800">{variable.name}</p>
                <span className={`text-sm px-2 py-1 rounded ${
                  variable.impact === "high" 
                    ? "bg-red-100 text-red-700"
                    : variable.impact === "medium"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
                }`}>
                  {variable.impact.charAt(0).toUpperCase() + variable.impact.slice(1)} Impact
                </span>
              </div>
              <p className="text-2xl font-semibold text-navy-800">{variable.value}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
