
import { useState } from "react";
import { mockData } from "../data/mockData";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface RecentSignalsProps {
  limit?: number;
  fullView?: boolean;
}

export function RecentSignals({ limit, fullView = false }: RecentSignalsProps) {
  const [severityFilter, setSeverityFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  
  // Get unique signal types for the filter
  const signalTypes = Array.from(new Set(mockData.signals.map(signal => signal.signalType)));
  
  const filteredData = mockData.signals
    .filter(signal => 
      severityFilter === "all" ? true : signal.severity === severityFilter
    )
    .filter(signal => 
      typeFilter === "all" ? true : signal.signalType === typeFilter
    )
    .slice(0, limit || mockData.signals.length);
  
  return (
    <div className="space-y-4">
      {fullView && (
        <div className="flex flex-col space-y-2 sm:flex-row sm:justify-between sm:space-y-0 gap-2">
          <div className="w-full sm:w-[180px]">
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="h-9">
                <SelectValue placeholder="Filter by severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All Severities</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
          <div className="w-full sm:w-[220px]">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="h-9">
                <SelectValue placeholder="Filter by signal type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All Signal Types</SelectItem>
                  {signalTypes.map((type, index) => (
                    <SelectItem key={index} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/5">Customer</TableHead>
              <TableHead className="w-1/5">Signal Type</TableHead>
              <TableHead className="w-1/6">Severity</TableHead>
              <TableHead className="w-1/6">Date</TableHead>
              <TableHead className="w-1/6 text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((signal) => (
              <TableRow key={signal.id}>
                <TableCell className="font-medium">{signal.customerName}</TableCell>
                <TableCell>{signal.signalType}</TableCell>
                <TableCell>
                  <Badge variant={signal.severity === "High" ? "destructive" : signal.severity === "Medium" ? "default" : "outline"}>
                    {signal.severity}
                  </Badge>
                </TableCell>
                <TableCell>{signal.date}</TableCell>
                <TableCell className="text-right">{signal.status}</TableCell>
              </TableRow>
            ))}
            {filteredData.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6">
                  No signals found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
