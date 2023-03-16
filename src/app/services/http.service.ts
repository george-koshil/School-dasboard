import axios, { AxiosInstance } from "axios";
import { QueryClient } from "react-query";

export const queryClient: QueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 300000,
      cacheTime: 3600000,
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      onError: (error) => {
        console.error("An error occurred while fetching", error);
      },
    },
    mutations: {
      onError: (error, variables, context) => {
        console.error(
          "An error occurred while mutating",
          variables,
          context,
          error
        );
      },
    },
  },
});

export const apiInstance: AxiosInstance = axios.create({
  baseURL: "http://94.131.246.109:5555/v1",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    crossdomain: "true",
    locale: window.navigator.language,
    platform: "WEB",
    appSource: "School Dashboard",
    mode: "cors", // no-cors, *cors, same-origin
    credentials: "same-origin", // include, *same-origin, omit
  },
});
