import httpClient from "@/apis/axiosSetup";
import { CreateRolePayload ,UpdateRolePayload,CreateRoleResponse,UpdateRoleResponse,GetRoleResponse} from "../apiTypes";
export const roleApi = {
  createRole: (data: CreateRolePayload) =>
    httpClient.post<CreateRoleResponse>("/dev/banklens/role/create", data, {
      headers: { useAuth: true },
    }),
  getRoles: () =>
    httpClient.get<any>("/dev/banklens/role/get_roles", {
      headers: { useAuth: true },
    }),
  
  updateRole: (data: UpdateRolePayload) =>
    httpClient.put<UpdateRoleResponse>("/dev/banklens/role/update_role", data, {
      headers: { useAuth: true },
    }),
  deleteRole: (title: string) =>
    httpClient.delete<any>(`/dev/banklens/role/delete_role/${title}`, {
      headers: { useAuth: true },
    }),
};
