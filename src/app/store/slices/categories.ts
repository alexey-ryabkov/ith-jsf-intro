import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { type CategoriesList } from '@app/types';
import { STORE_REDUCERS } from '@app/constants';
import { initialCategoriesState } from '@store/initials';
import { fetchLoadingReducer } from '@store/helpers';

const categoriesSlice = createSlice({
  name: STORE_REDUCERS.CATEGORIES,
  initialState: initialCategoriesState,
  reducers: {
    setItems: (
      state,
      { payload: categories }: PayloadAction<CategoriesList>,
    ) => {
      state.items = categories;
    },
    clear(state) {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    fetchLoadingReducer(builder);
  },
  selectors: {
    selectItems: ({ items }) => items,
    selectIsLoading: ({ loading }) => loading,
  },
});
export default categoriesSlice;
