import httpClient from "@/apis/axiosSetup";
import { CustomerCreatePaylaod } from "../apiTypes";

export const customerApi = {
  customer_create: (data: CustomerCreatePaylaod) =>
    httpClient.post<any>("/dev/banklens/customer/create_customer", data, {
      headers: { useAuth: true },
    }),

  customer_create_bulk: (data: FormData) =>
    httpClient.post<any>("/dev/banklens/customer/upload_customers_bulk", data, {
      headers: { useAuth: true, "Content-Type": "multipart/form-data" },
    }),

  customer_fetch: (id: string) =>
    httpClient.get<any>(`/dev/banklens/customer/${id}/user_fetch`, {
      headers: { useAuth: true },
    }),

  customer_analysis: (id: string) =>
    httpClient.get<any>(`/dev/banklens/customer/${id}/analysis`, {
      headers: { useAuth: true },
    }),

  customer_analysis_income: (id: string) =>
    httpClient.get<any>(`/dev/banklens/customer/${id}/analysis/income`, {
      headers: { useAuth: true },
    }),

  customer_analysis_spending: (id: string) =>
    httpClient.get<any>(`/dev/banklens/customer/${id}/analysis/spending`, {
      headers: { useAuth: true },
    }),

  customer_analysis_credit: (id: string) =>
    httpClient.get<any>(`/dev/banklens/customer/${id}/analysis/credit`, {
      headers: { useAuth: true },
    }),

  customer_analysis_savings: (id: string) =>
    httpClient.get<any>(`/dev/banklens/customer/${id}/analysis/savings`, {
      headers: { useAuth: true },
    }),

  customer_analysis_monitoring: (id: string) =>
    httpClient.get<any>(`/dev/banklens/customer/${id}/monitoring`, {
      headers: { useAuth: true },
    }),

  customer_analysis_monitoring_periodic: (id: string) =>
    httpClient.get<any>(`/dev/banklens/customer/${id}/monitoring/periodic`, {
      headers: { useAuth: true },
    }),
};
