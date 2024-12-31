import { TagCssAttrs } from '@app/types';

export enum ProductsListSettingsField {
  price,
  discount,
  sort,
}

export type ProductsListSettingsProps = {
  fields?: ProductsListSettingsField[];
} & TagCssAttrs;
