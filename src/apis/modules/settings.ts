import httpClient from "@/apis/axiosSetup";
import { UpdateProfilePayload, UpdateRiskConfigPayload,GetRiskConfigResponse } from "@/apis/apiTypes";
export const settingsApi = {
  updateProfile: (data: UpdateProfilePayload) =>
    httpClient.put<any>("/dev/banklens/settings/update_profile", data, {
      headers: { useAuth: true },
    }),
  updateRiskConfig: (data: UpdateRiskConfigPayload) =>
    httpClient.put<any>("/dev/banklens/settings/risk_config", data, {
      headers: { useAuth: true },
    }),
  getRiskConfig: () =>
    httpClient.get<GetRiskConfigResponse>("/dev/banklens/settings/risk_config", {
      headers: { useAuth: true },
    }),
}
