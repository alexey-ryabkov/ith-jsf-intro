import type { ComponentProps, PropsWithChildren } from 'react';

type JumbotronProps = PropsWithChildren<{
  image: string;
}> &
  ComponentProps<'div'>;
export default JumbotronProps;
