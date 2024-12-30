import type { ComponentProps, PropsWithChildren } from 'react';

type CounterProps = PropsWithChildren<{
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  defaultValue?: number;
}> &
  Omit<ComponentProps<'input'>, 'type' | 'value' | 'defaultValue' | 'onChange'>;
export default CounterProps;
