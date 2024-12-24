import type { ReactNode, ComponentProps } from 'react';

export type DescriptionItem = {
  name: string;
  value: ReactNode | string;
};
export type DescriptionsProps = {
  items: DescriptionItem[];
  itemWrapperCls?: string;
} & ComponentProps<'dl'>;
