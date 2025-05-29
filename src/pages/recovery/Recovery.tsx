
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import {
  CalendarClock,
  Clock,
  Filter,
  HelpCircle,
  Phone,
  Search,
  ThumbsDown,
  ThumbsUp,
  User,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";

// Sample data - would come from API in real app
const callsToMake = [
  {
    id: 1,
    customerId: "CUST005",
    customerName: "Vikram Singh",
    phone: "+91 54321 09876",
    amountDue: 15000,
    daysOverdue: 45,
    priority: "High",
    lastContact: "2023-04-20",
  },
  {
    id: 2,
    customerId: "CUST007",
    customerName: "Neha Gupta",
    phone: "+91 87654 12345",
    amountDue: 8000,
    daysOverdue: 30,
    priority: "Medium",
    lastContact: "2023-04-18",
  },
  {
    id: 3,
    customerId: "CUST012",
    customerName: "Suresh Patel",
    phone: "+91 90123 45678",
    amountDue: 5000,
    daysOverdue: 15,
    priority: "Low",
    lastContact: "2023-04-15",
  },
];

const callHistory = [
  {
    id: 1,
    customerId: "CUST005",
    customerName: "Vikram Singh",
    date: "2023-04-20T14:30:00",
    duration: 325,
    outcome: "Promise to pay",
    sentiment: "Positive",
    notes: "Customer promised to pay by 30th April",
  },
  {
    id: 2,
    customerId: "CUST005",
    customerName: "Vikram Singh",
    date: "2023-04-15T11:15:00",
    duration: 180,
    outcome: "Follow up needed",
    sentiment: "Neutral",
    notes: "Customer requested more time to arrange funds",
  },
  {
    id: 3,
    customerId: "CUST007",
    customerName: "Neha Gupta",
    date: "2023-04-18T16:45:00",
    duration: 420,
    outcome: "Disputed amount",
    sentiment: "Negative",
    notes: "Customer claims to have made the payment already, needs verification",
  },
  {
    id: 4,
    customerId: "CUST012",
    customerName: "Suresh Patel",
    date: "2023-04-15T09:20:00",
    duration: 290,
    outcome: "Will pay partial",
    sentiment: "Neutral",
    notes: "Customer will pay 50% now and remainder by month end",
  },
];

const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const callTranscript = [
  {
    speaker: "Agent",
    text: "Hello, am I speaking with Vikram Singh?",
    timestamp: "00:00:05",
    sentiment: "Neutral",
  },
  {
    speaker: "Customer",
    text: "Yes, this is Vikram speaking.",
    timestamp: "00:00:08",
    sentiment: "Neutral",
  },
  {
    speaker: "Agent",
    text: "Good afternoon Mr. Singh, I'm calling from BankLens regarding your outstanding loan payment of Rs. 15,000 which is overdue by 45 days.",
    timestamp: "00:00:15",
    sentiment: "Neutral",
  },
  {
    speaker: "Customer",
    text: "Yes, I know. I've been facing some financial difficulties lately.",
    timestamp: "00:00:25",
    sentiment: "Negative",
  },
  {
    speaker: "Agent",
    text: "I understand that financial situations can be challenging. Is there a specific reason for the delay that we should be aware of?",
    timestamp: "00:00:35",
    sentiment: "Neutral",
  },
  {
    speaker: "Customer",
    text: "I lost my job last month and have been struggling to find new employment. But I have some interviews lined up this week.",
    timestamp: "00:00:50",
    sentiment: "Negative",
  },
  {
    speaker: "Agent",
    text: "I'm sorry to hear about your job situation. Thank you for sharing that with me. Would it be possible for you to make at least a partial payment at this time?",
    timestamp: "00:01:05",
    sentiment: "Neutral",
  },
  {
    speaker: "Customer",
    text: "I think I can arrange for about Rs. 5,000 by this weekend. Would that be acceptable?",
    timestamp: "00:01:20",
    sentiment: "Positive",
  },
  {
    speaker: "Agent",
    text: "That would definitely help. And when do you think you might be able to clear the remaining balance?",
    timestamp: "00:01:30",
    sentiment: "Positive",
  },
  {
    speaker: "Customer",
    text: "If one of these job interviews works out, I should be able to clear the full amount by the end of next month.",
    timestamp: "00:01:45",
    sentiment: "Positive",
  },
  {
    speaker: "Agent",
    text: "That sounds good. I'll make a note of your commitment to pay Rs. 5,000 this weekend and the remainder by the end of next month.",
    timestamp: "00:02:00",
    sentiment: "Positive",
  },
];

export default function Recovery() {
  const [activeTab, setActiveTab] = useState("to-call");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCall, setSelectedCall] = useState<number | null>(1);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <h1 className="font-semibold text-navy-800">Recovery Calling Agent</h1>
        <div className="mt-2 sm:mt-0 space-x-2">
          <Select defaultValue="english">
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Call Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="hindi">Hindi</SelectItem>
              <SelectItem value="tamil">Tamil</SelectItem>
              <SelectItem value="telugu">Telugu</SelectItem>
              <SelectItem value="bengali">Bengali</SelectItem>
            </SelectContent>
          </Select>
          <Button size="sm" className="bg-navy-800 hover:bg-navy-700">
            <Phone className="mr-1 h-4 w-4" />
            Start New Call
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="to-call">To Call</TabsTrigger>
          <TabsTrigger value="call-history">Call History</TabsTrigger>
        </TabsList>
        <TabsContent value="to-call" className="mt-6">
          <div className="stats-card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Search className="h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search by name or ID"
                  className="w-[250px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="mr-1 h-4 w-4" />
                Filter
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full table-container">
                <thead>
                  <tr className="table-header">
                    <th className="table-cell">Customer</th>
                    <th className="table-cell">Contact</th>
                    <th className="table-cell">Amount Due</th>
                    <th className="table-cell">Days Overdue</th>
                    <th className="table-cell">Priority</th>
                    <th className="table-cell">Last Contact</th>
                    <th className="table-cell text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {callsToMake.map((call) => (
                    <tr key={call.id} className="table-row">
                      <td className="table-cell">
                        <div className="font-medium">{call.customerName}</div>
                        <div className="text-xs text-gray-500">{call.customerId}</div>
                      </td>
                      <td className="table-cell">{call.phone}</td>
                      <td className="table-cell">{formatCurrency(call.amountDue)}</td>
                      <td className="table-cell">{call.daysOverdue} days</td>
                      <td className="table-cell">
                        <StatusBadge
                          status={call.priority}
                        />
                      </td>
                      <td className="table-cell">
                        {new Date(call.lastContact).toLocaleDateString("en-IN")}
                      </td>
                      <td className="table-cell text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-green-600 hover:text-green-700 hover:bg-green-50"
                        >
                          <Phone className="h-4 w-4 mr-1" />
                          Call
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="call-history" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <div className="stats-card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">Call Records</h3>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-1 h-4 w-4" />
                    Filter
                  </Button>
                </div>
                <div className="space-y-2">
                  {callHistory.map((call) => (
                    <div
                      key={call.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedCall === call.id
                          ? "bg-navy-50 border-navy-200"
                          : "bg-white border-gray-200 hover:bg-gray-50"
                      }`}
                      onClick={() => setSelectedCall(call.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-medium">{call.customerName}</div>
                          <div className="text-xs text-gray-500">{call.customerId}</div>
                        </div>
                        <StatusBadge
                          status={call.sentiment}
                          className="ml-2"
                        />
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <CalendarClock className="h-3.5 w-3.5 mr-1" />
                        <span>
                          {new Date(call.date).toLocaleDateString("en-IN")},{" "}
                          {new Date(call.date).toLocaleTimeString("en-IN", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center text-sm text-gray-500">
                        <Clock className="h-3.5 w-3.5 mr-1" />
                        <span>{formatDuration(call.duration)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <div className="stats-card h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">Call Details & Transcription</h3>
                  {selectedCall && (
                    <div>
                      <Button variant="outline" size="sm" className="mr-2">
                        <HelpCircle className="h-4 w-4 mr-1" />
                        Help
                      </Button>
                      <Button size="sm" className="bg-navy-800 hover:bg-navy-700">
                        Log Followup
                      </Button>
                    </div>
                  )}
                </div>
                
                {selectedCall && (
                  <div className="flex-1 flex flex-col">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-normal text-gray-500">Customer</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="font-medium">{callHistory[0].customerName}</div>
                          <CardDescription>{callHistory[0].customerId}</CardDescription>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-normal text-gray-500">Call Outcome</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="font-medium">{callHistory[0].outcome}</div>
                          <CardDescription>{callHistory[0].notes}</CardDescription>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="border rounded-lg p-4 mb-4">
                      <h4 className="font-medium mb-2">Call Transcript</h4>
                      <div className="space-y-4 max-h-[350px] overflow-y-auto p-2">
                        {callTranscript.map((line, idx) => (
                          <div
                            key={idx}
                            className={`flex items-start ${
                              line.speaker === "Agent" ? "justify-end" : ""
                            }`}
                          >
                            <div
                              className={`max-w-[80%] rounded-lg p-3 ${
                                line.speaker === "Agent"
                                  ? "bg-navy-100 ml-auto"
                                  : "bg-gray-100"
                              }`}
                            >
                              <div className="flex justify-between mb-1">
                                <span className="text-xs font-medium">
                                  {line.speaker}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {line.timestamp}
                                </span>
                              </div>
                              <p className="text-sm">{line.text}</p>
                              <div className="mt-1 flex justify-end">
                                {line.sentiment === "Positive" && (
                                  <ThumbsUp className="h-3.5 w-3.5 text-green-500" />
                                )}
                                {line.sentiment === "Negative" && (
                                  <ThumbsDown className="h-3.5 w-3.5 text-red-500" />
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="mt-auto">
                      <div className="flex justify-between">
                        <div>
                          <h4 className="font-medium mb-2">Sentiment Analysis</h4>
                          <div className="flex items-center space-x-2">
                            <div>
                              <span className="text-xs text-gray-500">Overall:</span>
                              <StatusBadge status="Positive" className="ml-1" />
                            </div>
                            <div>
                              <span className="text-xs text-gray-500">Repayment Intent:</span>
                              <StatusBadge status="High" className="ml-1" />
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <h4 className="font-medium mb-2">Prediction</h4>
                          <p className="text-sm text-green-600 font-medium">80% chance of payment within 30 days</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {!selectedCall && (
                  <div className="flex-1 flex items-center justify-center text-gray-500">
                    Select a call to view details
                  </div>
                )}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
