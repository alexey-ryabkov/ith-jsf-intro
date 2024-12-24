import type { ComponentProps, PropsWithChildren } from 'react';

type CheckboxProps = PropsWithChildren<{}> &
  Omit<ComponentProps<'input'>, 'type'>;
export default CheckboxProps;
