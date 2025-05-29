
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Chart } from "@/components/dashboard/Chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

// Mock data for the last 6 months
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

export const customerStatusData = months.map(month => ({
  name: month,
  'Under Review': Math.floor(Math.random() * 100) + 50,
  'Monitoring': Math.floor(Math.random() * 150) + 100,
  'Analyzed': Math.floor(Math.random() * 120) + 80,
  'Approved': Math.floor(Math.random() * 200) + 150,
  'Rejected': Math.floor(Math.random() * 50) + 20,
}));

export const customerRiskData = months.map(month => ({
  name: month,
  'General': Math.floor(Math.random() * 300) + 200,
  'Risky Low': Math.floor(Math.random() * 100) + 50,
  'Risky Medium': Math.floor(Math.random() * 50) + 25,
  'Risky High': Math.floor(Math.random() * 30) + 10,
}));

export const signalsData = months.map(month => ({
  name: month,
  'Salary Hike': Math.floor(Math.random() * 50) + 20,
  'Salary Drop': Math.floor(Math.random() * 40) + 15,
  'Job Loss': Math.floor(Math.random() * 20) + 5,
  'Increased Savings': Math.floor(Math.random() * 60) + 30,
  'Higher EMI Load': Math.floor(Math.random() * 45) + 25,
  'New Loan Taken': Math.floor(Math.random() * 55) + 35,
  'Credit Card Overlimit': Math.floor(Math.random() * 30) + 10,
  'Lower Expense': Math.floor(Math.random() * 40) + 20,
  'Higher Expense': Math.floor(Math.random() * 50) + 30,
  'Decrease in Credit Score': Math.floor(Math.random() * 35) + 15,
  'Increase in Credit Score': Math.floor(Math.random() * 45) + 25,
  'Frequent Address Changes': Math.floor(Math.random() * 15) + 5,
  'Bounce Detection': Math.floor(Math.random() * 25) + 10,
  'Fraudulent Activity Detection': Math.floor(Math.random() * 10) + 2,
}));

export const sentimentData = months.map(month => ({
  name: month,
  'Positive': Math.floor(Math.random() * 100) + 50,
  'Neutral': Math.floor(Math.random() * 80) + 40,
  'Negative': Math.floor(Math.random() * 40) + 10,
}));

// Add the trendsData export needed by FinancialTrendsChart
export const trendsData = {
  income: months.map(month => ({
    name: month,
    average: Math.floor(Math.random() * 15000) + 30000,
    trend: Math.floor(Math.random() * 10000) + 25000
  })),
  expense: months.map(month => ({
    name: month,
    average: Math.floor(Math.random() * 10000) + 20000,
    trend: Math.floor(Math.random() * 8000) + 15000
  })),
  savings: months.map(month => ({
    name: month,
    average: Math.floor(Math.random() * 8000) + 5000,
    trend: Math.floor(Math.random() * 6000) + 3000
  }))
};

// Create a Dashboard component
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <div className="flex gap-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="customers">Customers</TabsTrigger>
              <TabsTrigger value="signals">Signals</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsContent value="overview" className="mt-6 space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-white shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Customers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,248</div>
                <p className="text-xs text-muted-foreground mt-1">+18.2% from last month</p>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Risky Customers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">148</div>
                <p className="text-xs text-muted-foreground mt-1">+5.4% from last month</p>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Signals Generated</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">342</div>
                <p className="text-xs text-muted-foreground mt-1">+12.3% from last month</p>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Recovery Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87.5%</div>
                <p className="text-xs text-muted-foreground mt-1">+2.1% from last month</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">Customer Status Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <Chart
                  data={customerStatusData}
                  type="bar"
                  height={300}
                  dataKeys={['Under Review', 'Monitoring', 'Analyzed', 'Approved', 'Rejected']}
                  colors={['#8A898C', '#9b87f5', '#C8C8C9', '#7E69AB', '#6E59A5']}
                />
              </CardContent>
            </Card>
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">Customer Risk Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <Chart
                  data={customerRiskData}
                  type="area"
                  height={300}
                  dataKeys={['General', 'Risky Low', 'Risky Medium', 'Risky High']}
                  colors={['#C8C8C9', '#FDE1D3', '#FEC6A1', '#ea384c']}
                />
              </CardContent>
            </Card>
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">Signals Generated</CardTitle>
              </CardHeader>
              <CardContent>
                <Chart
                  data={signalsData}
                  type="line"
                  height={300}
                  dataKeys={['Salary Hike', 'Salary Drop', 'Job Loss', 'Credit Card Overlimit']}
                  colors={['#7E69AB', '#9b87f5', '#ea384c', '#FEC6A1']}
                />
              </CardContent>
            </Card>
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">AI Calls Sentiment Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <Chart
                  data={sentimentData}
                  type="bar"
                  height={300}
                  dataKeys={['Positive', 'Neutral', 'Negative']}
                  colors={['#7E69AB', '#C8C8C9', '#FEC6A1']}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="customers" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Customer Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Customer analytics content would go here...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="signals" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Signals Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Signals analytics content would go here...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
