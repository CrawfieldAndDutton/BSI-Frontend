export interface LogoutPayload {
  refresh_token: string;
}
export interface RegisterPayload {
  email: string;
  role: string;
  first_name: string;
  last_name: string;
  phone_number: string;
}
export interface RegisterResponse {
  first_name: string;
  last_name: string;
  created_at: string;
}

export interface SendotpPayload {
  email: string;
}
export interface VerifyotpPayload {
  username: string;
  password: string;
}
export interface VerifyotpResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_at: string;
}

export interface CreateRolePayload {
  title: string;
  description: string;
  permissions: [string, string,];
}

export interface CreateRoleResponse {
  role: {
    title: string;
    description: string;
    permissions: [string, string,];
  };
}

export interface UpdateRolePayload {
  title: string;
  description: string;
  permissions: [string, string,];

}
export interface UpdateRoleResponse {

    title: string;
    description: string;
    permissions: [string, string,];

}
export interface GetRoleResponse {
  title: string;
  description: string;
  permissions: [string, string,];
}
export interface UpdateProfilePayload {
  email: string;
  phone_number: string;
}
export interface UpdateRiskConfigPayload {
  general_risk_bucket_min: number;
  general_risk_bucket_max: number;
  high_risk_bucket_min: number;
  medium_risk_bucket_min: number;
  medium_risk_bucket_max: number;
  low_risk_bucket_max: number;
}
export interface GetRiskConfigResponse {
  general_risk_bucket_min: number;
  general_risk_bucket_max: number;
  high_risk_bucket_min: number;
  medium_risk_bucket_min: number;
  medium_risk_bucket_max: number;
  low_risk_bucket_max: number;
}

export interface ErrorResponse {
  detail: [
    {
      loc: [string, 0];
      msg: string;
      type: string;
    }
  ];
}

export interface paymentResponse {
  order_id: string;
  short_url: string;
  amount: number;
  credits_purchased: number;
  status: string;
}

export interface paymentPayload {
  amount: number;
  credits_purchased: number;
}

export interface DashboardResponse {
  type: string;
  calls: number;
}

export type DashboardResponseArray = DashboardResponse[];
