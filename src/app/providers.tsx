'use client';

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
      {children}
      <ToastContainer />
    </SessionProvider>
  );
}
