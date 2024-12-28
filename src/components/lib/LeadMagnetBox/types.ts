import type { ComponentProps, PropsWithChildren } from 'react';

export type LeadMagnetBoxProps = PropsWithChildren<{
  title: string;
  image: string;
}> &
  ComponentProps<'div'>;
