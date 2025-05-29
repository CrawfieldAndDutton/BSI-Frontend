
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertCircle,
  Bell,
  Check,
  ChevronDown,
  ExternalLink,
  Filter,
  Phone,
  Settings,
  Trash2,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

// Sample data - would come from API in real app
const notifications = [
  {
    id: 1,
    type: "signal",
    subtype: "positive",
    title: "Salary increase detected",
    description: "Aditya Sharma's salary has increased by 7%",
    customer: "Aditya Sharma",
    date: "2023-04-25T10:30:00",
    read: false,
  },
  {
    id: 2,
    type: "signal",
    subtype: "negative",
    title: "Multiple loan applications detected",
    description: "Vikram Singh has applied for 3 loans in the last 30 days",
    customer: "Vikram Singh",
    date: "2023-04-24T14:45:00",
    read: false,
  },
  {
    id: 3,
    type: "data",
    subtype: "neutral",
    title: "Data sharing completed",
    description: "Priya Patel has completed the data sharing process",
    customer: "Priya Patel",
    date: "2023-04-23T09:15:00",
    read: true,
  },
  {
    id: 4,
    type: "call",
    subtype: "positive",
    title: "Successful recovery call",
    description: "Rajesh Kumar has committed to pay the overdue amount",
    customer: "Rajesh Kumar",
    date: "2023-04-22T16:20:00",
    read: true,
  },
  {
    id: 5,
    type: "signal",
    subtype: "negative",
    title: "Spending increase detected",
    description: "Sunita Verma's spending has increased by 35% this month",
    customer: "Sunita Verma",
    date: "2023-04-21T11:05:00",
    read: true,
  },
];

export default function Notifications() {
  const [filter, setFilter] = useState("all");
  const [notificationsList, setNotificationsList] = useState(notifications);

  const markAsRead = (id: number) => {
    setNotificationsList(
      notificationsList.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotificationsList(
      notificationsList.map((notification) => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id: number) => {
    setNotificationsList(
      notificationsList.filter((notification) => notification.id !== id)
    );
  };

  const getFilteredNotifications = () => {
    if (filter === "all") return notificationsList;
    if (filter === "unread") return notificationsList.filter((n) => !n.read);
    return notificationsList.filter((n) => n.type === filter);
  };

  const getIcon = (type: string, subtype: string) => {
    if (type === "signal") {
      if (subtype === "positive") return <TrendingUp className="h-5 w-5 text-green-500" />;
      if (subtype === "negative") return <TrendingDown className="h-5 w-5 text-red-500" />;
      return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    }
    if (type === "data") return <ExternalLink className="h-5 w-5 text-blue-500" />;
    if (type === "call") return <Phone className="h-5 w-5 text-purple-500" />;
    return <Bell className="h-5 w-5 text-gray-500" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <h1 className="font-semibold text-navy-800">Notifications</h1>
        <div className="mt-2 sm:mt-0">
          <Button
            size="sm"
            variant="outline"
            onClick={markAllAsRead}
            className="mr-2"
          >
            <Check className="mr-1 h-4 w-4" />
            Mark All Read
          </Button>
          <Button size="sm" variant="outline">
            <Settings className="mr-1 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <span className="text-sm">Filter by:</span>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter notifications" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Notifications</SelectItem>
              <SelectItem value="unread">Unread</SelectItem>
              <SelectItem value="signal">Signals</SelectItem>
              <SelectItem value="data">Data Updates</SelectItem>
              <SelectItem value="call">Call Outcomes</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="mt-2 sm:mt-0">
          <span className="text-sm text-gray-500">
            {getFilteredNotifications().filter((n) => !n.read).length} unread notifications
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {getFilteredNotifications().map((notification) => (
          <div
            key={notification.id}
            className={`p-4 rounded-lg border ${
              !notification.read
                ? "bg-navy-50/50 border-navy-100"
                : "bg-white border-gray-200"
            }`}
          >
            <div className="flex items-start">
              <div className="mr-3 mt-1">{getIcon(notification.type, notification.subtype)}</div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <h4 className="font-medium text-navy-800">{notification.title}</h4>
                  <span className="text-xs text-gray-500 mt-1 sm:mt-0">
                    {new Date(notification.date).toLocaleString("en-IN")}
                  </span>
                </div>
                <p className="text-sm mt-1">{notification.description}</p>
                <div className="flex items-center mt-2 text-sm">
                  <span className="text-gray-500">Customer:</span>
                  <a href="#" className="text-navy-700 hover:underline ml-1">
                    {notification.customer}
                  </a>
                </div>
              </div>
              <div className="ml-4 flex flex-col space-y-2">
                {!notification.read && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => markAsRead(notification.id)}
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteNotification(notification.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
