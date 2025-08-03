import { useState, useEffect } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { roleApi } from "@/apis/modules/role";
import { CreateRolePayload } from "@/apis/apiTypes";
import { authApi } from "@/apis/modules/auth";
import { ErrorResponse } from "../../apis/apiTypes";

export default function Users() {
  const [activeTab, setActiveTab] = useState("users");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [roleDialogOpen, setRoleDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [roleDescription, setRoleDescription] = useState("");
  // Role state
  const [roles, setRoles] = useState<any[]>([]);
  const [loadingRoles, setLoadingRoles] = useState(false);

  // Role form state
  const [roleName, setRoleName] = useState("");
  const [rolePermissions, setRolePermissions] = useState<string[]>([]);

  // Users state
  const [users, setUsers] = useState<any[]>([]);

  // Edit role dialog state
  const [editRoleDialogOpen, setEditRoleDialogOpen] = useState(false);
  const [roleToEdit, setRoleToEdit] = useState<any>(null);

  // Delete role dialog state
  const [deleteRoleDialogOpen, setDeleteRoleDialogOpen] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<any>(null);

  // Permissions list (could be fetched from backend if needed)
  const availablePermissions = [
    "Manage Users",
    "View Customers",
    "Approve/Reject Loans",
    "Generate Reports",
    "User Creation",
    "User Removal",
    "Customer Creation",
    "Customer Modification",
    "Trigger BSI Process",
    "Review BSI Report",
    "Edit BSI Report",
    "Comment BSI Report",
    "Trigger AI Agent Call",
    "Review AI Agent Call Report",
    "Audit AI Agent Call Report",
  ];

  // Fetch roles from backend
  useEffect(() => {
  fetchRoles();
}, []);

  useEffect(() => {
    if (activeTab === "users") {
      fetchUsers();
    }
  }, [activeTab]);

  const fetchRoles = async () => {
    setLoadingRoles(true);
    try {
      const response = await roleApi.getRoles();
      const rolesFromApi = response.data || [];
      const formattedRoles = rolesFromApi.map((role: any) => ({
        title: role.title,
        description: role.description,
        permissions: role.permissions || [],
      }));
      setRoles(formattedRoles);
    } catch {
      setRoles([]);
    } finally {
      setLoadingRoles(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await authApi.getUsers(); // assuming getUsers is inside authApi
      const userData = response.data || [];

      const formattedUsers = userData.map((user: any) => ({
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        phone: user.phone_number,
        role: user.role,
        status: user.is_active ? "Active" : "Inactive",
      }));

      setUsers(formattedUsers);
    } catch (error) {
      toast.error("Failed to fetch users");
      setUsers([]);
    }
  };

  // Handle create role
  const handleCreateRole = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roleName || !roleDescription || rolePermissions.length === 0) {
      toast.error(
        "Please provide role name, description, and select at least one permission."
      );
      return;
    }

    try {
      await roleApi.createRole({
        title: roleName,
        description: roleDescription,
        permissions: rolePermissions as [string, string],
      });
      toast.success("Role created successfully");
      setActiveTab("roles");
      await fetchRoles();
      setRoleDialogOpen(false);
      setRoleName("");
      setRoleDescription("");
      setRolePermissions([]);
    } catch {
      toast.error("Failed to create role");
    }
  };

  // Handle permission checkbox change
  const handlePermissionChange = (perm: string) => {
    setRolePermissions((prev) =>
      prev.includes(perm) ? prev.filter((p) => p !== perm) : [...prev, perm]
    );
  };

  // User creation
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedRole) {
      toast.error("Please select a role for the user.");
      return;
    }

    const form = e.target as HTMLFormElement;
    const firstName = (form.elements.namedItem("firstName") as HTMLInputElement)
      .value;
    const lastName = (form.elements.namedItem("lastName") as HTMLInputElement)
      .value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const phone = (form.elements.namedItem("number") as HTMLInputElement).value;

    try {
      // Get full role object using the selected role title
      const roleResponse = await roleApi.getRoles();
      const roleDetails = roleResponse.data;

      if (!roleDetails) {
        toast.error("Failed to fetch role details.");
        return;
      }
      
      await authApi.register({
        first_name: firstName,
        last_name: lastName,
        email,
        phone_number: phone,
        role: selectedRole, // or roleDetails.title depending on API
      });

      toast.success("User created successfully");
      await fetchUsers();
      setDialogOpen(false);
      setSelectedRole("");
      // Optionally refresh users here
    } catch (error) {
      toast.error("Failed to create user");
    }
  };

  // Edit role handlers
  const handleEditRoleClick = (role: any) => {
    setRoleToEdit(role);
    setRoleName(role.title);
    setRoleDescription(role.description || "");
    setRolePermissions(role.permissions || []);
    setEditRoleDialogOpen(true);
  };

  const handleEditRoleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roleName || !roleDescription || rolePermissions.length === 0) {
      toast.error(
        "Please provide role name, description, and select at least one permission."
      );
      return;
    }
    try {
      await roleApi.updateRole({
        title: roleName,
        description: roleDescription,
        permissions: rolePermissions as [string, string],
      });
      toast.success("Role updated successfully");
      setEditRoleDialogOpen(false);
      setRoleToEdit(null);
      setRoleName("");
      setRoleDescription("");
      setRolePermissions([]);
      fetchRoles();
    } catch {
      toast.error("Failed to update role");
    }
  };

  // Delete role handlers
  const handleDeleteRoleClick = (role: any) => {
    setRoleToDelete(role);
    setDeleteRoleDialogOpen(true);
  };

  const handleDeleteRoleConfirm = async () => {
    if (!roleToDelete) return;
    try {
      await roleApi.deleteRole(roleToDelete.title);
      toast.success("Role deleted successfully");
      setDeleteRoleDialogOpen(false);
      setRoleToDelete(null);
      fetchRoles();
    } catch {
      toast.error("Failed to delete role");
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
                      <Label htmlFor="first name" className="text-right">
                        First Name
                      </Label>
                      <Input
                        id="firstName"
                        placeholder="First name"
                        className="col-span-3"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="last name" className="text-right">
                        Last Name
                      </Label>
                      <Input
                        id="lastName"
                        placeholder="Last name"
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
                      <Label htmlFor="number" className="text-right">
                        Phone Number
                      </Label>
                      <Input
                        id="number"
                        placeholder="Phone number"
                        type="tel"
                        className="col-span-3"
                        maxLength={10}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="role" className="text-right">
                        Role
                      </Label>
                      <Select
                        value={selectedRole}
                        onValueChange={setSelectedRole}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          {roles.map((role) => (
                            <SelectItem key={role.title} value={role.title}>
                              {role.title}
                            </SelectItem>
                          ))}
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
                      <Label htmlFor="role-name" className="text-right">
                        Role Name
                      </Label>
                      <Input
                        id="role-name"
                        placeholder="Role name"
                        className="col-span-3"
                        required
                        value={roleName}
                        onChange={(e) => setRoleName(e.target.value)}
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
                        value={roleDescription}
                        onChange={(e) => setRoleDescription(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-start gap-4">
                      <Label className="text-right pt-2">Permissions</Label>
                      <div className="col-span-3 space-y-2">
                        {availablePermissions.map((perm, idx) => (
                          <div
                            className="flex items-center space-x-2"
                            key={perm}
                          >
                            <input
                              type="checkbox"
                              id={`perm-${idx}`}
                              checked={rolePermissions.includes(perm)}
                              onChange={() => handlePermissionChange(perm)}
                            />
                            <Label htmlFor={`perm-${idx}`}>{perm}</Label>
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
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-sm text-gray-600">
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Email</th>
                    <th className="px-4 py-2 text-left">Role</th>
                    <th className="px-4 py-2 text-left">Phone Number</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-right w-[1%] whitespace-nowrap">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-2 font-medium text-gray-900">
                        {user.name}
                      </td>
                      <td className="px-4 py-2">{user.email}</td>
                      <td className="px-4 py-2">{user.role}</td>
                      <td className="px-4 py-2">{user.phone}</td>
                      <td className="px-4 py-2">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            user.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-right w-[1%] whitespace-nowrap">
                        <div className="flex justify-end items-center gap-1">
                          <Button variant="ghost" size="sm" className="p-1">
                            <Edit size={16} />
                          </Button>
                          <Button variant="ghost" size="sm" className="p-1">
                            <Trash size={16} />
                          </Button>
                        </div>
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
            {loadingRoles ? (
              <div>Loading roles...</div>
            ) : (
              roles.map((role: any) => (
                <div key={role.title} className="stats-card">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium text-navy-800">
                        {role.title}
                      </h4>
                      {role.description && (
                        <p className="text-sm text-gray-600 mt-1">
                          {role.description}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditRoleClick(role)}
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteRoleClick(role)}
                      >
                        <Trash size={16} />
                      </Button>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h5 className="text-sm font-medium mb-2">Permissions:</h5>
                    <ul className="space-y-1">
                      {(role.permissions || []).map(
                        (permission: string, idx: number) => (
                          <li key={idx} className="text-sm flex items-center">
                            <span className="h-1.5 w-1.5 rounded-full bg-navy-800 mr-2" />
                            {permission}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              ))
            )}
          </div>
          {/* Edit Role Dialog */}
          <Dialog
            open={editRoleDialogOpen}
            onOpenChange={setEditRoleDialogOpen}
          >
            <DialogContent className="sm:max-w-[425px]">
              <form onSubmit={handleEditRoleSubmit}>
                <DialogHeader>
                  <DialogTitle>Edit Role</DialogTitle>
                  <DialogDescription>
                    Update the role name and permissions.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-role-name" className="text-right">
                      Role Name
                    </Label>
                    <Input
                      id="edit-role-name"
                      placeholder="Role name"
                      className="col-span-3"
                      required
                      value={roleName}
                      onChange={(e) => setRoleName(e.target.value)}
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
                      value={roleDescription}
                      onChange={(e) => setRoleDescription(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label className="text-right pt-2">Permissions</Label>
                    <div className="col-span-3 space-y-2">
                      {availablePermissions.map((perm, idx) => (
                        <div className="flex items-center space-x-2" key={perm}>
                          <input
                            type="checkbox"
                            id={`edit-perm-${idx}`}
                            checked={rolePermissions.includes(perm)}
                            onChange={() => handlePermissionChange(perm)}
                          />
                          <Label htmlFor={`edit-perm-${idx}`}>{perm}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setEditRoleDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-navy-800 hover:bg-navy-700"
                  >
                    Save Changes
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          {/* Delete Role Dialog */}
          <Dialog
            open={deleteRoleDialogOpen}
            onOpenChange={setDeleteRoleDialogOpen}
          >
            <DialogContent className="sm:max-w-[400px]">
              <DialogHeader>
                <DialogTitle>Delete Role</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete the role{" "}
                  <b>{roleToDelete?.title}</b>?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setDeleteRoleDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  className="bg-red-600 hover:bg-red-700"
                  onClick={handleDeleteRoleConfirm}
                >
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </TabsContent>
      </Tabs>
    </div>
  );
}
