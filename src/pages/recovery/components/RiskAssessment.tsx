
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/dashboard/StatusBadge";

interface RiskAssessmentProps {
  risk: string;
  riskPercentage: number;
  sentiment: string;
}

const getRiskColor = (risk: string) => {
  switch (risk) {
    case "Low":
      return "bg-green-500";
    case "Medium":
      return "bg-yellow-500";
    case "High":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

export const RiskAssessment = ({ risk, riskPercentage, sentiment }: RiskAssessmentProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-normal text-gray-500">Risk Assessment</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Repayment Risk:</span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                risk === "Low" ? "bg-green-100 text-green-800" :
                risk === "Medium" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"
              }`}>
                {risk}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className={`h-2.5 rounded-full ${getRiskColor(risk)}`}
                style={{ width: `${riskPercentage}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {riskPercentage}% risk based on conversation analysis
            </p>
          </div>
          <div>
            <span className="text-sm font-medium">Sentiment Analysis:</span>
            <div className="flex items-center mt-1 space-x-2">
              <StatusBadge status={sentiment} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
