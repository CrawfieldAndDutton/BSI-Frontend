
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Eye, FileText } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  loanAmount: number;
  status: string;
  dateAdded: string;
}

interface CustomersTableProps {
  customers: Customer[];
}

export function CustomersTable({ customers }: CustomersTableProps) {
  const navigate = useNavigate();
  const [sortField, setSortField] = useState<string>("dateAdded");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedCustomers = [...customers].sort((a, b) => {
    if (sortField === "loanAmount") {
      return sortDirection === "asc"
        ? a.loanAmount - b.loanAmount
        : b.loanAmount - a.loanAmount;
    } else if (sortField === "dateAdded") {
      return sortDirection === "asc"
        ? new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime()
        : new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
    } else {
      const aValue = a[sortField as keyof Customer] || "";
      const bValue = b[sortField as keyof Customer] || "";
      return sortDirection === "asc"
        ? aValue.toString().localeCompare(bValue.toString())
        : bValue.toString().localeCompare(aValue.toString());
    }
  });

  return (
    <div className="rounded-md border overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="cursor-pointer hover:bg-gray-50/80"
                onClick={() => handleSort("id")}
              >
                <div className="flex items-center">
                  Customer ID
                  {sortField === "id" && (
                    <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>
                  )}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-gray-50/80"
                onClick={() => handleSort("name")}
              >
                <div className="flex items-center">
                  Name
                  {sortField === "name" && (
                    <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>
                  )}
                </div>
              </TableHead>
              <TableHead>Contact</TableHead>
              <TableHead
                className="cursor-pointer hover:bg-gray-50/80"
                onClick={() => handleSort("status")}
              >
                <div className="flex items-center">
                  Status
                  {sortField === "status" && (
                    <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>
                  )}
                </div>
              </TableHead>
              <TableHead
                className="text-right cursor-pointer hover:bg-gray-50/80"
                onClick={() => handleSort("loanAmount")}
              >
                <div className="flex items-center justify-end">
                  Loan Amount
                  {sortField === "loanAmount" && (
                    <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>
                  )}
                </div>
              </TableHead>
              <TableHead
                className="cursor-pointer hover:bg-gray-50/80"
                onClick={() => handleSort("dateAdded")}
              >
                <div className="flex items-center">
                  Date Added
                  {sortField === "dateAdded" && (
                    <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>
                  )}
                </div>
              </TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedCustomers.length > 0 ? (
              sortedCustomers.map((customer) => (
                <TableRow
                  key={customer.id}
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <TableCell className="font-medium">{customer.id}</TableCell>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{customer.email}</div>
                      <div className="text-gray-500">{customer.phone}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={customer.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(customer.loanAmount)}
                  </TableCell>
                  <TableCell>
                    {new Date(customer.dateAdded).toLocaleDateString("en-IN")}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(`/customers/${customer.id}`)}
                      >
                        <Eye className="mr-1.5 h-4 w-4" />
                        View
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                  No customers found matching your search criteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
