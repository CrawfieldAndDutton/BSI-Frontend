
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, MessageSquare } from "lucide-react";
import { CallList } from "./components/CallList";
import { CallDetails } from "./components/CallDetails";
import { RiskAssessment } from "./components/RiskAssessment";
import { CallTranscript } from "./components/CallTranscript";
import { Call, Transcript } from "@/lib/types";

// Fixed callHistory data to match the Call type
const callHistory: Call[] = [
  {
    id: "call1",
    customerId: "CUST005",
    customerName: "Vikram Singh",
    date: "2023-04-20",
    time: "14:30",
    duration: "5:25",
    agent: "Sanjay Kumar",
    type: "Outbound",
    status: "Completed",
    outcome: "Promise to pay",
    sentiment: "Positive",
    notes: "Customer promised to pay by 30th April"
  },
  {
    id: "call2",
    customerId: "CUST005",
    customerName: "Vikram Singh",
    date: "2023-04-15",
    time: "11:15",
    duration: "3:00",
    agent: "Priya Desai",
    type: "Outbound",
    status: "Completed",
    outcome: "Follow up needed",
    sentiment: "Neutral",
    notes: "Customer requested more time to arrange funds"
  },
  {
    id: "call3",
    customerId: "CUST007",
    customerName: "Neha Gupta",
    date: "2023-04-18",
    time: "16:45",
    duration: "7:00",
    agent: "Amit Shah",
    type: "Outbound",
    status: "Completed",
    outcome: "Disputed amount",
    sentiment: "Negative",
    notes: "Customer claims to have made the payment already, needs verification"
  },
  {
    id: "call4",
    customerId: "CUST012",
    customerName: "Suresh Patel",
    date: "2023-04-15",
    time: "09:20",
    duration: "4:50",
    agent: "Rahul Varma",
    type: "Inbound",
    status: "Completed",
    outcome: "Will pay partial",
    sentiment: "Neutral",
    notes: "Customer will pay 50% now and remainder by month end"
  },
  {
    id: "call5",
    customerId: "CUST005",
    customerName: "Vikram Singh",
    date: "2023-04-10",
    time: "10:00",
    duration: "3:35",
    agent: "Neha Shah",
    type: "Outbound",
    status: "Completed",
    outcome: "Requested extension",
    sentiment: "Neutral",
    notes: "Customer requested 2-week extension due to medical emergency"
  },
  {
    id: "call6",
    customerId: "CUST005",
    customerName: "Vikram Singh",
    date: "2023-04-05",
    time: "15:45",
    duration: "2:55",
    agent: "Rahul Varma",
    type: "Outbound",
    status: "Completed",
    outcome: "Payment plan setup",
    sentiment: "Positive",
    notes: "Established weekly payment plan of Rs. 2,000"
  },
  {
    id: "call7",
    customerId: "CUST005",
    customerName: "Vikram Singh",
    date: "2023-04-01",
    time: "09:30",
    duration: "5:10",
    agent: "Amit Shah",
    type: "Outbound",
    status: "Completed",
    outcome: "Payment reminder",
    sentiment: "Neutral",
    notes: "First reminder call, customer was unaware of due date"
  }
];

// Additional call information (not part of the Call type)
const callDetails = [
  {
    id: "call1",
    repaymentRisk: "Low",
    riskPercentage: 20,
    summary: "Customer acknowledged the overdue amount and promised to pay by the end of the month. They explained they had financial difficulties due to job loss but have interviews lined up and are confident of clearing the dues soon."
  },
  {
    id: "call2",
    repaymentRisk: "Medium",
    riskPercentage: 45,
    summary: "Customer requested additional time to arrange for funds. They mentioned having temporary cash flow issues but assured they would try to make at least a partial payment within a week."
  },
  {
    id: "call3",
    repaymentRisk: "High",
    riskPercentage: 75,
    summary: "Customer strongly disputed the amount shown as overdue. They claimed to have made the payment last week and provided a transaction reference. This needs to be verified with the accounts department."
  },
  {
    id: "call4",
    repaymentRisk: "Medium",
    riskPercentage: 40,
    summary: "Customer agreed to make a partial payment of 50% of the amount due immediately. They committed to paying the remaining balance by the end of the month when they receive their salary."
  },
  {
    id: "call5",
    repaymentRisk: "Medium",
    riskPercentage: 50,
    summary: "Customer requested a 2-week extension due to unexpected medical expenses. They provided details of the hospital stay and assured that they would prioritize the loan payment once they recover."
  },
  {
    id: "call6",
    repaymentRisk: "Low",
    riskPercentage: 25,
    summary: "Customer agreed to a structured payment plan of Rs. 2,000 per week. They acknowledged the importance of maintaining timely payments and committed to following the plan to clear the outstanding balance."
  },
  {
    id: "call7",
    repaymentRisk: "Low",
    riskPercentage: 30,
    summary: "Initial reminder call to the customer. They were unaware of the exact due date but confirmed they have set aside funds for the payment. They requested account details and promised to make the payment within 2 days."
  }
];

