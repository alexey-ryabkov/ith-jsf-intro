import { createAsyncThunk } from '@reduxjs/toolkit';
import { STORE_REDUCERS } from '@app/constants';
import type {
  CategoriesList,
  CategoryProductsList,
  ProductData,
  ProductsList,
} from '@app/types';
import {
  getAllCategories,
  getAllProducts,
  getCategoryProducts,
  getProductData,
} from '@app/services';
import { checkFetchResultAndHandleFailed } from '@app/utils';
import { setCategories, setCategoryProducts, setProductData } from './sliced';

export const fetchCategories = createAsyncThunk(
  `${STORE_REDUCERS.CATEGORIES}/fetch`,
  async (_, { dispatch, rejectWithValue }) => {
    let rejectValue;
    const result = await getAllCategories();
    if (
      checkFetchResultAndHandleFailed<CategoriesList>(result, (msg) => {
        rejectValue = rejectWithValue(msg);
      })
    ) {
      dispatch(setCategories(result));
    }
    return rejectValue;
  },
);

export const fetchProducts = createAsyncThunk(
  `${STORE_REDUCERS.PRODUCTS}/fetch`,
  async (categoryId: number | null, { dispatch, rejectWithValue }) => {
    let rejectValue;
    if (categoryId) {
      const result = await getCategoryProducts(categoryId);
      if (
        checkFetchResultAndHandleFailed<CategoryProductsList>(
          result,
          (msg) => (rejectValue = rejectWithValue(msg)),
        )
      ) {
        dispatch(setCategoryProducts(result));
      }
    } else {
      const result = await getAllProducts();
      if (
        checkFetchResultAndHandleFailed<ProductsList>(
          result,
          (msg) => (rejectValue = rejectWithValue(msg)),
        )
      ) {
        dispatch(setCategoryProducts({ category: null, data: result }));
      }
    }
    return rejectValue;
  },
);

export const fetchProductData = createAsyncThunk(
  `${STORE_REDUCERS.PRODUCT_DATA}/fetch`,
  async (productId: number, { dispatch, rejectWithValue }) => {
    let rejectValue;
    const result = await getProductData(productId);
    if (
      checkFetchResultAndHandleFailed<ProductData>(
        result,
        (msg) => (rejectValue = rejectWithValue(msg)),
      )
    ) {
      dispatch(setProductData(result[0]));
    }
    return rejectValue;
  },
);
