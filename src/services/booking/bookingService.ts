import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { BookingRequest, BookingResponse, CreateBookingResponse, PayEventRequest } from "./type";

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

export const bookEvent = async (accessToken: string | undefined, request: BookingRequest): Promise<CreateBookingResponse> => {
  const response: AxiosResponse<CreateBookingResponse> = await axiosInstance.post<CreateBookingResponse>(
    process.env.NEXT_PUBLIC_BASE_BACKEND_URL + "/clients/booking",
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

export const getAllBookings = async (accessToken: string | undefined): Promise<BookingResponse> => {
  const response: AxiosResponse<BookingResponse> = await axiosInstance.get<BookingResponse>(
    process.env.NEXT_PUBLIC_BASE_BACKEND_URL + "/clients/booking",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const getAllVendorBookings = async (accessToken: string | undefined): Promise<BookingResponse> => {
    const response: AxiosResponse<BookingResponse> = await axiosInstance.get<BookingResponse>(
      process.env.NEXT_PUBLIC_BASE_BACKEND_URL + "/vendors/bookings",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  };

  export const payEventBooking = async (accessToken: string | undefined, request: PayEventRequest): Promise<CreateBookingResponse> => {
  const response: AxiosResponse<CreateBookingResponse> = await axiosInstance.post<CreateBookingResponse>(
    process.env.NEXT_PUBLIC_BASE_BACKEND_URL + "/clients/booking/pay",
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