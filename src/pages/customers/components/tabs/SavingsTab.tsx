
import { Chart } from "@/components/dashboard/Chart";
import { ChartData } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
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
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Area
} from 'recharts';

interface SavingsTabProps {
  savingsData: ChartData[];
}

export function SavingsTab({ savingsData }: SavingsTabProps) {
  // Additional data for savings and investments
  const savingsInvestmentData = [
    { name: "Jan", savings: 8000, investments: 2000 },
    { name: "Feb", savings: 7500, investments: 2000 },
    { name: "Mar", savings: 9000, investments: 3000 },
    { name: "Apr", savings: 8500, investments: 2500 },
    { name: "May", savings: 10000, investments: 4000 },
    { name: "Jun", savings: 9500, investments: 3500 },
  ];
  
  // Calculate cumulative savings for waterfall chart
  const cumulativeSavingsData = [];
  let cumulativeSavings = 0;
  
  for (let i = 0; i < savingsData.length; i++) {
    cumulativeSavings += savingsData[i].value as number;
    cumulativeSavingsData.push({
      name: savingsData[i].name,
      value: savingsData[i].value,
      cumulative: cumulativeSavings
    });
  }

  // Savings vs expenses data
  const savingsVsExpensesData = [
    { name: "Jan", savings: 8000, expenses: 35500 },
    { name: "Feb", savings: 7500, expenses: 36200 },
    { name: "Mar", savings: 9000, expenses: 35800 },
    { name: "Apr", savings: 8500, expenses: 38500 },
    { name: "May", savings: 10000, expenses: 39100 },
    { name: "Jun", savings: 9500, expenses: 38700 },
  ];

  // Savings accounts data
  const savingsAccountsData = [
    { account: "HDFC Savings", type: "Savings", balance: 85000, interest: "3.5%" },
    { account: "SBI Fixed Deposit", type: "FD", balance: 100000, interest: "5.5%" },
    { account: "PPF Account", type: "PPF", balance: 150000, interest: "7.1%" },
    { account: "Mutual Funds", type: "Investment", balance: 75000, interest: "Variable" },
  ];
  
  const totalSavings = savingsAccountsData.reduce((sum, account) => sum + account.balance, 0);
  const averageMonthlySaving = savingsData.reduce((sum, item) => sum + (item.value as number), 0) / savingsData.length;
  const savingToIncomeRatio = 15; // Would be calculated from income data

  return (
    <div className="space-y-6">
      {/* Savings Overview */}
      <Card className="shadow-sm">
        <CardContent className="p-6">
          <h4 className="text-lg font-medium mb-4">Savings Overview</h4>
          <div className="space-y-4">
            <p className="text-sm">Total Savings: {formatCurrency(totalSavings)}</p>
            <p className="text-sm">Average Monthly Saving: {formatCurrency(averageMonthlySaving)}</p>
            <p className="text-sm">Saving to Income Ratio: {savingToIncomeRatio}%</p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Consistent Saver</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Multiple Saving Sources</span>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Could Optimize Returns</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* First Row: Savings Trend and Savings vs Expenses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <h4 className="font-medium mb-4">Monthly Savings Rate</h4>
            <Chart 
              data={savingsData} 
              type="bar" 
              colors={['#9b87f5']} 
              height={300} 
            />
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6">
            <h4 className="font-medium mb-4">Savings vs Expenses</h4>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart
                data={savingsVsExpensesData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#8E9196' }} />
                <YAxis tick={{ fontSize: 12, fill: '#8E9196' }} />
                <Tooltip 
                  formatter={(value) => [formatCurrency(value as number), '']}
                  contentStyle={{ 
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #E2E8F0'
                  }}
                />
                <Legend />
                <Bar dataKey="expenses" fill="#E5DEFF" name="Expenses" />
                <Line 
                  type="monotone" 
                  dataKey="savings" 
                  name="Savings" 
                  stroke="#9b87f5" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Second Row: Savings Accounts Table */}
      <Card className="shadow-sm">
        <CardContent className="p-6">
          <h4 className="font-medium mb-4">Savings Accounts</h4>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-3 text-left">Account</th>
                  <th className="p-3 text-left">Type</th>
                  <th className="p-3 text-right">Balance</th>
                  <th className="p-3 text-center">Interest Rate</th>
                  <th className="p-3 text-right">% of Total</th>
                </tr>
              </thead>
              <tbody>
                {savingsAccountsData.map((account, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-3">{account.account}</td>
                    <td className="p-3">{account.type}</td>
                    <td className="p-3 text-right">{formatCurrency(account.balance)}</td>
                    <td className="p-3 text-center">{account.interest}</td>
                    <td className="p-3 text-right">
                      {(account.balance / totalSavings * 100).toFixed(1)}%
                    </td>
                  </tr>
                ))}
                <tr className="bg-gray-50 font-medium">
                  <td colSpan={2} className="p-3">Total</td>
                  <td className="p-3 text-right">{formatCurrency(totalSavings)}</td>
                  <td className="p-3"></td>
                  <td className="p-3 text-right">100%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Cumulative Savings Growth */}
      <Card className="shadow-sm">
        <CardContent className="p-6">
          <h4 className="font-medium mb-4">Cumulative Savings Growth</h4>
          <ResponsiveContainer width="100%" height={250}>
            <ComposedChart
              data={cumulativeSavingsData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
              <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#8E9196' }} />
              <YAxis tick={{ fontSize: 12, fill: '#8E9196' }} />
              <Tooltip 
                formatter={(value) => [formatCurrency(value as number), '']}
                contentStyle={{ 
                  backgroundColor: '#fff',
                  borderRadius: '8px',
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #E2E8F0'
                }}
              />
              <Legend />
              <Bar dataKey="value" name="Monthly Addition" fill="#9b87f5" />
              <Line type="monotone" dataKey="cumulative" name="Total Savings" stroke="#7E69AB" strokeWidth={2} />
              <Area type="monotone" dataKey="cumulative" fill="#E5DEFF" strokeWidth={0} />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Savings Insights */}
      <Card className="shadow-sm">
        <CardContent className="p-6">
          <h4 className="font-medium mb-4">Savings Insights</h4>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="h-2 w-2 rounded-full bg-green-500 mt-2 mr-2" />
              <span>Consistent monthly savings pattern with average of {formatCurrency(averageMonthlySaving)}</span>
            </li>
            <li className="flex items-start">
              <span className="h-2 w-2 rounded-full bg-green-500 mt-2 mr-2" />
              <span>Saving approximately {savingToIncomeRatio}% of monthly income</span>
            </li>
            <li className="flex items-start">
              <span className="h-2 w-2 rounded-full bg-green-500 mt-2 mr-2" />
              <span>Growing savings balance with 18% YoY increase</span>
            </li>
            <li className="flex items-start">
              <span className="h-2 w-2 rounded-full bg-yellow-500 mt-2 mr-2" />
              <span>Potential for higher returns by optimizing investment allocation</span>
            </li>
            <li className="flex items-start">
              <span className="h-2 w-2 rounded-full bg-green-500 mt-2 mr-2" />
              <span>Emergency fund adequately covers 4+ months of expenses</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
