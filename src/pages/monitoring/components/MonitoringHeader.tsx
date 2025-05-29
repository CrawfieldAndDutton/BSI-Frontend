
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { Link } from "react-router-dom";

export function MonitoringHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
      <h1 className="font-semibold text-navy-800">Monitoring Dashboard</h1>
      <div className="mt-2 sm:mt-0 flex items-center gap-2">
        <Button size="sm" variant="outline">
          <Filter className="mr-1 h-4 w-4" />
          Advanced Filters
        </Button>
        <Button size="sm" variant="outline" asChild>
          <Link to="/monitoring/signals">View All Signals</Link>
        </Button>
        <Button size="sm" className="bg-navy-800 hover:bg-navy-700">
          Generate Report
        </Button>
      </div>
    </div>
  );
}
