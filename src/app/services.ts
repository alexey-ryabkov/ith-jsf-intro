import { API_BASE_URL, API_ENDPOINTS } from '@app/constants';
import {
  CategoriesList,
  CategoryProductsList,
  ProductsList,
  ProductData,
  Order,
  DiscountCouponRequest,
} from './types';
import {
  categoriesListSchema,
  categoryProductsListSchema,
  productsListSchema,
  statusMessageSchema,
  productDataSchema,
} from './schemas';
import { processApiRequest } from './utils';

export const getAllCategories = () =>
  processApiRequest<CategoriesList>(
    () => fetch(`${API_BASE_URL}${API_ENDPOINTS.CATEGORY}/all`),
    categoriesListSchema,
  );

export const getAllProducts = () =>
  processApiRequest<ProductsList>(
    () => fetch(`${API_BASE_URL}${API_ENDPOINTS.PRODUCT}/all`),
    productsListSchema,
  );

export const getCategoryProducts = (categoryId: number) =>
  processApiRequest<CategoryProductsList>(
    () => fetch(`${API_BASE_URL}${API_ENDPOINTS.CATEGORY}/${categoryId}`),
    categoryProductsListSchema,
  );

export const getProductData = (productId: number) =>
  processApiRequest<ProductData>(
    () => fetch(`${API_BASE_URL}${API_ENDPOINTS.PRODUCT}/${productId}`),
    productDataSchema,
  );

export const sendCouponRequest = (data: DiscountCouponRequest) =>
  processApiRequest(
    () =>
      fetch(`${API_BASE_URL}${API_ENDPOINTS.SALE}/send`, {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    statusMessageSchema,
  );

export const createOrder = (data: Order) =>
  processApiRequest(
    () =>
      fetch(`${API_BASE_URL}${API_ENDPOINTS.ORDER}/send`, {
        method: 'POST',
        body: JSON.stringify(data),
      }),
    statusMessageSchema,
  );
