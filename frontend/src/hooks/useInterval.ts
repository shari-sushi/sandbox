import { useRef, useEffect } from "react";

// see: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
export const useInterval = (callback: () => void, delay: number) => {
  const callbackRef = useRef<() => void>(() => {});

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      if (callbackRef.current != null) callbackRef.current();
    };
    const interval = setInterval(tick, delay);

    return () => clearInterval(interval);
  }, [delay]);
};
