import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay: number = 500): T {
  const [state, setState] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setState(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return state;
}
