
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MessageSquare, FileText, Clock, Activity, Flag, Send } from "lucide-react";

interface LogsAndCommentsProps {
  truncated?: boolean;
}

// Sample data - in a real app this would come from an API
const sampleLogs = [
  {
    id: 1,
    type: "SIGNAL_CHANGE",
    message: "Credit score dropped by 50 points",
    timestamp: "2024-04-26T14:30:00Z",
    user: "System"
  },
  {
    id: 2,
    type: "STATUS_CHANGE",
    message: "Customer status changed from 'Active' to 'High Risk'",
    timestamp: "2024-04-25T10:15:00Z",
    user: "System"
  },
  {
    id: 3,
    type: "RISK_CHANGE",
    message: "Risk bucket changed from 'Low' to 'Medium'",
    timestamp: "2024-04-24T09:20:00Z",
    user: "System"
  },
  {
    id: 4,
    type: "USER_ACTION",
    message: "Initiated credit limit review",
    timestamp: "2024-04-23T16:45:00Z",
    user: "Priya Sharma"
  }
];

const sampleComments = [
  {
    id: 1,
    text: "Customer showed positive response to restructuring proposal",
    timestamp: "2024-04-26T15:30:00Z",
    user: "Rahul Kumar",
    role: "Recovery Agent"
  },
  {
    id: 2,
    text: "Credit history shows consistent improvement over last 3 months",
    timestamp: "2024-04-25T11:20:00Z",
    user: "Ankita Patel",
    role: "Credit Analyst"
  }
];

export function LogsAndComments({ truncated = false }: LogsAndCommentsProps) {
  const [newComment, setNewComment] = useState("");
  const [showCommentInput, setShowCommentInput] = useState(false);
  
  const displayedLogs = truncated ? sampleLogs.slice(0, 2) : sampleLogs;
  const displayedComments = truncated ? sampleComments.slice(0, 2) : sampleComments;

  const getLogIcon = (type: string) => {
    switch (type) {
      case "SIGNAL_CHANGE":
        return <Activity className="text-blue-500" />;
      case "STATUS_CHANGE":
        return <Flag className="text-yellow-500" />;
      case "RISK_CHANGE":
        return <Activity className="text-red-500" />;
      case "USER_ACTION":
        return <FileText className="text-green-500" />;
      default:
        return <Clock className="text-gray-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* System Logs */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Clock className="text-gray-600" />
          System Logs
        </h3>
        <div className="space-y-4">
          {displayedLogs.map((log) => (
            <div 
              key={log.id} 
              className="flex items-start gap-3 p-4 rounded-lg border border-gray-100 shadow-sm hover:border-gray-200 transition-all bg-white"
            >
              {getLogIcon(log.type)}
              <div className="flex-1">
                <p className="text-sm text-gray-800">{log.message}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-500">{formatDate(log.timestamp)}</span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs font-medium text-gray-600">{log.user}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comments */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <MessageSquare className="text-gray-600" />
          Comments
        </h3>
        
        <div className="space-y-4">
          {displayedComments.map((comment) => (
            <div 
              key={comment.id}
              className="space-y-2 p-4 rounded-lg border border-gray-100 shadow-sm hover:border-gray-200 transition-all bg-white"
            >
              <div className="flex items-start gap-3">
                <MessageSquare className="text-gray-500 mt-1" />
                <div className="flex-1">
                  <p className="text-sm text-gray-800">{comment.text}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500">{formatDate(comment.timestamp)}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs font-medium text-gray-600">{comment.user}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500">{comment.role}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {!truncated && (
          <div className="mt-6">
            {!showCommentInput ? (
              <Button 
                variant="outline"
                className="w-full"
                onClick={() => setShowCommentInput(true)}
              >
                <MessageSquare className="mr-2 size-4" />
                Add Comment
              </Button>
            ) : (
              <div className="space-y-3 mt-4 p-4 rounded-lg border border-gray-200 bg-white">
                <Textarea
                  placeholder="Add your comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="min-h-[100px] bg-white"
                />
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="outline"
                    onClick={() => setShowCommentInput(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="bg-primary hover:bg-primary/90"
                    onClick={() => {
                      // In a real app, this would call an API to save the comment
                      setNewComment("");
                      setShowCommentInput(false);
                    }}
                  >
                    <Send className="mr-2 size-4" />
                    Send Comment
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
