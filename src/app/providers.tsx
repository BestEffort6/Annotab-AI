/* eslint-disable @typescript-eslint/no-use-before-define */

'use client';

import { NextUIProvider } from '@nextui-org/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { SessionProvider } from 'next-auth/react';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { pdfjs } from 'react-pdf';
import { ToastContainer } from 'react-toastify';

type Props = {
  children?: React.ReactNode;
};

export default function Provider({ children }: Props) {
  const [queryClient] = useState(new QueryClient());

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

export interface WorkflowListItemProps {
  label: string;
  icon: string;
  color: string;
  type: string;
}

export interface ShowModelWorkflowType {
  id: string;
}

export type ToolItemWorkflow = WorkflowListItemProps | null;

type LayoutContextProps = {
  valuesSampling: any[];
  showModelWorkflow: any;
  stepCreateDataset: number;
  toolItemWorkflow: ToolItemWorkflow;
  isOpenItemWorkflow: boolean;
  isOpenCreateWorkflow: boolean;
  newWorkflow: any;
};

type LayoutActionsContextProps = {
  setShowModelWorkflow: (showModelWorkflow: any) => void;
  setValuesSampling: (valuesSampling: any[]) => void;
  setStepCreateDataset: (stepCreateDataset: number) => void;
  setToolItemWorkflow: (toolItemWorkflow: ToolItemWorkflow) => void;
  setIsOpenItemWorkflow: (isOpenItemWorkflow: boolean) => void;
  setIsOpenCreateWorkflow: (isOpenCreateWorkflow: boolean) => void;
  setNewWorkflow: (newWorkflow: any) => void;
};

const LayoutContext = createContext<LayoutContextProps>({
  showModelWorkflow: null,
  valuesSampling: [],
  stepCreateDataset: 0,
  toolItemWorkflow: null,
  isOpenItemWorkflow: true,
  isOpenCreateWorkflow: false,
  newWorkflow: null,
});

const LayoutActionsContext = createContext<LayoutActionsContextProps>({
  setShowModelWorkflow: () => {},
  setValuesSampling: () => {},
  setStepCreateDataset: () => {},
  setToolItemWorkflow: () => {},
  setIsOpenItemWorkflow: () => {},
  setIsOpenCreateWorkflow: () => {},
  setNewWorkflow: () => {},
});

export const useLayout = () => useContext(LayoutContext);
export const useLayoutActions = () => useContext(LayoutActionsContext);

export const LayoutProvider = ({ children }: Props) => {
  const [showModelWorkflow, setShowModelWorkflow] = useState('');
  const [valuesSampling, setValuesSampling] = useState<any[]>([20]);
  const [toolItemWorkflow, setToolItemWorkflow] =
    useState<ToolItemWorkflow>(null);
  const [stepCreateDataset, setStepCreateDataset] = useState<number>(0);
  const [isOpenItemWorkflow, setIsOpenItemWorkflow] = useState<boolean>(true);
  const [isOpenCreateWorkflow, setIsOpenCreateWorkflow] = useState(false);
  const [newWorkflow, setNewWorkflow] = useState<any>();

  const layoutContextValue = useMemo(
    () => ({
      valuesSampling,
      showModelWorkflow,
      toolItemWorkflow,
      stepCreateDataset,
      isOpenItemWorkflow,
      isOpenCreateWorkflow,
      newWorkflow,
    }),
    [
      valuesSampling,
      showModelWorkflow,
      stepCreateDataset,
      toolItemWorkflow,
      isOpenItemWorkflow,
      isOpenCreateWorkflow,
      newWorkflow,
    ]
  );

  const contextValue = useMemo(
    () => ({
      setValuesSampling,
      setShowModelWorkflow,
      setStepCreateDataset,
      setToolItemWorkflow,
      setIsOpenItemWorkflow,
      setIsOpenCreateWorkflow,
      setNewWorkflow,
    }),
    [
      setValuesSampling,
      setShowModelWorkflow,
      setStepCreateDataset,
      setToolItemWorkflow,
      setIsOpenItemWorkflow,
      setIsOpenCreateWorkflow,
      setNewWorkflow,
    ]
  );

  return (
    <LayoutContext.Provider value={layoutContextValue}>
      <LayoutActionsContext.Provider value={contextValue}>
        {children}
      </LayoutActionsContext.Provider>
    </LayoutContext.Provider>
  );
};
