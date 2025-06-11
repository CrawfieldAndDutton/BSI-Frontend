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
      headers: { useAuth: true,  },
    }),
  sendOtp: (data: SendotpPayload) =>
        httpClient.post<string>("/dev/banklens/auth/login/send_otp", data),

  verifyOtp: (data: VerifyotpPayload) =>
    httpClient.post<VerifyotpResponse>("/dev/banklens/auth/login/verify_otp", data),
};
