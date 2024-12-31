import {
  categoriesSlice,
  productsSlice,
  productDataSlice,
  cartSlice,
  notificationSlice,
} from '@store/slices';

export const {
  selectItems: selectCategories,
  selectIsLoading: selectIsCategoriesLoading,
} = categoriesSlice.selectors;

export const {
  selectCategoryTitle,
  selectItems: selectRawProducts,
  selectFilter: selectProductsFilter,
  selectSorting: selectProductsSorting,
  selectIsLoading: selectIsProductsLoading,
} = productsSlice.selectors;

export const {
  selectData: selectProductData,
  selectIsLoading: selectIsProductDataLoading,
} = productDataSlice.selectors;

export const { selectItems: selectCartItems, selectCount: selectInCartCount } =
  cartSlice.selectors;

export const {
  selectIsShowing: selectIsNotificationShowing,
  select2show: selectNotification2show,
} = notificationSlice.selectors;
