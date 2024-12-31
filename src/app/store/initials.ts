import {
  type CartItem,
  type CategoriesList,
  type Category,
  type Notification,
  type Product,
  type ProductsList,
  type ProductsFilterFields,
  ProductSortingVar,
} from '@app/types';

export const initialCartState: { items: CartItem[] } = {
  items: [],
};

export const initialCategoriesState: {
  items: CategoriesList;
  loading: boolean;
} = {
  items: [],
  loading: false,
};

export const initialProductsState: {
  category: Category | null;
  items: ProductsList;
  filter: ProductsFilterFields;
  sorting: ProductSortingVar;
  loading: boolean;
} = {
  category: null,
  items: [],
  filter: { price: [-Infinity, Infinity], onlyDiscounted: false },
  sorting: 'default',
  loading: false,
};

export const initialProductDataState: {
  data: Product | null;
  loading: boolean;
} = {
  data: null,
  loading: false,
};

export const initialNotificationState: Notification = {
  title: '',
  text: '',
};
