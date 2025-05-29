
import { formatCurrency } from "@/lib/utils";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface CustomerBasicInfoProps {
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

export function CustomerBasicInfo({
  name,
  id,
  email,
  phone,
  address,
  loanAmount,
  loanType,
  dateAdded,
  status
}: CustomerBasicInfoProps) {
  return (
    <Card className="h-full bg-gradient-to-br from-white to-gray-50">
      <CardHeader className="text-center pb-2">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-20 h-20 rounded-full bg-navy-100 flex items-center justify-center text-navy-800 text-2xl font-bold">
            {name.split(" ").map(n => n[0]).join("")}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-navy-800">{name}</h2>
            <p className="text-sm text-navy-500">{id}</p>
          </div>
          <StatusBadge status={status} className="mt-2" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 mt-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-navy-600">Email</p>
              <p className="text-navy-800">{email}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-navy-600">Phone</p>
              <p className="text-navy-800">{phone}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-navy-600">Address</p>
              <p className="text-navy-800">{address}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-navy-600">Loan Amount</p>
              <p className="text-navy-800 font-medium">{formatCurrency(loanAmount)}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-navy-600">Loan Type</p>
              <p className="text-navy-800">{loanType}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-navy-600">Date Added</p>
              <p className="text-navy-800">{new Date(dateAdded).toLocaleDateString("en-IN")}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
