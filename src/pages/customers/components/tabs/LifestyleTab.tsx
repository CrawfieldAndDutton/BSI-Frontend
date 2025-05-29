
import { Card, CardContent } from "@/components/ui/card";
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid,
  Tooltip, 
  Legend,
  ResponsiveContainer 
} from 'recharts';

interface LifestyleTabProps {
  // Add any props if needed
}

export function LifestyleTab({}: LifestyleTabProps) {
  const lifestyleRadarData = [
    { category: "Travel", score: 45, fullMark: 100 },
    { category: "Dining", score: 70, fullMark: 100 },
    { category: "Shopping", score: 55, fullMark: 100 },
    { category: "Entertainment", score: 60, fullMark: 100 },
    { category: "Income Stability", score: 85, fullMark: 100 },
    { category: "Financial Discipline", score: 80, fullMark: 100 },
  ];

  const lifestyleTrendData = [
    { month: "Jan", travel: 4000, dining: 6500, shopping: 5000 },
    { month: "Feb", travel: 3500, dining: 7000, shopping: 4800 },
    { month: "Mar", travel: 6000, dining: 6800, shopping: 5200 },
    { month: "Apr", travel: 4200, dining: 7200, shopping: 5500 },
    { month: "May", travel: 5500, dining: 7500, shopping: 6000 },
    { month: "Jun", travel: 8000, dining: 7800, shopping: 5800 },
  ];

  return (
    <div className="space-y-6">
      {/* First Row: Lifestyle Radar Chart and Trends */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <h4 className="font-medium mb-4">Lifestyle Profile</h4>
            <ResponsiveContainer width="100%" height={350}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={lifestyleRadarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="category" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar
                  name="Lifestyle Score"
                  dataKey="score"
                  stroke="#9b87f5"
                  fill="#9b87f5"
                  fillOpacity={0.6}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #E2E8F0'
                  }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6">
            <h4 className="font-medium mb-4">Lifestyle Spending Trends</h4>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart
                data={lifestyleTrendData}
                margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #E2E8F0'
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="travel"
                  name="Travel"
                  stroke="#F97316"
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="dining"
                  name="Dining"
                  stroke="#D946EF"
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="shopping"
                  name="Shopping"
                  stroke="#0EA5E9"
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Second Row: Stability Indicators and Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <h4 className="font-medium mb-4">Lifestyle Stability Indicators</h4>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Residential Stability</span>
                  <span className="text-sm font-medium">High</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "90%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Employment Stability</span>
                  <span className="text-sm font-medium">High</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "85%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Spending Patterns</span>
                  <span className="text-sm font-medium">Moderate</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "65%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Financial Discipline</span>
                  <span className="text-sm font-medium">High</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "80%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Travel Frequency</span>
                  <span className="text-sm font-medium">Moderate</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "60%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Luxury Purchases</span>
                  <span className="text-sm font-medium">Low</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: "30%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6">
            <h4 className="font-medium mb-4">Lifestyle Insights</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="h-2 w-2 rounded-full bg-green-500 mt-2 mr-2" />
                <span>Same residence for 3+ years indicating stability</span>
              </li>
              <li className="flex items-start">
                <span className="h-2 w-2 rounded-full bg-green-500 mt-2 mr-2" />
                <span>Consistent work location based on spending patterns</span>
              </li>
              <li className="flex items-start">
                <span className="h-2 w-2 rounded-full bg-yellow-500 mt-2 mr-2" />
                <span>Moderate frequency of dining and entertainment expenses</span>
              </li>
              <li className="flex items-start">
                <span className="h-2 w-2 rounded-full bg-green-500 mt-2 mr-2" />
                <span>No signs of gambling or high-risk activities</span>
              </li>
              <li className="flex items-start">
                <span className="h-2 w-2 rounded-full bg-green-500 mt-2 mr-2" />
                <span>Travel expenses typically seasonal (summer months)</span>
              </li>
              <li className="flex items-start">
                <span className="h-2 w-2 rounded-full bg-blue-500 mt-2 mr-2" />
                <span>Low frequency of luxury brand purchases</span>
              </li>
              <li className="flex items-start">
                <span className="h-2 w-2 rounded-full bg-green-500 mt-2 mr-2" />
                <span>Consistent monthly entertainment budget</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
