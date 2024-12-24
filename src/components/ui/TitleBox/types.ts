import type { ComponentProps, PropsWithChildren, ReactNode } from 'react';

type TitleBoxProps = PropsWithChildren<{
  level: 1 | 2 | 3 | 4 | 5 | 6;
  divider?: boolean;
  tail?: ReactNode;
}> &
  ComponentProps<'h1'>;
export default TitleBoxProps;
