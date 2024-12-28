import { TagCssAttrs } from '@app/types';

export type ProductsListProps = {
  category?: number;
  limit?: number;
} & TagCssAttrs;
