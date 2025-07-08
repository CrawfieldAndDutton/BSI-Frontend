import httpClient from "@/apis/axiosSetup";
export const settingsApi = {
  updateProfile: () =>
    httpClient.put("/dev/banklens/settings/update_profile", {
      headers: { useAuth: true },
    }),
  updateRiskConfig: (data: any) =>
    httpClient.put("/dev/banklens/settings/risk_config", data, {}
    ),
  }