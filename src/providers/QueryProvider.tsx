"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import toast from "react-hot-toast";

const QueryProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 6000,
        refetchOnWindowFocus: false,
        retry: false,
      },
      mutations: {
        onError(e) {
          console.log(e);
          toast.error(e.message);
        },
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
