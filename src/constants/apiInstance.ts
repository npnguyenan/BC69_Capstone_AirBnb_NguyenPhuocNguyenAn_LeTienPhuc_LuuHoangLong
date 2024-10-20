import axios, { InternalAxiosRequestConfig } from "axios";
import { localStorageKeys } from "./localStorageKeys";

type Token = string;
const dataUser = localStorage.getItem(localStorageKeys.USER)
  ? localStorage.getItem(localStorageKeys.USER)
  : "";

export const token: Token = dataUser ? JSON.parse(dataUser).token : "";

export const apiInstance = {
  create: (setting?: Partial<InternalAxiosRequestConfig>) => {
    const axiosInstance = axios.create();

    axiosInstance.interceptors.request.use((config) => {
      return {
        ...config,
        ...setting,
        headers: {
          ...(setting?.headers || {}),
          token: token,
          TokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA2OSIsIkhldEhhblN0cmluZyI6IjAxLzAyLzIwMjUiLCJIZXRIYW5UaW1lIjoiMTczODM2ODAwMDAwMCIsIm5iZiI6MTcxMDUyMjAwMCwiZXhwIjoxNzM4NTE1NjAwfQ.ap-iPzMpXDeCuXH0aJnbbSuR3vIW4upk1nOK3h9D-5g",
        },
      } as unknown as InternalAxiosRequestConfig;
    });

    return axiosInstance;
  },
};
