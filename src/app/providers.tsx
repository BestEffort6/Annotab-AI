'use client';

import { NextUIProvider } from '@nextui-org/react';
import { SessionProvider } from 'next-auth/react';
import { useEffect } from 'react';
import { pdfjs } from 'react-pdf';
import { ToastContainer } from 'react-toastify';

type Props = {
  children?: React.ReactNode;
};

export default function Provider({ children }: Props) {
  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
  }, []);

  return (
    <SessionProvider>
      <NextUIProvider>
        {children}
        <ToastContainer />
      </NextUIProvider>
    </SessionProvider>
  );
}
