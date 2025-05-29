
import { Chart } from "@/components/dashboard/Chart";
import { ChartData } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  PieChart,
  Pie,
  Cell,
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid,
  Tooltip, 
  Legend,
  ResponsiveContainer 
} from 'recharts';

interface SpendingTabProps {
  spendingData: ChartData[];
}

export function SpendingTab({ spendingData }: SpendingTabProps) {
  const COLORS = ['#9b87f5', '#7E69AB', '#E5DEFF', '#D3E4FD', '#8E9196'];
  
  // Additional data for spending trends
  const spendingTrendData = [
    { name: "Jan", amount: 35500 },
    { name: "Feb", amount: 36200 },
    { name: "Mar", amount: 35800 },
    { name: "Apr", amount: 38500 },
    { name: "May", amount: 39100 },
    { name: "Jun", amount: 38700 },
  ];
  
  const essentialVsNonEssentialData = [
    { name: "Jan", essential: 28000, nonEssential: 7500 },
    { name: "Feb", essential: 28000, nonEssential: 8200 },
    { name: "Mar", essential: 28000, nonEssential: 7800 },
    { name: "Apr", essential: 30000, nonEssential: 8500 },
    { name: "May", essential: 30000, nonEssential: 9100 },
    { name: "Jun", essential: 30000, nonEssential: 8700 },
  ];

  // Category spending data
  const categorySpendingData = [
    { category: "Housing", amount: 15000 },
    { category: "Groceries", amount: 8000 },
    { category: "Transportation", amount: 5000 },
    { category: "Entertainment", amount: 4000 },
    { category: "Utilities", amount: 3500 },
    { category: "Health", amount: 2000 },
    { category: "Education", amount: 1500 },
    { category: "Others", amount: 1300 },
  ];

  return (
    <div className="space-y-6">
      {/* Spending Overview */}
      <Card className="shadow-sm">
        <CardContent className="p-6">
          <h4 className="text-lg font-medium mb-4">Spending Overview</h4>
          <div className="space-y-4">
            <p className="text-sm">Average Monthly Spending: ₹37,300</p>
            <p className="text-sm">Spending to Income Ratio: 64%</p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Healthy Spending</span>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Entertainment Above Average</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Stable Fixed Expenses</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* First Row: Spending Distribution and Essential vs Non-Essential */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <h4 className="font-medium mb-4">Spending Distribution</h4>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={spendingData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {spendingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #E2E8F0'
                  }} 
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6">
            <h4 className="font-medium mb-4">Essential vs Non-Essential Expenses</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart 
                data={essentialVsNonEssentialData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#8E9196' }} />
                <YAxis tick={{ fontSize: 12, fill: '#8E9196' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #E2E8F0'
                  }} 
                />
                <Legend />
                <Bar dataKey="essential" stackId="a" fill="#9b87f5" name="Essential" />
                <Bar dataKey="nonEssential" stackId="a" fill="#E5DEFF" name="Non-Essential" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Second Row: Spending Trend and Category Table */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="shadow-sm h-full">
            <CardContent className="p-6">
              <h4 className="font-medium mb-4">Monthly Spending Trend</h4>
              <Chart 
                data={spendingTrendData} 
                type="line" 
                dataKeys={["amount"]} 
                colors={["#7E69AB"]}
              />
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-1">
          <Card className="shadow-sm h-full">
            <CardContent className="p-6">
              <h4 className="font-medium mb-4">Spending Insights</h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="h-2 w-2 rounded-full bg-blue-500 mt-2 mr-2" />
                  <span>Spending is within 70% of monthly income</span>
                </li>
                <li className="flex items-start">
                  <span className="h-2 w-2 rounded-full bg-blue-500 mt-2 mr-2" />
                  <span>Essential expenses ratio is healthy at 35%</span>
                </li>
                <li className="flex items-start">
                  <span className="h-2 w-2 rounded-full bg-yellow-500 mt-2 mr-2" />
                  <span>Entertainment expenses slightly above average</span>
                </li>
                <li className="flex items-start">
                  <span className="h-2 w-2 rounded-full bg-blue-500 mt-2 mr-2" />
                  <span>No large unexpected expenses in last 6 months</span>
                </li>
                <li className="flex items-start">
                  <span className="h-2 w-2 rounded-full bg-green-500 mt-2 mr-2" />
                  <span>Discretionary spending is stable month-to-month</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Category-wise spending table */}
      <Card className="shadow-sm">
        <CardContent className="p-6">
          <h4 className="font-medium mb-4">Category-wise Spending</h4>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-3 text-left">Category</th>
                  <th className="p-3 text-left">Type</th>
                  <th className="p-3 text-right">Amount</th>
                  <th className="p-3 text-right">% of Total</th>
                </tr>
              </thead>
              <tbody>
                {categorySpendingData.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-3">{item.category}</td>
                    <td className="p-3">{index < 5 ? 'Essential' : 'Non-Essential'}</td>
                    <td className="p-3 text-right">₹{item.amount.toLocaleString()}</td>
                    <td className="p-3 text-right">
                      {(item.amount / categorySpendingData.reduce((acc, curr) => acc + curr.amount, 0) * 100).toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
