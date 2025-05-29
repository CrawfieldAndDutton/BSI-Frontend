
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CallDetailsProps {
  date: string;
  duration: number;
  outcome: string;
}

const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export const CallDetails = ({ date, duration, outcome }: CallDetailsProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-normal text-gray-500">Call Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Date & Time:</span>
            <span className="font-medium">
              {new Date(date).toLocaleDateString("en-IN")},{" "}
              {new Date(date).toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Duration:</span>
            <span className="font-medium">{formatDuration(duration)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Outcome:</span>
            <span className="font-medium">{outcome}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