// Updated transcript data to match the Transcript type
const mockTranscript: Transcript = {
  id: "call1",
  date: "2023-04-20",
  time: "14:30",
  agent: "Sanjay Kumar",
  customer: "Vikram Singh",
  sentiment: "Positive",
  transcript: [
    {
      speaker: "Agent",
      text: "Hello, am I speaking with Vikram Singh?",
      time: "00:00:05",
      sentiment: "Neutral",
    },
    {
      speaker: "Customer",
      text: "Yes, this is Vikram speaking.",
      time: "00:00:08",
      sentiment: "Neutral",
    },
    {
      speaker: "Agent",
      text: "Good afternoon Mr. Singh, I'm calling from BankLens regarding your outstanding loan payment of Rs. 15,000 which is overdue by 45 days.",
      time: "00:00:15",
      sentiment: "Neutral",
    },
    {
      speaker: "Customer",
      text: "Yes, I know. I've been facing some financial difficulties lately.",
      time: "00:00:25",
      sentiment: "Negative",
    },
    {
      speaker: "Agent",
      text: "I understand that financial situations can be challenging. Is there a specific reason for the delay that we should be aware of?",
      time: "00:00:35",
      sentiment: "Neutral",
    },
    {
      speaker: "Customer",
      text: "I lost my job last month and have been struggling to find new employment. But I have some interviews lined up this week.",
      time: "00:00:50",
      sentiment: "Negative",
    },
    {
      speaker: "Agent",
      text: "I'm sorry to hear about your job situation. Thank you for sharing that with me. Would it be possible for you to make at least a partial payment at this time?",
      time: "00:01:05",
      sentiment: "Neutral",
    },
    {
      speaker: "Customer",
      text: "I think I can arrange for about Rs. 5,000 by this weekend. Would that be acceptable?",
      time: "00:01:20",
      sentiment: "Positive",
    },
    {
      speaker: "Agent",
      text: "That would definitely help. And when do you think you might be able to clear the remaining balance?",
      time: "00:01:30",
      sentiment: "Positive",
    },
    {
      speaker: "Customer",
      text: "If one of these job interviews works out, I should be able to clear the full amount by the end of next month.",
      time: "00:01:45",
      sentiment: "Positive",
    },
    {
      speaker: "Agent",
      text: "That sounds good. I'll make a note of your commitment to pay Rs. 5,000 this weekend and the remainder by the end of next month.",
      time: "00:02:00",
      sentiment: "Positive",
    },
    {
      speaker: "Customer",
      text: "Yes, that's correct. I appreciate your understanding during this difficult time.",
      time: "00:02:15",
      sentiment: "Positive",
    },
    {
      speaker: "Agent",
      text: "You're welcome, Mr. Singh. We understand that circumstances can be challenging. Is there anything else you'd like to discuss about your account?",
      time: "00:02:30",
      sentiment: "Neutral",
    },
    {
      speaker: "Customer",
      text: "No, that's all. Thank you for your patience. I'll make sure to transfer the amount this weekend.",
      time: "00:02:45",
      sentiment: "Positive",
    },
    {
      speaker: "Agent",
      text: "Perfect. You'll receive a confirmation message once we receive your payment. Have a good day, Mr. Singh.",
      time: "00:03:00",
      sentiment: "Positive",
    },
    {
      speaker: "Customer",
      text: "Thank you. You too. Goodbye.",
      time: "00:03:10",
      sentiment: "Positive",
    }
  ]
};

const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const getRiskColor = (risk: string) => {
  switch (risk) {
    case "Low":
      return "bg-green-100 text-green-800";
    case "Medium":
      return "bg-yellow-100 text-yellow-800";
    case "High":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function CallHistory() {
  const { id } = useParams<{ id: string }>();
  const [selectedCall, setSelectedCall] = useState<string | null>(null);
  const [customerCalls, setCustomerCalls] = useState<Call[]>(callHistory);

  useEffect(() => {
    if (id) {
      const filteredCalls = callHistory.filter(call => call.customerId === id);
      setCustomerCalls(filteredCalls);
      
      if (filteredCalls.length > 0) {
        setSelectedCall(filteredCalls[0].id);
      }
    }
  }, [id]);

  const selectedCallData = customerCalls.find(call => call.id === selectedCall);
  const selectedCallDetails = selectedCallData ? callDetails.find(detail => detail.id === selectedCallData.id) : null;

  const handleCallSelect = (callId: string) => {
    setSelectedCall(callId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to={`/customers/${id}`}>
            <Button variant="ghost" className="p-0 h-auto">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Customer
            </Button>
          </Link>
          <h1 className="font-semibold text-xl text-navy-800">
            Call History - {customerCalls[0]?.customerName || "Customer"}
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <CallList 
            calls={customerCalls}
            selectedCall={selectedCall || ""}
            onCallSelect={handleCallSelect}
          />
        </div>

        <div className="lg:col-span-2">
          {selectedCallData && selectedCallDetails ? (
            <div className="stats-card h-full flex flex-col">
              <div className="mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <CallDetails
                    date={selectedCallData.date + "T" + selectedCallData.time + ":00"}
                    duration={parseInt(selectedCallData.duration.split(":")[0]) * 60 + parseInt(selectedCallData.duration.split(":")[1])}
                    outcome={selectedCallData.outcome || ""}
                  />
                  <RiskAssessment
                    risk={selectedCallDetails.repaymentRisk}
                    riskPercentage={selectedCallDetails.riskPercentage}
                    sentiment={selectedCallData.sentiment || ""}
                  />
                </div>
              </div>

              <Card className="mb-6 flex-grow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Call Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    {selectedCallDetails.summary}
                  </p>
                </CardContent>
              </Card>

              <CallTranscript transcript={mockTranscript} />
            </div>
          ) : (
            <div className="stats-card h-full flex items-center justify-center">
              <div className="text-center py-12">
                <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-700">No Call Selected</h3>
                <p className="text-gray-500">Select a call from the list to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
