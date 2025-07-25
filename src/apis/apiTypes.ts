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

export interface CustomerCreatePaylaod {
  name: string;
  dob: string;
  pan: string;
  email: string;
  phone: string;
  loan_amount: number;
  loan_types: string;
}

export type DashboardResponseArray = DashboardResponse[];
