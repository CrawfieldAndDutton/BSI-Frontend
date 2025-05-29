
import { Card, CardContent } from "@/components/ui/card";
import { 
  ScatterChart,
  Scatter,
  XAxis, 
  YAxis, 
  CartesianGrid,
  Tooltip, 
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  ZAxis
} from 'recharts';

interface FraudRiskTabProps {
  fraudRisk: number;
}

export function FraudRiskTab({ fraudRisk }: FraudRiskTabProps) {
  // Mock data for transaction scatter plot
  const transactionScatterData = [
    { amount: 500, frequency: 10, risk: "low", name: "Groceries" },
    { amount: 1000, frequency: 5, risk: "low", name: "Rent" },
    { amount: 2000, frequency: 3, risk: "low", name: "Utilities" },
    { amount: 5000, frequency: 1, risk: "low", name: "Savings" },
    { amount: 10000, frequency: 0.5, risk: "medium", name: "Large Purchase" },
    { amount: 15000, frequency: 0.2, risk: "high", name: "Unusual Transfer" },
  ];

  // Mock data for anomaly detection
  const anomalyData = [
    { day: 1, amount: 200, expected: 250 },
    { day: 2, amount: 300, expected: 250 },
    { day: 3, amount: 150, expected: 250 },
    { day: 4, amount: 350, expected: 250 },
    { day: 5, amount: 250, expected: 250 },
    { day: 6, amount: 250, expected: 250 },
    { day: 7, amount: 200, expected: 250 },
    { day: 8, amount: 240, expected: 250 },
    { day: 9, amount: 180, expected: 250 },
    { day: 10, amount: 260, expected: 250 },
    { day: 11, amount: 1500, expected: 250 }, // Anomaly
    { day: 12, amount: 230, expected: 250 },
    { day: 13, amount: 280, expected: 250 },
    { day: 14, amount: 270, expected: 250 },
  ];

  return (
    <div className="space-y-6">
      {/* First Row: Fraud Risk Assessment and Transaction Scatter Plot */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <h4 className="font-medium mb-4">Fraud Risk Assessment</h4>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Overall Fraud Risk</span>
                  <span className="text-sm font-medium">Low ({fraudRisk}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: `${fraudRisk}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Identity Consistency</span>
                  <span className="text-sm font-medium">High</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "95%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Document Authenticity</span>
                  <span className="text-sm font-medium">High</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "90%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Transaction Patterns</span>
                  <span className="text-sm font-medium">Normal</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "85%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6">
            <h4 className="font-medium mb-4">Transaction Analysis</h4>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart
                margin={{ top: 20, right: 20, bottom: 10, left: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  type="number" 
                  dataKey="amount" 
                  name="Amount" 
                  unit="₹" 
                  domain={[0, 'dataMax + 1000']}
                />
                <YAxis 
                  type="number" 
                  dataKey="frequency" 
                  name="Frequency" 
                  unit="/mo"
                  domain={[0, 'dataMax + 1']}
                />
                <ZAxis range={[60, 400]} />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }}
                  contentStyle={{ 
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #E2E8F0'
                  }}
                  formatter={(value, name, props) => {
                    if (name === 'Amount') return [`₹${value}`, name];
                    if (name === 'Frequency') return [`${value}/month`, name];
                    return [value, name];
                  }}
                />
                <Legend />
                <Scatter
                  name="Normal Transactions"
                  data={transactionScatterData.filter(item => item.risk === 'low')}
                  fill="#00C49F"
                  shape="circle"
                />
                <Scatter
                  name="Medium Risk"
                  data={transactionScatterData.filter(item => item.risk === 'medium')}
                  fill="#FFBB28"
                  shape="circle"
                />
                <Scatter
                  name="High Risk"
                  data={transactionScatterData.filter(item => item.risk === 'high')}
                  fill="#FF8042"
                  shape="circle"
                />
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Second Row: Anomaly Detection and Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <h4 className="font-medium mb-4">Transaction Anomaly Detection</h4>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart
                  data={anomalyData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff',
                      borderRadius: '8px',
                      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                      border: '1px solid #E2E8F0'
                    }}
                    formatter={(value) => [`₹${value}`, '']}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    name="Transaction Amount"
                    stroke="#F97316"
                    strokeWidth={2}
                    dot={(props) => {
                      // Highlight anomalies
                      const { cx, cy, payload } = props;
                      const isAnomaly = Math.abs(payload.amount - payload.expected) > payload.expected;
                      
                      if (isAnomaly) {
                        return (
                          <svg x={cx - 10} y={cy - 10} width={20} height={20} fill="#FF0000" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="8" />
                          </svg>
                        );
                      }
                      
                      return <circle cx={cx} cy={cy} r={4} fill="#F97316" />;
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="expected"
                    name="Expected Range"
                    stroke="#9b87f5"
                    strokeDasharray="5 5"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="shadow-sm h-full">
            <CardContent className="p-6">
              <h4 className="font-medium mb-4">Fraud Risk Insights</h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="h-2 w-2 rounded-full bg-green-500 mt-2 mr-2" />
                  <span>All identity documents successfully verified</span>
                </li>
                <li className="flex items-start">
                  <span className="h-2 w-2 rounded-full bg-green-500 mt-2 mr-2" />
                  <span>No suspicious transaction patterns detected</span>
                </li>
                <li className="flex items-start">
                  <span className="h-2 w-2 rounded-full bg-green-500 mt-2 mr-2" />
                  <span>Geographic consistency in all transactions</span>
                </li>
                <li className="flex items-start">
                  <span className="h-2 w-2 rounded-full bg-green-500 mt-2 mr-2" />
                  <span>No alerts from credit bureaus or financial institutions</span>
                </li>
                <li className="flex items-start">
                  <span className="h-2 w-2 rounded-full bg-yellow-500 mt-2 mr-2" />
                  <span>One potential anomaly detected (day 11)</span>
                </li>
                <li className="flex items-start">
                  <span className="h-2 w-2 rounded-full bg-green-500 mt-2 mr-2" />
                  <span>Device and login location consistency</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
