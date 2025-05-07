import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { EventResponse } from "./type";

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

export const getOriginAllEvents = async (): Promise<EventResponse> => {
  const response: AxiosResponse<EventResponse> = await axiosInstance.get<EventResponse>(
    process.env.NEXT_PUBLIC_BASE_BACKEND_URL + "/origin/events",
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};