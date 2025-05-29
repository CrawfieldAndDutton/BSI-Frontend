
import { Chart } from "@/components/dashboard/Chart";
import { ChartData } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  PieChart,
  Pie,
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid,
  Tooltip, 
  Legend,
  ResponsiveContainer,
  LineChart,
  Line 
} from 'recharts';

interface CreditTabProps {
  debtData: ChartData[];
  creditScore: number;
}

export function CreditTab({ debtData, creditScore }: CreditTabProps) {
  const COLORS = ['#9b87f5', '#7E69AB', '#E5DEFF', '#D3E4FD', '#8E9196'];
  
  // Credit utilization data
  const creditUtilizationData = [
    { name: "Credit Card 1", limit: 100000, used: 35000 },
    { name: "Credit Card 2", limit: 50000, used: 10000 },
  ];

  const calculateUtilizationPercentage = (used: number, limit: number) => {
    return (used / limit) * 100;
  };

  const utilizationData = creditUtilizationData.map(card => ({
    name: card.name,
    utilized: calculateUtilizationPercentage(card.used, card.limit),
    available: 100 - calculateUtilizationPercentage(card.used, card.limit)
  }));
  
  // EMI timeline data
  const emiTimelineData = [
    { month: "Jan '23", personal: 15000, car: 12500, home: 0 },
    { month: "Feb '23", personal: 15000, car: 12500, home: 0 },
    { month: "Mar '23", personal: 15000, car: 12500, home: 0 },
    { month: "Apr '23", personal: 15000, car: 12500, home: 0 },
    { month: "May '23", personal: 15000, car: 12500, home: 0 },
    { month: "Jun '23", personal: 15000, car: 12500, home: 0 },
    { month: "Jul '23", personal: 15000, car: 12500, home: 0 },
    { month: "Aug '23", personal: 15000, car: 12500, home: 0 },
    { month: "Sep '23", personal: 15000, car: 12500, home: 0 },
    { month: "Oct '23", personal: 15000, car: 12500, home: 0 },
    { month: "Nov '23", personal: 15000, car: 12500, home: 0 },
    { month: "Dec '23", personal: 15000, car: 12500, home: 0 },
  ];

  return (
    <div className="space-y-6">
      {/* Credit Overview */}
      <Card className="shadow-sm">
        <CardContent className="p-6">
          <h4 className="text-lg font-medium mb-4">Credit Overview</h4>
          <div className="space-y-4">
            <p className="text-sm">Credit Score: {creditScore} (Excellent)</p>
            <p className="text-sm">Total Active Loans: 2</p>
            <p className="text-sm">Total Credit Cards: 2</p>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Good Standing</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">No Late Payments</span>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">32% Debt-to-Income</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* First Row: Credit Score Gauge and EMI Payments Timeline */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <h4 className="font-medium mb-4">Credit Score</h4>
            <div className="flex flex-col items-center">
              <div className="relative w-48 h-48">
                <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#f1f1f1"
                    strokeWidth="10"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke={creditScore >= 750 ? "#22c55e" : creditScore >= 650 ? "#eab308" : "#ef4444"}
                    strokeWidth="10"
                    strokeDasharray={`${2.83 * creditScore / 10} ${2.83 * 100}`}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold">{creditScore}</span>
                  <span className="text-sm text-gray-500">
                    {creditScore >= 750 ? "Excellent" : creditScore >= 650 ? "Good" : "Poor"}
                  </span>
                </div>
              </div>
              <div className="mt-4 w-full max-w-xs bg-gray-200 h-2 rounded-full">
                <div className="flex">
                  <div className="bg-red-400 h-2 rounded-l-full" style={{ width: '30%' }}></div>
                  <div className="bg-yellow-400 h-2" style={{ width: '20%' }}></div>
                  <div className="bg-green-400 h-2 rounded-r-full" style={{ width: '50%' }}></div>
                </div>
              </div>
              <div className="flex justify-between w-full max-w-xs mt-1 text-xs text-gray-500">
                <span>300</span>
                <span>650</span>
                <span>900</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6">
            <h4 className="font-medium mb-4">EMI Payments Timeline</h4>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={emiTimelineData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#8E9196' }} />
                <YAxis tick={{ fontSize: 12, fill: '#8E9196' }} />
                <Tooltip 
                  formatter={(value) => [`₹${(value as number).toLocaleString()}`, '']}
                  contentStyle={{ 
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #E2E8F0'
                  }} 
                />
                <Legend />
                <Line type="monotone" dataKey="personal" stroke="#9b87f5" strokeWidth={2} />
                <Line type="monotone" dataKey="car" stroke="#7E69AB" strokeWidth={2} />
                <Line type="monotone" dataKey="home" stroke="#E5DEFF" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Second Row: Credit Utilization and Debt Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <h4 className="font-medium mb-4">Credit Utilization</h4>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart
                data={utilizationData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f1f1" />
                <XAxis type="number" domain={[0, 100]} tickFormatter={(value) => `${value}%`} tick={{ fontSize: 12, fill: '#8E9196' }} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 12, fill: '#8E9196' }} width={100} />
                <Tooltip 
                  formatter={(value) => [`${value}%`, '']}
                  contentStyle={{ 
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #E2E8F0'
                  }} 
                />
                <Legend />
                <Bar dataKey="utilized" stackId="a" fill="#9b87f5" name="Used" />
                <Bar dataKey="available" stackId="a" fill="#E5DEFF" name="Available" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6">
            <h4 className="font-medium mb-4">Debt Distribution</h4>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={debtData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={2}
                  dataKey="value"
                >
                  {debtData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip 
                  formatter={(value) => [`₹${(value as number).toLocaleString()}`, '']}
                  contentStyle={{ 
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #E2E8F0'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Active Loans and Credit Accounts */}
      <Card className="shadow-sm">
        <CardContent className="p-6">
          <h4 className="font-medium mb-4">Active Loans and Credit Accounts</h4>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-3 text-left">Type</th>
                  <th className="p-3 text-left">Institution</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-right">Original Amount</th>
                  <th className="p-3 text-right">Outstanding</th>
                  <th className="p-3 text-center">Interest Rate</th>
                  <th className="p-3 text-center">Tenure</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-3">Personal Loan</td>
                  <td className="p-3">HDFC Bank</td>
                  <td className="p-3"><span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span></td>
                  <td className="p-3 text-right">₹3,50,000</td>
                  <td className="p-3 text-right">₹2,80,000</td>
                  <td className="p-3 text-center">12%</td>
                  <td className="p-3 text-center">36 months</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">Car Loan</td>
                  <td className="p-3">SBI</td>
                  <td className="p-3"><span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span></td>
                  <td className="p-3 text-right">₹5,00,000</td>
                  <td className="p-3 text-right">₹2,50,000</td>
                  <td className="p-3 text-center">9.5%</td>
                  <td className="p-3 text-center">60 months</td>
                </tr>
                <tr className="border-b">
                  <td className="p-3">Credit Card</td>
                  <td className="p-3">ICICI Bank</td>
                  <td className="p-3"><span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span></td>
                  <td className="p-3 text-right">₹1,00,000</td>
                  <td className="p-3 text-right">₹35,000</td>
                  <td className="p-3 text-center">36%</td>
                  <td className="p-3 text-center">Revolving</td>
                </tr>
                <tr>
                  <td className="p-3">Credit Card</td>
                  <td className="p-3">Axis Bank</td>
                  <td className="p-3"><span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span></td>
                  <td className="p-3 text-right">₹50,000</td>
                  <td className="p-3 text-right">₹10,000</td>
                  <td className="p-3 text-center">42%</td>
                  <td className="p-3 text-center">Revolving</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Insights */}
      <Card className="shadow-sm">
        <CardContent className="p-6">
          <h4 className="font-medium mb-4">Credit Insights</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-start">
                <span className="h-2 w-2 rounded-full bg-green-500 mt-2 mr-2" />
                <span>Credit score is excellent at {creditScore}</span>
              </div>
              <div className="flex items-start">
                <span className="h-2 w-2 rounded-full bg-green-500 mt-2 mr-2" />
                <span>No missed payments in last 24 months</span>
              </div>
              <div className="flex items-start">
                <span className="h-2 w-2 rounded-full bg-yellow-500 mt-2 mr-2" />
                <span>Current debt-to-income ratio at 32%</span>
              </div>
              <div className="flex items-start">
                <span className="h-2 w-2 rounded-full bg-green-500 mt-2 mr-2" />
                <span>4 active credit accounts with good standing</span>
              </div>
              <div className="flex items-start">
                <span className="h-2 w-2 rounded-full bg-green-500 mt-2 mr-2" />
                <span>Credit utilization is below 30%</span>
              </div>
            </div>
            <div className="md:col-span-1 flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl font-bold text-green-500">A+</div>
                <div className="mt-2 text-sm text-gray-500">Credit Rating</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
