
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CircleCheck, CircleX, BarChart2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

interface MonitoringSignal {
  type: string;
  description: string;
  impact: "Positive" | "Negative";
  period?: string;  // Month or quarter when the signal was detected
}

const signals: MonitoringSignal[] = [
  { type: "Salary Hike", description: "Salary increases consistently or sharp jump observed", impact: "Positive", period: "May 2023" },
  { type: "Salary Drop", description: "Salary decreases over 3-6 months", impact: "Negative", period: "Jan 2023" },
  { type: "Job Loss", description: "No salary credit for consecutive months", impact: "Negative", period: "Mar 2023" },
  { type: "Increased Savings", description: "Higher surplus savings compared to previous months", impact: "Positive", period: "Apr 2023" },
  { type: "Higher EMI Load", description: "Increase in EMI obligations compared to income", impact: "Negative", period: "Feb 2023" },
  { type: "New Loan Taken", description: "Sudden new large loan EMI appears", impact: "Negative", period: "Dec 2022" },
  { type: "Credit Card Overlimit", description: "Card usage above 90% of limit", impact: "Negative", period: "May 2023" },
  { type: "Lower Expense", description: "Reduction in discretionary spending", impact: "Positive", period: "Apr 2023" },
  { type: "Higher Expense", description: "Unusual spike in discretionary expenses", impact: "Negative", period: "Jan 2023" },
  { type: "Decrease in Credit Score", description: "Drop in credit score by 30+ points", impact: "Negative", period: "Feb 2023" },
  { type: "Increase in Credit Score", description: "Score improvement", impact: "Positive", period: "Jun 2023" },
  { type: "Frequent Address Changes", description: "Multiple address updates in short time", impact: "Negative", period: "Mar 2023" },
  { type: "Bounce Detection", description: "Multiple ECS or cheque bounces", impact: "Negative", period: "Apr 2023" },
  { type: "Fraudulent Activity Detection", description: "Suspicious transaction patterns", impact: "Negative", period: "May 2023" }
];

// Process the signals to generate periodic data
const generatePeriodicData = (signals: MonitoringSignal[]) => {
  const periodicCounts: { [key: string]: { positive: number, negative: number } } = {};
  
  signals.forEach(signal => {
    if (signal.period) {
      if (!periodicCounts[signal.period]) {
        periodicCounts[signal.period] = { positive: 0, negative: 0 };
      }
      
      if (signal.impact === "Positive") {
        periodicCounts[signal.period].positive += 1;
      } else {
        periodicCounts[signal.period].negative += 1;
      }
    }
  });
  
  // Convert to chart data format
  return Object.entries(periodicCounts)
    .map(([period, counts]) => ({
      period,
      positive: counts.positive,
      negative: counts.negative,
      total: counts.positive + counts.negative
    }))
    .sort((a, b) => {
      // Sort by date (assuming format is "MMM YYYY")
      const dateA = new Date(a.period);
      const dateB = new Date(b.period);
      return dateA.getTime() - dateB.getTime();
    });
};

const periodicData = generatePeriodicData(signals);

// Group signals by type and calculate counts
const signalsByType = signals.reduce((acc, signal) => {
  if (!acc[signal.type]) {
    acc[signal.type] = {
      count: 0,
      impact: signal.impact
    };
  }
  acc[signal.type].count += 1;
  return acc;
}, {} as Record<string, { count: number, impact: "Positive" | "Negative" }>);

const typeData = Object.entries(signalsByType).map(([type, data]) => ({
  type,
  count: data.count,
  impact: data.impact
}));

export function MonitoringSignals() {
  const [activeTab, setActiveTab] = useState("list");

  const formatYAxis = (value: number) => {
    return value.toString();
  };
  
  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="list">Signal List</TabsTrigger>
          <TabsTrigger value="periodic">Periodic View</TabsTrigger>
          <TabsTrigger value="type">By Type</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Signal Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-center">Impact</TableHead>
                {activeTab === "list" && <TableHead>Period</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {signals.map((signal, index) => (
                <TableRow key={`${signal.type}-${index}`}>
                  <TableCell className="font-medium">{signal.type}</TableCell>
                  <TableCell>{signal.description}</TableCell>
                  <TableCell className="text-center">
                    {signal.impact === "Positive" ? (
                      <div className="flex items-center justify-center text-green-600">
                        <CircleCheck className="size-5 mr-1" />
                        Positive
                      </div>
                    ) : (
                      <div className="flex items-center justify-center text-red-600">
                        <CircleX className="size-5 mr-1" />
                        Negative
                      </div>
                    )}
                  </TableCell>
                  {activeTab === "list" && <TableCell>{signal.period}</TableCell>}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        
        <TabsContent value="periodic" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium flex items-center">
                <BarChart2 className="mr-2 size-5" />
                Signals by Month
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={periodicData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="period" 
                      angle={-45} 
                      textAnchor="end"
                      tick={{ fontSize: 12 }} 
                      height={60}
                    />
                    <YAxis tickFormatter={formatYAxis} />
                    <Tooltip 
                      formatter={(value: number, name: string) => {
                        const formattedName = name === 'positive' 
                          ? 'Positive Signals' 
                          : name === 'negative' 
                            ? 'Negative Signals'
                            : 'Total Signals';
                        return [value, formattedName];
                      }}
                    />
                    <Bar 
                      dataKey="positive" 
                      stackId="a" 
                      name="Positive" 
                      fill="#4ade80"
                      radius={[4, 4, 0, 0]} 
                    />
                    <Bar 
                      dataKey="negative" 
                      stackId="a" 
                      name="Negative" 
                      fill="#f87171"
                      radius={[4, 4, 0, 0]} 
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="flex items-center justify-center space-x-6 mt-4">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-[#4ade80] rounded-sm mr-1"></div>
                  <span className="text-sm text-gray-600">Positive</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-[#f87171] rounded-sm mr-1"></div>
                  <span className="text-sm text-gray-600">Negative</span>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium mb-2">Signal Count by Month</h4>
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Period</TableHead>
                        <TableHead className="text-center">Positive</TableHead>
                        <TableHead className="text-center">Negative</TableHead>
                        <TableHead className="text-center">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {periodicData.map((data, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{data.period}</TableCell>
                          <TableCell className="text-center text-green-600">{data.positive}</TableCell>
                          <TableCell className="text-center text-red-600">{data.negative}</TableCell>
                          <TableCell className="text-center font-medium">{data.total}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="type" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Signals by Type</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Signal Type</TableHead>
                      <TableHead className="text-center">Impact</TableHead>
                      <TableHead className="text-center">Count</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {typeData.map((data, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{data.type}</TableCell>
                        <TableCell className="text-center">
                          {data.impact === "Positive" ? (
                            <div className="flex items-center justify-center text-green-600">
                              <CircleCheck className="size-5 mr-1" />
                              Positive
                            </div>
                          ) : (
                            <div className="flex items-center justify-center text-red-600">
                              <CircleX className="size-5 mr-1" />
                              Negative
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="text-center font-medium">{data.count}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
