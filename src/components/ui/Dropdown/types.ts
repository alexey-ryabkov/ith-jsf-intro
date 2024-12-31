import type { ComponentProps } from 'react';

export type DropdownItem = {
  label: string;
  value?: string | number;
};
export type DropdownProps = {
  items: DropdownItem[];
  defaultValue?: DropdownItem['value'];
  onChange?: (value: string | number) => void;
} & Omit<
  ComponentProps<'select'>,
  'value' | 'multiple' | 'size' | 'children' | 'onChange'
>;
