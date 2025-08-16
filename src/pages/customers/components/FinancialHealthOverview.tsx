import { customerApi } from "@/apis/modules/customer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency, formatPercentage } from "@/lib/utils";
import { useEffect, useState } from "react";

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

export function FinancialHealthOverview({
  scores,
  financialMetrics,
}: FinancialHealthOverviewProps) {
  const [overview, setOverview] = useState<any>();

  // Set page title
  useEffect(() => {
    (async () => {
      const pathParts = window.location.pathname.split("/");
      const customerId = pathParts[pathParts.length - 1];
      const response = await customerApi.customer_overview(customerId);
      console.log(response.data);
      setOverview(response.data);
    })();
  }, []);

  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold text-navy-800 mb-4">
        Financial Health Overview
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-white to-gray-50 hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-navy-600">
              Credit Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-navy-800">
              {overview?.financial_health_overview?.Credit_Score?.value ||
                "N/A"}
            </div>
            <CardDescription
              className={
                overview?.financial_health_overview?.Credit_Score?.value > 700
                  ? "text-green-600"
                  : "text-amber-600"
              }
            >
              {overview?.financial_health_overview?.Credit_Score?.status ||
                "N/A"}
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-gray-50 hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-navy-600">
              Income Stability
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-navy-800">
              {overview?.financial_health_overview?.Income_Stability?.value ||
                "0"}
              %
            </div>
            <CardDescription
              className={
                scores.incomeStability > 80
                  ? "text-green-600"
                  : "text-amber-600"
              }
            >
              {overview?.financial_health_overview?.Income_Stability?.status ||
                "N/A"}
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-gray-50 hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-navy-600">
              Fraud Risk
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-navy-800">
              {overview?.financial_health_overview?.Fraud_Risk?.value || "N/A"}%
            </div>
            <CardDescription
              className={
                scores.fraudRisk < 20 ? "text-green-600" : "text-red-600"
              }
            >
              {overview?.financial_health_overview?.Fraud_Risk?.status || "N/A"}
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-gray-50 hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-navy-600">
              Credit Cards
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-navy-800">
              {overview?.financial_health_overview?.Credit_Cards?.value ||
                "N/A"}
            </div>
            <CardDescription>
              {" "}
              {overview?.financial_health_overview?.Credit_Cards?.status ||
                "N/A"}
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-gray-50 hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-navy-600">
              Bank Accounts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-navy-800">
              {overview?.financial_health_overview?.Bank_Accounts?.value ||
                "N/A"}
            </div>
            <CardDescription>
              {" "}
              {overview?.financial_health_overview?.Bank_Accounts?.status ||
                "N/A"}
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-gray-50 hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-navy-600">
              Risk Assessment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-navy-800">
              {overview?.financial_health_overview?.Risk_Assessment?.value ||
                "N/A"}
            </div>
            <CardDescription>
              {overview?.financial_health_overview?.Risk_Assessment?.status ||
                "N/A"}
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-gray-50 hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-navy-600">
              Active Loans
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-navy-800">
              {overview?.financial_health_overview?.Active_Loans?.value ||
                "N/A"}
            </div>
            <CardDescription>
              {overview?.financial_health_overview?.Active_Loans?.status ||
                "N/A"}
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-gray-50 hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-navy-600">
              Loan Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-navy-800">
              {overview?.financial_health_overview?.Loan_Progress?.value ||
                "N/A"}
            </div>
            <CardDescription>
              {overview?.financial_health_overview?.Loan_Progress?.status ||
                "N/A"}
            </CardDescription>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-gray-50 hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-navy-600">
              Monthly Savings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-navy-800">
              {overview?.financial_health_overview?.Monthly_Savings?.value ||
                "N/A"}
            </div>
            <CardDescription>
              {overview?.financial_health_overview?.Monthly_Savings?.status ||
                "N/A"}
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
