import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { OtpRequest, UserLoginAuth, UserRegisterAuth } from "./type";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_AUTH_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 60000,
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    // console.log("Request sent:", config);

    if (config.url) {
      config.url = config.url.replace("http://", "https://");
    }

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

// Function to register a user using the axios instance
export const registerUser = async (userData: UserRegisterAuth): Promise<Response> => {
  const response: AxiosResponse<Response> = await axiosInstance.post<Response>(
    process.env.NEXT_PUBLIC_BASE_AUTH_URL + "/auth/register",
    userData
  );
  return response.data;
};

export const verifyUser = async (userData: OtpRequest): Promise<Response> => {
  const response: AxiosResponse<Response> = await axiosInstance.post<Response>(
    process.env.NEXT_PUBLIC_BASE_AUTH_URL + "/auth/verify_otp",
    userData
  );
  return response.data;
};


export const loginUser = async (userData: UserLoginAuth): Promise<Response> => {
    const response: AxiosResponse<Response> = await axiosInstance.post<Response>(
      process.env.NEXT_PUBLIC_BASE_AUTH_URL + "/auth/login",
      userData
    );
    return response.data;
  };