import { useWindowSize as useWindowSizeHook } from '@uidotdev/usehooks';

export default function useWindowSize() {
  const { width, height } = useWindowSizeHook();

  return {
    windowSize: { width, height },
    isMobile: typeof width === 'number' && width < 768,
    isDesktop: typeof width === 'number' && width >= 768,
  };
}
