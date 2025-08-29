import httpClient from "@/apis/axiosSetup";
import {
  LogoutPayload,
  RegisterPayload,
  RegisterResponse,
  SendotpPayload,
  VerifyotpResponse,
  VerifyotpPayload,
} from "@/apis/apiTypes";

export const authApi = {
  register: (data: RegisterPayload) =>
    httpClient.post<RegisterResponse>("/dev/banklens/auth/register/user", data),

  logout: (data: LogoutPayload) =>
    httpClient.post<string>("/dev/banklens/auth/logout", data, {
      headers: { useAuth: true },
    }),

  sendOtp: (email: string) =>
    httpClient.post<string>(`/dev/banklens/auth/login/send_otp?email=${email}`),

  verifyOtp: (data: any) =>
    httpClient.post<any>("/dev/banklens/auth/login/verify_otp", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),

  refresh: (refreshToken: string) =>
    httpClient.post<any>("/dev/banklens/auth/refresh", refreshToken, {
      headers: { useAuth: true },
    }),
};
