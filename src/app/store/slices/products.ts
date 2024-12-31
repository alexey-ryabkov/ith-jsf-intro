import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  type CategoryProductsList,
  ProductsFilterFields,
  ProductSortingVar,
} from '@app/types';
import { STORE_REDUCERS } from '@app/constants';
import { initialProductsState } from '@store/initials';
import { fetchLoadingReducer } from '@store/helpers';

const productsSlice = createSlice({
  name: STORE_REDUCERS.PRODUCTS,
  initialState: initialProductsState,
  reducers: {
    setData(
      state,
      {
        payload: { category, data },
      }: PayloadAction<
        Omit<CategoryProductsList, 'category'> & {
          category: CategoryProductsList['category'] | null;
        }
      >,
    ) {
      state.category = category;
      state.items = data;
    },
    setFilter(
      state,
      { payload: filter }: PayloadAction<Partial<ProductsFilterFields>>,
    ) {
      state.filter = { ...state.filter, ...filter };
    },
    setSorting(state, { payload: sorting }: PayloadAction<ProductSortingVar>) {
      state.sorting = sorting;
    },
    resetFilterAndSorting(state) {
      state.filter = initialProductsState['filter'];
      state.sorting = initialProductsState['sorting'];
    },
    clear(state) {
      state.category = null;
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    fetchLoadingReducer(builder);
  },
  selectors: {
    selectCategoryTitle: ({ category }) => category?.title,
    selectItems: ({ items }) => items,
    selectFilter: ({ filter }) => filter,
    selectSorting: ({ sorting }) => sorting,
    selectIsLoading: ({ loading }) => loading,
  },
});
export default productsSlice;
