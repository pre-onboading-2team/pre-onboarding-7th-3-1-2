import { useCallback, useState } from "react";

export const useInput = (
  initialValue: string
): [string, (e: React.ChangeEvent<HTMLInputElement>) => void, () => void] => {
  const [value, setValue] = useState(initialValue);
  const onChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      const { value } = event.target;
      setValue(value);
    },
    []
  );
  const reset = useCallback(() => setValue(initialValue), [initialValue]);

  return [value, onChange, reset];
};
