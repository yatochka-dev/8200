import { type ChangeEvent, useCallback, useEffect, useState } from 'react';

export default function useField<T>(
  initialValue: T,
  helperText?: string,
  check?: (value: T) => null | string
) {
  const [value, setValue] = useState<T>(initialValue);
  const [error, setError] = useState<string | null>(null);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value as unknown as T);
  }, []);

  useEffect(() => {
    const checkResult = check && check(value);

    if (typeof checkResult === 'string') {
      setError(checkResult);
    } else {
      setError(null);
    }
  }, [value, check]);

  return {
    value,
    register: {
      value,
      onChange,
      error: !!error,
      helperText: !!error ? error : helperText,
    },
  };
}
