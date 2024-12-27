import type { ComponentProps, PropsWithChildren } from 'react';
import { NotificationType } from '@app/types';

export { NotificationType };
export type ModalProps = PropsWithChildren<{
  title: string;
  type?: NotificationType;
  opened?: boolean;
  veil?: boolean;
  closable?: boolean;
  closeByOutsideClick?: boolean;
  onClose?: () => void;
}> &
  ComponentProps<'div'>;
