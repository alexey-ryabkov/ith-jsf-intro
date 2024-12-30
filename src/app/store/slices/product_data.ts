import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { type Product } from '@app/types';
import { STORE_REDUCERS } from '@app/constants';
import { initialProductDataState } from '@store/initials';
import { fetchLoadingReducer } from '@store/helpers';

const productDataSlice = createSlice({
  name: STORE_REDUCERS.PRODUCT_DATA,
  initialState: initialProductDataState,
  reducers: {
    setData(state, { payload: productData }: PayloadAction<Product>) {
      state.data = productData;
    },
    clear(state) {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    fetchLoadingReducer(builder);
  },
  selectors: {
    selectData: ({ data }) => data,
    selectIsLoading: ({ loading }) => loading,
  },
});
export default productDataSlice;
