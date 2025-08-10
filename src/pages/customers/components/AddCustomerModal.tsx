import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, ExternalLink } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { customerApi } from "@/apis/modules/customer";
import { number } from "zod";

interface AddCustomerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function AddCustomerModal({
  open,
  onOpenChange,
  onSubmit,
}: AddCustomerModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    dob: "",
    pan: "",
    email: "",
    phone: "",
    loan_amount: 0,
    loan_types: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value: string) => {
    setForm((prev) => ({ ...prev, loan_types: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    const payload = {
      ...form,
      loan_amount: Number(form.loan_amount), // ✅ convert to number
    };

    try {
      const response = await customerApi.customer_create(payload);
      console.log(payload);
      toast.success(`customer created successfully`);
    } catch (error: any) {
      toast.error(
        error.response.data.detail || "Failed to send OTP. Please try again."
      );
    } finally {
      setIsLoading(false);
      setForm({
        name: "",
        dob: "",
        pan: "",
        email: "",
        phone: "",
        loan_amount: 0,
        loan_types: "",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-navy-800 hover:bg-navy-700">
          <Plus className="mr-1 h-4 w-4" />
          Add Customer
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form>
          <DialogHeader>
            <DialogTitle>Add New Customer</DialogTitle>
            <DialogDescription>
              Enter customer details to send a secure data sharing link.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                placeholder="Full name"
                className="col-span-3"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dob" className="text-right">
                Date of Birth
              </Label>
              <Input
                id="dob"
                type="date"
                value={form.dob}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="pan" className="text-right">
                PAN
              </Label>
              <Input
                id="pan"
                placeholder="Enter PAN number"
                className="col-span-3"
                pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                title="Please enter a valid PAN number (e.g., ABCDE1234F)"
                value={form.pan}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Email address"
                className="col-span-3"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                id="phone"
                placeholder="Phone number"
                value={form.phone}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="loan-amount" className="text-right">
                Loan Amount
              </Label>
              <Input
                id="loan_amount"
                placeholder="Amount (INR)"
                type="number"
                value={form.loan_amount}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="loan-type" className="text-right">
                Loan Type
              </Label>
              <Select onValueChange={handleSelectChange}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select loan type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Personal Loan">Personal Loan</SelectItem>
                  <SelectItem value="Home Loan">Home Loan</SelectItem>
                  <SelectItem value="Business Loan">Business Loan</SelectItem>
                  <SelectItem value="Education Loan">Education Loan</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => onOpenChange(false)} variant="outline">
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-navy-800 hover:bg-navy-700"
              onClick={handleSubmit}
            >
              <ExternalLink className="mr-1 h-4 w-4" />
              Send Data Link
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
