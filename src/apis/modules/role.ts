import httpClient from "@/apis/axiosSetup";
import { CreateRolePayload ,UpdateRolePayload,CreateRoleResponse,UpdateRoleResponse} from "../apiTypes";
export const roleApi = {
  createRole: (data: CreateRolePayload) =>
    httpClient.post<CreateRoleResponse>("/dev/banklens/role/create", data, {
      headers: { useAuth: true },
    }),
  getRoles: () =>
    httpClient.get<any>("/dev/banklens/role/roles", {
      headers: { useAuth: true },
    }),
  getRolebyTitle: (title: string) =>
    httpClient.get<any>(`/dev/banklens/role/role/:title=${title}`, {
      headers: { useAuth: true },
    }),
  updateRole: (data: UpdateRolePayload) =>
    httpClient.put<UpdateRoleResponse>("/dev/banklens/role/update_role", data, {
      headers: { useAuth: true },
    }),
  deleteRole: (title: string) =>
    httpClient.delete<any>(`/dev/banklens/role/delete_role/:title=${title}`, {
      headers: { useAuth: true },
    }),
};
