import { TagCssAttrs } from '@app/types';

export type CategoriesListProps = {
  cols: 4 | 5;
  limit?: number;
} & TagCssAttrs;
