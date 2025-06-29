import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { AccountResponse, AccountSummaryResponse, ApiDepositResponse, DepositRequest } from "./type";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_BACKEND_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 60000,
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    // console.log("Request sent:", config);

    // if (config.url) {
    //   config.url = config.url.replace("http://", "https://");
    // }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    // console.log("Response received:", response);
    return response;
  },
  (error) => {
    // console.log("Response error:", error);
    return Promise.reject(error);
  }
);

export const getAccountDetails = async (accessToken: string | undefined): Promise<AccountResponse> => {
  const response: AxiosResponse<AccountResponse> = await axiosInstance.get<AccountResponse>(
    process.env.NEXT_PUBLIC_BASE_BACKEND_URL + "/accounts/get-account",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const getAccountSummaries = async (accessToken: string | undefined): Promise<AccountSummaryResponse> => {
  const response: AxiosResponse<AccountSummaryResponse> = await axiosInstance.get<AccountSummaryResponse>(
    process.env.NEXT_PUBLIC_BASE_BACKEND_URL + "/accounts/get-account-summaries",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const makeClientDeposit = async (accessToken: string | undefined, request: DepositRequest): Promise<ApiDepositResponse> => {
  const response: AxiosResponse<ApiDepositResponse> = await axiosInstance.post<ApiDepositResponse>(
    process.env.NEXT_PUBLIC_BASE_BACKEND_URL + "/accounts/deposit",
    request,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};