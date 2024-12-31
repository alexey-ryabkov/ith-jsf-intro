import type { ComponentProps, PropsWithChildren } from 'react';

type CheckboxProps = PropsWithChildren<{
  onChange?: (value: boolean) => void;
  value?: boolean;
}> &
  Omit<ComponentProps<'input'>, 'type' | 'onChange' | 'value'>;
export default CheckboxProps;
