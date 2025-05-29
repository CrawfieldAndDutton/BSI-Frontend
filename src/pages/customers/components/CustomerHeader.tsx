
import { Button } from "@/components/ui/button";
import { FileText, CreditCard, RefreshCw } from "lucide-react";

interface CustomerHeaderProps {
  name: string;
  id: string;
  email: string;
  phone: string;
  address: string;
  loanAmount: number;
  loanType: string;
  dateAdded: string;
  status: string;
}

export function CustomerHeader({
  name,
  id,
  email,
  phone,
  address,
  loanAmount,
  loanType,
  dateAdded,
  status
}: CustomerHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <h1 className="font-semibold text-navy-800">Customer Profile</h1>
      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm" variant="outline" className="hover:bg-blue-50">
          <FileText className="mr-2 size-4" />
          View Bank Statement
        </Button>
        <Button size="sm" variant="outline" className="hover:bg-blue-50">
          <CreditCard className="mr-2 size-4" />
          View Credit Report
        </Button>
        <Button size="sm" variant="outline" className="hover:bg-blue-50">
          <RefreshCw className="mr-2 size-4" />
          Re-pull Data
        </Button>
      </div>
    </div>
  );
}
