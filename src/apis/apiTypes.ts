

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  first_name: string;
  last_name: string;
  token_type: string;
  expires_at: string;
}

export interface LogoutPayload {
  refresh_token: string;

}

export interface RegisterPayload {
  email: string;
  username: string;
  is_active: boolean;
  role: string;
  first_name: string;
  last_name: string;
  password: string;
  phone_number: string;
  company :string;
}



export interface RegisterResponse {
  email: string;
  username: string;
  is_active: boolean;
  company:string;
  role: string;
  first_name: string;
  last_name: string;
  _id: string;
  phone_number: string;
  created_at: string;
  updated_at: string;
}

export interface SendotpPayload{
   email: string;
   phone_number: string;
  
}
export interface SendotpResponse{

  email: string;
  is_email_verified: boolean;

}

export interface VerifyotpPayload{
  email: string;
  otp: string;
 
}
export interface VerifyotpResponse{

 email: string;
 is_email_verified: boolean;

}

export interface contactPayLoad{
    name: string,
    company: string,
    lead_email: string,
    phone: string,
    message: string,
}

export interface contactResponse{
  
    "http_status_code": number,
    "message": string,
    "result": boolean
  
}

export interface resetPayload{
  email:string,
  password:string
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
  "order_id": string,
  "short_url": string,
  "amount": number,
  "credits_purchased": number,
  "status": string
}

export interface paymentPayload {
  "amount": number,
  "credits_purchased": number
}

export interface DashboardResponse {
  type: string;
  calls: number;
}

export type DashboardResponseArray = DashboardResponse[];