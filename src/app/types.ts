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
export type ProductDetails = z.infer<typeof s.productDetailsSchema>;
export type ApiStatusMessage = z.infer<typeof s.statusMessageSchema>;

export type ApiRequest = () => Promise<Response>;
export type ApiResponse<T extends object | undefined = undefined> =
  T extends undefined ? ApiStatusMessage : T | ApiStatusMessage;

export type UserData = {
  name: string;
  phone: string;
  email: string;
};
export type CartItem = {
  productId: number;
  quantity: number;
};
export type DiscountCouponRequest = UserData;
export type Order = {
  user: UserData;
  items: CartItem[];
};
