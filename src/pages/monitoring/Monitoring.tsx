
import { MonitoringHeader } from "./components/MonitoringHeader";
import { FinancialTrendsChart } from "./components/FinancialTrendsChart";
import { MonitoredCustomersTable } from "./components/MonitoredCustomersTable";
import { RecentSignals } from "./components/RecentSignals";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Chart } from "@/components/dashboard/Chart";
import {
  customerStatusData,
  customerRiskData,
  signalsData,
  sentimentData
} from "../dashboard/Dashboard";

export default function Monitoring() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6 animate-fade-in">
      <MonitoringHeader />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="animate-fade-in">
        <TabsList className="mb-4">
          <TabsTrigger value="overview" className="smooth-transition">Overview</TabsTrigger>
          <TabsTrigger value="financial" className="smooth-transition">Financial Trends</TabsTrigger>
          <TabsTrigger value="customers" className="smooth-transition">Customers</TabsTrigger>
          <TabsTrigger value="signals" className="smooth-transition">Signals</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="tab-content space-y-6">
          {/* Restored graphs section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Customer Status Trends (6 Months)</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <Chart
                  data={customerStatusData}
                  type="bar"
                  height={300}
                  dataKeys={['Under Review', 'Monitoring', 'Analyzed', 'Approved', 'Rejected']}
                  colors={['#8A898C', '#9b87f5', '#C8C8C9', '#7E69AB', '#6E59A5']}
                />
              </CardContent>
            </Card>
            
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Customer Risk Distribution (6 Months)</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <Chart
                  data={customerRiskData}
                  type="area"
                  height={300}
                  dataKeys={['General', 'Risky Low', 'Risky Medium', 'Risky High']}
                  colors={['#C8C8C9', '#FDE1D3', '#FEC6A1', '#ea384c']}
                />
              </CardContent>
            </Card>
            
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Signals Generated (6 Months)</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <Chart
                  data={signalsData}
                  type="line"
                  height={300}
                  dataKeys={['Salary Hike', 'Salary Drop', 'Job Loss', 'Credit Card Overlimit']}
                  colors={['#7E69AB', '#9b87f5', '#ea384c', '#FEC6A1']}
                />
              </CardContent>
            </Card>
            
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">AI Calls Sentiment Analysis (6 Months)</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Financial Trends</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <FinancialTrendsChart />
              </CardContent>
            </Card>
            
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Recent Signals</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <RecentSignals />
              </CardContent>
            </Card>
          </div>
          
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Monitored Customers</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <MonitoredCustomersTable limit={5} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="tab-content">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Financial Trends Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <FinancialTrendsChart fullView={true} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="tab-content">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">All Monitored Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <MonitoredCustomersTable />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="signals" className="tab-content">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">All Recent Signals</CardTitle>
            </CardHeader>
            <CardContent>
              <RecentSignals fullView={true} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
