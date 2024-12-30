import type { ComponentProps, PropsWithChildren } from 'react';

type MessageBoxProps = PropsWithChildren<{
  title: string;
  desc?: string;
  image?: string;
}> &
  ComponentProps<'div'>;
export default MessageBoxProps;
