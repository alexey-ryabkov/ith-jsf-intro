import type { ComponentProps, PropsWithChildren } from 'react';

type ModalProps = PropsWithChildren<{
  title: string;
  type?: 'success' | 'error' | 'default';
  opened?: boolean;
  closable?: boolean;
  veil?: boolean;
}> &
  ComponentProps<'div'>;
export default ModalProps;
