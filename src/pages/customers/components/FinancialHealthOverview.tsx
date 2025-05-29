
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatPercentage } from "@/lib/utils";

interface FinancialMetrics {
  creditCards: number;
  bankAccounts: number;
  riskGroup: string;
  runningLoans: number;
  loanAmountPending: number;
  loanCompletionPercentage: number;
  signalsGenerated: number;
  averageMonthlyIncome: number;
  averageMonthlyExpenditure: number;
  averageMonthlySavings: number;
}

interface Scores {
  creditScore: number;
  incomeStability: number;
  fraudRisk: number;
}

interface FinancialHealthOverviewProps {
  scores: Scores;
  financialMetrics: FinancialMetrics;
}

export function FinancialHealthOverview({ scores, financialMetrics }: FinancialHealthOverviewProps) {
  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold text-navy-800 mb-4">Financial Health Overview</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-white to-gray-50 hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-navy-600">Credit Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-navy-800">{scores.creditScore}</div>
            <CardDescription className={scores.creditScore > 700 ? "text-green-600" : "text-amber-600"}>
              {scores.creditScore > 700 ? "Excellent" : "Good"}
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-gray-50 hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-navy-600">Income Stability</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-navy-800">{formatPercentage(scores.incomeStability)}</div>
            <CardDescription className={scores.incomeStability > 80 ? "text-green-600" : "text-amber-600"}>
              {scores.incomeStability > 80 ? "Very Stable" : "Stable"}
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-gray-50 hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-navy-600">Fraud Risk</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-navy-800">{formatPercentage(scores.fraudRisk)}</div>
            <CardDescription className={scores.fraudRisk < 20 ? "text-green-600" : "text-red-600"}>
              {scores.fraudRisk < 20 ? "Low Risk" : "High Risk"}
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-gray-50 hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-navy-600">Credit Cards</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-navy-800">{financialMetrics.creditCards}</div>
            <CardDescription>Active Cards</CardDescription>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-gray-50 hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-navy-600">Bank Accounts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-navy-800">{financialMetrics.bankAccounts}</div>
            <CardDescription>Consented</CardDescription>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-gray-50 hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-navy-600">Risk Assessment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-navy-800">{financialMetrics.riskGroup}</div>
            <CardDescription>Overall Risk</CardDescription>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-gray-50 hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-navy-600">Active Loans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-navy-800">{financialMetrics.runningLoans}</div>
            <CardDescription>Running Loans</CardDescription>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-gray-50 hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-navy-600">Loan Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-navy-800">
              {formatPercentage(financialMetrics.loanCompletionPercentage)}
            </div>
            <CardDescription>Completion</CardDescription>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-gray-50 hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-navy-600">Monthly Savings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-navy-800">
              {formatCurrency(financialMetrics.averageMonthlySavings)}
            </div>
            <CardDescription>Average</CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
