import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { ChatResponse, ChatRequest, BookingInsightsResponse } from "./type";

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

export const getChatResponse = async (
  accessToken: string | undefined, 
  chatRequest: ChatRequest
): Promise<ChatResponse> => {
  const response: AxiosResponse<ChatResponse> = await axiosInstance.post<ChatResponse>(
    "/intelligence/chat",
    chatRequest,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const getEventRecommendations = async (
  accessToken: string | undefined,
  userId: string,
  preferences?: string
): Promise<ChatResponse> => {
  const params = new URLSearchParams({ userId });
  if (preferences) {
    params.append('preferences', preferences);
  }
  
  const response: AxiosResponse<ChatResponse> = await axiosInstance.get<ChatResponse>(
    `/intelligence/recommendations?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data;
};

export const getEventDetails = async (
  accessToken: string | undefined,
  eventId: string
): Promise<ChatResponse> => {
  const response: AxiosResponse<ChatResponse> = await axiosInstance.get<ChatResponse>(
    `/intelligence/event-details/${eventId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data;
};

export const getBookingHelp = async (
  accessToken: string | undefined,
  eventId: string
): Promise<ChatResponse> => {
  const response: AxiosResponse<ChatResponse> = await axiosInstance.get<ChatResponse>(
    `/intelligence/booking-help/${eventId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data;
};

export const getBookingInsights = async (
  accessToken: string | undefined,
  userId?: string
): Promise<BookingInsightsResponse> => {
  const params = new URLSearchParams();
  if (userId) {
    params.append('userId', userId);
  }

  const queryString = params.toString();
  const url = `/intelligence/insights/bookings${queryString ? `?${queryString}` : ''}`;

  const response: AxiosResponse<BookingInsightsResponse> = await axiosInstance.get<BookingInsightsResponse>(
    url,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data;
};