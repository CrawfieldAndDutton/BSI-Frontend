
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";

interface BulkUploadModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function BulkUploadModal({ open, onOpenChange, onSubmit }: BulkUploadModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="border-navy-800 text-navy-800 hover:bg-navy-50">
          <Upload className="mr-1 h-4 w-4" />
          Bulk Add Customer
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Bulk Upload Customers</DialogTitle>
            <DialogDescription>
              Upload an Excel file containing customer details. The file should include columns for Name, DOB, PAN, Email, Phone, and Loan Amount.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid w-full items-center gap-4">
              <Label htmlFor="file" className="text-right">Excel File</Label>
              <Input
                id="file"
                type="file"
                accept=".xlsx,.xls"
                required
                className="cursor-pointer"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-navy-800 hover:bg-navy-700">
              <Upload className="mr-1 h-4 w-4" />
              Upload File
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
