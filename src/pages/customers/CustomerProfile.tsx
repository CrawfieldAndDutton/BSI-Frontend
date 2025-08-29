import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  FileSpreadsheet,
  BarChart2,
  Signal,
  MessageSquare,
  ArrowLeft,
  CreditCard,
} from "lucide-react";
import { FinancialHealthOverview } from "./components/FinancialHealthOverview";
import { LoanSignals } from "./components/LoanSignals";
import { LogsAndComments } from "./components/LogsAndComments";
import { MonitoringSignals } from "./components/MonitoringSignals";
import { CallList } from "../recovery/components/CallList";
import { CallTranscript } from "../recovery/components/CallTranscript";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Call, Transcript } from "@/lib/types";
import { CustomerHeader } from "./components/CustomerHeader";
import { IncomeTab } from "./components/tabs/IncomeTab";
import { SpendingTab } from "./components/tabs/SpendingTab";
import { CreditTab } from "./components/tabs/CreditTab";
import { SavingsTab } from "./components/tabs/SavingsTab";
import { customerApi } from "@/apis/modules/customer";

// Sample data for the customer
const customerData = {
  id: "CUST001",
  name: "Aditya Sharma",
  email: "aditya.sharma@gmail.com",
  phone: "+91 98765 43210",
  address: "123 Main Street, Mumbai, Maharashtra",
  loanAmount: 350000,
  loanType: "Personal Loan",
  status: "Data Received",
  dateAdded: "2023-04-25",
  scores: {
    creditScore: 750,
    incomeStability: 85,
    spendingBehavior: 72,
    savingsBehavior: 68,
    fraudRisk: 12,
  },
  financialMetrics: {
    creditCards: 2,
    bankAccounts: 3,
    riskGroup: "Low Risk",
    runningLoans: 3,
    loanAmountPending: 175000,
    loanCompletionPercentage: 45.5,
    signalsGenerated: 8,
    averageMonthlyIncome: 45000,
    averageMonthlyExpenditure: 32000,
    averageMonthlySavings: 13000,
  },
};

// Mock data for income analysis
const incomeData = [
  { name: "Jan", value: 42000 },
  { name: "Feb", value: 42000 },
  { name: "Mar", value: 42000 },
  { name: "Apr", value: 45000 },
  { name: "May", value: 45000 },
  { name: "Jun", value: 45000 },
];

// Mock data for spending analysis
const spendingData = [
  { name: "Essentials", value: 35 },
  { name: "Housing", value: 30 },
  { name: "Transport", value: 15 },
  { name: "Entertainment", value: 10 },
  { name: "Others", value: 10 },
];

// Mock data for savings analysis
const savingsData = [
  { name: "Jan", value: 8000 },
  { name: "Feb", value: 7500 },
  { name: "Mar", value: 9000 },
  { name: "Apr", value: 8500 },
  { name: "May", value: 10000 },
  { name: "Jun", value: 9500 },
];

// Mock data for credit/debt analysis
const debtData = [
  { name: "Personal Loan", value: 350000 },
  { name: "Credit Card", value: 45000 },
  { name: "Car Loan", value: 280000 },
];

// Mock data for calls
const mockCalls: Call[] = [
  {
    id: "call1",
    customerId: "CUST001",
    customerName: "Aditya Sharma",
    date: "2023-05-15",
    time: "10:30 AM",
    duration: "5:24",
    agent: "Rahul Singh",
    type: "Outbound",
    status: "Completed",
    outcome: "Positive",
    sentiment: "Neutral",
    notes: "Customer seemed satisfied with the explanation",
  },
  {
    id: "call2",
    customerId: "CUST001",
    customerName: "Aditya Sharma",
    date: "2023-05-10",
    time: "11:45 AM",
    duration: "3:12",
    agent: "Priya Patel",
    type: "Outbound",
    status: "Completed",
    outcome: "Neutral",
    sentiment: "Neutral",
    notes: "Customer requested more time",
  },
  {
    id: "call3",
    customerId: "CUST001",
    customerName: "Aditya Sharma",
    date: "2023-05-02",
    time: "2:15 PM",
    duration: "4:30",
    agent: "Rahul Singh",
    type: "Inbound",
    status: "Completed",
    outcome: "Positive",
    sentiment: "Positive",
    notes: "Customer called to inquire about payment options",
  },
];

