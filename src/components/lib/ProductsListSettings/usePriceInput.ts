import { type MutableRefObject, useCallback, useState } from 'react';
import { useDelayedEditInput } from '@app/hooks';

const checkIfEmptyValue = (value: string) => value === '';
const checkIfActualValue = (value: string) => {
  const numValue = Number(value);
  return !isNaN(numValue) && numValue > 0;
};
const checkIfValidValue = (value: string) =>
  checkIfEmptyValue(value) || checkIfActualValue(value);

export const usePriceInput = (
  onChange: (value: number | null) => void,
  initialValue = '',
  editDelay = 1_000,
): [MutableRefObject<HTMLInputElement | null>, string] => {
  const [value, setValue] = useState(initialValue);

  const onEdit = useCallback((value: string) => {
    if (checkIfEmptyValue(value)) {
      setValue('');
    } else if (checkIfActualValue(value)) {
      setValue(value);
    }
    return checkIfValidValue(value);
  }, []);
  const onComplete = useCallback(
    (value: string) => {
      if (checkIfEmptyValue(value)) {
        onChange(null);
      } else if (checkIfActualValue(value)) {
        onChange(Number(value));
      }
    },
    [onChange],
  );
  const ref = useDelayedEditInput(onEdit, onComplete, editDelay);

  return [ref, value];
};
