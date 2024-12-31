import type { PropsWithChildren, CSSProperties } from 'react';
import { z } from 'zod';
import * as s from '@app/schemas';

export type TagCssAttrs = {
  className?: string;
  style?: CSSProperties;
};
export type PropsWithChildrenAndCss<T = {}> = PropsWithChildren<T> &
  TagCssAttrs;

export type Category = z.infer<typeof s.categorySchema>;
export type CategoriesList = z.infer<typeof s.categoriesListSchema>;
export type Product = z.infer<typeof s.productSchema>;
export type ProductsList = z.infer<typeof s.productsListSchema>;
export type CategoryProductsList = z.infer<typeof s.categoryProductsListSchema>;
export type ProductData = z.infer<typeof s.productDataSchema>;
export type ApiStatusMessage = z.infer<typeof s.statusMessageSchema>;

export type ApiRequest = () => Promise<Response>;
export type ApiResponse<T extends object | undefined = undefined> =
  T extends undefined ? ApiStatusMessage : T | ApiStatusMessage;

export type UserData = {
  name: string;
  phone: string;
  email: string;
};
export type CartItem = Product & {
  quantity: number;
};
export type DiscountCouponRequest = UserData;
export type Order = {
  user: UserData;
  items: CartItem[];
};

export type Notification = {
  title: string;
  text: string;
  type?: NotificationType;
};
export const enum NotificationType {
  default,
  success,
  error,
}

export type ProductsFilterFields = {
  price: [number, number];
  onlyDiscounted: boolean;
};

export enum ProductsSorting {
  default = 'by default',
  newest = 'newest',
  price_high2low = 'price: high-low',
  price_low2high = 'price: low-high',
}
export type ProductSortingVar = keyof typeof ProductsSorting;
