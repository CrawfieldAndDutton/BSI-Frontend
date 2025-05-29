
import { useState } from "react";
import { trendsData } from "../data/trendsData";
import { Chart } from "@/components/dashboard/Chart";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface FinancialTrendsChartProps {
  fullView?: boolean;
}

export function FinancialTrendsChart({ fullView = false }: FinancialTrendsChartProps) {
  const [timeRange, setTimeRange] = useState("6m");
  const [metric, setMetric] = useState("income");
  
  // Simulate different data for different time ranges
  const getFilteredData = () => {
    const multiplier = timeRange === "1m" ? 0.25 : timeRange === "3m" ? 0.5 : 1;
    
    switch (metric) {
      case "income":
        return trendsData.income.map(item => ({
          ...item,
          average: item.average * multiplier,
          trend: item.trend * multiplier
        }));
      case "expense":
        return trendsData.expense.map(item => ({
          ...item,
          average: item.average * multiplier,
          trend: item.trend * multiplier
        }));
      case "savings":
        return trendsData.savings.map(item => ({
          ...item,
          average: item.average * multiplier,
          trend: item.trend * multiplier
        }));
      default:
        return trendsData.income;
    }
  };

  const chartHeight = fullView ? 400 : 250;

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2 sm:flex-row sm:justify-between sm:space-y-0">
        <div className="flex items-center space-x-2">
          <Tabs value={metric} onValueChange={setMetric} className="w-fit">
            <TabsList>
              <TabsTrigger value="income">Income</TabsTrigger>
              <TabsTrigger value="expense">Expense</TabsTrigger>
              <TabsTrigger value="savings">Savings</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant={timeRange === "1m" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange("1m")}
            className="text-xs"
          >
            1M
          </Button>
          <Button
            variant={timeRange === "3m" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange("3m")}
            className="text-xs"
          >
            3M
          </Button>
          <Button
            variant={timeRange === "6m" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange("6m")}
            className="text-xs"
          >
            6M
          </Button>
        </div>
      </div>

      {fullView ? (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card className="p-4 shadow-sm">
            <h3 className="text-lg font-medium mb-4">Average {metric.charAt(0).toUpperCase() + metric.slice(1)}</h3>
            <Chart
              data={getFilteredData()}
              type="line"
              height={chartHeight}
              dataKeys={["average"]}
              colors={["#404B5A"]}
            />
          </Card>
          
          <Card className="p-4 shadow-sm">
            <h3 className="text-lg font-medium mb-4">{metric.charAt(0).toUpperCase() + metric.slice(1)} Trends</h3>
            <Chart
              data={getFilteredData()}
              type="bar"
              height={chartHeight}
              dataKeys={["trend"]}
              colors={["#68A8AD"]}
            />
          </Card>
          
          <Card className="p-4 shadow-sm lg:col-span-2">
            <h3 className="text-lg font-medium mb-4">Monthly Comparison</h3>
            <Chart
              data={getFilteredData()}
              type="bar"
              height={chartHeight}
              dataKeys={["average", "trend"]}
              colors={["#404B5A", "#68A8AD"]}
            />
          </Card>
        </div>
      ) : (
        <Chart
          data={getFilteredData()}
          type="line"
          height={chartHeight}
          dataKeys={["average", "trend"]}
          colors={["#404B5A", "#68A8AD"]}
        />
      )}
    </div>
  );
}
