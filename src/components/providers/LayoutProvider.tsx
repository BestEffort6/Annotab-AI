import { createContext, useContext, useMemo, useState } from 'react';

type Props = {
  children?: React.ReactNode;
};

type LayoutContextType = {
  loading: boolean;
};

const LayoutContext = createContext<LayoutContextType>({
  loading: false,
});

type LayoutActionsContextType = {
  setLoading: (loading: boolean) => void;
};

const LayoutActionsContext = createContext<LayoutActionsContextType>({
  setLoading: () => {},
});

export const useLayout = () => useContext(LayoutContext);

export const useLayoutActions = () => useContext(LayoutActionsContext);

export default function Provider({ children }: Props) {
  const [loading, setLoading] = useState<boolean>(false);

  return useMemo(
    () => (
      <LayoutContext.Provider
        value={{
          loading,
        }}
      >
        <LayoutActionsContext.Provider
          value={{
            setLoading,
          }}
        >
          {children}
        </LayoutActionsContext.Provider>
      </LayoutContext.Provider>
    ),
    [loading, children]
  );
}
