import { useRef, useEffect } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@store/types';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useDelayedEditInput = (
  onEdit: (value: string) => boolean,
  onComplete: (value: string) => void,
  delay = 1_000,
) => {
  const ref = useRef<HTMLInputElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const input = ref.current;

    const onInput = function (e: Event) {
      const value = (e.target as HTMLInputElement).value.trim();
      // if value is valid after editing
      if (onEdit(value)) {
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(() => {
          onComplete(input.value);
        }, delay);
      }
    };

    const onBlur = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      onComplete(input.value);
    };

    input.addEventListener('input', onInput);
    input.addEventListener('blur', onBlur);

    return () => {
      input.removeEventListener('input', onInput);
      input.removeEventListener('blur', onBlur);

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [delay, onEdit, onComplete]);

  return ref;
};
