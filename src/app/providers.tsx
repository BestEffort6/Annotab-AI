'use client';

import { NextUIProvider } from '@nextui-org/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SessionProvider } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { pdfjs } from 'react-pdf';
import { ToastContainer } from 'react-toastify';

import LayoutProvider from '@/components/providers/LayoutProvider';

type Props = {
  children?: React.ReactNode;
};

export default function Provider({ children }: Props) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
          },
        },
      })
  );
  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <NextUIProvider>
          <LayoutProvider>
            {children}
            <ToastContainer />
            <ReactQueryDevtools initialIsOpen={false} />
          </LayoutProvider>
        </NextUIProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}
