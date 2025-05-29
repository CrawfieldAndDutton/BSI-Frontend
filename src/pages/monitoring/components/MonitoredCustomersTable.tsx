
import { useState } from "react";
import { mockData } from "../data/mockData";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface MonitoredCustomersTableProps {
  limit?: number;
}

export function MonitoredCustomersTable({ limit }: MonitoredCustomersTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  const filteredData = mockData.customers
    .filter(customer => 
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      customer.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(customer => 
      statusFilter === "all" ? true : customer.status === statusFilter
    )
    .slice(0, limit || mockData.customers.length);
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2 sm:flex-row sm:justify-between sm:space-y-0">
        <div className="flex items-center space-x-2 w-full sm:max-w-xs">
          <Input
            placeholder="Search customers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9"
          />
        </div>
        
        <div className="w-full sm:w-[180px]">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="h-9">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Monitoring">Monitoring</SelectItem>
                <SelectItem value="Under Review">Under Review</SelectItem>
                <SelectItem value="Analyzed">Analyzed</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/5">Customer</TableHead>
              <TableHead className="w-1/5">Status</TableHead>
              <TableHead className="w-1/6">Risk Level</TableHead>
              <TableHead className="w-1/6">Location</TableHead>
              <TableHead className="w-1/6">Last Updated</TableHead>
              <TableHead className="w-1/6 text-right">Signals</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="font-medium">{customer.name}</TableCell>
                <TableCell>{customer.status}</TableCell>
                <TableCell>{customer.risk}</TableCell>
                <TableCell>{customer.location}</TableCell>
                <TableCell>{customer.lastUpdated}</TableCell>
                <TableCell className="text-right">{customer.signals}</TableCell>
              </TableRow>
            ))}
            {filteredData.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6">
                  No customers found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
