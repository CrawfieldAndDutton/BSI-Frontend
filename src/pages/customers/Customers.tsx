import { useState } from "react";
import { toast } from "sonner";
import { AddCustomerModal } from "./components/AddCustomerModal";
import { BulkUploadModal } from "./components/BulkUploadModal";
import { CustomerSearch } from "./components/CustomerSearch";
import { CustomersTable } from "./components/CustomersTable";

const customers = [
  {
    id: "CUST001",
    name: "Aditya Sharma",
    email: "aditya.sharma@gmail.com",
    phone: "+91 98765 43210",
    loanAmount: 350000,
    status: "Awaiting Data",
    dateAdded: "2023-04-25",
  },
  {
    id: "CUST002",
    name: "Priya Patel",
    email: "priya.patel@yahoo.com",
    phone: "+91 87654 32109",
    loanAmount: 180000,
    status: "Under Review",
    dateAdded: "2023-04-24",
  },
  {
    id: "CUST003",
    name: "Rajesh Kumar",
    email: "rajesh.kumar@hotmail.com",
    phone: "+91 76543 21098",
    loanAmount: 750000,
    status: "Data Received",
    dateAdded: "2023-04-23",
  },
  {
    id: "CUST004",
    name: "Sunita Verma",
    email: "sunita.verma@outlook.com",
    phone: "+91 65432 10987",
    loanAmount: 500000,
    status: "Approved",
    dateAdded: "2023-04-22",
  },
  {
    id: "CUST005",
    name: "Vikram Singh",
    email: "vikram.singh@gmail.com",
    phone: "+91 54321 09876",
    loanAmount: 275000,
    status: "Rejected",
    dateAdded: "2023-04-21",
  },
];

export default function Customers() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [bulkUploadOpen, setBulkUploadOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState(customers);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const filtered = customers.filter(customer => 
      customer.name.toLowerCase().includes(search.toLowerCase()) ||
      customer.id.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCustomers(filtered);
  };
  
  const handleSendLink = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Data sharing link sent successfully");
    setDialogOpen(false);
  };

  const handleBulkUpload = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Bulk upload initiated successfully");
    setBulkUploadOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <h1 className="font-semibold text-navy-800">Customer Management</h1>
        <div className="mt-2 sm:mt-0 flex gap-2">
          <BulkUploadModal
            open={bulkUploadOpen}
            onOpenChange={setBulkUploadOpen}
            onSubmit={handleBulkUpload}
          />
          <AddCustomerModal
            open={dialogOpen}
            onOpenChange={setDialogOpen}
            onSubmit={handleSendLink}
          />
        </div>
      </div>

      <div className="stats-card">
        <CustomerSearch
          search={search}
          onSearchChange={setSearch}
          onSubmit={handleSearch}
        />
        <CustomersTable customers={filteredCustomers} />
      </div>
    </div>
  );
}
