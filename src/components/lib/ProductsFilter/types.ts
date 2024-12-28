import { TagCssAttrs } from '@app/types';

export enum ProductsFilterField {
  price,
  discount,
  sort,
}

export type ProductsFilterProps = {
  fields?: ProductsFilterField[];
} & TagCssAttrs;
