import { TagCssAttrs } from '@app/types';

export type ProductsListProps = {
  categoryId?: number | null;
  limit?: number;
  onlyDiscounted?: boolean;
} & TagCssAttrs;
