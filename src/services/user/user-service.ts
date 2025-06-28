import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { UserDetailsResponse } from "./type";

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

export const getUser = async (accessToken: string | undefined): Promise<UserDetailsResponse> => {
  const response: AxiosResponse<UserDetailsResponse> = await axiosInstance.get<UserDetailsResponse>(
    process.env.NEXT_PUBLIC_BASE_BACKEND_URL + "/users/get-user",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};