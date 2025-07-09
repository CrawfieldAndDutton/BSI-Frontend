import { useEffect } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { authApi } from "@/apis/modules/auth";
import { roleApi } from "@/apis/modules/role";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample data - would come from API in real app
// const users = [
//   {
//     id: 1,
//     name: "Vikram Mehta",
//     email: "vikram.mehta@example.com",
//     role: "Admin",
//     status: "Active",
//   },
//   {
//     id: 2,
//     name: "Priya Singh",
//     email: "priya.singh@example.com",
//     role: "Underwriter",
//     status: "Active",
//   },
//   {
//     id: 3,
//     name: "Rahul Kapoor",
//     email: "rahul.kapoor@example.com",
//     role: "Monitor",
//     status: "Active",
//   },
//   {
//     id: 4,
//     name: "Aisha Patel",
//     email: "aisha.patel@example.com",
//     role: "Recovery Agent",
//     status: "Inactive",
//   },
//   {
//     id: 5,
//     name: "Sanjay Kumar",
//     email: "sanjay.kumar@example.com",
//     role: "Underwriter",
//     status: "Active",
//   },
// ];

// const roles = [
//   {
//     id: 1,
//     name: "Admin",
//     description: "Full system access and user management",
//     permissions: ["Manage Users", "Manage Roles", "System Configuration"],
//   },
//   {
//     id: 2,
//     name: "Underwriter",
//     description: "Can review and decide on loan applications",
//     permissions: ["View Customers", "Approve/Reject Loans", "Generate Reports"],
//   },
//   {
//     id: 3,
//     name: "Monitor",
//     description: "Monitors existing loans and customers",
//     permissions: ["View Customers", "Add Notes", "Flag Risks"],
//   },
//   {
//     id: 4,
//     name: "Recovery Agent",
//     description: "Handles collection for overdue accounts",
//     permissions: ["View High Risk Customers", "Make Calls", "Add Notes"],
//   },
// ];

export default function Users() {
  const [activeTab, setActiveTab] = useState("users");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [roleDialogOpen, setRoleDialogOpen] = useState(false);

  // Add state for user form fields
  const [userForm, setUserForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    role: "",
    phone_number: "",
  });

  const [roleForm, setRoleForm] = useState({
    title: "",
    description: "",
    permissions: [] as string[],
  });

  // Handle input changes
  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUserForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Handle role select
  const handleRoleChange = (value: string) => {
    setUserForm((prev) => ({
      ...prev,
      role: value,
    }));
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    // Split name into first and last name (simple split)
    const [first_name, ...rest] = userForm.first_name.split(" ");
    const last_name = rest.join(" ");
    try {
     const response = await authApi.register({
        email: userForm.email,
        role: userForm.role,
        first_name: first_name,
        last_name: last_name,
        phone_number: userForm.phone_number,
      });
      toast.success("User created successfully");
      setDialogOpen(false);
      setUserForm({
        first_name: "",
        last_name: "",
        email: "",
        role: "",
        phone_number: "",
      });
    } catch (error: any) {
      toast.error(error.response.data.detail || "Failed to create user");
    }
  };

  // Handle role form input
  const handleRoleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setRoleForm((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Handle permissions checkbox
  const handlePermissionChange = (perm: string) => {
    setRoleForm((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(perm)
        ? prev.permissions.filter((p) => p !== perm)
        : [...prev.permissions, perm],
    }));
  };

  const handleCreateRole = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
     const response = await roleApi.createRole({
        title: roleForm.title,
        permissions: [
          roleForm.permissions[0] || "",
          roleForm.permissions[1] || "",
        ],
      });
      toast.success("Role created successfully");
      setRoleDialogOpen(false);
      setRoleForm({ title: "", description: "", permissions: [] });
    } catch (error: any) {
      toast.error(error.response?.data?.detail || "Failed to create role");
    }
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
                      <Label htmlFor="first_name" className="text-right">
                        First Name
                      </Label>
                      <Input
                        id="first_name"
                        placeholder="First name"
                        className="col-span-3"
                        required
                        value={userForm.first_name}
                        onChange={handleUserInput}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="last_name" className="text-right">
                        Last Name
                      </Label>
                      <Input
                        id="last_name"
                        placeholder="Last name"
                        className="col-span-3"
                        required
                        value={userForm.last_name}
                        onChange={handleUserInput}
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
                        value={userForm.email}
                        onChange={handleUserInput}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="phone_number" className="text-right">
                        Phone Number
                      </Label>
                      <Input
                        id="phone_number"
                        placeholder="Phone number"
                        className="col-span-3"
                        required
                        value={userForm.phone_number}
                        onChange={handleUserInput}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="role" className="text-right">
                        Role
                      </Label>
                      <Select
                        value={userForm.role}
                        onValueChange={handleRoleChange}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Admin">Admin</SelectItem>
                          <SelectItem value="Underwriter">
                            Underwriter
                          </SelectItem>
                          <SelectItem value="Monitor">Monitor</SelectItem>
                          <SelectItem value="Recovery Agent">
                            Recovery Agent
                          </SelectItem>
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
                    <Button
                      type="submit"
                      className="bg-navy-800 hover:bg-navy-700"
                    >
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
                      <Label htmlFor="title" className="text-right">
                        Role Name
                      </Label>
                      <Input
                        id="title"
                        placeholder="Role name"
                        className="col-span-3"
                        required
                        value={roleForm.title}
                        onChange={handleRoleInput}
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
                        value={roleForm.description}
                        onChange={handleRoleInput}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-start gap-4">
                      <Label className="text-right pt-2">Permissions</Label>
                      <div className="col-span-3 space-y-2">
                        {[
                          "Manage Users",
                          "View Customers",
                          "Approve/Reject Loans",
                          "Generate Reports",
                        ].map((perm) => (
                          <div
                            key={perm}
                            className="flex items-center space-x-2"
                          >
                            <input
                              type="checkbox"
                              id={perm}
                              checked={roleForm.permissions.includes(perm)}
                              onChange={() => handlePermissionChange(perm)}
                            />
                            <Label htmlFor={perm}>{perm}</Label>
                          </div>
                        ))}
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
                    <Button
                      type="submit"
                      className="bg-navy-800 hover:bg-navy-700"
                    >
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
