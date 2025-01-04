import { ComponentProps } from 'react';

export type AppNavItem = {
  title: string;
  path: string;
};
export type AppNavProps = {
  items: AppNavItem[];
} & ComponentProps<'nav'>;
