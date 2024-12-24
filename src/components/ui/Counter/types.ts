import type { ComponentProps, PropsWithChildren } from 'react';

type CounterProps = PropsWithChildren<{
  min?: number;
  max?: number;
  defaultValue?: number;
}> &
  Omit<ComponentProps<'input'>, 'type' | 'value' | 'defaultValue'>;
export default CounterProps;
