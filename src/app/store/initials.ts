import type {
  CartItem,
  CategoriesList,
  Category,
  Notification,
  Product,
  ProductsList,
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
  loading: boolean;
} = {
  category: null,
  items: [],
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
