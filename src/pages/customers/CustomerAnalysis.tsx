
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { IncomeTab } from "./components/tabs/IncomeTab";
import { SpendingTab } from "./components/tabs/SpendingTab";
import { CreditTab } from "./components/tabs/CreditTab";
import { SavingsTab } from "./components/tabs/SavingsTab";
import { LifestyleTab } from "./components/tabs/LifestyleTab";
import { FraudRiskTab } from "./components/tabs/FraudRiskTab";
import { Chart } from "@/components/dashboard/Chart";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import { Bar, Line, BarChart, LineChart, Cell, PieChart, Pie } from "recharts";

// Using the same mock data as CustomerProfile
const incomeData = [
  { name: "Jan", value: 42000 },
  { name: "Feb", value: 42000 },
  { name: "Mar", value: 42000 },
  { name: "Apr", value: 45000 },
  { name: "May", value: 45000 },
  { name: "Jun", value: 45000 },
];

const salaryFrequencyData = [
  { name: "Weekly", value: 0 },
  { name: "Bi-Weekly", value: 0 },
  { name: "Monthly", value: 6 },
  { name: "Irregular", value: 0 },
];

const salaryVolatilityData = [
  { name: "Jan", volatility: 0 },
  { name: "Feb", volatility: 0 },
  { name: "Mar", volatility: 0 },
  { name: "Apr", volatility: 10 },
  { name: "May", volatility: 0 },
  { name: "Jun", volatility: 0 },
];

const spendingData = [
  { name: "Essentials", value: 35 },
  { name: "Housing", value: 30 },
  { name: "Transport", value: 15 },
  { name: "Entertainment", value: 10 },
  { name: "Others", value: 10 },
];

const spendingTrendData = [
  { name: "Jan", fixed: 28000, discretionary: 7500 },
  { name: "Feb", fixed: 28000, discretionary: 8200 },
  { name: "Mar", fixed: 28000, discretionary: 7800 },
  { name: "Apr", fixed: 30000, discretionary: 8500 },
  { name: "May", fixed: 30000, discretionary: 9100 },
  { name: "Jun", fixed: 30000, discretionary: 8700 },
];

const savingsData = [
  { name: "Jan", value: 8000 },
  { name: "Feb", value: 7500 },
  { name: "Mar", value: 9000 },
  { name: "Apr", value: 8500 },
  { name: "May", value: 10000 },
  { name: "Jun", value: 9500 },
];

const savingsInvestmentData = [
  { name: "Jan", savings: 8000, investment: 2000 },
  { name: "Feb", savings: 7500, investment: 2000 },
  { name: "Mar", savings: 9000, investment: 3000 },
  { name: "Apr", savings: 8500, investment: 2500 },
  { name: "May", savings: 10000, investment: 4000 },
  { name: "Jun", savings: 9500, investment: 3500 },
];

const debtData = [
  { name: "Personal Loan", value: 350000 },
  { name: "Credit Card", value: 45000 },
  { name: "Car Loan", value: 280000 },
];

const creditUtilizationData = [
  { name: "Credit Card 1", limit: 100000, used: 35000 },
  { name: "Credit Card 2", limit: 50000, used: 10000 },
];

const lifestyleData = [
  { category: "Travel", score: 45 },
  { category: "Dining", score: 70 },
  { category: "Shopping", score: 55 },
  { category: "Entertainment", score: 60 },
  { category: "Income Stability", score: 85 },
];

const fraudRiskData = [
  { amount: 500, frequency: 10, risk: "low" },
  { amount: 1000, frequency: 5, risk: "low" },
  { amount: 2000, frequency: 3, risk: "low" },
  { amount: 5000, frequency: 1, risk: "low" },
  { amount: 10000, frequency: 0.5, risk: "medium" },
  { amount: 50000, frequency: 0.1, risk: "high" },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#9b87f5'];

export default function CustomerAnalysis() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("income");

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-semibold">Customer Analysis</h2>
      
      {/* Quick Overview Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="shadow-md">
          <CardContent className="p-4">
            <h3 className="text-sm font-medium mb-2">Income Trend</h3>
            <ChartContainer 
              className="h-[100px]" 
              config={{
                income: { theme: { light: "#9b87f5", dark: "#9b87f5" } }
              }}
            >
              <LineChart data={incomeData}>
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  name="income"
                  stroke="var(--color-income, #9b87f5)" 
                  dot={false}
                  strokeWidth={2} 
                />
                <ChartTooltip content={<ChartTooltipContent />} />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card className="shadow-md">
          <CardContent className="p-4">
            <h3 className="text-sm font-medium mb-2">Spending Distribution</h3>
            <ChartContainer className="h-[100px]" config={{}}>
              <PieChart>
                <Pie
                  data={spendingData}
                  cx="50%"
                  cy="50%"
                  innerRadius={25}
                  outerRadius={40}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {spendingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card className="shadow-md">
          <CardContent className="p-4">
            <h3 className="text-sm font-medium mb-2">Credit Score</h3>
            <div className="flex items-center justify-center h-[100px]">
              <div className="relative w-32 h-32">
                <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#e0e0e0"
                    strokeWidth="10"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#9b87f5"
                    strokeWidth="10"
                    strokeDasharray={`${2.83 * 75} ${2.83 * 100}`}
                  />
                  <text
                    x="50"
                    y="50"
                    textAnchor="middle"
                    dy=".3em"
                    className="text-3xl font-bold fill-current"
                  >
                    750
                  </text>
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-md">
          <CardContent className="p-4">
            <h3 className="text-sm font-medium mb-2">Savings Growth</h3>
            <ChartContainer 
              className="h-[100px]" 
              config={{
                savings: { theme: { light: "#00C49F", dark: "#00C49F" } }
              }}
            >
              <BarChart data={savingsData}>
                <Bar 
                  dataKey="value" 
                  name="savings"
                  fill="var(--color-savings, #00C49F)" 
                  radius={[4, 4, 0, 0]}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="stats-card">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-[800px] grid-cols-6">
            <TabsTrigger value="income">Income</TabsTrigger>
            <TabsTrigger value="spending">Spending</TabsTrigger>
            <TabsTrigger value="credit">Credit</TabsTrigger>
            <TabsTrigger value="savings">Savings</TabsTrigger>
            <TabsTrigger value="lifestyle">Lifestyle</TabsTrigger>
            <TabsTrigger value="fraud">Fraud Risk</TabsTrigger>
          </TabsList>

          <TabsContent value="income">
            <IncomeTab incomeData={incomeData} />
          </TabsContent>

          <TabsContent value="spending">
            <SpendingTab spendingData={spendingData} />
          </TabsContent>

          <TabsContent value="credit">
            <CreditTab debtData={debtData} creditScore={750} />
          </TabsContent>

          <TabsContent value="savings">
            <SavingsTab savingsData={savingsData} />
          </TabsContent>

          <TabsContent value="lifestyle">
            <LifestyleTab />
          </TabsContent>

          <TabsContent value="fraud">
            <FraudRiskTab fraudRisk={12} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