// Mock transcript data
const mockTranscript: Transcript = {
  id: "call1",
  date: "2023-05-15",
  time: "10:30 AM",
  agent: "Rahul Singh",
  customer: "Aditya Sharma",
  sentiment: "Neutral",
  transcript: [
    {
      speaker: "Agent",
      text: "Hello, is this Mr. Aditya Sharma?",
      time: "00:00",
      sentiment: "Neutral",
    },
    {
      speaker: "Customer",
      text: "Yes, speaking.",
      time: "00:03",
      sentiment: "Neutral",
    },
    {
      speaker: "Agent",
      text: "This is Rahul Singh from ABC Bank. I'm calling regarding your recent loan application. Do you have a few minutes to discuss?",
      time: "00:05",
      sentiment: "Neutral",
    },
    {
      speaker: "Customer",
      text: "Yes, I've been waiting to hear back about that.",
      time: "00:13",
      sentiment: "Neutral",
    },
  ],
};

interface CustomerDatas {
  created_at: string;
  customer_id: string;
  dob: string;
  email: string;
  enterprise_id: string;
  extra_data?: object;
  id: string;
  loan_amount: number;
  loan_types: string;
  name: string;
  pan: string;
  phone: string;
  updated_at: string;
}

export default function CustomerProfile() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [selectedCall, setSelectedCall] = useState("call1");
  const [activeAnalysisTab, setActiveAnalysisTab] = useState("income");
  const [timeRange, setTimeRange] = useState("RECENT");
  const [showBankStatement, setShowBankStatement] = useState(false);
  const [showCreditReport, setShowCreditReport] = useState(false);
  const [customerDatas, setCustomerDatas] = useState<CustomerDatas>({
    created_at: "",
    customer_id: "",
    dob: "",
    email: "",
    enterprise_id: "",
    extra_data: {},
    id: "",
    loan_amount: 0,
    loan_types: "",
    name: "",
    pan: "",
    phone: "",
    updated_at: "",
  });

  // Set page title
  useEffect(() => {
    (async () => {
      const pathParts = window.location.pathname.split("/");
      const customerId = pathParts[pathParts.length - 1];
      const response = await customerApi.customer_fetch(customerId);
      console.log(response.data);
      setCustomerDatas(response.data);
      document.title = `${response.data.name} | Customer Profile`;
    })();

    return () => {
      document.title = "BankLens";
    };
  }, []);

  // Handle "View More" action
  const handleViewMore = (section: string) => {
    setExpandedSection(section);
  };

  // Handle "Back" action
  const handleBack = () => {
    setExpandedSection(null);
  };

  // Handle call selection
  const handleCallSelect = (callId: string) => {
    setSelectedCall(callId);
  };

  // Handle view bank statement
  const handleViewBankStatement = () => {
    setShowBankStatement(true);
    setActiveTab("analysis");
    setActiveAnalysisTab("income");
  };

  // Handle view credit report
  const handleViewCreditReport = () => {
    setShowCreditReport(true);
    setActiveTab("analysis");
    setActiveAnalysisTab("credit");
  };

  return (
    <div className="flex flex-col">
      {/* Sticky Customer Information Card */}
      <div className="sticky top-0 z-20 bg-white border-b shadow-sm w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 p-4">
          <div className="space-y-1">
            <span className="text-xs text-gray-500">Name</span>
            <p className="font-semibold">{customerDatas.name}</p>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-gray-500">ID</span>
            <p>{customerDatas.customer_id}</p>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-gray-500">Email</span>
            <p className="truncate">{customerDatas.email}</p>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-gray-500">Phone</span>
            <p>{customerDatas.phone}</p>
          </div>
          <div className="space-y-1 sm:col-span-2">
            <span className="text-xs text-gray-500">Address</span>
            <p className="truncate">{customerData.address}</p>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-gray-500">Loan Amount</span>
            <p className="font-semibold">
              ₹{customerDatas.loan_amount.toLocaleString()}
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-gray-500">Loan Type</span>
            <p>{customerDatas.loan_types}</p>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-gray-500">Date Added</span>
            <p>{new Date(customerDatas.updated_at).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Tabs and Content */}
      <div className="p-4 space-y-6">
        {!expandedSection ? (
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="animate-fade-in"
          >
            <TabsList className="grid grid-cols-4 w-full mb-4">
              <TabsTrigger value="overview" className="smooth-transition">
                Overview
              </TabsTrigger>
              <TabsTrigger value="analysis" className="smooth-transition">
                Analysis
              </TabsTrigger>
              <TabsTrigger value="monitoring" className="smooth-transition">
                Monitoring
              </TabsTrigger>
              <TabsTrigger value="calls" className="smooth-transition">
                Call History
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="tab-content space-y-8">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">
                    Financial Health Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <FinancialHealthOverview
                    scores={customerData.scores}
                    financialMetrics={customerData.financialMetrics}
                  />
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-xl font-semibold flex items-center">
                    <Signal className="mr-2 size-5 text-gray-600" />
                    Loan Signals
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveTab("monitoring")}
                    className="flex items-center"
                  >
                    View All Signals
                  </Button>
                </CardHeader>
                <CardContent>
                  <LoanSignals />
                </CardContent>
              </Card>

              {/* System Logs and Comments */}
              <Card className="shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-xl font-semibold">
                    Activity & Comments
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewMore("activity")}
                    className="flex items-center"
                  >
                    View More
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="h-64 overflow-hidden relative">
                    <div className="space-y-6">
                      <LogsAndComments truncated={true} />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analysis Tab */}
            <TabsContent value="analysis" className="tab-content space-y-6">
              <Card className="shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl font-semibold">
                    Customer Analysis
                  </CardTitle>
                  <div className="flex justify-end items-center space-x-2 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center"
                      onClick={handleViewBankStatement}
                    >
                      <FileSpreadsheet className="mr-2 size-4" />
                      View Bank Statement
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center"
                      onClick={handleViewCreditReport}
                    >
                      <CreditCard className="mr-2 size-4" />
                      View Credit Report
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Analysis Sub-Tabs */}
                    <Tabs
                      value={activeAnalysisTab}
                      onValueChange={setActiveAnalysisTab}
                    >
                      <TabsList className="grid grid-cols-4 w-full">
                        <TabsTrigger value="income">Income</TabsTrigger>
                        <TabsTrigger value="spending">Spending</TabsTrigger>
                        <TabsTrigger value="credit">Credit</TabsTrigger>
                        <TabsTrigger value="savings">Savings</TabsTrigger>
                      </TabsList>

                      <TabsContent value="income">
                        <div className="mt-6">
                          {showBankStatement ? (
                            <>
                              <div className="flex justify-end mb-4">
                                <div className="flex items-center space-x-2">
                                  <Button
                                    variant={
                                      timeRange === "RECENT"
                                        ? "default"
                                        : "outline"
                                    }
                                    size="sm"
                                    onClick={() => setTimeRange("RECENT")}
                                  >
                                    Recent
                                  </Button>
                                  <Button
                                    variant={
                                      timeRange === "3M" ? "default" : "outline"
                                    }
                                    size="sm"
                                    onClick={() => setTimeRange("3M")}
                                  >
                                    3M
                                  </Button>
                                  <Button
                                    variant={
                                      timeRange === "6M" ? "default" : "outline"
                                    }
                                    size="sm"
                                    onClick={() => setTimeRange("6M")}
                                  >
                                    6M
                                  </Button>
                                  <Button
                                    variant={
                                      timeRange === "12M"
                                        ? "default"
                                        : "outline"
                                    }
                                    size="sm"
                                    onClick={() => setTimeRange("12M")}
                                  >
                                    12M
                                  </Button>
                                </div>
                              </div>
                              <Card>
                                <CardHeader>
                                  <div className="flex justify-between items-center">
                                    <CardTitle>Bank Statement</CardTitle>
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() =>
                                        setShowBankStatement(false)
                                      }
                                    >
                                      Close
                                    </Button>
                                  </div>
                                </CardHeader>
                                <CardContent>
                                  <div className="space-y-6">
                                    <div className="p-4 bg-gray-50 rounded-md">
                                      <h3 className="text-lg font-medium mb-2">
                                        Bank Statement Summary
                                      </h3>
                                      <p>Account Number: XXXX-XXXX-1234</p>
                                      <p>Bank Name: HDFC Bank</p>
                                      <p>
                                        Statement Period: Jan 2023 - Jun 2023
                                      </p>
                                      <p>Opening Balance: ₹125,000</p>
                                      <p>Closing Balance: ₹178,500</p>
                                    </div>

                                    <div className="overflow-x-auto">
                                      <table className="w-full">
                                        <thead>
                                          <tr className="bg-gray-100">
                                            <th className="p-2 text-left">
                                              Date
                                            </th>
                                            <th className="p-2 text-left">
                                              Description
                                            </th>
                                            <th className="p-2 text-right">
                                              Credit
                                            </th>
                                            <th className="p-2 text-right">
                                              Debit
                                            </th>
                                            <th className="p-2 text-right">
                                              Balance
                                            </th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          <tr className="border-b">
                                            <td className="p-2">25/06/2023</td>
                                            <td className="p-2">
                                              Salary Credit - ACME Corp
                                            </td>
                                            <td className="p-2 text-right text-green-600">
                                              ₹45,000
                                            </td>
                                            <td className="p-2 text-right">
                                              -
                                            </td>
                                            <td className="p-2 text-right">
                                              ₹178,500
                                            </td>
                                          </tr>
                                          <tr className="border-b">
                                            <td className="p-2">20/06/2023</td>
                                            <td className="p-2">
                                              EMI - Car Loan
                                            </td>
                                            <td className="p-2 text-right">
                                              -
                                            </td>
                                            <td className="p-2 text-right text-red-600">
                                              ₹12,500
                                            </td>
                                            <td className="p-2 text-right">
                                              ₹133,500
                                            </td>
                                          </tr>
                                          <tr className="border-b">
                                            <td className="p-2">15/06/2023</td>
                                            <td className="p-2">
                                              Credit Card Payment
                                            </td>
                                            <td className="p-2 text-right">
                                              -
                                            </td>
                                            <td className="p-2 text-right text-red-600">
                                              ₹15,000
                                            </td>
                                            <td className="p-2 text-right">
                                              ₹146,000
                                            </td>
                                          </tr>
                                          <tr className="border-b">
                                            <td className="p-2">10/06/2023</td>
                                            <td className="p-2">
                                              Grocery Shopping
                                            </td>
                                            <td className="p-2 text-right">
                                              -
                                            </td>
                                            <td className="p-2 text-right text-red-600">
                                              ₹4,200
                                            </td>
                                            <td className="p-2 text-right">
                                              ₹161,000
                                            </td>
                                          </tr>
                                          <tr className="border-b">
                                            <td className="p-2">05/06/2023</td>
                                            <td className="p-2">
                                              Utility Bills
                                            </td>
                                            <td className="p-2 text-right">
                                              -
                                            </td>
                                            <td className="p-2 text-right text-red-600">
                                              ₹3,800
                                            </td>
                                            <td className="p-2 text-right">
                                              ₹165,200
                                            </td>
                                          </tr>
                                          <tr className="border-b">
                                            <td className="p-2">25/05/2023</td>
                                            <td className="p-2">
                                              Salary Credit - ACME Corp
                                            </td>
                                            <td className="p-2 text-right text-green-600">
                                              ₹45,000
                                            </td>
                                            <td className="p-2 text-right">
                                              -
                                            </td>
                                            <td className="p-2 text-right">
                                              ₹169,000
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </>
                          ) : (
                            <IncomeTab incomeData={incomeData} />
                          )}
                        </div>
                      </TabsContent>

                      <TabsContent value="spending">
                        <div className="mt-6">
                          <div className="flex justify-end mb-4">
                            <div className="flex items-center space-x-2">
                              <Button
                                variant={
                                  timeRange === "RECENT" ? "default" : "outline"
                                }
                                size="sm"
                                onClick={() => setTimeRange("RECENT")}
                              >
                                Recent
                              </Button>
                              <Button
                                variant={
                                  timeRange === "3M" ? "default" : "outline"
                                }
                                size="sm"
                                onClick={() => setTimeRange("3M")}
                              >
                                3M
                              </Button>
                              <Button
                                variant={
                                  timeRange === "6M" ? "default" : "outline"
                                }
                                size="sm"
                                onClick={() => setTimeRange("6M")}
                              >
                                6M
                              </Button>
                              <Button
                                variant={
                                  timeRange === "12M" ? "default" : "outline"
                                }
                                size="sm"
                                onClick={() => setTimeRange("12M")}
                              >
                                12M
                              </Button>
                            </div>
                          </div>

                          <SpendingTab spendingData={spendingData} />
                        </div>
                      </TabsContent>

                      <TabsContent value="credit">
                        <div className="mt-6">
                          <div className="flex justify-end mb-4">
                            <div className="flex items-center space-x-2">
                              <Button
                                variant={
                                  timeRange === "RECENT" ? "default" : "outline"
                                }
                                size="sm"
                                onClick={() => setTimeRange("RECENT")}
                              >
                                Recent
                              </Button>
                              <Button
                                variant={
                                  timeRange === "3M" ? "default" : "outline"
                                }
                                size="sm"
                                onClick={() => setTimeRange("3M")}
                              >
                                3M
                              </Button>
                              <Button
                                variant={
                                  timeRange === "6M" ? "default" : "outline"
                                }
                                size="sm"
                                onClick={() => setTimeRange("6M")}
                              >
                                6M
                              </Button>
                              <Button
                                variant={
                                  timeRange === "12M" ? "default" : "outline"
                                }
                                size="sm"
                                onClick={() => setTimeRange("12M")}
                              >
                                12M
                              </Button>
                            </div>
                          </div>

                          {showCreditReport ? (
                            <Card>
                              <CardHeader>
                                <div className="flex justify-between items-center">
                                  <CardTitle>Credit Report</CardTitle>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => setShowCreditReport(false)}
                                  >
                                    Close
                                  </Button>
                                </div>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-6">
                                  <div className="p-4 bg-gray-50 rounded-md">
                                    <h3 className="text-lg font-medium mb-2">
                                      Credit Report Summary
                                    </h3>
                                    <p>Credit Score: 750 (Excellent)</p>
                                    <p>Report Date: July 1, 2023</p>
                                    <p>Credit Age: 6 years</p>
                                  </div>

                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                      <h4 className="font-medium mb-3">
                                        Active Credit Accounts
                                      </h4>
                                      <div className="bg-white rounded-md border p-4">
                                        <div className="space-y-4">
                                          <div className="border-b pb-2">
                                            <div className="flex justify-between mb-1">
                                              <span className="font-medium">
                                                Personal Loan
                                              </span>
                                              <span className="text-green-600">
                                                Good Standing
                                              </span>
                                            </div>
                                            <div className="flex justify-between text-sm text-gray-600">
                                              <span>HDFC Bank</span>
                                              <span>₹350,000</span>
                                            </div>
                                            <div className="text-sm text-gray-600">
                                              Opened: Jan 2023
                                            </div>
                                          </div>
                                          <div className="border-b pb-2">
                                            <div className="flex justify-between mb-1">
                                              <span className="font-medium">
                                                Credit Card
                                              </span>
                                              <span className="text-green-600">
                                                Good Standing
                                              </span>
                                            </div>
                                            <div className="flex justify-between text-sm text-gray-600">
                                              <span>ICICI Bank</span>
                                              <span>₹100,000 limit</span>
                                            </div>
                                            <div className="text-sm text-gray-600">
                                              Opened: Mar 2020
                                            </div>
                                          </div>
                                          <div className="pb-2">
                                            <div className="flex justify-between mb-1">
                                              <span className="font-medium">
                                                Car Loan
                                              </span>
                                              <span className="text-green-600">
                                                Good Standing
                                              </span>
                                            </div>
                                            <div className="flex justify-between text-sm text-gray-600">
                                              <span>SBI</span>
                                              <span>₹280,000</span>
                                            </div>
                                            <div className="text-sm text-gray-600">
                                              Opened: Nov 2022
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <div>
                                      <h4 className="font-medium mb-3">
                                        Payment History
                                      </h4>
                                      <div className="bg-white rounded-md border p-4">
                                        <div className="space-y-2">
                                          <p className="text-sm">
                                            Last 24 Months
                                          </p>
                                          <div className="grid grid-cols-12 gap-1">
                                            {Array(24)
                                              .fill(0)
                                              .map((_, i) => (
                                                <div
                                                  key={i}
                                                  className={`h-6 ${
                                                    i === 3
                                                      ? "bg-yellow-200"
                                                      : "bg-green-200"
                                                  } rounded`}
                                                  title={`Month ${24 - i}: ${
                                                    i === 3
                                                      ? "Late payment"
                                                      : "On-time payment"
                                                  }`}
                                                />
                                              ))}
                                          </div>
                                          <div className="flex items-center space-x-4 mt-2 text-xs">
                                            <div className="flex items-center">
                                              <div className="w-3 h-3 bg-green-200 mr-1" />
                                              <span>On time</span>
                                            </div>
                                            <div className="flex items-center">
                                              <div className="w-3 h-3 bg-yellow-200 mr-1" />
                                              <span>Late (30 days)</span>
                                            </div>
                                            <div className="flex items-center">
                                              <div className="w-3 h-3 bg-red-200 mr-1" />
                                              <span>Late (90+ days)</span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <div>
                                    <h4 className="font-medium mb-3">
                                      Credit Inquiries (Last 12 months)
                                    </h4>
                                    <table className="w-full">
                                      <thead>
                                        <tr className="bg-gray-100">
                                          <th className="p-2 text-left">
                                            Date
                                          </th>
                                          <th className="p-2 text-left">
                                            Inquirer
                                          </th>
                                          <th className="p-2 text-left">
                                            Type
                                          </th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr className="border-b">
                                          <td className="p-2">15/01/2023</td>
                                          <td className="p-2">HDFC Bank</td>
                                          <td className="p-2">
                                            Loan Application
                                          </td>
                                        </tr>
                                        <tr className="border-b">
                                          <td className="p-2">10/11/2022</td>
                                          <td className="p-2">SBI</td>
                                          <td className="p-2">Car Loan</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ) : (
                            <CreditTab debtData={debtData} creditScore={750} />
                          )}
                        </div>
                      </TabsContent>

                      <TabsContent value="savings">
                        <div className="mt-6">
                          <div className="flex justify-end mb-4">
                            <div className="flex items-center space-x-2">
                              <Button
                                variant={
                                  timeRange === "RECENT" ? "default" : "outline"
                                }
                                size="sm"
                                onClick={() => setTimeRange("RECENT")}
                              >
                                Recent
                              </Button>
                              <Button
                                variant={
                                  timeRange === "3M" ? "default" : "outline"
                                }
                                size="sm"
                                onClick={() => setTimeRange("3M")}
                              >
                                3M
                              </Button>
                              <Button
                                variant={
                                  timeRange === "6M" ? "default" : "outline"
                                }
                                size="sm"
                                onClick={() => setTimeRange("6M")}
                              >
                                6M
                              </Button>
                              <Button
                                variant={
                                  timeRange === "12M" ? "default" : "outline"
                                }
                                size="sm"
                                onClick={() => setTimeRange("12M")}
                              >
                                12M
                              </Button>
                            </div>
                          </div>

                          <SavingsTab savingsData={savingsData} />
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Monitoring Signals Tab */}
            <TabsContent value="monitoring" className="tab-content">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">
                    Individual Monitoring Signals
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <MonitoringSignals />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Call History Tab */}
            <TabsContent value="calls" className="tab-content space-y-6">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">
                    Call History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CallList
                    calls={mockCalls}
                    selectedCall={selectedCall}
                    onCallSelect={handleCallSelect}
                  />
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">
                    Call Transcript
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CallTranscript transcript={mockTranscript} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        ) : (
          // Expanded Sections
          expandedSection === "activity" && (
            <div className="expand-section animate-fade-in">
              <div className="flex items-center mb-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleBack}
                  className="mr-4"
                >
                  <ArrowLeft className="mr-2 size-4" />
                  Back to Overview
                </Button>
                <h2 className="text-2xl font-semibold">Activity & Comments</h2>
              </div>

              <Separator className="mb-8" />

              <LogsAndComments truncated={false} />
            </div>
          )
        )}
      </div>
    </div>
  );
}
