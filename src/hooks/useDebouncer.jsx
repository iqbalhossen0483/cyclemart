import { useEffect, useState } from "react";

export default function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Start a timer
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cancel timer if value changes before delay
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
