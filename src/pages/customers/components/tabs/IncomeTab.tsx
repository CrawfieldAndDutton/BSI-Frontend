import { Chart } from "@/components/dashboard/Chart";
import { ChartData } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useEffect, useState } from "react";
import { customerApi } from "@/apis/modules/customer";

interface IncomeTabProps {
  incomeData: ChartData[];
}

export function IncomeTab({ incomeData }: IncomeTabProps) {
  // Enhanced data for charts

  const [analysisData, setAnalysisData] = useState<any>([]);

  const salaryVsOtherData = [
    { name: "Salary", value: 45000 },
    { name: "Investments", value: 3500 },
    { name: "Rental", value: 8000 },
    { name: "Other", value: 2000 },
  ];

  const totalMonthlyIncome = salaryVsOtherData.reduce(
    (sum, item) => sum + item.value,
    0
  );
  const maxIncomeSource = salaryVsOtherData.reduce(
    (max, item) => (item.value > max.value ? item : max),
    salaryVsOtherData[0]
  );

  const COLORS = ["#9b87f5", "#7E69AB", "#E5DEFF", "#D3E4FD"];

  // Set page title
  useEffect(() => {
    (async () => {
      const pathParts = window.location.pathname.split("/");
      const customerId = pathParts[pathParts.length - 1];
      const response = await customerApi.customer_analysis(customerId);
      console.log(response.data.result);
      setAnalysisData(response.data.result);
    })();
  }, []);

  return (
    <div className="space-y-6">
      {/* Overview Card */}
      <Card className="shadow-sm">
        <CardContent className="p-6">
          <h4 className="text-lg font-medium mb-4">Income Overview</h4>
          <div className="space-y-4">
            <p className="text-sm">
              Total Monthly Income: ₹{totalMonthlyIncome.toLocaleString()}
            </p>
            <p className="text-sm">
              Primary Income Source: {maxIncomeSource.name} (₹
              {maxIncomeSource.value.toLocaleString()})
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                Stable Income
              </span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                Regular Deposits
              </span>
              <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                Multiple Sources
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* First row: Income Trend and Salary vs Other */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <h4 className="font-medium mb-4">Monthly Income Trend</h4>
            <Chart data={incomeData} type="line" colors={["#9b87f5"]} />
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6">
            <h4 className="font-medium mb-4">Salary vs Other Income</h4>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={salaryVsOtherData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#9b87f5"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {salaryVsOtherData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [
                    `₹${(value as number).toLocaleString()}`,
                    "",
                  ]}
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                    border: "1px solid #E2E8F0",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Income Sources Table */}
      <Card className="shadow-sm">
        <CardContent className="p-6">
          <h4 className="font-medium mb-4">Income Sources</h4>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-3 text-left">Source</th>
                  <th className="p-3 text-left">Description</th>
                  <th className="p-3 text-left">Frequency</th>
                  <th className="p-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3">ACME Corp</td>
                  <td className="p-3">Salary Credit</td>
                  <td className="p-3">Monthly</td>
                  <td className="p-3 text-right">₹45,000</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">Property Rental</td>
                  <td className="p-3">Apartment 305, Palm Residency</td>
                  <td className="p-3">Monthly</td>
                  <td className="p-3 text-right">₹8,000</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">Dividend Income</td>
                  <td className="p-3">Stock Portfolio</td>
                  <td className="p-3">Quarterly</td>
                  <td className="p-3 text-right">₹3,500</td>
                </tr>
                <tr>
                  <td className="p-3">Freelance Work</td>
                  <td className="p-3">Consulting Services</td>
                  <td className="p-3">Variable</td>
                  <td className="p-3 text-right">₹2,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Income Insights */}
      <Card className="shadow-sm">
        <CardContent className="p-6">
          <h4 className="font-medium mb-4">Income Insights</h4>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="h-2 w-2 rounded-full bg-green-500 mt-2 mr-2"></div>
              <p>Primary income from salary shows consistent monthly pattern</p>
            </div>
            <div className="flex items-start">
              <div className="h-2 w-2 rounded-full bg-green-500 mt-2 mr-2"></div>
              <p>
                Secondary income sources contribute 23% of total monthly income
              </p>
            </div>
            <div className="flex items-start">
              <div className="h-2 w-2 rounded-full bg-yellow-500 mt-2 mr-2"></div>
              <p>Slight income fluctuation detected in April (7% increase)</p>
            </div>
            <div className="flex items-start">
              <div className="h-2 w-2 rounded-full bg-green-500 mt-2 mr-2"></div>
              <p>Average monthly income: ₹58,500</p>
            </div>
            <div className="flex items-start">
              <div className="h-2 w-2 rounded-full bg-green-500 mt-2 mr-2"></div>
              <p>All income deposits arrive on predictable dates</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
