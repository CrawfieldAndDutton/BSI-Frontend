
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Edit, Plus, Trash } from "lucide-react";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

// Sample data - would come from API in real app
const users = [
  {
    id: 1,
    name: "Vikram Mehta",
    email: "vikram.mehta@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    name: "Priya Singh",
    email: "priya.singh@example.com",
    role: "Underwriter",
    status: "Active",
  },
  {
    id: 3,
    name: "Rahul Kapoor",
    email: "rahul.kapoor@example.com",
    role: "Monitor",
    status: "Active",
  },
  {
    id: 4,
    name: "Aisha Patel",
    email: "aisha.patel@example.com",
    role: "Recovery Agent",
    status: "Inactive",
  },
  {
    id: 5,
    name: "Sanjay Kumar",
    email: "sanjay.kumar@example.com",
    role: "Underwriter",
    status: "Active",
  },
];

const roles = [
  {
    id: 1,
    name: "Admin",
    description: "Full system access and user management",
    permissions: ["Manage Users", "Manage Roles", "System Configuration"],
  },
  {
    id: 2,
    name: "Underwriter",
    description: "Can review and decide on loan applications",
    permissions: ["View Customers", "Approve/Reject Loans", "Generate Reports"],
  },
  {
    id: 3,
    name: "Monitor",
    description: "Monitors existing loans and customers",
    permissions: ["View Customers", "Add Notes", "Flag Risks"],
  },
  {
    id: 4,
    name: "Recovery Agent",
    description: "Handles collection for overdue accounts",
    permissions: ["View High Risk Customers", "Make Calls", "Add Notes"],
  },
];

export default function Users() {
  const [activeTab, setActiveTab] = useState("users");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [roleDialogOpen, setRoleDialogOpen] = useState(false);

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, would make API call to create user
    toast.success("User created successfully");
    setDialogOpen(false);
  };

  const handleCreateRole = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, would make API call to create role
    toast.success("Role created successfully");
    setRoleDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <h1 className="font-semibold text-navy-800">Role & User Management</h1>
        <div className="mt-2 sm:mt-0 space-x-2">
          {activeTab === "users" ? (
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-navy-800 hover:bg-navy-700">
                  <Plus className="mr-1 h-4 w-4" />
                  New User
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleCreateUser}>
                  <DialogHeader>
                    <DialogTitle>Create New User</DialogTitle>
                    <DialogDescription>
                      Add a new user to your organization.
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
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="email" className="text-right">
                        Email
                      </Label>
                      <Input
                        id="email"
                        placeholder="Email address"
                        type="email"
                        className="col-span-3"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="role" className="text-right">
                        Role
                      </Label>
                      <Select>
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="underwriter">Underwriter</SelectItem>
                          <SelectItem value="monitor">Monitor</SelectItem>
                          <SelectItem value="recovery">Recovery Agent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-navy-800 hover:bg-navy-700">
                      Create User
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          ) : (
            <Dialog open={roleDialogOpen} onOpenChange={setRoleDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-navy-800 hover:bg-navy-700">
                  <Plus className="mr-1 h-4 w-4" />
                  New Role
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleCreateRole}>
                  <DialogHeader>
                    <DialogTitle>Create New Role</DialogTitle>
                    <DialogDescription>
                      Create a new role with specific permissions.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="role-name" className="text-right">
                        Role Name
                      </Label>
                      <Input
                        id="role-name"
                        placeholder="Role name"
                        className="col-span-3"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="description" className="text-right">
                        Description
                      </Label>
                      <Input
                        id="description"
                        placeholder="Role description"
                        className="col-span-3"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-start gap-4">
                      <Label className="text-right pt-2">Permissions</Label>
                      <div className="col-span-3 space-y-2">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="perm-1" />
                          <Label htmlFor="perm-1">Manage Users</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="perm-2" />
                          <Label htmlFor="perm-2">View Customers</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="perm-3" />
                          <Label htmlFor="perm-3">Approve/Reject Loans</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="perm-4" />
                          <Label htmlFor="perm-4">Generate Reports</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setRoleDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-navy-800 hover:bg-navy-700">
                      Create Role
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="roles">Roles</TabsTrigger>
        </TabsList>
        <TabsContent value="users" className="mt-6">
          <div className="stats-card">
            <div className="overflow-x-auto">
              <table className="w-full table-container">
                <thead>
                  <tr className="table-header">
                    <th className="table-cell">Name</th>
                    <th className="table-cell">Email</th>
                    <th className="table-cell">Role</th>
                    <th className="table-cell">Status</th>
                    <th className="table-cell text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="table-row">
                      <td className="table-cell font-medium">{user.name}</td>
                      <td className="table-cell">{user.email}</td>
                      <td className="table-cell">{user.role}</td>
                      <td className="table-cell">
                        <StatusBadge status={user.status} />
                      </td>
                      <td className="table-cell text-right">
                        <Button variant="ghost" size="sm">
                          <Edit size={16} />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash size={16} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="roles" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {roles.map((role) => (
              <div key={role.id} className="stats-card">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-medium text-navy-800">{role.name}</h4>
                    <p className="text-sm text-gray-500">{role.description}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Edit size={16} />
                  </Button>
                </div>
                <div className="mt-4">
                  <h5 className="text-sm font-medium mb-2">Permissions:</h5>
                  <ul className="space-y-1">
                    {role.permissions.map((permission, idx) => (
                      <li key={idx} className="text-sm flex items-center">
                        <span className="h-1.5 w-1.5 rounded-full bg-navy-800 mr-2" />
                        {permission}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
