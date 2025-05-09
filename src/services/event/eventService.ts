import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { Event, EventRequest, EventResponse } from "./type";

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

export const getAllEvents = async (accessToken: string | undefined): Promise<EventResponse> => {
  const response: AxiosResponse<EventResponse> = await axiosInstance.get<EventResponse>(
    process.env.NEXT_PUBLIC_BASE_BACKEND_URL + "/vendors/events",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const getAllEventsForClients = async (accessToken: string | undefined): Promise<EventResponse> => {
  const response: AxiosResponse<EventResponse> = await axiosInstance.get<EventResponse>(
    process.env.NEXT_PUBLIC_BASE_BACKEND_URL + "/clients/events",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const createEvent = async (accessToken: string | undefined, request: EventRequest): Promise<Event> => {
  const response: AxiosResponse<Event> = await axiosInstance.post<Event>(
    process.env.NEXT_PUBLIC_BASE_BACKEND_URL + "/vendors/events",
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