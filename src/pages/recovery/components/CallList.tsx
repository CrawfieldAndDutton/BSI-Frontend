
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Call } from "@/lib/types";

interface CallListProps {
  calls: Call[];
  selectedCall: string;
  onCallSelect: (callId: string) => void;
}

export function CallList({ calls, selectedCall, onCallSelect }: CallListProps) {
  return (
    <div className="space-y-4">
      <Table className="border rounded-md">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[15%]">Date</TableHead>
            <TableHead className="w-[15%]">Time</TableHead>
            <TableHead className="w-[15%]">Duration</TableHead>
            <TableHead className="w-[20%]">Agent</TableHead>
            <TableHead className="w-[15%]">Type</TableHead>
            <TableHead className="w-[20%]">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {calls.map((call) => (
            <TableRow 
              key={call.id} 
              className={`cursor-pointer hover:bg-gray-50 ${selectedCall === call.id ? 'bg-gray-100' : ''}`}
              onClick={() => onCallSelect(call.id)}
            >
              <TableCell>{call.date}</TableCell>
              <TableCell>{call.time}</TableCell>
              <TableCell>{call.duration}</TableCell>
              <TableCell>{call.agent}</TableCell>
              <TableCell>
                <Badge variant={call.type === "Inbound" ? "outline" : "default"} className="font-normal">
                  {call.type}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="font-normal">
                  {call.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
