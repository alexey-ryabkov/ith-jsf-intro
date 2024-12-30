import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { type CategoryProductsList } from '@app/types';
import { STORE_REDUCERS } from '@app/constants';
import { initialProductsState } from '@store/initials';
import { fetchLoadingReducer } from '@store/helpers';

const productsSlice = createSlice({
  name: STORE_REDUCERS.PRODUCTS,
  initialState: initialProductsState,
  reducers: {
    setData: (
      { loading },
      {
        payload: { category, data: items },
      }: PayloadAction<
        Omit<CategoryProductsList, 'category'> & {
          category: CategoryProductsList['category'] | null;
        }
      >,
    ) => ({ category, items, loading }),
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
    selectIsLoading: ({ loading }) => loading,
  },
});
export default productsSlice;
